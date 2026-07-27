"use client";

/* AdminPanel.tsx-ийн толгой хэсэг (гарчиг + таб сэлгэгч) — тусад нь гаргасан.
   CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
export type AdminTab = "users" | "tracks" | "assign";

export default function AdminHeader({ tab, setTab, onClose }: { tab: AdminTab; setTab: (t: AdminTab) => void; onClose: () => void }) {
  return (
    <>
      <button className="auth-x" onClick={onClose} aria-label="Хаах">
        ✕
      </button>

      <span className="mono">МЭДРЭХ® / Админ самбар</span>

      <div className="auth-tabs" style={{ marginBottom: 0 }}>
        <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>
          Хэрэглэгчид
        </button>
        <button className={tab === "assign" ? "on" : ""} onClick={() => setTab("assign")}>
          Эмч томилолт
        </button>
        <button className={tab === "tracks" ? "on" : ""} onClick={() => setTab("tracks")}>
          Дууны сан
        </button>
      </div>
    </>
  );
}
