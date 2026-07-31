"use client";

import type { ReactNode } from "react";

/** Дугуй хүрээтэй шуурхай товчлол — Нүүрийн толгой болон секцийн үйлдэлд. */
export default function QuickAction({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      className="flex items-center gap-3 py-3 px-5 rounded-full border border-white/[.08] bg-white/[.04] text-copy font-medium text-ink transition-colors duration-150 hover:bg-white/[.08] focus-visible:outline-none focus-visible:shadow-glow-aqua whitespace-nowrap"
      onClick={onClick}
    >
      <span className="text-aqua w-[17px] text-center" aria-hidden="true">
        {icon}
      </span>
      {label}
    </button>
  );
}
