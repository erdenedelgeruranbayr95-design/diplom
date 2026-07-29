"use client";

/* ProgressView.tsx-ийн бичлэггүй үеийн Empty state — тусад нь гаргасан. Тусдаа "summary" текст
   блок эх кодод үүнээс өөр байхгүй (доод тайланг үзнэ үү: ProgressTimeline шиг задаргаа алга).
   CSS/behavior бүгд өөрчлөгдөөгүй. */
import { Empty } from "@/components/ui/States";

export default function ProgressSummary() {
  return <Empty icon="📈" title="Ахицын бичлэг алга" hint="Эмчилгээний эмч танд ахиц бичихэд энд харагдана" />;
}
