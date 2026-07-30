"use client";

import type { SessionUser } from "@/types/auth";
import BackBar from "./BackBar";
import { SectionTitle } from "@/components/ui/PageHeader";
import { Empty } from "@/components/ui/States";
import StatusBadge, { type StatusTone } from "@/components/ui/StatusBadge";
import { ActionButton } from "@/components/ui/ActionGroup";
import { loadPayments } from "@/lib/data/library";
import { PREVIEW_SEC } from "@/lib/player/constants";
import Icon from "@/components/ui/Icon";

const PAYMENT_STATUS_TONE: Record<string, StatusTone> = {
  "Амжилттай": "aqua",
  "Хүлээгдэж байна": "warm",
  "Цуцлагдсан": "rose",
};

/* Захиалгын удирдлага — Player.jsx-аас тусад нь гаргасан.
   loadPayments(email) нь read-only тул дотор нь дуудсан хэвээр.
   Props: email, user, isAdmin, renewDate, onSubscribe(), onCancelSub(), onBack() */

/* Тарифын жагсаалтын мөр — өмнө нь ::before content:'✓' / '✕' текст глиф ашиглаж байсныг
   нэгдсэн SVG icon болгов (шрифт/OS хамаарлаас чөлөөтэй, зузаан/өнгө нийцтэй).
   `tone` нь зөвхөн өнгө сонгоно, ямар ч логик агуулаагүй. */
