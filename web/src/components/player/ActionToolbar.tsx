"use client";

/* Player.tsx-ийн доод баарын баруун талын үйлдлүүд (.sp-bar-r: чичиргээ горим, мэдрэх горим) —
   премиум toolbar маягаар шинэчлэв. onToggleVibro/onImmersive callback хэвээр, зөвхөн
   визуал давхарга шинэчлэгдсэн. */
export default function ActionToolbar({
  vibro,
  onToggleVibro,
  canVibrate,
  hasTrack,
  onImmersive,
}: {
  vibro: boolean;
  onToggleVibro: () => void;
  canVibrate: boolean;
  hasTrack: boolean;
  onImmersive: () => void;
}) {
  return (
    <div className="flex justify-end items-center gap-2.5 max-nav:hidden">
      <button
        className={
          "flex items-center gap-1.5 text-[12.5px] font-medium rounded-full border py-2.5 px-4 whitespace-nowrap transition-[border-color,color,background] duration-300 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (vibro ? "border-aqua/45 text-aqua bg-aqua/[.06]" : "border-line text-dim hover:text-ink hover:bg-white/[.04]")
        }
        onClick={onToggleVibro}
        aria-pressed={vibro}
        title={canVibrate ? "Чичиргээ горим" : "Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс"}
      >
        <span aria-hidden="true">📳</span> {vibro ? "Асаалттай" : "Унтраалттай"}
      </button>
      <button
        className="w-10 h-10 max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center text-dim bg-white/[.05] transition-[color,background,box-shadow] duration-250 cursor-none hover:text-ink hover:bg-white/10 focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
        onClick={onImmersive}
        disabled={!hasTrack}
        aria-label="Мэдрэх горим — бүтэн дэлгэц"
        title={hasTrack ? "Мэдрэх горим" : "Эхлээд дуу сонгоорой"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
        </svg>
      </button>
    </div>
  );
}
