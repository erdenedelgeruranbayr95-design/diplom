import MobilePageClient from "./MobilePageClient";

/* Capacitor Android build (`output: "export"`, см. next.config.ts) статик экспорт
   бүх dynamic route-д `generateStaticParams()` шаардана (зөвхөн server component-д
   зөвшөөрөгддөг тул логикийг "use client" MobilePageClient-руу зөөсөн). QR pairing
   token урьдчилан мэдэгдэхгүй (runtime-д QR кодоор ирдэг) тул хоосон массив буцааж,
   MobilePageClient-ийн `useParams()` урсгалыг хэвээр үлдээнэ — Docker/production
   (standalone) горимд ч энэ өөрчлөлт нөлөөгүй. */
export async function generateStaticParams() {
  return [{ token: "placeholder" }];
}

export default function MobilePage() {
  return <MobilePageClient />;
}