function PlanFeature({ children, off, tone = "aqua" }: { children: React.ReactNode; off?: boolean; tone?: "aqua" | "purple" }) {
  const cls = off ? "text-dim" : tone === "purple" ? "text-purple" : "text-aqua";
  return (
    <li className={"flex items-start gap-2.5 text-[13px] leading-[1.45] " + (off ? "text-dim" : "text-ink")}>
      <span className={"flex-none mt-[2px] " + cls} aria-hidden="true">
        <Icon name={off ? "close" : "check"} size={13} strokeWidth={2.4} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function BillingView({
  email, user, isAdmin, renewDate, onSubscribe, onCancelSub, onBack,
}: {
  email: string;
  user: SessionUser | null;
  isAdmin: boolean;
  renewDate: string;
  onSubscribe: () => void;
  onCancelSub: () => void;
  onBack: () => void;
}) {
  const payments = loadPayments(email)
  const active = user?.sub?.active
  const renews = user?.sub?.renews ? +new Date(user.sub.renews) : 0
  const daysLeft = renews ? Math.max(0, Math.ceil((renews - Date.now()) / 86400000)) : 0

  return (
    <>
      <BackBar title="Захиалгын удирдлага" onBack={onBack} />
      <div
        className={
          "flex justify-between items-center gap-[22px] flex-wrap border border-line rounded-[13px] p-[22px_24px] transition-[border-color,background] duration-300 " +
          (active || isAdmin ? "border-[rgba(56,232,206,.35)] bg-[rgba(56,232,206,.05)]" : "")
        }
      >
        <div>
          <span className="mono">Идэвхтэй план</span>
          <b className={"font-display text-[19px] block m-[6px_0_8px] tracking-[-.03em] " + (active || isAdmin ? "text-aqua" : "")}>
            {isAdmin ? 'Админ — бүх эрх' : active ? 'МЭДРЭХ PRO' : user?.sub ? 'PRO (цуцлагдсан)' : 'Үнэгүй горим'}
          </b>
          <p className="text-dim text-[13.5px] max-w-[52ch]">
            {isAdmin ? 'Админ эрхтэй тул төлбөр шаардлагагүй.'
              : active ? `Дараагийн төлбөр: ${renewDate} — ${daysLeft} хоногийн дараа · 9'900₮`
                : user?.sub ? `${renewDate} хүртэл эрх хадгалагдана, дараа нь үнэгүй горимд шилжинэ.`
                  : `Дуу тус бүрээс ${PREVIEW_SEC} секунд сонсох эрхтэй.`}
          </p>
          {active && !isAdmin && (
            <div className="mt-3 h-[5px] rounded-[10px] bg-white/10" aria-label="Дараагийн төлбөр хүртэл">
              <i className="block h-full bg-aqua rounded-[10px]" style={{ width: Math.min(100, ((30 - daysLeft) / 30) * 100) + '%' }}></i>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[9px] min-w-[210px]">
          {!isAdmin && active && (
            <button className="sp-prof-btn danger focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]" onClick={() => {
              if (confirm('PRO захиалгаа цуцлах уу? ' + renewDate + ' хүртэл эрх чинь хадгалагдана.')) onCancelSub()
            }}>Захиалга цуцлах</button>
          )}
          {!isAdmin && !active && (
            <button className="sp-prof-btn accent focus-visible:outline-none focus-visible:shadow-glow-aqua" onClick={onSubscribe}>
              {user?.sub ? 'Сэргээх — 9\'900₮/сар' : 'PRO болох — 9\'900₮/сар'}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle title="Планаа харьцуулах" />
      </div>
      <div className="grid grid-cols-3 max-nav:grid-cols-1 gap-3.5">
        <div className={"relative border border-line rounded-[14px] p-[22px] " + (!active && !isAdmin ? "border-[rgba(56,232,206,.5)] shadow-[0_0_0_1px_rgba(56,232,206,.2)]" : "")}>
          {!active && !isAdmin && (
            <span className="absolute top-4 right-4 font-mono text-[8.5px]">Таны план</span>
          )}
          <span className="mono">Үнэгүй</span>
          <b className="font-display text-[26px] tracking-[-.03em] block my-1.5">
            0₮<i className="font-body text-[13px] text-dim not-italic font-normal">/сар</i>
          </b>
          <ul className="list-none flex flex-col gap-[9px] flex-1">
            <PlanFeature>
              Дуу тус бүрээс {PREVIEW_SEC} секунд
            </PlanFeature>
            <PlanFeature>
              Чичиргээ + гэрэл + визуал
            </PlanFeature>
            <PlanFeature>
              Мэдрэхүйн калибровк
            </PlanFeature>
            <PlanFeature>
              Дуртай / Хадгалах / Playlist
            </PlanFeature>
            <PlanFeature off>
              Бүтэн дуу — хаалттай
            </PlanFeature>
            <PlanFeature off>
              Олон төхөөрөмж — хаалттай
            </PlanFeature>
          </ul>
        </div>

        <div
          className={
            "relative border rounded-[14px] p-[22px] border-[rgba(56,232,206,.28)] bg-[rgba(56,232,206,.04)] " +
            (active || isAdmin ? "border-[rgba(56,232,206,.5)] shadow-[0_0_0_1px_rgba(56,232,206,.2)]" : "")
          }
        >
          {(active || isAdmin) && <span className="absolute top-4 right-4 font-mono text-[8.5px]">Идэвхтэй</span>}
          <span className="mono inline-flex items-center gap-2">
            <i className="w-2 h-2 rounded-full bg-aqua shadow-[0_0_7px_rgba(56,232,206,.75)]" aria-hidden="true"></i>
            PRO
          </span>
          <b className="font-display text-[26px] tracking-[-.03em] block my-1.5 text-aqua">
            9&apos;900₮<i className="font-body text-[13px] text-dim not-italic font-normal">/сар</i>
          </b>
          <ul className="list-none flex flex-col gap-[9px] flex-1">
            <PlanFeature>
              Хязгааргүй хөгжим
            </PlanFeature>
            <PlanFeature>
              AI анализ
            </PlanFeature>
            <PlanFeature>
              Бүх төхөөрөмж холбох
            </PlanFeature>
            <PlanFeature>
              Хязгааргүй playlist
            </PlanFeature>
            <PlanFeature>
              Advanced vibration
            </PlanFeature>
          </ul>
          {!isAdmin && !active && (
            <ActionButton variant="primary" className="mt-[18px] w-full text-center" onClick={onSubscribe}>
              {user?.sub ? "Сэргээх" : "PRO авах"}
            </ActionButton>
          )}
        </div>

        <div className="relative border border-purple/[.28] bg-purple/[.04] rounded-[14px] p-[22px] opacity-75">
          <span className="absolute top-4 right-4">
            <StatusBadge label="Coming Soon" tone="purple" />
          </span>
          <span className="mono inline-flex items-center gap-2">
            <i className="w-2 h-2 rounded-full bg-purple shadow-[0_0_7px_rgba(180,156,255,.7)]" aria-hidden="true"></i>
            Family
          </span>
          <b className="font-display text-[26px] tracking-[-.03em] block my-1.5 text-purple">
            19&apos;900₮<i className="font-body text-[13px] text-dim not-italic font-normal">/сар</i>
          </b>
          <ul className="list-none flex flex-col gap-[9px] flex-1">
            <PlanFeature tone="purple">
              5 хүртэлх гишүүн
            </PlanFeature>
            <PlanFeature tone="purple">
              Гэр бүлийн статистик
            </PlanFeature>
            <PlanFeature tone="purple">
              PRO-гийн бүх боломж
            </PlanFeature>
          </ul>
          <ActionButton variant="secondary" className="mt-[18px] w-full text-center" disabled>
            Удахгүй
          </ActionButton>
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle title="Төлбөрийн түүх" />
      </div>
      {payments.length === 0 ? (
        <Empty icon="card" title="Төлбөрийн түүх хоосон байна" />
      ) : (
        <div className="border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
          <div className="grid grid-cols-[1fr_1fr_1fr_.9fr_.8fr] max-nav:grid-cols-[1fr_1fr_.9fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Огноо</span>
            <span className="mono">План</span>
            <span className="mono max-nav:hidden">Хэрэгсэл</span>
            <span className="mono">Төлөв</span>
            <span className="mono">Дүн</span>
          </div>
          {payments.map((p) => (
            <div
              className="grid grid-cols-[1fr_1fr_1fr_.9fr_.8fr] max-nav:grid-cols-[1fr_1fr_.9fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13.5px] transition-colors duration-150 hover:bg-white/[.03]"
              key={p.id}
            >
              <span className="text-dim">{new Date(p.date).toLocaleDateString('mn-MN')}</span>
              <span>{p.plan}</span>
              <span className="text-dim max-nav:hidden">{p.method}</span>
              <StatusBadge label={p.status} tone={PAYMENT_STATUS_TONE[p.status] ?? "faint"} />
              <b>{p.amount}</b>
            </div>
          ))}
        </div>
      )}
      <p className="mono !text-[9px] mt-6 text-left">Демо горим — SocialPay Demo. Жинхэнэ мөнгө шилжээгүй.</p>
    </>
  )
}
