"use client";

/* TopBar.tsx-ийн мэдэгдлийн dropdown (.sp-dd.sp-notifs) — тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { relTime } from "@/lib/player/format";
import type { FeedItem } from "@/types/track";

export default function NotificationDropdown({
  open,
  unread,
  feed,
  readTs,
  onToggle,
}: {
  open: boolean;
  unread: number;
  feed: FeedItem[];
  readTs: number;
  onToggle: () => void;
}) {
  return (
    <div className="sp-dd-wrap">
      <button
        className={"sp-icbtn relative" + (open ? " on" : "")}
        onClick={onToggle}
        aria-label={"Мэдэгдэл" + (unread ? " — " + unread + " шинэ" : "")}
        aria-expanded={open}
        title="Мэдэгдэл"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-[9px] bg-aqua text-[#04100E] text-[10.5px] font-bold flex items-center justify-center px-1 border-2 border-[#0A100F]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="sp-dd w-[330px] max-h-[380px] overflow-y-auto" role="dialog" aria-label="Мэдэгдлүүд">
          <span className="mono">Мэдэгдэл</span>
          {feed.length === 0 && <p className="sp-side-empty">Мэдэгдэл алга</p>}
          {feed.map((f) => (
            <div
              className={
                "flex gap-3 items-start p-[11px_12px] rounded-[10px] border border-transparent " +
                (f.date > readTs ? "bg-[rgba(56,232,206,.06)] border-[rgba(56,232,206,.2)]" : "")
              }
              key={f.id}
            >
              <span className="w-9 h-9 flex-none rounded-full bg-[#141C1B] flex items-center justify-center text-base" aria-hidden="true">
                {f.icon}
              </span>
              <div>
                <p className="text-[13px] leading-[1.45] text-ink">{f.text}</p>
                <span className="mono !text-[9px]">{relTime(f.date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
