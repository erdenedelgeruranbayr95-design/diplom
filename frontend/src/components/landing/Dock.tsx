import type { SessionUser } from "@/types/auth";
import Icon from "@/components/ui/Icon";

export default function Dock({
  user,
  isRoot,
  isAdmin,
  isCurator,
  onLogin,
  onLogout,
  onRoot,
  onAdmin,
  onCurator,
  onPlayer,
}: {
  user: SessionUser | null;
  /** Систем эзэмшигч — Root Panel-ийн товч зөвхөн түүнд харагдана. */
  isRoot: boolean;
  isAdmin: boolean;
  /** Куратор/модератор — Curator Panel-ийн товч зөвхөн түүнд харагдана (ADMIN/ROOT ч мөн). */
  isCurator: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onRoot: () => void;
  onAdmin: () => void;
  onCurator: () => void;
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
        {/* ROOT — систем эзэмшигчийн самбар (ADMIN-аас дээр зэрэглэлтэй) */}
        {isRoot && (
          <button
            className="keep text-body py-2.5 px-[15px] max-nav:px-2.5 rounded-full transition-[color,background,box-shadow] duration-250 focus-visible:shadow-glow-aqua text-rose border border-rose/40 hover:bg-rose hover:text-[#1A0A0F] inline-flex items-center gap-2"
            onClick={onRoot}
            aria-label="ROOT"
          >
            <Icon name="shield" size={14} />
            <span className="max-nav:hidden">ROOT</span>
          </button>
        )}
        {isAdmin && (
          <button
            className="keep text-body py-2.5 px-[15px] max-nav:px-2.5 rounded-full transition-[color,background,box-shadow] duration-250 focus-visible:shadow-glow-aqua text-warm border border-[rgba(217,165,76,.4)] hover:bg-warm hover:text-[#140D02] inline-flex items-center gap-2"
            onClick={onAdmin}
            aria-label="Админ"
          >
            <Icon name="grid" size={14} />
            <span className="max-nav:hidden">Админ</span>
          </button>
        )}
        {/* CURATOR/MODERATOR — контент лиценз/нийтлэл удирдах самбар (ADMIN/ROOT-д ч харагдана) */}
        {isCurator && (
          <button
            className="keep text-body py-2.5 px-[15px] max-nav:px-2 rounded-full transition-[color,background,box-shadow] duration-250 focus-visible:shadow-glow-aqua text-purple border border-purple/40 hover:bg-purple hover:text-[#0E0A1C] inline-flex items-center gap-2"
            onClick={onCurator}
            aria-label="Куратор"
          >
            <Icon name="disc" size={14} />
            <span className="max-nav:hidden">Куратор</span>
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
