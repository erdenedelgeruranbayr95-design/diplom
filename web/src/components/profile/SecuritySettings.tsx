"use client";

/* ProfileView.tsx-ийн "Нууц үг солих" форм — тусад нь гаргасан. Validation логик
   ProfileView.tsx-ийн changePass()-д хэвээр үлдэнэ — энд зөвхөн UI. CSS/behavior бүгд
   өөрчлөгдөөгүй. */
export default function SecuritySettings({
  oldPass,
  setOldPass,
  newPass,
  setNewPass,
  newPass2,
  setNewPass2,
  onSubmit,
}: {
  oldPass: string;
  setOldPass: (v: string) => void;
  newPass: string;
  setNewPass: (v: string) => void;
  newPass2: string;
  setNewPass2: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      className="bg-white/[.03] border border-line rounded-lg p-5 mb-[18px] transition-[border-color,box-shadow] duration-250 hover:border-white/[.16] hover:shadow-sm"
      onSubmit={onSubmit}
    >
      <h3 className="st-h" style={{ marginTop: 0 }}>
        Нууц үг солих
      </h3>
      <label className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Одоогийн нууц үг</span>
        <input
          className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>
      <label className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Шинэ нууц үг</span>
        <input
          className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>
      <label className="block mb-3.5">
        <span className="mono !block !mb-1.5 !text-dim">Шинэ нууц үг давтах</span>
        <input
          className="w-full p-[12px_14px] rounded-sm bg-white/[.04] border border-line text-ink text-[14.5px] font-[inherit] transition-[border-color,box-shadow] duration-300 focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          type="password"
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>
      <button type="submit" className="bt">
        Нууц үг солих
      </button>
    </form>
  );
}
