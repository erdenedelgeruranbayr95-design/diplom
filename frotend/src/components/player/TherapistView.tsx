"use client";

/* Эмчийн (THERAPIST) хяналтын самбар — премиум dashboard дизайн руу шинэчлэв (Admin/Home-той
   ижил визуал хэл). Assigned patient сонгоод session/progress удирдана. Ачаалах/сонгох/
   session-progress CRUD логик бүхэлдээ хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useEffect, useMemo, useState } from "react";
import {
  listMyPatients,
  listTherapySessions,
  createTherapySession,
  updateTherapySession,
  listProgress,
  createProgress,
} from "@/lib/api/client";
import TherapistHeader from "@/components/therapist/TherapistHeader";
import PatientList from "@/components/therapist/PatientList";
import PatientProfileCard from "@/components/therapist/PatientProfileCard";
import ProgressChartCard from "@/components/ui/ProgressChartCard";
import SessionTimeline from "@/components/therapist/SessionTimeline";
import TherapySessionForm from "@/components/therapist/TherapySessionForm";
import ProgressEntryForm from "@/components/therapist/ProgressEntryForm";
import { Loading, ErrorState } from "@/components/ui/States";
import PromoBanner from "@/components/ui/PromoBanner";
import type { AssignedPatient, TherapySession, Progress } from "@/types/therapy";

export default function TherapistView({ onGoHome }: { onGoHome: () => void }) {
  const [patients, setPatients] = useState<AssignedPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<AssignedPatient | null>(null);

  function load() {
    setLoading(true);
    setErr("");
    listMyPatients()
      .then(setPatients)
      .catch((e) => setErr(e.message || "Жагсаалт ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter((p) => p.patient.name.toLowerCase().includes(term) || p.patient.email.toLowerCase().includes(term));
  }, [patients, q]);

  const activeCount = patients.length;

  if (selected) {
    return <PatientDetail patient={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <TherapistHeader patientCount={activeCount} />

      <PatientList loading={loading} err={err} onRetry={load} q={q} setQ={setQ} patients={filtered} onSelect={setSelected} />

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."
        actionLabel="🎧 Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}

function PatientDetail({ patient, onBack }: { patient: AssignedPatient; onBack: () => void }) {
  const userId = patient.userId;
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [notes, setNotes] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [savingSession, setSavingSession] = useState(false);

  const [completionPct, setCompletionPct] = useState(50);
  const [engagementScore, setEngagementScore] = useState(50);
  const [savingProgress, setSavingProgress] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    Promise.all([listTherapySessions(userId), listProgress(userId)])
      .then(([s, p]) => {
        setSessions(s);
        setProgress(p);
      })
      .catch((e) => setErr(e.message || "Мэдээлэл ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function submitSession(e: React.FormEvent) {
    e.preventDefault();
    setSavingSession(true);
    setFormMsg("");
    try {
      await createTherapySession({ userId, notes: notes.trim() || undefined, scheduledAt: scheduledAt || undefined });
      setNotes("");
      setScheduledAt("");
      setFormMsg("✅ Сесс үүсгэгдлээ");
      load();
    } catch (e) {
      setFormMsg("❌ " + (e as Error).message);
    } finally {
      setSavingSession(false);
    }
  }

  async function markCompleted(id: string) {
    try {
      await updateTherapySession(id, { status: "COMPLETED", completedAt: new Date().toISOString() });
      load();
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  async function submitProgress(e: React.FormEvent) {
    e.preventDefault();
    setSavingProgress(true);
    setFormMsg("");
    try {
      await createProgress({ userId, completionPct, engagementScore });
      setFormMsg("✅ Ахиц бичигдлээ");
      load();
    } catch (e) {
      setFormMsg("❌ " + (e as Error).message);
    } finally {
      setSavingProgress(false);
    }
  }

  const chartData = useMemo(
    () =>
      [...progress]
        .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime())
        .map((p) => ({
          date: new Date(p.recordedAt).toLocaleDateString("mn-MN", { month: "short", day: "numeric" }),
          completionPct: p.completionPct ?? null,
          engagementScore: p.engagementScore ?? null,
        })),
    [progress],
  );

  const completedCount = sessions.filter((s) => s.status === "COMPLETED").length;

  return (
    <>
      <PatientProfileCard
        patient={patient}
        onBack={onBack}
        totalSessions={sessions.length}
        completedSessions={completedCount}
        progressEntries={progress.length}
      />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
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

          <SessionTimeline sessions={sessions} onMarkCompleted={markCompleted} />
        </>
      )}
    </>
  );
}
