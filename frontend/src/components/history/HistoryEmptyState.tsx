"use client";

/* HistoryView.tsx-ийн хоосон түүхийн Empty state — тусад нь гаргасан. CSS/behavior бүгд
   өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { Empty } from "@/components/ui/States";

export default function HistoryEmptyState() {
  return <Empty icon="🕐" title="Түүх хоосон байна" hint="Дуу сонсоход энд бичлэг нэмэгдэнэ" />;
}
