"use client";

import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";

/* Тусламж — хэрхэн ашиглах вэ. Player.jsx-аас тусад нь гаргасан.
   Props: onOpenCalibrate() — калибровк нээх, onBack() — нүүр рүү буцах. */
const ITEMS = [
  { ic: '🎵', t: 'Дуу сонгох', d: 'Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол.' },
  { ic: '📳', t: 'Чичиргээ мэдрэх', d: 'Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн.' },
  { ic: '💡', t: 'Гэрлээр мэдрэх', d: 'Дэлгэцийн гэрэл дууны цохилтоор лугшина. ⛶ товчоор бүтэн дэлгэцийн «Мэдрэх горим» нээгдэнэ.' },
  { ic: '🎛', t: 'Өөрт тааруулах', d: '⚙️ цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно.' },
  { ic: '♥', t: 'Цуглуулга', d: 'Зүрх дарж дуртай дуугаа, 🔖 дарж дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана.' },
  { ic: '💳', t: 'PRO захиалга', d: 'Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай.' },
]

const FAQ = [
  { q: 'Компьютер дээр чичиргээ гарахгүй байна?', a: 'Веб браузер зөвхөн утасны чичиргээг дэмждэг. Android утас эсвэл gamepad холбоод туршаарай — компьютер дээр гэрлийн пульс болон визуалаар мэдэрнэ.' },
  { q: 'iPhone дээр яагаад чичрэхгүй байна вэ?', a: 'iOS Safari нь чичиргээний API-г дэмждэггүй. iPhone дээр визуал болон gamepad/хантаазаар мэдрэхийг зөвлөж байна.' },
  { q: 'Калибровкоо буруу хийчихсэн бол?', a: 'Ямар ч үед ⚙️ тохиргоо эсвэл энэ хуудаснаас дахин калибровк хийж болно. Хуучин тохиргоо автоматаар шинэчлэгдэнэ.' },
  { q: 'Дуу 30 секундэд тасарч байна?', a: 'Энэ бол үнэгүй горимын урьдчилан сонсголт. PRO захиалга авбал бүх дууг бүтнээр нь хязгааргүй сонсоно.' },
  { q: 'Хадгалсан дуу, тохиргоо минь алга болох уу?', a: 'Одоогийн демо хувилбар өгөгдлийг зөвхөн энэ төхөөрөмжид хадгална. Production хувилбарт бүртгэлээр олон төхөөрөмж хооронд sync хийгдэнэ.' },
]

export default function HelpView({ onOpenCalibrate, onBack }: { onOpenCalibrate: () => void; onBack: () => void }) {
  return (
    <>
      <BackBar title="Тусламж — Хэрхэн ашиглах вэ?" onBack={onBack} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
        {ITEMS.map((x) => (
          <div
            className="border border-line rounded-[13px] p-[22px] bg-[rgba(20,28,27,.4)] flex flex-col gap-[9px] transition-[border-color,transform] duration-300 hover:border-[rgba(56,232,206,.35)] hover:-translate-y-[3px]"
            key={x.t}
          >
            <span className="text-[26px]" aria-hidden="true">
              {x.ic}
            </span>
            <b className="text-[15.5px] font-semibold">{x.t}</b>
            <p className="text-dim text-[13px] leading-[1.55]">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SectionTitle title="Түгээмэл асуулт" />
      </div>
      <div className="flex flex-col gap-[9px]">
        {FAQ.map((x) => (
          <details
            className="border border-line rounded-[11px] bg-[rgba(20,28,27,.4)] overflow-hidden [&[open]>summary]:border-b [&[open]>summary]:border-line [&[open]_.hlp-faq-ic]:rotate-45"
            key={x.q}
          >
            <summary className="flex items-center justify-between gap-3 cursor-pointer p-[15px_18px] text-sm font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
              {x.q}
              <span className="hlp-faq-ic flex-none text-lg text-aqua transition-transform duration-200 leading-none" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="text-dim text-[13px] leading-[1.6] p-[14px_18px_16px]">{x.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-2xl p-6 max-nav:flex-col flex justify-between items-center gap-6 flex-wrap [background:linear-gradient(120deg,rgba(56,232,206,.14),rgba(14,92,83,.25)_55%,rgba(9,14,14,.4))]">
        <div>
          <b className="block font-display font-semibold text-[15px] mb-1">Мэдрэхүйн калибровк</b>
          <p className="text-dim text-[13px] leading-[1.5]">Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна.</p>
        </div>
        <button
          className="rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-2.5 px-5 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
          onClick={onOpenCalibrate}
        >
          🎛 Калибровк эхлүүлэх
        </button>
      </div>
    </>
  )
}
