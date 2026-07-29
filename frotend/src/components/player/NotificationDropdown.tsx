"use client";

/* TopBar-ийн мэдэгдлийн dropdown — премиум dropdown каркас (DropdownPanel) руу шинэчлэв.
   State/props/toggle логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { relTime } from "@/lib/player/format";
import type { FeedItem } from "@/types/track";
import DropdownPanel from "@/components/ui/DropdownPanel";

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
    <div className="relative">
      <button
        className={
          "relative w-[42px] h-[42px] max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center transition-[color,background,box-shadow] duration-250 cursor-none focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (open ? "text-aqua bg-aqua/[.12]" : "text-dim bg-white/[.05] hover:text-ink hover:bg-white/[.1]")
        }
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
        <DropdownPanel label="Мэдэгдлүүд" width={340}>
          <span className="mono !text-[10px] px-2 pt-1 pb-2">Мэдэгдэл</span>
          {feed.length === 0 && <p className="text-faint text-[12.5px] leading-[1.5] px-2 py-3">Мэдэгдэл алга</p>}
          {feed.map((f) => (
            <div
              className={
                "flex gap-3 items-start p-2.5 rounded-xl border border-transparent transition-colors duration-150 " +
                (f.date > readTs ? "bg-aqua/[.06] border-aqua/20" : "hover:bg-white/[.03]")
              }
              key={f.id}
            >
              <span className="w-9 h-9 flex-none rounded-full bg-[#141C1B] flex items-center justify-center text-base" aria-hidden="true">
                {f.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] leading-[1.45] text-ink">{f.text}</p>
                <span className="mono !text-[9px]">{relTime(f.date)}</span>
              </div>
            </div>
          ))}
        </DropdownPanel>
      )}
    </div>
  );
}
