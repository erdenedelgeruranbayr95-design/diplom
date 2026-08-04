import SongPageClient from "./SongPageClient";

/* Capacitor Android build (`output: "export"`, см. next.config.ts) статик экспорт
   бүх dynamic route-д `generateStaticParams()` шаардана (зөвхөн server component-д
   зөвшөөрөгддөг тул логикийг "use client" SongPageClient-руу зөөсөн). Song ID
   урьдчилан мэдэгдэхгүй (backend-ээс runtime-д ирдэг) тул хоосон массив буцааж,
   SongPageClient-ийн `useParams()` + client-side fetch урсгалыг хэвээр үлдээнэ —
   Docker/production (standalone) горимд ч энэ өөрчлөлт нөлөөгүй. */
export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function SongPage() {
  return <SongPageClient />;
}
