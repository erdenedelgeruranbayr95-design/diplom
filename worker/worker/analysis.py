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


# Цохилтын эрчим/өнгийг нормчлох хувиуд ба хамгийн сул цохилтын доод хязгаар.
# ⚠️ Эдгээр нь mobile-ийн `src/lib/audio/haptic-score.ts`-тэй ЯГ ИЖИЛ байх ёстой —
# хоёр тал ижил Score-оос ижил үр дүн гаргаж байж л зан төлөв нийцнэ.
P_LOW = 0.1
P_HIGH = 0.9
MIN_INTENSITY = 0.35


@dataclass
class AnalysisResult:
    bpm: float
    musical_key: str
    haptic_score: dict
    # Секундээр (жагсаалт) — frontend-ийн BeatScheduler (lib/audio/beat-scheduler.ts)
    # шууд ашиглана, timestamp-driven (25мс interval) beat→чичиргээ замд шаардлагатай.
    beat_times: list
    # Цохилт бүрийн эрчим (0..1) ба өнгө (0=гүн бас, 1=хурц таваг). `beat_times`-тай
    # ижил урттай.
    #
    # ⚠️ ЯАГААД ЭДГЭЭРИЙГ ТУСАД НЬ ГАРГАДАГ ВЭ
    # Бүтэн Haptic Score нь ~2.6 MB бөгөөд ЛОКАЛ дискэнд бичигддэг. Backend үүлэн
    # дээр (Render) ажиллаж, worker өөр машин дээр байвал тэр файл руу хэзээ ч
    # хүрэхгүй — үр дүнд нь бүх цохилт ижил дугтуйгаар мэдрэгдэнэ. Эдгээр хоёр
    # массив нь ердөө ~3 KB тул callback-аар дамжиж, өгөгдлийн санд шууд
    # хадгалагдана — файл, S3, дундын диск шаардахгүй.
    beat_intensity: list
    beat_brightness: list
    # Онсет — аливаа шинэ авиа эхлэх мөч (бөмбөр, гитарын цохилт, дуучны үг).
    #
    # ⚠️ ЯАГААД ЦОХИЛТООС ГАДНА ОНСЕТ ХЭРЭГТЭЙ ВЭ
    # Зөвхөн цохилтоор чичрүүлэхэд метроном шиг мэдрэгддэг — секундэд ердөө 1.6-2.5
    # удаа, бүгд ижил зайтай. Онсет нь 3-6 дахин олон (секундэд 4.5-12) бөгөөд
    # хөгжмийн БОДИТ бүтцийг дагадаг тул аялгуу, хэмнэлийн нарийн ширийн нь
    # мэдрэгдэж эхэлдэг.
    #
    # ⚠️ ЭНД ШҮҮГДЭЭГҮЙ бүх онсетыг өгнө. Хоорондын зай 35мс хүртэл богино байж
    # болох тул шууд тоглуулбал арьс тэдгээрийг нэг тасралтгүй чичиргээ гэж
    # мэдэрнэ (хүрэлцэхүйн ялгах хязгаар ~50мс). Шүүлтийг клиент тал хийнэ —
    # ингэснээр мэдрэмжийг тааруулахад дуунуудыг дахин шинжлэх шаардлагагүй.
    onset_times: list
    onset_intensity: list
    onset_brightness: list


def analyze(file_path: str) -> AnalysisResult:
    y, sr = librosa.load(file_path, sr=None, mono=True)

    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)

    onset_frames = librosa.onset.onset_detect(y=y, sr=sr, units="frames")
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)

    musical_key = _detect_key(y, sr)

    haptic_score = _build_haptic_score(y, sr, beat_times, onset_times)

    bpm_value = float(tempo) if np.isscalar(tempo) else float(tempo[0])
    rounded_beats = [round(float(t), 3) for t in beat_times]
    intensity, brightness = build_beat_dynamics(haptic_score, rounded_beats)

    rounded_onsets = [round(float(t), 3) for t in onset_times]
    onset_i, onset_b = build_beat_dynamics(haptic_score, rounded_onsets)

    return AnalysisResult(
        bpm=round(bpm_value, 1),
        musical_key=musical_key,
        haptic_score=haptic_score,
        beat_times=rounded_beats,
        beat_intensity=intensity,
        beat_brightness=brightness,
        onset_times=rounded_onsets,
        onset_intensity=onset_i,
        onset_brightness=onset_b,
    )


def _centroid(bands: list) -> float:
    """Спектрийн төвийн цэг 0..1 — бүсийн индексээр жигнэсэн дундаж.

    Бага бол энерги доод бүсэд (бас), их бол дээд бүсэд (таваг).
    """
    total = sum(bands)
    if total <= 0:
        return 0.0
    weighted = sum(b * i for i, b in enumerate(bands))
    return weighted / total / (len(bands) - 1)


def _percentile(sorted_vals: list, p: float) -> float:
    if not sorted_vals:
        return 0.0
    idx = int(p * (len(sorted_vals) - 1))
    return sorted_vals[min(len(sorted_vals) - 1, max(0, idx))]


def _normalizer(values: list):
    """`[p10, p90]` мужийг `[0, 1]` руу сунгах функц.

    ⚠️ ЯАГААД ТУХАЙН ДУУНЫ ДОТООД ХЭМЖЭЭСЭЭР НОРМЧЛОХ ВЭ
    `rms` нь `min(1, rms*4)`-ээр тайрагддаг тул орчин үеийн чанга mastering-тэй
    дуунууд дээд хязгаартаа наалддаг. Үнэмлэхүй утгаар авбал бүх цохилт 1.0 болж
    динамик бүрэн алга болно. Дуу бүрийн ӨӨРИЙНХ нь тархалтыг сунгаснаар тайван
    дуу ч, чанга дуу ч моторын бүтэн хүрээг ашиглана.
    """
    sorted_vals = sorted(values)
    lo = _percentile(sorted_vals, P_LOW)
    hi = _percentile(sorted_vals, P_HIGH)
    span = hi - lo
    if span < 1e-6:
        return lambda _v: 0.5
    return lambda v: min(1.0, max(0.0, (v - lo) / span))


def build_beat_dynamics(score: dict, beat_times: list) -> tuple:
    """Score болон цохилтын хугацаанаас цохилт бүрийн эрчим/өнгийг гаргана.

    Логик нь mobile-ийн `buildBeatDynamics`-тэй ижил: цохилтын хугацаанд харгалзах
    фрэймээс `rms` (эрчим) ба спектрийн төв (өнгө)-ийг авч, дуу тус бүрийн
    тархалтаар нормчилно.
    """
    frames = score.get("frames") or []
    if not frames or not beat_times:
        return [], []

    sample_rate = score.get("sampleRate") or SAMPLE_RATE_FPS
    last = len(frames) - 1

    raw_rms = []
    raw_cent = []
    for t in beat_times:
        idx = max(0, min(last, int(t * sample_rate)))
        frame = frames[idx]
        raw_rms.append(float(frame.get("rms") or 0.0))
        raw_cent.append(_centroid(frame.get("b") or []))

    norm_rms = _normalizer(raw_rms)
    norm_cent = _normalizer(raw_cent)

    intensity = [round(MIN_INTENSITY + (1 - MIN_INTENSITY) * norm_rms(v), 4) for v in raw_rms]
    brightness = [round(norm_cent(v), 4) for v in raw_cent]
    return intensity, brightness


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
