"use client";

/* Player.tsx-ийн доод баарын тоглуулах удирдлага (.sp-ctl + .sp-seek) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { fmt } from "@/lib/player/format";

export default function PlaybackControls({
  playing,
  time,
  dur,
  pct,
  previewPct,
  subscribed,
  onTogglePlay,
  onStep,
  onSeek,
  onSeekTo,
}: {
  playing: boolean;
  time: number;
  dur: number;
  pct: number;
  previewPct: number;
  subscribed: boolean;
  onTogglePlay: () => void;
  onStep: (dir: number) => void;
  onSeek: (dt: number) => void;
  onSeekTo: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const ctlBtn =
    "text-ink w-[38px] h-[38px] max-nav:w-11 max-nav:h-11 rounded-full text-[15px] flex items-center justify-center transition-[color,background,transform] duration-200 cursor-none hover:text-aqua hover:bg-[rgba(56,232,206,.08)] active:scale-90 focus-visible:shadow-glow-aqua";
  const skipBtn = ctlBtn + " text-[11px] font-mono";
  const playBtn =
    "w-[46px] h-[46px] max-nav:w-[52px] max-nav:h-[52px] rounded-full bg-aqua text-[#04100E] text-[17px] flex items-center justify-center transition-[transform,background] duration-200 cursor-none shadow-[0_6px_18px_rgba(56,232,206,.3)] hover:scale-[1.07] hover:bg-[#6FF3DE] active:scale-[.94] focus-visible:shadow-glow-aqua";

  return (
    <div className="flex flex-col gap-2 items-center w-[min(560px,44vw)] max-nav:w-full">
      <div className="flex items-center gap-2.5">
        <button className={ctlBtn} onClick={() => onStep(-1)} aria-label="Өмнөх дуу">
          ⏮
        </button>
        <button className={skipBtn} onClick={() => onSeek(-10)} aria-label="10 секунд ухраах">
          −10с
        </button>
        <button className={playBtn} onClick={onTogglePlay} aria-label={playing ? "Зогсоох" : "Тоглуулах"}>
          {playing ? "⏸" : "▶"}
        </button>
        <button className={skipBtn} onClick={() => onSeek(10)} aria-label="10 секунд урагшлуулах">
          +10с
        </button>
        <button className={ctlBtn} onClick={() => onStep(1)} aria-label="Дараагийн дуу">
          ⏭
        </button>
      </div>
      <div className="flex items-center gap-3 w-full">
        <span className="mono !text-[9.5px] flex-none">{fmt(time)}</span>
        <div
          className="pl-bar flex-1 !mt-0 !h-[5px] hover:!h-2 focus-visible:!h-2"
          onClick={onSeekTo}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") onSeek(5);
            else if (e.key === "ArrowLeft") onSeek(-5);
            else return;
            e.preventDefault();
          }}
          role="slider"
          tabIndex={0}
          aria-label="Гүйлгэх"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(time)}
        >
          {!subscribed && <i className="pl-lock" style={{ left: previewPct + "%" }}></i>}
          <i className="pl-fill" style={{ width: pct + "%" }}></i>
        </div>
        <span className="mono !text-[9.5px] flex-none">{fmt(dur)}</span>
      </div>
    </div>
  );
}
