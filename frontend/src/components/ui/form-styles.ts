/* Формын талбарын нийтлэг Tailwind классууд.

   Урьд нь `labelCls` / `captionCls` / `inputCls` гэсэн ижил 3 тогтмол AuthModal.tsx,
   UploadSongView.tsx, StaffCreationForm.tsx, SongLibraryPanel.tsx-д тус тусдаа
   бичигдсэн байв — нэгийг нь өөрчлөхөд бусад нь хоцрох эрсдэлтэй. Утга нь огт
   өөрчлөгдөөгүй, зөвхөн нэг эх сурвалж болов. */

/** `<label>` — гарчиг ба оролтыг босоо байрлуулна. */
export const FIELD_LABEL_CLS = "flex flex-col gap-1.5";

/** Талбарын жижиг гарчиг. */
export const FIELD_CAPTION_CLS = "mono !text-micro";

/** Энгийн текст оролт. */
export const FIELD_INPUT_CLS =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-copy p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint";

/** Валидацийн алдаа харуулдаг оролт (`aria-invalid` дээр улаан хүрээ + сэгсрэлт). */
export const VALIDATED_INPUT_CLS =
  FIELD_INPUT_CLS +
  " aria-[invalid=true]:border-danger aria-[invalid=true]:bg-[rgba(232,138,155,.06)] aria-[invalid=true]:[animation:auth-shake_.3s] aria-[invalid=true]:focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]";
