"use client";

/* TopBar.tsx-ийн профайл dropdown (.sp-dd.sp-profile) — тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { PREVIEW_SEC } from "@/lib/player/constants";
import type { SessionUser } from "@/types/auth";
import type { ViewName } from "@/components/player/Player";

export default function ProfileDropdown({
  open,
  user,
  isAdmin,
  isTherapist,
  isParent,
  subscribed,
  renewDate,
  setView,
  onLogout,
  onToggle,
}: {
  open: boolean;
  user: SessionUser | null;
  isAdmin: boolean;
  isTherapist: boolean;
  isParent: boolean;
  subscribed: boolean;
  renewDate: string;
  setView: (v: ViewName) => void;
  onLogout: () => void;
  onToggle: () => void;
}) {
  const initial = (user?.name || "?").trim().charAt(0).toUpperCase();

  function go(v: ViewName) {
    onToggle();
    setView(v);
  }

  return (
    <div className="sp-dd-wrap">
      <button
        className={
          "w-[42px] h-[42px] flex-none rounded-full flex items-center justify-center font-display font-bold text-[15px] transition-[box-shadow,transform] duration-250 " +
          (isAdmin
            ? "bg-[linear-gradient(135deg,var(--warm),#A8742B)] text-[#140D02] " +
              (open ? "shadow-[0_0_0_3px_rgba(217,165,76,.35)]" : "hover:shadow-[0_0_0_3px_rgba(217,165,76,.35)]")
            : "bg-[linear-gradient(135deg,var(--aqua),#1FA893)] text-[#04100E] " +
              (open ? "shadow-[0_0_0_3px_rgba(56,232,206,.4)]" : "hover:shadow-[0_0_0_3px_rgba(56,232,206,.25)]"))
        }
        onClick={onToggle}
        aria-label="Профайл цэс"
        aria-expanded={open}
        title={user?.name}
      >
        {initial}
      </button>
      {open && (
        <div className="sp-dd" role="dialog" aria-label="Профайл">
          <div className="flex items-center gap-[13px]">
            <span
              className="w-[50px] h-[50px] flex-none rounded-full flex items-center justify-center font-display font-bold text-lg bg-[linear-gradient(135deg,var(--aqua),#1FA893)] text-[#04100E]"
              aria-hidden="true"
            >
              {initial}
            </span>
            <div>
              <b className="block text-[15px] font-semibold">{user?.name}</b>
              <i className="not-italic text-xs text-dim break-all">{user?.email}</i>
            </div>
          </div>
          <div
            className={
              "border border-line rounded-[10px] p-[11px_13px] flex flex-col gap-0.5 " +
              (subscribed ? "border-[rgba(56,232,206,.35)] bg-[rgba(56,232,206,.05)]" : "")
            }
          >
            {isAdmin ? (
              <>
                <b className="text-[13.5px] font-semibold text-ink">Админ эрх</b>
                <span className="text-xs text-dim">Бүх боломж нээлттэй</span>
              </>
            ) : subscribed ? (
              <>
                <b className="text-[13.5px] font-semibold text-aqua">PRO идэвхтэй</b>
                <span className="text-xs text-dim">Дараагийн төлбөр: {renewDate}</span>
              </>
            ) : (
              <>
                <b className="text-[13.5px] font-semibold text-ink">Үнэгүй горим</b>
                <span className="text-xs text-dim">Дуу тус бүрээс {PREVIEW_SEC} сек</span>
              </>
            )}
          </div>
          <button className="sp-prof-btn" onClick={() => go("profile")}>
            👤 Профайл засах
          </button>
          <button className="sp-prof-btn" onClick={() => go("playlists")}>
            🎧 Миний жагсаалт
          </button>
          {subscribed && !isAdmin && (
            <button className="sp-prof-btn" onClick={() => go("upload")}>
              ⬆️ Дуу нэмэх
            </button>
          )}
          <button className="sp-prof-btn" onClick={() => go("devices")}>
            📱 Төхөөрөмж холбох
          </button>
          <button className="sp-prof-btn" onClick={() => go("stats")}>
            📊 Миний статистик
          </button>
          <button className="sp-prof-btn" onClick={() => go("history")}>
            🕐 Сонссон түүх
          </button>
          <button className="sp-prof-btn" onClick={() => go("progress")}>
            📈 Миний ахиц
          </button>
          <button className="sp-prof-btn" onClick={() => go("achievements")}>
            🏆 Амжилтууд
          </button>
          <button className="sp-prof-btn" onClick={() => go("billing")}>
            💳 Захиалга удирдах
          </button>
          <button className="sp-prof-btn" onClick={() => go("help")}>
            ❓ Тусламж
          </button>
          {isAdmin && (
            <button className="sp-prof-btn" onClick={() => go("admin")}>
              🛠 Хяналтын самбар
            </button>
          )}
          {isTherapist && (
            <button className="sp-prof-btn" onClick={() => go("therapist")}>
              🧑‍⚕️ Эмчийн самбар
            </button>
          )}
          {isParent && (
            <button className="sp-prof-btn" onClick={() => go("parent")}>
              👨‍👩‍👧 Эцэг эхийн самбар
            </button>
          )}
          <button className="sp-prof-btn danger" onClick={onLogout}>
            Гарах
          </button>
        </div>
      )}
    </div>
  );
}
