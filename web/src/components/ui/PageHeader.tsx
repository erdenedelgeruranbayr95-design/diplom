"use client";

/* Нэгдсэн page-title/section-title каркас — SaaS dashboard pattern (Stripe/Linear-style
   page header): эвшлэл (эвшлэл сонголттой), гарчиг, тайлбар, баруун талд quick-action slot.
   Ямар ч бизнес логик агуулаагүй, зөвхөн layout/typography — page-үүд эрчимтэй нэвтрүүлж
   болно, одоогийн эх кодыг өөрчлөхгүйгээр. */
import type { ReactNode } from "react";

export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
  breadcrumb,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-5 flex-wrap mb-7">
      <div className="min-w-0">
        {breadcrumb && <div className="mb-1.5">{breadcrumb}</div>}
        {eyebrow && <span className="mono block mb-2">{eyebrow}</span>}
        <h1 className="font-display font-bold text-[26px] max-nav:text-[21px] tracking-[-.03em] leading-tight text-ink">{title}</h1>
        {description && <p className="mt-1.5 text-dim text-[14px] leading-[1.5] max-w-[60ch]">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-none">{actions}</div>}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-[12.5px] text-faint" aria-label="Замчлал">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.onClick ? (
            <button className="hover:text-ink transition-colors duration-150 focus-visible:outline-none focus-visible:text-aqua rounded-sm" onClick={item.onClick}>
              {item.label}
            </button>
          ) : (
            <span className={i === items.length - 1 ? "text-dim" : ""}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SectionTitle({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
      <div>
        <h2 className="font-display font-semibold text-[17px] tracking-[-.02em] text-ink">{title}</h2>
        {description && <p className="mt-1 text-dim text-[13px] leading-[1.5]">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-none">{actions}</div>}
    </div>
  );
}
