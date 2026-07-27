import type { ReactNode } from "react";

export default function StatCard({
  icon,
  color,
  value,
  label,
}: {
  icon: ReactNode;
  color: string;
  value: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row items-center gap-4 p-[18px_20px] rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] border border-[rgba(255,255,255,.09)] transition-[transform,border-color,box-shadow] duration-[350ms] ease-[cubic-bezier(.16,.8,.24,1)] hover:-translate-y-[3px] hover:border-[rgba(255,255,255,.18)] hover:shadow-sm hover:bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.015))]">
      <span className={"st-ico " + color} aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <b className="text-[clamp(17px,1.8vw,22px)] leading-[1.15] whitespace-nowrap overflow-hidden text-ellipsis">{value}</b>
        <span className="mono !text-[9px] !tracking-[.18em]">{label}</span>
      </span>
    </div>
  );
}
