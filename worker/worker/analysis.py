"""Дуу→мэдрэхүй анализ — librosa ашиглан Haptic Score үүсгэнэ.

Гаралт (Haptic Score, JSON): 60fps-тэй фрэймүүд, фрэйм бүрд 8 логарифм
давтамжийн бүсийн энерги + onset flag + beat flag + rms. Frontend
(useHapticEngine, roadmap Үе шат 3) `currentTime * sampleRate`-ээр индекслэж
шууд уншина — тоглуулах үед дахин FFT тооцоолохгүй.

8 бүс: [20, 60, 150, 400, 1000, 2500, 6000, 12000, 20000] Hz — эдгээр 9 хилийн
цэгээр 8 логарифм давхаргад хуваана (Player.tsx-ийн playback-цагийн 3-бүсийн
RAF loop-той ЗЭРЭГЦЭЭ оршдог, орлохгүй — Score байхгүй үед 3-бүсийн realtime
fallback ажиллана: useHapticEngine.ts-ийг үзнэ).
"""

import json
from dataclasses import dataclass

import librosa
import numpy as np

SAMPLE_RATE_FPS = 60  # Score-ийн фрэймийн давтамж (Hz) — аудио sample rate биш
BAND_EDGES_HZ = [20, 60, 150, 400, 1000, 2500, 6000, 12000, 20000]
N_BANDS = len(BAND_EDGES_HZ) - 1  # 8


@dataclass
class AnalysisResult:
    bpm: float
    musical_key: str
    haptic_score: dict
    # Секундээр (жагсаалт) — frontend-ийн BeatScheduler (lib/audio/beat-scheduler.ts)
    # шууд ашиглана, timestamp-driven (25мс interval) beat→чичиргээ замд шаардлагатай.
    beat_times: list


def analyze(file_path: str) -> AnalysisResult:
    y, sr = librosa.load(file_path, sr=None, mono=True)

    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)

    onset_frames = librosa.onset.onset_detect(y=y, sr=sr, units="frames")
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)

    musical_key = _detect_key(y, sr)

    haptic_score = _build_haptic_score(y, sr, beat_times, onset_times)

    bpm_value = float(tempo) if np.isscalar(tempo) else float(tempo[0])
    return AnalysisResult(
        bpm=round(bpm_value, 1),
        musical_key=musical_key,
        haptic_score=haptic_score,
        beat_times=[round(float(t), 3) for t in beat_times],
    )


def _detect_key(y: np.ndarray, sr: int) -> str:
    """Chroma дунджаас хамгийн давамгайлсан pitch class-ыг major key гэж үзнэ.

    Энгийн (Krumhansl-Schmuckler бус) heuristic — дипломын хэмжээнд хангалттай
    нарийвчлалтай, тооцоолол хямд."""
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    mean_chroma = chroma.mean(axis=1)
    pitch_classes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    root_idx = int(np.argmax(mean_chroma))
    # Гурвал (major triad: root, +4 major 3rd, +7 perfect 5th) илрэлээр major/minor ялгана.
    major_third = mean_chroma[(root_idx + 4) % 12]
    minor_third = mean_chroma[(root_idx + 3) % 12]
    mode = "major" if major_third >= minor_third else "minor"
    return f"{pitch_classes[root_idx]} {mode}"


def _build_haptic_score(y: np.ndarray, sr: int, beat_times: np.ndarray, onset_times: np.ndarray) -> dict:
    duration = librosa.get_duration(y=y, sr=sr)
    n_frames = max(1, int(duration * SAMPLE_RATE_FPS))

    # STFT — Score-ийн фрэйм тутамд нэг багана орохоор hop_length тохируулна.
    hop_length = max(1, int(sr / SAMPLE_RATE_FPS))
    stft = np.abs(librosa.stft(y, hop_length=hop_length))
    freqs = librosa.fft_frequencies(sr=sr, n_fft=(stft.shape[0] - 1) * 2)
    stft_frame_count = stft.shape[1]

    # Бүх фрэйм/бүсийг НЭГ дор (векторжуулан) тооцоолно — доорх Python for-loop
    # зөвхөн JSON-руу бэлтгэх л үлддэг тул фрэймийн тоо олон мянга ч секундэд багтана
    # (өмнөх, бүс бүрийг фрэйм бүрд numpy slicing хийдэг хувилбар ~90с зарцуулж байсныг
    # ердөө ~1-2с болгож бууруулав).
    band_energy = np.zeros((N_BANDS, stft_frame_count), dtype=np.float32)
    for i in range(N_BANDS):
        lo, hi = BAND_EDGES_HZ[i], BAND_EDGES_HZ[i + 1]
        bins = np.where((freqs >= lo) & (freqs < hi))[0]
        if len(bins) == 0:
            continue
        band_energy[i] = stft[bins, :].mean(axis=0)

    # Тухайн STFT-фрэйм доторх 8 бүсийг 0..1 normalize (баганын дундаж).
    col_max = band_energy.max(axis=0)
    col_max[col_max == 0] = 1.0
    band_energy_norm = band_energy / col_max

    # Score-ийн фрэйм индекс бүрийг хамгийн ойрын STFT баганад заана (n_frames ихэвчлэн
    # stft_frame_count-тэй бараг тэнцүү, learning цаг хугацааны зөрөө богино тул clip хангалттай).
    stft_idx_for_frame = np.minimum(np.arange(n_frames), stft_frame_count - 1)
    frame_bands = band_energy_norm[:, stft_idx_for_frame].T  # (n_frames, N_BANDS)

    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    rms_for_frame = rms[np.minimum(np.arange(n_frames), len(rms) - 1)] if len(rms) else np.zeros(n_frames)
    rms_for_frame = np.minimum(1.0, rms_for_frame * 4)

    beat_set = set((beat_times * SAMPLE_RATE_FPS).astype(int).tolist())
    onset_set = set((onset_times * SAMPLE_RATE_FPS).astype(int).tolist())

    frame_bands_rounded = np.round(frame_bands, 4)
    rms_rounded = np.round(rms_for_frame, 4)

    frames = [
        {
            "b": frame_bands_rounded[i].tolist(),
            "o": 1 if i in onset_set else 0,
            "beat": 1 if i in beat_set else 0,
            "rms": float(rms_rounded[i]),
        }
        for i in range(n_frames)
    ]

    return {
        "sampleRate": SAMPLE_RATE_FPS,
        "bandEdgesHz": BAND_EDGES_HZ,
        "durationSec": round(duration, 3),
        "frames": frames,
    }


def save_score(result: AnalysisResult, out_path: str) -> None:
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result.haptic_score, f, separators=(",", ":"))
