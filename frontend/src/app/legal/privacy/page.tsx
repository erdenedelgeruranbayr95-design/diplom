import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { Panel } from "@/components/ui/Surface";

export const metadata = { title: "Нууцлалын бодлого — МЭДРЭХ" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Panel as="section" className="mb-4">
      <h2 className="font-display font-semibold text-heading tracking-[-.03em] text-ink mb-3">{title}</h2>
      <div className="text-copy leading-[1.7] text-dim space-y-3">{children}</div>
    </Panel>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[100svh] bg-bg text-ink px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/[.1] bg-white/[.04] px-4 py-2 text-body font-semibold text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua">
            <Icon name="arrowLeft" size={15} />
            Буцах
          </Link>
          <span className="mono">MEDREH</span>
        </div>

        <h1 className="text-[clamp(26px,4.2vw,40px)] font-extrabold tracking-[-.05em] leading-[1.05] mb-2">Нууцлалын бодлого</h1>
        <p className="text-dim text-body mb-8">Сүүлд шинэчилсэн: 2026 оны 8 сарын 2</p>

        <Section title="1. Ерөнхий">
          <p>
            МЭДРЭХ нь дуу авиаг чичиргээ/гэрлийн дохио болгон хувиргаж, сонсголын бэрхшээлтэй хэрэглэгчдэд хүргэх
            хөгжим-эмчилгээний платформ юм. Энэхүү бодлого нь бид ямар хувийн мэдээлэл цуглуулж, хэрхэн ашиглаж,
            хэн рүү дамжуулж, хэрхэн хамгаалдгийг тайлбарлана.
          </p>
        </Section>

        <Section title="2. Бид цуглуулдаг мэдээлэл">
          <p><b className="text-ink">Бүртгэлийн мэдээлэл:</b> нэр, имэйл хаяг, нууц үг (bcrypt-ээр hash хийгдэж, тодоор хадгалагдахгүй).</p>
          <p>
            <b className="text-ink">Сонсголын профайл (заавал биш):</b> хэрэглэгч өөрөө хүсвэл бөглөх, эмнэлгийн шинж чанартай
            эмзэг мэдээлэл (жиш. сонсголын түвшин). Энэ талбарыг бөглөхгүй байх бүрэн эрхтэй.
          </p>
          <p><b className="text-ink">Хэрэглээний өгөгдөл:</b> сонссон дуу, тоглуулсан огноо/хугацаа, дуртай/хадгалсан жагсаалт, эмчилгээний ахиц (THERAPIST/PARENT холбогдсон тохиолдолд).</p>
          <p><b className="text-ink">Төлбөрийн мэдээлэл:</b> захиалгын түүх (дүн, огноо, provider), картын/данс дугаар МАНАЙ сервер дээр хадгалагдахгүй — QPay/SocialPay шууд боловсруулна.</p>
          <p><b className="text-ink">Техникийн мэдээлэл:</b> IP хаяг, browser/OS мэдээлэл (аюулгүй байдал, залилан илрүүлэлтэд, audit log-д ашиглана).</p>
        </Section>

        <Section title="3. Мэдээллийг хэрхэн ашигладаг">
          <p>Үйлчилгээ үзүүлэх (тоглуулагч, эмчилгээний зөвлөгөө, PRO эрх идэвхжүүлэх), аюулгүй байдал хангах (нэвтрэлт, залилан илрүүлэх), үйлчилгээгээ сайжруулах (алдаа мониторинг, ашиглалтын статистик — нэрлэсэн бус нэгтгэсэн байдлаар).</p>
          <p>Сонсголын профайл (hearingProfile) зөвхөн тухайн хэрэглэгчийн тоглуулах туршлагыг тохируулахад ашиглагдана — гуравдагч этгээдэд зарж, зар сурталчилгаанд ашиглахгүй.</p>
        </Section>

        <Section title="4. Мэдээллийг хэн рүү дамжуулдаг">
          <p>Төлбөрийн боловсруулалт: QPay/SocialPay (Монголын төлбөрийн систем) — зөвхөн захиалга баталгаажуулахад шаардлагатай мэдээлэл (дүн, захиалгын дугаар).</p>
          <p>Файл хадгалалт: манай серверийн MinIO/S3-compatible санд (дуу, ковер зураг) — гуравдагч этгээд рүү дамжихгүй.</p>
          <p>Бид хэрэглэгчийн мэдээллийг ХУДАЛДАХГҮЙ, маркетингийн зорилгоор гуравдагч этгээдэд дамжуулахгүй.</p>
        </Section>

        <Section title="5. Хэрэглэгчийн эрх">
          <p>Та дараах эрхтэй:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Өөрийн бүх мэдээллийг татаж авах (Тохиргоо → «Миний мэдээлэл татах»)</li>
            <li>Бүртгэлээ бүрэн устгуулах (Тохиргоо → «Бүртгэл устгах»)</li>
            <li>Сонсголын профайлаа хүссэн үедээ цэвэрлэх/өөрчлөх</li>
            <li>Захиалгаа цуцлах</li>
          </ul>
        </Section>

        <Section title="6. Өгөгдөл хадгалах хугацаа">
          <p>Бүртгэл идэвхтэй байх хугацаанд мэдээлэл хадгалагдана. Бүртгэл устгах хүсэлт ирсний дараа тухайн хэрэглэгчтэй холбоотой бүх өгөгдөл (профайл, түүх, эмчилгээний ахиц) 30 хоногийн дотор устгагдана. Хуулиар шаардагдах санхүүгийн бүртгэл (жиш. төлбөрийн лог) хуулийн хугацаанд хадгалагдаж болно.</p>
        </Section>

        <Section title="7. Хамгаалалт">
          <p>Нууц үг bcrypt hash, session нь JWT + httpOnly cookie, бүх хэрэглэгч хоорондын холболт HTTPS-ээр (production орчинд), мэдрэмтгий log талбарууд (нууц үг, hearingProfile) серверийн log-д бичигдэхгүй байхаар redact хийгдсэн.</p>
        </Section>

        <Section title="8. Холбоо барих">
          <p>Энэ бодлоготой холбоотой асуулт, эсвэл өөрийн эрхээ хэрэгжүүлэх хүсэлтийг Тохиргоо хэсгийн «Миний мэдээлэл» цэсээр эсвэл админтай холбогдож илгээнэ үү.</p>
        </Section>
      </div>
    </div>
  );
}
