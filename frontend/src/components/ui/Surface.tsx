/* Гадаргуугийн 2 давтагдмал каркас — өмнө нь ижил className мөр олон файлд
   үг үсгээрээ хуулагдаж байсныг нэгтгэв. Утга нэг ч өөрчлөгдөөгүй тул визуал
   ялгаа гарахгүй; цаашид хүрээ/дэвсгэрийг ганц газраас засна.

   Хэзээ юуг ашиглах вэ:
     <TableCard>  — доторх мөрүүд өөрсдөө padding-тай хүснэгт/жагсаалтын бүрхүүл
                    (overflow-hidden тул мөрийн hover нь буланг давахгүй)
     <Panel>      — Now Playing / дэлгэрэнгүйн хажуугийн мэдээллийн блок
     <SectionCard> — гарчиг · тайлбар · action slot-той бүрэн хэсэг (тусдаа файл)
*/
import type { ReactNode } from "react";

export function TableCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015] " + className}>{children}</div>
  );
}

export function Panel({
  as: Tag = "div",
  children,
  className = "",
}: {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={"rounded-card border border-white/[.08] bg-white/[.03] p-4 " + className}>{children}</Tag>;
}
