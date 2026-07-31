/** Цагаас хамаарсан мэндчилгээ — Нүүр хуудасны толгойд. */
export function greetingForHour(hour: number = new Date().getHours()): string {
  if (hour < 6) return "Сайхан шөнө";
  if (hour < 12) return "Өглөөний мэнд";
  if (hour < 18) return "Өдрийн мэнд";
  return "Оройн мэнд";
}

/** Бүтэн нэрнээс эхний нэрийг салгана ("Бат Доржийн" → "Бат"). */
export function firstNameOf(fullName?: string): string {
  return (fullName || "").trim().split(/\s+/)[0] || "";
}
