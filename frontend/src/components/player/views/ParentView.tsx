"use client";

/* Эцэг эхийн (PARENT) самбар — TherapistView-ийн list→detail хэв маягийг дагана,
   гэхдээ бүрэн зөвхөн унших. Энэ файл ЗӨВХӨН жагсаалт → дэлгэрэнгүй шилжилт;
   хүүхдийн дэлгэрэнгүй нь `components/parent/ChildDetailPanel.tsx`-д. */
import { useEffect, useState } from "react";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import PromoBanner from "@/components/ui/PromoBanner";
import { listMyChildren } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import ParentHeader from "@/components/parent/ParentHeader";
import ChildrenTable from "@/components/parent/ChildrenTable";
import ChildDetailPanel from "@/components/parent/ChildDetailPanel";
import type { LinkedChild } from "@/types/therapy";

export default function ParentView({ onGoHome }: { onGoHome: () => void }) {
  const {
    data: children,
    loading,
    error,
    reload,
  } = useAsyncResource<LinkedChild[]>(() => listMyChildren(), [], {
    initialData: [],
    errorMessage: "Жагсаалт ачаалахад алдаа гарлаа",
  });

  const [selected, setSelected] = useState<LinkedChild | null>(null);

  /* Ганц хүүхэдтэй эцэг эхэд жагсаалт харуулах утгагүй — шууд дэлгэрэнгүй рүү. */
  useEffect(() => {
    if (children.length === 1) setSelected(children[0]);
  }, [children]);

  if (selected) {
    return <ChildDetailPanel child={selected} onBack={children.length > 1 ? () => setSelected(null) : undefined} onGoHome={onGoHome} />;
  }

  return (
    <>
      <ParentHeader childCount={children.length} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={reload} />}
      {!loading && !error && children.length === 0 && (
        <Empty icon="family" title="Холбогдсон хүүхэд алга" hint="Админ таныг хүүхэдтэй холбохыг хүлээнэ үү" />
      )}

      {!loading && !error && children.length > 0 && <ChildrenTable links={children} onSelect={setSelected} />}

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Аппын бусад боломжуудыг үзээрэй."
        actionLabel="Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}
