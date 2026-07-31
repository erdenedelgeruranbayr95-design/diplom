"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

/** "Яагаад санал болгосон бэ?" — scoreRecommendations-ийн буцаасан шалтгаанууд. */
export default function WhyRecommended({ reasons }: { reasons?: string[] }) {
  const [open, setOpen] = useState(false);
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl border border-aqua/[.22] bg-aqua/[.05] overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-3 py-3 px-4 text-left focus-visible:outline-none focus-visible:shadow-glow-aqua"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="why-recommended-panel"
      >
        <span className="flex items-center gap-2 text-body font-semibold text-aqua">
          <Icon name="sparkle" size={15} />
          Яагаад санал болгосон бэ?
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"text-aqua transition-transform duration-250 " + (open ? "rotate-180" : "")}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="flex flex-col gap-1.5 px-4 pb-4 list-none">
          {reasons.map((reason) => (
            <li key={reason} className="text-note text-ink flex items-center gap-2">
              <span className="text-aqua flex flex-none" aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={2.4} />
              </span>
              {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
