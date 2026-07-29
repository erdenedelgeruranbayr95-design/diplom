import type { Track } from "@/types/track";

const likeBase =
  "absolute top-[9px] right-[9px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-white bg-[rgba(5,9,9,.55)] backdrop-blur-sm opacity-0 transition-[opacity,color,transform] duration-[250ms] z-[2] hover:scale-[1.12] group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-glow-aqua";
const likeRow = "!static !w-[30px] !h-[30px] !bg-none !backdrop-blur-none !opacity-100 text-faint !text-[16px]";

export function LikeBtn({
  row,
  active,
  onToggle,
}: {
  id: number | string;
  row?: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <span
      className={likeBase + (row ? " " + likeRow : "") + (active ? " !opacity-100 text-aqua" : "")}
      role="button"
      tabIndex={0}
      aria-label={active ? "Дуртайгаас хасах" : "Дуртайд нэмэх"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onToggle();
        }
      }}
    >
      {active ? "♥" : "♡"}
    </span>
  );
}

export function SaveBtn({
  row,
  active,
  onToggle,
}: {
  id: number | string;
  row?: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <span
      className={likeBase + (row ? " " + likeRow : " !top-12") + (active ? " !opacity-100 text-warm" : "")}
      role="button"
      tabIndex={0}
      aria-label={active ? "Хадгалснаас хасах" : "Хадгалах"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onToggle();
        }
      }}
    >
      <svg width={row ? 14 : 15} height={row ? 14 : 15} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M6 3h12v18l-6-3.6L6 21V3z" />
      </svg>
    </span>
  );
}

export function InfoBtn({ t, row, onInfo }: { t: Track; row?: boolean; onInfo: () => void }) {
  return (
    <span
      className={likeBase + (row ? " " + likeRow : "")}
      role="button"
      tabIndex={0}
      aria-label={t.title + " — дэлгэрэнгүй"}
      onClick={(e) => {
        e.stopPropagation();
        onInfo();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          onInfo();
        }
      }}
    >
      ⓘ
    </span>
  );
}
