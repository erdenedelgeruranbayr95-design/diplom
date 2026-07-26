"use client";

/* Эмчийн (THERAPIST) хяналтын самбар — AdminView.tsx-ийн визуал бүтцийг (ab-head → st-cards →
   ab-card → bil-table → sp-banner) дагана. Assigned patient сонгоод session/progress удирдана. */
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatCard from "./StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import { ICONS } from "@/lib/player/constants";
import {
  listMyPatients,
  listTherapySessions,
  createTherapySession,
  updateTherapySession,
  listProgress,
  createProgress,
} from "@/lib/api/client";
import type { AssignedPatient, SessionStatus, TherapySession, Progress } from "@/types/therapy";

const STATUS_LABEL: Record<SessionStatus, string> = {
  SCHEDULED: "Товлогдсон",
  IN_PROGRESS: "Явагдаж буй",
  COMPLETED: "Дууссан",
  CANCELLED: "Цуцлагдсан",
};

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
      <div className="ab-head">
        <div>
          <span className="mono">Эмчийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            Танд томилогдсон хэрэглэгчид
          </h2>
        </div>
      </div>

      <div className="st-cards">
        <StatCard icon={ICONS.users} color="c-aqua" value={activeCount} label="Томилогдсон хэрэглэгч" />
      </div>

      <form className="plv-create" onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 20 }}>
        <input className="plv-search" placeholder="Нэр эсвэл имэйлээр хайх…" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}
      {!loading && !err && filtered.length === 0 && (
        <Empty icon="🧑‍⚕️" title="Томилогдсон хэрэглэгч алга" hint="Админ таныг хэрэглэгчид томилохыг хүлээнэ үү" />
      )}

      {!loading && !err && filtered.length > 0 && (
        <div className="bil-table">
          <div className="bil-row th-prow bil-head">
            <span className="mono">Хэрэглэгч</span>
            <span className="mono">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {filtered.map((p) => (
            <div className="bil-row th-prow" key={p.id}>
              <span className="ab-uname">
                <i className="ab-uav" aria-hidden="true">
                  {(p.patient.name || "?").charAt(0).toUpperCase()}
                </i>
                {p.patient.name}
              </span>
              <span className="bil-mth">{p.patient.email}</span>
              <span>{new Date(p.createdAt).toLocaleDateString("mn-MN")}</span>
              <button className="bt bt-a" onClick={() => setSelected(p)}>
                Нээх →
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="sp-banner" style={{ marginTop: 30 }}>
        <div>
          <b>Тоглуулагч руу шилжих</b>
          <p>Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай.</p>
        </div>
        <button className="bt" onClick={onGoHome}>
          🎧 Тоглуулагч нээх
        </button>
      </div>
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
      <div className="ab-head">
        <div>
          <span className="mono">Эмчийн самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            {patient.patient.name}
          </h2>
          <p className="dv-lead" style={{ marginTop: 4 }}>
            {patient.patient.email}
          </p>
        </div>
        <button className="bt" onClick={onBack}>
          ← Жагсаалт руу
        </button>
      </div>

      <div className="st-cards">
        <StatCard icon={ICONS.music} color="c-aqua" value={sessions.length} label="Нийт сесс" />
        <StatCard icon={ICONS.star} color="c-gold" value={completedCount} label="Дууссан сесс" />
        <StatCard icon={ICONS.vibrate} color="c-rose" value={progress.length} label="Ахицын бичлэг" />
      </div>

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          {chartData.length > 0 && (
            <div className="ab-card chart-fade-in">
              <div className="ab-card-h">
                <div>
                  <b>Ахицын график</b>
                  <p>Гүйцэтгэл (%) болон оролцооны онооны цаг хугацааны хандлага.</p>
                </div>
              </div>
              <div style={{ width: "100%", height: 240, marginTop: 16 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
                    <XAxis dataKey="date" stroke="var(--faint)" fontSize={12} />
                    <YAxis stroke="var(--faint)" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: "#101615", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }} />
                    <Legend />
                    <Line type="monotone" dataKey="completionPct" name="Гүйцэтгэл %" stroke="var(--aqua, #38e8ce)" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="engagementScore" name="Оролцоо" stroke="#c58cff" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="ab-card" style={{ marginTop: 16 }}>
            <div className="ab-card-h">
              <div>
                <b>Шинэ эмчилгээний сесс</b>
                <p>Тэмдэглэл, товлосон огноогоор шинэ сесс үүсгэнэ.</p>
              </div>
            </div>
            <form className="ab-bcast" onSubmit={submitSession} style={{ flexWrap: "wrap" }}>
              <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Тэмдэглэл…" style={{ flex: 2, minWidth: 200 }} />
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} style={{ flex: 1, minWidth: 180 }} />
              <button type="submit" className="bt bt-a" disabled={savingSession}>
                {savingSession ? "Үүсгэж байна…" : "Үүсгэх"}
              </button>
            </form>
          </div>

          <div className="ab-card" style={{ marginTop: 16 }}>
            <div className="ab-card-h">
              <div>
                <b>Ахиц бичих</b>
                <p>Гүйцэтгэл болон оролцооны оноог 0–100 хооронд оруулна.</p>
              </div>
            </div>
            <form className="ab-bcast" onSubmit={submitProgress} style={{ flexWrap: "wrap", alignItems: "center" }}>
              <label className="mono" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                Гүйцэтгэл % ({completionPct})
                <input type="range" min={0} max={100} value={completionPct} onChange={(e) => setCompletionPct(Number(e.target.value))} />
              </label>
              <label className="mono" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                Оролцоо ({engagementScore})
                <input type="range" min={0} max={100} value={engagementScore} onChange={(e) => setEngagementScore(Number(e.target.value))} />
              </label>
              <button type="submit" className="bt bt-a" disabled={savingProgress}>
                {savingProgress ? "Бичиж байна…" : "Хадгалах"}
              </button>
            </form>
            {formMsg && <p className={formMsg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13, marginTop: 8 }}>{formMsg}</p>}
          </div>

          <h3 className="st-h">Сессийн түүх</h3>
          {sessions.length === 0 ? (
            <p className="adm-empty">Одоогоор сесс алга</p>
          ) : (
            <div className="bil-table">
              <div className="bil-row th-srow bil-head">
                <span className="mono">Тэмдэглэл</span>
                <span className="mono">Товлосон</span>
                <span className="mono">Статус</span>
                <span></span>
              </div>
              {sessions.map((s) => (
                <div className="bil-row th-srow" key={s.id}>
                  <span>{s.notes || "—"}</span>
                  <span>{s.scheduledAt ? new Date(s.scheduledAt).toLocaleString("mn-MN") : "—"}</span>
                  <span className={s.status === "COMPLETED" ? "bil-ok" : "ab-free"}>{STATUS_LABEL[s.status]}</span>
                  {s.status !== "COMPLETED" && s.status !== "CANCELLED" ? (
                    <button className="adm-del" onClick={() => markCompleted(s.id)}>
                      Дуусгах
                    </button>
                  ) : (
                    <span></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
