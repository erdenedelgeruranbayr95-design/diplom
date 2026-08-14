import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { Panel } from "@/components/ui/Surface";

export const metadata = { title: "Үйлчилгээний нөхцөл — МЭДРЭХ" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Panel as="section" className="mb-4">
      <h2 className="font-display font-semibold text-heading tracking-[-.03em] text-ink mb-3">{title}</h2>
      <div className="text-copy leading-[1.7] text-dim space-y-3">{children}</div>
    </Panel>
  );
}

export default function TermsOfServicePage() {
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

        <h1 className="text-[clamp(26px,4.2vw,40px)] font-extrabold tracking-[-.05em] leading-[1.05] mb-2">Үйлчилгээний нөхцөл</h1>
        <p className="text-dim text-body mb-8">Сүүлд шинэчилсэн: 2026 оны 8 сарын 2</p>

        <Section title="1. Үйлчилгээний тухай">
          <p>
            МЭДРЭХ (цаашид "Үйлчилгээ") нь дуу авиаг чичиргээ/гэрлийн дохио болгон хувиргах хөгжмийн платформ
            бөгөөд сонсголын бэрхшээлтэй сонсогчид болон бүтээлээ түгээх уран бүтээлчдэд зориулагдсан.
            Үйлчилгээг ашигласнаар та энэхүү нөхцөлийг хүлээн зөвшөөрсөнд тооцно.
          </p>
        </Section>

        <Section title="2. Бүртгэл ба эрх">
          <p>Хэрэглэгч бүр өөрийн бодит мэдээллээр бүртгүүлэх ёстой. Нэвтрэх мэдээллээ бусдад дамжуулахгүй байх, өөрийн бүртгэлд болсон бүх үйлдэлд хариуцлага хүлээх нь хэрэглэгчийн үүрэг.</p>
          <p>Дүрийн (Хэрэглэгч/Уран бүтээлч/Куратор/Модератор/Админ) зориулалтын дагуу л эрхээ ашиглана. Эрхээ зөрчиж ашигласан тохиолдолд бүртгэл түдгэлзүүлэгдэж болно.</p>
        </Section>

        <Section title="3. Контент ба зохиогчийн эрх">
          <p>Платформд байршуулсан дуу бүр лиценз мэдээлэлтэй (CC BY, CC0, эсвэл эзэмшигчийн зөвшөөрөл) байх ёстой. Хэрэглэгч зохиогчийн эрх зөрчсөн контент байршуулбал МЭДРЭХ тухайн контентыг устгах, бүртгэлийг түдгэлзүүлэх эрхтэй.</p>
          <p>Зохиогчийн эрхийн нэхэмжлэл ирвэл (takedown хүсэлт) бид холбогдох контентыг шуурхай хянан үзэж, шаардлагатай бол устгана.</p>
        </Section>

        <Section title="4. PRO захиалга ба төлбөр">
          <p>PRO эрх нь сарын захиалгын хэлбэртэй, QPay/SocialPay-ээр төлбөр хийгдэнэ. Захиалга сар бүр автоматаар сунгагдана, хэрэглэгч хүссэн үедээ цуцалж болно (цуцлахад одоогийн төлсөн хугацаа дуустал эрх хэвээр үлдэнэ, буцаан олголт хийгдэхгүй).</p>
          <p>Төлбөрийн мэдээлэл (карт/данс) МЭДРЭХ-ийн серверт хадгалагдахгүй — шууд QPay/SocialPay боловсруулна.</p>
        </Section>

        <Section title="5. Эрүүл мэндийн зөвлөмж — хариуцлагын хязгаарлалт">
          <p>МЭДРЭХ нь эмнэлгийн хэрэгсэл БИШ бөгөөд эмчилгээ, оношилгооны үүрэг гүйцэтгэхгүй. Чичиргээ/гэрлийн дохио нь хөгжим мэдрэх туршлагыг баяжуулах зорилготой. Сонсголын байдалтай холбоотой шийдвэрийг мэргэшсэн эмч/сонсголын мэргэжилтэнтэй зөвлөлдөж гаргана уу.</p>
        </Section>

        <Section title="6. Үйлчилгээний хязгаарлалт">
          <p>МЭДРЭХ нь техникийн засвар үйлчилгээ, гэнэтийн тасалдал зэргээс шалтгаалан үйлчилгээгээ түр зогсоож болно. Бид боломжит хэмжээгээр урьдчилан мэдэгдэхийг эрмэлзэнэ.</p>
        </Section>

        <Section title="7. Нөхцөлийн өөрчлөлт">
          <p>Энэхүү нөхцөлийг цаг үргэлж шинэчилж болно. Мэдэгдэхүйц өөрчлөлт орсон тохиолдолд идэвхтэй хэрэглэгчдэд мэдэгдэнэ.</p>
        </Section>

        <Section title="8. Холбогдох баримт">
          <p>
            Хувийн мэдээллийн ашиглалттай холбоотой дэлгэрэнгүй мэдээллийг{" "}
            <Link href="/legal/privacy" className="text-aqua hover:underline">Нууцлалын бодлого</Link> хэсгээс үзнэ үү.
          </p>
        </Section>
      </div>
    </div>
  );
}
