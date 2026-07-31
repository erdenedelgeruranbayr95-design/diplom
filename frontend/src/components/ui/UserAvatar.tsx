/* Нэгдсэн градиент avatar — Admin/Therapist/Parent/Profile-д тус тусдаа давхардаж бичигдсэн
   "эхний үсэг + градиент дугуй" markup-ийг нэгтгэв. Хоёр өнгөний хувилбар (aqua/warm) бодит
   кодод ашиглагдаж байсныг л дэмжинэ — зохиомол variant нэмээгүй. size prop нь бодитоор
   ашиглагдаж байсан 3 хэмжээг (32/48/64px) дэмждэг. */
export type AvatarSize = "sm" | "md" | "lg";
export type AvatarTone = "aqua" | "warm";

const SIZE_CLS: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-body",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl",
};

const TONE_GRADIENT: Record<AvatarTone, { bg: string; text: string }> = {
  aqua: { bg: "linear-gradient(135deg,var(--aqua),#1FA893)", text: "#04100E" },
  warm: { bg: "linear-gradient(135deg,var(--warm),#A8742B)", text: "#140D02" },
};

export default function UserAvatar({
  name,
  size = "md",
  tone = "aqua",
  className = "",
}: {
  name: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  className?: string;
}) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const { bg, text } = TONE_GRADIENT[tone];
  return (
    /* Дотоод hairline ring: цайвар gradient бараан дэвсгэр дээр "хэрчигдэж" харагдахгүй,
       үсэг дээр нимгэн highlight — жижиг хэмжээнд ч тод хэвээр. */
    <span
      className={
        "flex-none rounded-full flex items-center justify-center font-display font-bold leading-none select-none shadow-[inset_0_0_0_1px_rgba(255,255,255,.18),inset_0_1px_0_rgba(255,255,255,.3)] " +
        SIZE_CLS[size] +
        " " +
        className
      }
      style={{ background: bg, color: text }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
