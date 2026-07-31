"use client";

/* Эмчийн (THERAPIST) хяналтын самбар — томилогдсон өвчтөнөө сонгоод сесс/ахиц удирдана.

   Энэ файл ЗӨВХӨН жагсаалт → дэлгэрэнгүй шилжилтийг хариуцна; өвчтөний дэлгэрэнгүй нь
   `components/therapist/PatientDetailPanel.tsx`-д тусдаа. */
import { useMemo, useState } from "react";
import { listMyPatients } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import TherapistHeader from "@/components/therapist/TherapistHeader";
import PatientList from "@/components/therapist/PatientList";
import PatientDetailPanel from "@/components/therapist/PatientDetailPanel";
import PromoBanner from "@/components/ui/PromoBanner";
import type { AssignedPatient } from "@/types/therapy";

export default function TherapistView({ onGoHome }: { onGoHome: () => void }) {
  const {
    data: patients,
    loading,
    error,
    reload,
  } = useAsyncResource<AssignedPatient[]>(() => listMyPatients(), [], {
    initialData: [],
    errorMessage: "Жагсаалт ачаалахад алдаа гарлаа",
  });

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AssignedPatient | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter((p) => p.patient.name.toLowerCase().includes(term) || p.patient.email.toLowerCase().includes(term));
  }, [patients, query]);

  if (selected) {
    return <PatientDetailPanel patient={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <TherapistHeader patientCount={patients.length} />

      <PatientList loading={loading} err={error} onRetry={reload} q={query} setQ={setQuery} patients={filtered} onSelect={setSelected} />

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."
        actionLabel="Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}
