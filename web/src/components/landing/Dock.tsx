import type { SessionUser } from "@/types/auth";

export default function Dock({
  user,
  isAdmin,
  onLogin,
  onLogout,
  onAdmin,
  onPlayer,
}: {
  user: SessionUser | null;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onAdmin: () => void;
  onPlayer: () => void;
}) {
  const navLinkCls =
    "keep text-sm font-medium text-[#D8E0DE] py-2.5 px-[15px] rounded-full transition-[color,background,box-shadow] duration-250 whitespace-nowrap hover:text-aqua hover:bg-[rgba(56,232,206,.08)] focus-visible:shadow-glow-aqua";

  return (
    <nav
      className="dock fixed top-0 left-0 right-0 z-[60] flex items-center justify-between gap-5 p-[12px_28px] bg-[rgba(9,13,13,.88)] border-b border-white/[.18] backdrop-blur-3xl [backdrop-filter:blur(22px)]"
      id="dock"
    >
      <div className="flex items-center gap-3.5">
        <button className="disc" id="disc" aria-label="Дуу эхлүүлэх"></button>
        <a
          href="#top"
          className="keep font-display font-extrabold text-[17px] tracking-[-.04em] text-ink whitespace-nowrap hover:text-aqua [&>sup]:font-body [&>sup]:text-[9px] [&>sup]:font-medium [&>sup]:ml-0.5"
        >
          МЭДРЭХ<sup>®</sup>
        </a>
      </div>

      <div className="flex items-center gap-2">
        {/* нэвтэрсэн хэрэглэгч Player-ээ хаасан бол буцаж нээх зам */}
        {user && (
          <button className={navLinkCls + " text-aqua"} onClick={onPlayer}>
            ♫ Тоглуулагч
          </button>
        )}
        {isAdmin && (
          <button
            className="keep text-[13.5px] py-2.5 px-[15px] rounded-full transition-[color,background,box-shadow] duration-250 focus-visible:shadow-glow-aqua text-warm border border-[rgba(217,165,76,.4)] hover:bg-warm hover:text-[#140D02]"
            onClick={onAdmin}
          >
            Админ
          </button>
        )}
        {user ? (
          <button
            className="keep text-[13.5px] text-aqua py-2.5 px-[15px] rounded-full transition-[color,background,box-shadow] duration-250 hover:text-[#04100E] hover:bg-aqua focus-visible:shadow-glow-aqua"
            onClick={onLogout}
            title={user.email + " · Гарах"}
          >
            {user.name} · Гарах
          </button>
        ) : (
          <button
            className="keep text-[13.5px] text-aqua py-2.5 px-[15px] rounded-full transition-[color,background,box-shadow] duration-250 hover:text-[#04100E] hover:bg-aqua focus-visible:shadow-glow-aqua"
            onClick={onLogin}
          >
            Нэвтрэх
          </button>
        )}
      </div>
    </nav>
  );
}
