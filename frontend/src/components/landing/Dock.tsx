import type { SessionUser } from "@/types/auth";
import Icon from "@/components/ui/Icon";

/* Зөвхөн зочны/маркетингийн навигаци. ROOT · Админ · Куратор самбарын товчнууд
   энд БАЙХГҮЙ — тэдгээр нь Тоглуулагчийн хажуугийн цэс рүү (layout/Sidebar.tsx
   «Удирдлага» хэсэг) шилжсэн. Landing нь бүх зочинд харагддаг нүүр тул ажилтны
   самбаруудыг тэндээс нуух нь UI-г цэвэр байлгахаас гадна аль хэрэглэгч ямар
   эрхтэйг гаднаас шууд харуулахгүй. */
export default function Dock({
  user,
  onLogin,
  onLogout,
  onPlayer,
}: {
  user: SessionUser | null;
  onLogin: () => void;
  onLogout: () => void;
  onPlayer: () => void;
}) {
  const navLinkCls =
    "keep text-sm font-medium text-[#D8E0DE] py-2.5 px-[15px] rounded-full transition-[color,background,box-shadow] duration-250 whitespace-nowrap hover:text-aqua hover:bg-[rgba(56,232,206,.08)] focus-visible:shadow-glow-aqua";

  return (
    <nav
      className="dock fixed top-0 left-0 right-0 z-[60] flex items-center justify-between gap-5 max-nav:gap-1.5 p-[12px_28px] max-nav:p-[10px_12px] bg-[rgba(9,13,13,.88)] border-b border-white/[.18] backdrop-blur-3xl [backdrop-filter:blur(22px)] max-nav:overflow-x-auto"
      id="dock"
    >
      <div className="flex items-center gap-3.5 max-nav:gap-1.5 flex-none">
        <button className="disc" id="disc" aria-label="Дуу эхлүүлэх"></button>
        <a
          href="#top"
          className="keep font-display font-extrabold text-title max-nav:text-copy tracking-[-.04em] text-ink whitespace-nowrap hover:text-aqua [&>sup]:font-body [&>sup]:text-micro [&>sup]:font-medium [&>sup]:ml-0.5"
        >
          МЭДРЭХ<sup>®</sup>
        </a>
      </div>

      <div className="flex items-center gap-1.5 flex-none">
        {/* нэвтэрсэн хэрэглэгч Player-ээ хаасан бол буцаж нээх зам */}
        {user && (
          <button className={navLinkCls + " max-nav:px-2.5 text-aqua inline-flex items-center gap-2"} onClick={onPlayer} aria-label="Тоглуулагч">
            <Icon name="music" size={14} />
            <span className="max-nav:hidden">Тоглуулагч</span>
          </button>
        )}
        {user ? (
          <button
            className="keep text-body text-aqua py-2.5 px-[15px] max-nav:px-2.5 rounded-full transition-[color,background,box-shadow] duration-250 hover:text-on-aqua hover:bg-aqua focus-visible:shadow-glow-aqua whitespace-nowrap flex-none inline-flex items-center gap-2"
            onClick={onLogout}
            title={user.email + " · Гарах"}
            aria-label="Гарах"
          >
            <span className="max-nav:hidden">{user.name} · Гарах</span>
            <span className="hidden max-nav:inline" aria-hidden="true">
              <Icon name="logout" size={14} />
            </span>
          </button>
        ) : (
          <button
            className="keep text-body text-aqua py-2.5 px-[15px] max-nav:px-2.5 rounded-full transition-[color,background,box-shadow] duration-250 hover:text-on-aqua hover:bg-aqua focus-visible:shadow-glow-aqua whitespace-nowrap"
            onClick={onLogin}
          >
            Нэвтрэх
          </button>
        )}
      </div>
    </nav>
  );
}
