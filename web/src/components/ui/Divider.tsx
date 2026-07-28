/* Нэгдсэн зурвас/хуваагч шугам — "h-px bg-white/[.06/07]" маягийн давхардсан markup-ийг
   нэгтгэв. Босоо/хэвтээ хоёр чиглэл дэмжинэ. */
export default function Divider({ vertical = false, className = "" }: { vertical?: boolean; className?: string }) {
  return (
    <div
      className={(vertical ? "w-px self-stretch" : "h-px w-full") + " bg-white/[.07] " + className}
      aria-hidden="true"
    ></div>
  );
}
