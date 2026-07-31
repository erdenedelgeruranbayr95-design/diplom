"use client";

import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Empty, ErrorState, Skeleton } from "@/components/ui/States";
import { Panel } from "@/components/ui/Surface";
import Icon from "@/components/ui/Icon";

/* Root Panel-ийн хэсэг бүрийн нийтлэг бүрхүүл — гарчиг + loading/error төлөв.
   `ui/States` ба `ui/PageHeader`-ийг дахин ашиглана, шинэ загвар үүсгэхгүй. */
export default function RootSection({
  title,
  eyebrow,
  description,
  actions,
  loading,
  error,
  onRetry,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} description={description} actions={actions} />
      {loading && <Skeleton variant="row" rows={5} />}
      {!loading && error && <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={onRetry} />}
      {!loading && !error && children}
    </>
  );
}

/* Backend API байхгүй хэсгүүдийн шударга төлөв.

   Шинэ endpoint зохиомжлохгүй гэсэн шаардлагыг баримталж, эдгээр дэлгэц ХУУРАМЧ тоо
   харуулахгүй — оронд нь ЮУ шаардлагатайг тодорхой бичнэ. Backend бэлэн болмогц
   зөвхөн энэ блокийг жинхэнэ хүснэгтээр солино. */
export function RootApiPending({
  title,
  eyebrow,
  description,
  needs,
}: {
  title: string;
  eyebrow?: string;
  description: string;
  /** Энэ дэлгэц ажиллахад шаардагдах backend хэсгүүд. */
  needs: string[];
}) {
  return (
    <>
      <PageHeader
        title={title}
        eyebrow={eyebrow}
        description={description}
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm/[.08] px-3.5 py-2 text-caption font-semibold uppercase tracking-[.06em] text-warm">
            <Icon name="alert" size={13} />
            Backend хүлээгдэж байна
          </span>
        }
      />

      <Empty
        icon="clipboard"
        title="Энэ хэсэгт өгөгдөл өгөх backend API одоогоор байхгүй"
        hint="Хуурамч тоо харуулахгүйн тулд хоосон үлдээв. Доор шаардагдах зүйлсийг жагсаав."
      />

      <Panel as="section" className="mt-6">
        <h3 className="font-display font-semibold text-title tracking-[-.03em] text-ink mb-3">Ажиллуулахад шаардагдах зүйлс</h3>
        <ul className="flex flex-col gap-2.5 list-none">
          {needs.map((need) => (
            <li key={need} className="flex items-start gap-2.5 text-body text-dim leading-[1.55]">
              <span className="text-warm flex-none mt-[3px]" aria-hidden="true">
                <Icon name="chevronRight" size={13} strokeWidth={2.2} />
              </span>
              <code className="font-mono text-note text-ink/90">{need}</code>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
