"use client";

/* Player.tsx-ийн доод баарын баруун талын үйлдлүүд (.sp-bar-r: чичиргээ горим, мэдрэх горим) —
   премиум toolbar маягаар шинэчлэв. onToggleVibro/onImmersive callback хэвээр, зөвхөн
   визуал давхарга шинэчлэгдсэн. */
import Icon from "@/components/ui/Icon";
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
          "flex items-center gap-1.5 text-note font-medium rounded-full border py-2.5 px-4 whitespace-nowrap transition-[border-color,color,background] duration-300 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
          (vibro ? "border-aqua/45 text-aqua bg-aqua/[.06]" : "border-line text-dim hover:text-ink hover:bg-white/[.04]")
        }
        onClick={onToggleVibro}
        aria-pressed={vibro}
        title={canVibrate ? "Чичиргээ горим" : "Утсан дээр чичиргээ ажиллана — энд гэрлийн пульс"}
      >
        <Icon name="vibrate" size={15} />
        {vibro ? "Асаалттай" : "Унтраалттай"}
      </button>
      <button
        className="w-10 h-10 max-viz:w-[38px] max-viz:h-[38px] flex-none rounded-full flex items-center justify-center text-dim bg-white/[.05] transition-[color,background,box-shadow] duration-250 cursor-none hover:text-ink hover:bg-white/10 focus-visible:outline-none focus-visible:shadow-glow-aqua disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
        onClick={onImmersive}
        disabled={!hasTrack}
        aria-label="Мэдрэх горим — бүтэн дэлгэц"
        title={hasTrack ? "Мэдрэх горим" : "Эхлээд дуу сонгоорой"}
      >
        <Icon name="expand" size={18} />
      </button>
    </div>
  );
}
