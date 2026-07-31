"use client";

/* TopBar-ийн профайл dropdown — премиум dropdown каркас (DropdownPanel) руу шинэчлэв.
   go(v)/onLogout/toggle логик бүхэлдээ хэвээр, ямар ч цэсний зорилтот заалт (setView) хасагдаагүй,
   нэмэгдээгүй — зөвхөн визуал давхарга шинэчлэгдсэн (icon-той мөрүүд, groups, илүү зай). */
import { PREVIEW_SEC } from "@/lib/player/constants";
import type { SessionUser } from "@/types/auth";
import type { ViewName } from "@/types/player";
import DropdownPanel from "@/components/ui/DropdownPanel";
import UserAvatar from "@/components/ui/UserAvatar";
import Icon from "@/components/ui/Icon";

/* `icon` prop-ийн төрөл (string) хэвээр — зөвхөн дамжуулах утга emoji-оос нэгдсэн
   icon-ийн нэр болов (жишээ нь "👤" → "user"). Ингэснээр цэсний мөрүүд бүгд ижил
   зузаан/хэмжээтэй, OS/фонтоос хамааралгүй, өнгө нь мөрийн текстийг дагана. */
function MenuItem({ icon, label, onClick, danger }: { icon: string; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      className={
        "group flex items-center gap-3 w-full text-left py-2.5 px-2.5 rounded-lg text-body font-medium transition-colors duration-150 " +
        (danger ? "text-danger hover:bg-[rgba(232,138,155,.09)]" : "text-ink hover:bg-white/[.06]")
      }
      onClick={onClick}
    >
      <span
        className={"flex-none flex items-center justify-center transition-colors duration-150 " + (danger ? "" : "text-dim group-hover:text-aqua")}
        aria-hidden="true"
      >
        <Icon name={icon} size={16} />
      </span>
      {label}
    </button>
  );
}

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
    <div className="relative">
      <button
        className={
          "w-[42px] h-[42px] flex-none rounded-full flex items-center justify-center font-display font-bold text-lead transition-[box-shadow,transform] duration-250 " +
          (isAdmin
            ? "bg-[linear-gradient(135deg,var(--warm),#A8742B)] text-[#140D02] " +
              (open ? "shadow-[0_0_0_3px_rgba(217,165,76,.35)]" : "hover:shadow-[0_0_0_3px_rgba(217,165,76,.35)]")
            : "bg-[linear-gradient(135deg,var(--aqua),#1FA893)] text-on-aqua " +
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
        <DropdownPanel label="Профайл" width={300} onClose={onToggle}>
          <div className="flex items-center gap-3 px-1.5 py-1.5">
            <UserAvatar name={user?.name || "?"} size="md" tone={isAdmin ? "warm" : "aqua"} />
            <div className="min-w-0">
              <b className="block text-lead font-semibold truncate">{user?.name}</b>
              <i className="not-italic text-xs text-dim break-all">{user?.email}</i>
            </div>
          </div>

          <div
            className={
              "border border-line rounded-xl p-3 flex flex-col gap-0.5 mx-1 mb-1 " +
              (subscribed ? "border-aqua/35 bg-aqua/[.05]" : "")
            }
          >
            {isAdmin ? (
              <>
                <b className="text-body font-semibold text-ink">Админ эрх</b>
                <span className="text-xs text-dim">Бүх боломж нээлттэй</span>
              </>
            ) : subscribed ? (
              <>
                <b className="text-body font-semibold text-aqua">PRO идэвхтэй</b>
                <span className="text-xs text-dim">Дараагийн төлбөр: {renewDate}</span>
              </>
            ) : (
              <>
                <b className="text-body font-semibold text-ink">Үнэгүй горим</b>
                <span className="text-xs text-dim">Дуу тус бүрээс {PREVIEW_SEC} сек</span>
              </>
            )}
          </div>

          <div className="h-px bg-white/[.06] my-1 mx-1" aria-hidden="true"></div>

          <MenuItem icon="user" label="Профайл засах" onClick={() => go("profile")} />
          <MenuItem icon="playlist" label="Миний жагсаалт" onClick={() => go("playlists")} />
          {subscribed && !isAdmin && <MenuItem icon="upload" label="Дуу нэмэх" onClick={() => go("upload")} />}
          <MenuItem icon="device" label="Төхөөрөмж холбох" onClick={() => go("devices")} />
          <MenuItem icon="chart" label="Миний статистик" onClick={() => go("stats")} />
          <MenuItem icon="clock" label="Сонссон түүх" onClick={() => go("history")} />
          <MenuItem icon="trend" label="Миний ахиц" onClick={() => go("progress")} />
          <MenuItem icon="trophy" label="Амжилтууд" onClick={() => go("achievements")} />
          <MenuItem icon="card" label="Захиалга удирдах" onClick={() => go("billing")} />
          <MenuItem icon="help" label="Тусламж" onClick={() => go("help")} />

          {(isAdmin || isTherapist || isParent) && <div className="h-px bg-white/[.06] my-1 mx-1" aria-hidden="true"></div>}
          {isAdmin && <MenuItem icon="grid" label="Хяналтын самбар" onClick={() => go("admin")} />}
          {isTherapist && <MenuItem icon="stethoscope" label="Эмчийн самбар" onClick={() => go("therapist")} />}
          {isParent && <MenuItem icon="family" label="Эцэг эхийн самбар" onClick={() => go("parent")} />}

          <div className="h-px bg-white/[.06] my-1 mx-1" aria-hidden="true"></div>
          <MenuItem icon="logout" label="Гарах" onClick={onLogout} danger />
        </DropdownPanel>
      )}
    </div>
  );
}
