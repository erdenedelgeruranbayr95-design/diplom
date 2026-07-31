"use client";

import BackBar from "../BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";

/* Тусламж — хэрхэн ашиглах вэ. Player.jsx-аас тусад нь гаргасан.
   Props: onOpenCalibrate() — калибровк нээх, onBack() — нүүр рүү буцах.

   `ic` нь emoji биш, нэгдсэн icon-ийн НЭР (components/ui/Icon.tsx) — тайлбар текст
   болон бусад хуудсуудтай ижил зузаан/өнгөтэй, OS-оос хамааралгүй болов. */
const ITEMS = [
  { ic: 'music', t: 'Дуу сонгох', d: 'Картан дээр дарахад дуу тоглоно. Хайлт болон төрлийн шүүлтүүрээр хүссэн дуугаа ол.' },
  { ic: 'vibrate', t: 'Чичиргээ мэдрэх', d: 'Утсан дээр нээвэл дууны хэмнэлээр утас чичирнэ. Бас = урт хүчтэй, өндөр = богино түргэн.' },
  { ic: 'bulb', t: 'Гэрлээр мэдрэх', d: 'Дэлгэцийн гэрэл дууны цохилтоор лугшина. Бүтэн дэлгэцийн товчоор «Мэдрэх горим» нээгдэнэ.' },
  { ic: 'settings', t: 'Өөрт тааруулах', d: 'Тохиргооны цэснээс чичиргээний хүч, гэрлийн эрчим, давтамжийн бүсээ тохируул. Калибровк дахин хийж болно.' },
  { ic: 'heart', t: 'Цуглуулга', d: 'Зүрх дарж дуртай дуугаа, хавчуургаар дараа сонсох дуугаа хадгал. Зүүн самбарт цуглана.' },
  { ic: 'card', t: 'PRO захиалга', d: 'Үнэгүй горимд 30 сек сонсоно. PRO бол бүрэн эрхтэй — профайл цэснээс захиалгаа удирдаарай.' },
]

const FAQ = [
  { q: 'Компьютер дээр чичиргээ гарахгүй байна?', a: 'Веб браузер зөвхөн утасны чичиргээг дэмждэг. Android утас эсвэл gamepad холбоод туршаарай — компьютер дээр гэрлийн пульс болон визуалаар мэдэрнэ.' },
  { q: 'iPhone дээр яагаад чичрэхгүй байна вэ?', a: 'iOS Safari нь чичиргээний API-г дэмждэггүй. iPhone дээр визуал болон gamepad/хантаазаар мэдрэхийг зөвлөж байна.' },
  { q: 'Калибровкоо буруу хийчихсэн бол?', a: 'Ямар ч үед тохиргооны цэс эсвэл энэ хуудаснаас дахин калибровк хийж болно. Хуучин тохиргоо автоматаар шинэчлэгдэнэ.' },
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
            className="border border-line rounded-md p-[22px] [background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] shadow-[inset_0_1px_0_rgba(255,255,255,.05)] flex flex-col gap-2.5 transition-[border-color,transform] duration-300 hover:border-aqua/35 hover:-translate-y-[3px] motion-reduce:hover:translate-y-0"
            key={x.t}
          >
            <span className="w-11 h-11 mb-1 rounded-xl flex items-center justify-center text-aqua bg-aqua/[.10] shadow-[inset_0_0_0_1px_rgba(56,232,206,.22)]" aria-hidden="true">
              <Icon name={x.ic} size={22} />
            </span>
            <b className="text-lead font-semibold">{x.t}</b>
            <p className="text-dim text-body leading-[1.55]">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SectionTitle title="Түгээмэл асуулт" />
      </div>
      <div className="flex flex-col gap-[9px]">
        {FAQ.map((x) => (
          <details
            className="border border-line rounded-chip bg-[rgba(20,28,27,.4)] overflow-hidden [&[open]>summary]:border-b [&[open]>summary]:border-line [&[open]_[data-faq-icon]]:rotate-45"
            key={x.q}
          >
            <summary className="flex items-center justify-between gap-3 cursor-pointer p-[15px_18px] text-sm font-semibold text-ink list-none [&::-webkit-details-marker]:hidden">
              {x.q}
              <span data-faq-icon className="flex-none text-lg text-aqua transition-transform duration-200 leading-none" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="text-dim text-body leading-[1.6] p-[14px_18px_16px]">{x.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-2xl p-6 max-nav:p-5 max-nav:flex-col max-nav:items-start flex justify-between items-center gap-6 flex-wrap border border-aqua/[.22] shadow-[inset_0_1px_0_rgba(255,255,255,.07)] [background:linear-gradient(120deg,rgba(56,232,206,.16),rgba(14,92,83,.26)_55%,rgba(9,14,14,.45))]">
        <div className="min-w-0">
          <b className="block font-display font-semibold text-lead tracking-[-.02em] mb-1.5">Мэдрэхүйн калибровк</b>
          <p className="text-ink/70 text-body leading-[1.55] max-w-[62ch]">Таны мэдрэх босгыг 1 минутын тестээр тодорхойлж, тохиргоог автоматаар тааруулна.</p>
        </div>
        <ActionButton variant="primary" className="flex-none" onClick={onOpenCalibrate}>
          <Icon name="sliders" size={16} />
          Калибровк эхлүүлэх
        </ActionButton>
      </div>
    </>
  )
}
