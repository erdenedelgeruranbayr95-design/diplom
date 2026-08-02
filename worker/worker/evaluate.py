"""Beat detection F-measure хэмжилт — ROADMAP-7-PHASES.md Үе шат 3-ийн DoD.

Ground-truth annotated дуу (жинхэнэ хэмжилтэнд ашигладаг стандарт корпус, жишээ нь
GTZAN/Ballroom) энэ орчинд байхгүй тул СИНТЕТИК click-track ашиглана: тодорхой BPM-тэй
метроном сигнал (impulse click) үүсгэж, `librosa.beat.beat_track`-аар илрүүлээд өөрийн
мэдэгдэж буй ground-truth beat цагтай харьцуулна. Энэ бол `librosa.beat.beat_track`-ийн
нарийвчлалыг манай bpm-мэдэгдэж-байгаа хэрэглээний нөхцөлд шалгах стандарт арга (mir_eval
номын сангийн F-measure тодорхойлолттой ижил, ±70мс tolerance цонх ашиглана — MIREX
жишиг стандарт).
"""

import csv
import sys
from pathlib import Path

import numpy as np
import librosa

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

SR = 22050
TOLERANCE_SEC = 0.07  # MIREX-ийн стандарт beat tolerance (±70мс)


def make_click_track(bpm: float, duration_sec: float, sr: int = SR) -> tuple[np.ndarray, np.ndarray]:
    """Тодорхой BPM-тэй метроном сигнал (click-track) үүсгэнэ, ground-truth beat
    timestamp-уудын хамт буцаана."""
    beat_interval = 60.0 / bpm
    beat_times = np.arange(0, duration_sec, beat_interval)
    y = np.zeros(int(duration_sec * sr))
    click_len = int(0.01 * sr)  # 10мс impulse
    click = np.hanning(click_len) * np.sin(2 * np.pi * 1000 * np.arange(click_len) / sr)
    for t in beat_times:
        start = int(t * sr)
        end = min(len(y), start + click_len)
        y[start:end] += click[: end - start]
    # бага зэрэг шуугиан нэмж, идеал биш бодит нөхцлийг дуурайна
    y += np.random.normal(0, 0.002, len(y))
    return y.astype(np.float32), beat_times


def f_measure(estimated: np.ndarray, ground_truth: np.ndarray, tolerance: float = TOLERANCE_SEC) -> tuple[float, float, float]:
    """Precision/Recall/F-measure — тухайн estimated beat нь ground_truth-ийн ±tolerance
    доторх аль нэг цэгтэй таарвал зөв (true positive) гэж тооцно."""
    if len(estimated) == 0 or len(ground_truth) == 0:
        return 0.0, 0.0, 0.0

    matched_gt = set()
    tp = 0
    for est in estimated:
        diffs = np.abs(ground_truth - est)
        idx = int(np.argmin(diffs))
        if diffs[idx] <= tolerance and idx not in matched_gt:
            matched_gt.add(idx)
            tp += 1

    precision = tp / len(estimated)
    recall = tp / len(ground_truth)
    f = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0
    return precision, recall, f


def run_evaluation(export_dir: Path | None = None) -> float:
    """F-measure хэмжилтийг ажиллуулж, дундаж утгыг буцаана. `export_dir` өгвол
    CSV + Markdown хүснэгт бичиж, дипломын тоон үзүүлэлтийн хүснэгтэд шууд оруулах
    боломжтой болгоно (см. docs/MEASUREMENTS.md)."""
    bpms = [80, 95, 110, 120, 128, 136, 140, 150, 160, 174]  # 10 өөр BPM-тэй тест
    results = []
    for bpm in bpms:
        y, gt_beats = make_click_track(bpm, duration_sec=30.0)
        _, beat_frames = librosa.beat.beat_track(y=y, sr=SR, units="frames")
        est_beats = librosa.frames_to_time(beat_frames, sr=SR)
        p, r, f = f_measure(est_beats, gt_beats)
        results.append((bpm, p, r, f))
        print(f"BPM={bpm:>3}  precision={p:.3f}  recall={r:.3f}  F-measure={f:.3f}")

    mean_f = float(np.mean([r[3] for r in results]))
    print(f"\nДундаж F-measure ({len(bpms)} дуун дээр): {mean_f:.3f}")
    print(f"DoD (≥0.85): {'ХАНГАСАН' if mean_f >= 0.85 else 'ХАНГААГҮЙ'}")

    if export_dir:
        export_dir.mkdir(parents=True, exist_ok=True)
        csv_path = export_dir / "f-measure-results.csv"
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["bpm", "precision", "recall", "f_measure"])
            for bpm, p, r, fm in results:
                writer.writerow([bpm, f"{p:.3f}", f"{r:.3f}", f"{fm:.3f}"])
            writer.writerow(["mean", "", "", f"{mean_f:.3f}"])
        print(f"CSV бичигдлээ: {csv_path}")

        md_path = export_dir / "f-measure-results.md"
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("| BPM | Precision | Recall | F-measure |\n|---|---|---|---|\n")
            for bpm, p, r, fm in results:
                f.write(f"| {bpm} | {p:.3f} | {r:.3f} | {fm:.3f} |\n")
            f.write(f"| **Дундаж** | | | **{mean_f:.3f}** |\n")
        print(f"Markdown бичигдлээ: {md_path}")

    return mean_f


if __name__ == "__main__":
    out_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    run_evaluation(out_dir)
