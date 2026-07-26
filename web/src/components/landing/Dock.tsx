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
  return (
    <nav className="dock" id="dock">
      <div className="nav-left">
        <button className="disc" id="disc" aria-label="Дуу эхлүүлэх"></button>
        <a href="#top" className="nav-logo keep">
          МЭДРЭХ<sup>®</sup>
        </a>
      </div>

      {/* landing-ийн цэс — зөвхөн зочдод (нэвтрээгүй үед) */}
      {!user && (
        <div className="nav-links">
          <a href="#top" className="keep">
            Нүүр
          </a>
          <a href="#feel">Мэдрэх</a>
          <a href="#gal">Галерей</a>
          <a href="#how">Хэрхэн</a>
        </div>
      )}

      <div className="nav-right">
        {/* нэвтэрсэн хэрэглэгч Player-ээ хаасан бол буцаж нээх зам */}
        {user && (
          <button className="nav-play keep" onClick={onPlayer}>
            ♫ Тоглуулагч
          </button>
        )}
        {isAdmin && (
          <button className="dock-auth adm-btn keep" onClick={onAdmin}>
            Админ
          </button>
        )}
        {user ? (
          <button className="dock-auth keep" onClick={onLogout} title={user.email + " · Гарах"}>
            {user.name} · Гарах
          </button>
        ) : (
          <button className="dock-auth keep" onClick={onLogin}>
            Нэвтрэх
          </button>
        )}
      </div>
    </nav>
  );
}
