"use client";

import { useMemo, useState } from "react";
import { createProgress, createTherapySession, listProgress, listTherapySessions, updateTherapySession } from "@/lib/api/client";
import { useAsyncResource } from "@/hooks/useAsyncResource";
import { completedSessions, toProgressChartData } from "@/lib/therapy/progress-chart";
import PatientProfileCard from "@/components/therapist/PatientProfileCard";
import ProgressChartCard from "@/components/ui/ProgressChartCard";
import SessionTimeline from "@/components/therapist/SessionTimeline";
import TherapySessionForm from "@/components/therapist/TherapySessionForm";
import ProgressEntryForm from "@/components/therapist/ProgressEntryForm";
import { Loading, ErrorState } from "@/components/ui/States";
import type { AssignedPatient, Progress, TherapySession } from "@/types/therapy";

interface PatientRecord {
  sessions: TherapySession[];
  progress: Progress[];
}
const EMPTY_RECORD: PatientRecord = { sessions: [], progress: [] };

/* Нэг өвчтөний дэлгэрэнгүй — сесс/ахицын CRUD.

   Урьд нь TherapistView.tsx-ийн доор нэрлэгдээгүй дэд компонент байсан (130 мөр),
   ижил төстэй `ChildDetail` нь ParentView.tsx-д хуулагдсан байв. Одоо тусдаа файл,
   ачаалалт нь `useAsyncResource`-т, графикийн хөрвүүлэлт нь `progress-chart`-д. */
export default function PatientDetailPanel({ patient, onBack }: { patient: AssignedPatient; onBack: () => void }) {
  const userId = patient.userId;

  const {
    data: record,
    loading,
    error,
    setError,
    reload,
  } = useAsyncResource<PatientRecord>(
    () => Promise.all([listTherapySessions(userId), listProgress(userId)]).then(([sessions, progress]) => ({ sessions, progress })),
    [userId],
    { initialData: EMPTY_RECORD, errorMessage: "Мэдээлэл ачаалахад алдаа гарлаа" },
  );

  const [notes, setNotes] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [savingSession, setSavingSession] = useState(false);

  const [completionPct, setCompletionPct] = useState(50);
  const [engagementScore, setEngagementScore] = useState(50);
  const [savingProgress, setSavingProgress] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  const chartData = useMemo(() => toProgressChartData(record.progress), [record.progress]);

  async function submitSession(e: React.FormEvent) {
    e.preventDefault();
    setSavingSession(true);
    setFormMsg("");
    try {
      await createTherapySession({ userId, notes: notes.trim() || undefined, scheduledAt: scheduledAt || undefined });
      setNotes("");
      setScheduledAt("");
      setFormMsg("✅ Сесс үүсгэгдлээ");
      reload();
    } catch (e) {
      setFormMsg("❌ " + (e as Error).message);
    } finally {
      setSavingSession(false);
    }
  }

  async function markCompleted(id: string) {
    try {
      await updateTherapySession(id, { status: "COMPLETED", completedAt: new Date().toISOString() });
      reload();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function submitProgress(e: React.FormEvent) {
    e.preventDefault();
    setSavingProgress(true);
    setFormMsg("");
    try {
      await createProgress({ userId, completionPct, engagementScore });
      setFormMsg("✅ Ахиц бичигдлээ");
      reload();
    } catch (e) {
      setFormMsg("❌ " + (e as Error).message);
    } finally {
      setSavingProgress(false);
    }
  }

  return (
    <>
      <PatientProfileCard
        patient={patient}
        onBack={onBack}
        totalSessions={record.sessions.length}
        completedSessions={completedSessions(record.sessions).length}
        progressEntries={record.progress.length}
      />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && error && <ErrorState title="Ачаалагдсангүй" hint={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <ProgressChartCard data={chartData} height={240} marginTopClass="mt-[26px]" hideWhenEmpty />

          <TherapySessionForm
            notes={notes}
            setNotes={setNotes}
            scheduledAt={scheduledAt}
            setScheduledAt={setScheduledAt}
            saving={savingSession}
            onSubmit={submitSession}
          />

          <ProgressEntryForm
            completionPct={completionPct}
            setCompletionPct={setCompletionPct}
            engagementScore={engagementScore}
            setEngagementScore={setEngagementScore}
            saving={savingProgress}
            formMsg={formMsg}
            onSubmit={submitProgress}
          />

          <SessionTimeline sessions={record.sessions} onMarkCompleted={markCompleted} />
        </>
      )}
    </>
  );
}
