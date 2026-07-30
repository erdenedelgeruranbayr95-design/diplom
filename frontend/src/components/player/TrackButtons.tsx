import type { Track } from "@/types/track";
import Icon from "@/components/ui/Icon";

const likeBase =
  "absolute top-[10px] right-[10px] w-[34px] h-[34px] rounded-full flex items-center justify-center text-[17px] text-ink bg-[rgba(7,10,10,.72)] border border-white/[.08] backdrop-blur-md opacity-0 transition-[opacity,color,transform,border-color,background] duration-[250ms] z-[2] hover:scale-[1.08] hover:border-aqua/35 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:shadow-glow-aqua";
const likeRow = "!static !w-[32px] !h-[32px] !rounded-[12px] !bg-white/[.03] !border-white/[.08] !opacity-100 text-faint !text-[15px]";

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
  const className = likeBase + (row ? " " + likeRow : "") + (active ? " !opacity-100 text-aqua" : "");

  if (row) {
    return (
      <span
        className={className}
        role="button"
        tabIndex={0}
        aria-label={active ? "Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð³Ð°Ð°Ñ Ñ…Ð°ÑÐ°Ñ…" : "Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð´ Ð½ÑÐ¼ÑÑ…"}
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
        <Icon name="heart" size={16} variant={active ? "fill" : "stroke"} />
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={active ? "Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð³Ð°Ð°Ñ Ñ…Ð°ÑÐ°Ñ…" : "Ð”ÑƒÑ€Ñ‚Ð°Ð¹Ð´ Ð½ÑÐ¼ÑÑ…"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <Icon name="heart" size={16} variant={active ? "fill" : "stroke"} />
    </button>
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
  const className = likeBase + (row ? " " + likeRow : " !top-12") + (active ? " !opacity-100 text-warm" : "");

  if (row) {
    return (
      <span
        className={className}
        role="button"
        tabIndex={0}
        aria-label={active ? "Ð¥Ð°Ð´Ð³Ð°Ð»ÑÐ½Ð°Ð°Ñ Ñ…Ð°ÑÐ°Ñ…" : "Ð¥Ð°Ð´Ð³Ð°Ð»Ð°Ñ…"}
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
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M6 3h12v18l-6-3.6L6 21V3z" />
        </svg>
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={active ? "Ð¥Ð°Ð´Ð³Ð°Ð»ÑÐ½Ð°Ð°Ñ Ñ…Ð°ÑÐ°Ñ…" : "Ð¥Ð°Ð´Ð³Ð°Ð»Ð°Ñ…"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <svg
        width={15}
        height={15}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M6 3h12v18l-6-3.6L6 21V3z" />
      </svg>
    </button>
  );
}

export function InfoBtn({ t, row, onInfo }: { t: Track; row?: boolean; onInfo: () => void }) {
  const className = likeBase + (row ? " " + likeRow : " !top-[57px]");

  if (row) {
    return (
      <span
        className={className}
        role="button"
        tabIndex={0}
        aria-label={t.title + " — Ð´ÑÐ»Ð³ÑÑ€ÑÐ½Ð³Ò¯Ð¹"}
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
        <Icon name="info" size={15} />
      </span>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={t.title + " — Ð´ÑÐ»Ð³ÑÑ€ÑÐ½Ð³Ò¯Ð¹"}
      onClick={(e) => {
        e.stopPropagation();
        onInfo();
      }}
    >
      <Icon name="info" size={15} />
    </button>
  );
}
