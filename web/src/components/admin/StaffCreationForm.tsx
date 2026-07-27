"use client";

/* AdminPanel.tsx-ийн ажилтан (эмч/админ) бүртгэх форм — тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. Validation логик AdminPanel.tsx-д
   (submit handler) хэвээр үлдэнэ — энд зөвхөн UI. */
export default function StaffCreationForm({
  newRole,
  setNewRole,
  createMsg,
  creating,
  onSubmit,
}: {
  newRole: "THERAPIST" | "ADMIN";
  setNewRole: (r: "THERAPIST" | "ADMIN") => void;
  createMsg: string;
  creating: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="adm-form" onSubmit={onSubmit}>
      <span className="mono" style={{ fontSize: 9.5 }}>
        Ажилтан бүртгэх (Админ/Эмч)
      </span>
      <div className="adm-form-row">
        <label>
          <span className="mono">Нэр *</span>
          <input name="name" type="text" placeholder="ж: Б.Оюунаа" />
        </label>
        <label>
          <span className="mono">Имэйл *</span>
          <input name="email" type="email" placeholder="name@example.com" />
        </label>
      </div>
      <div className="adm-form-row">
        <label>
          <span className="mono">Нууц үг *</span>
          <input name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
        </label>
        <label>
          <span className="mono">Эрх</span>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value as "THERAPIST" | "ADMIN")}>
            <option value="THERAPIST">Эмч</option>
            <option value="ADMIN">Админ</option>
          </select>
        </label>
      </div>
      {createMsg && (
        <p className={createMsg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
          {createMsg}
        </p>
      )}
      <button type="submit" className="bt bt-a auth-sub" disabled={creating}>
        {creating ? "Бүртгэж байна…" : "+ Ажилтан бүртгэх"}
      </button>
    </form>
  );
}
