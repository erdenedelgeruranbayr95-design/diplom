"use client";

import type { ReactNode } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ErrorState, Skeleton } from "@/components/ui/States";

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
