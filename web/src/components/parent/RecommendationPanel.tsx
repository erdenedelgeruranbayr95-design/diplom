"use client";

/* ParentView.tsx-ийн "Эмчийн зөвлөмж" хэсэг — тусад нь гаргасан. Тусдаа recommendation загвар
   backend-д байхгүй тул дууссан сессүүдийн therapist-ийн бичсэн notes талбарыг харуулна
   (эх файлын толгой коммент дэх тайлбарыг үзнэ үү). CSS/behavior бүгд өөрчлөгдөөгүй. */
import { Empty } from "@/components/ui/States";
import type { TherapySession } from "@/types/therapy";

export default function RecommendationPanel({ recommendations }: { recommendations: TherapySession[] }) {
  return (
    <>
      <h3 className="st-h">Эмчийн зөвлөмж</h3>
      {recommendations.length === 0 ? (
        <Empty icon="💬" title="Одоогоор зөвлөмж алга" hint="Эмч дууссан сесст тэмдэглэл бичихэд энд харагдана" />
      ) : (
        <div className="border border-line rounded-md bg-[rgba(20,28,27,.4)] p-[22px_24px] mt-[26px] transition-[box-shadow,border-color] duration-250 hover:shadow-sm hover:border-white/[.16] flex flex-col gap-3.5">
          {recommendations.map((s) => (
            <div key={s.id}>
              <span className="mono" style={{ color: "var(--faint)", fontSize: 11.5 }}>
                {s.completedAt ? new Date(s.completedAt).toLocaleDateString("mn-MN") : ""}
              </span>
              <p style={{ marginTop: 4 }}>{s.notes}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
