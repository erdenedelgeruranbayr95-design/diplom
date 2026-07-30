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
    /* Гарчгийн блок ба action-ууд гарчгийн baseline-аар тэгширнэ (items-end), гарчгийн
       хэмжээ viewport-д уян clamp — 360px-ээс 1440px+ хүртэл нэг хэмнэлтэй. */
    <div className="flex items-end justify-between gap-x-6 gap-y-4 flex-wrap mb-8 max-nav:mb-6">
      <div className="min-w-0">
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        {eyebrow && <span className="mono block mb-2.5">{eyebrow}</span>}
        <h1 className="font-display font-bold text-[clamp(23px,2.8vw,32px)] tracking-[-.04em] leading-[1.12] text-ink text-balance">{title}</h1>
        {description && <p className="mt-2.5 text-dim text-[15px] leading-[1.6] max-w-[62ch] text-pretty">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5 flex-none flex-wrap">{actions}</div>}
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

export function SectionTitle({ title, description, actions }: { title: ReactNode; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-x-4 gap-y-2.5 flex-wrap mb-4">
      <div className="min-w-0">
        <h2 className="font-display font-semibold text-[18.5px] max-nav:text-[16px] tracking-[-.03em] leading-snug text-ink flex items-center">{title}</h2>
        {description && <p className="mt-1.5 text-dim text-[13.5px] leading-[1.55] max-w-[62ch]">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-none flex-wrap">{actions}</div>}
    </div>
  );
}
