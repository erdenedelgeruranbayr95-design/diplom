"use client";

/* AdminPanel.tsx-ийн .adm-stats KPI блок — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
export default function AdminStats({ total, proCount }: { total: number; proCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-line border border-line rounded-sm overflow-hidden my-5 mb-[22px]">
      <div className="bg-[rgba(9,14,14,.96)] p-[14px_16px] transition-colors duration-200 hover:bg-[rgba(20,28,27,.7)]">
        <span className="mono">Нийт бүртгэл</span>
        <b className="block font-display text-[26px] mt-1.5">{total}</b>
      </div>
      <div className="bg-[rgba(9,14,14,.96)] p-[14px_16px] transition-colors duration-200 hover:bg-[rgba(20,28,27,.7)]">
        <span className="mono">PRO захиалагч</span>
        <b className="block font-display text-[26px] mt-1.5">{proCount}</b>
      </div>
    </div>
  );
}
