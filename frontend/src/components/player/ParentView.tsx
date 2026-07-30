"use client";

/* Эцэг эхийн (PARENT) самбар — TherapistView.tsx-ийн list→detail хэв маяг, премиум dashboard
   дизайныг (Admin/Therapist/Home-той ижил визуал хэл) дагана, гэхдээ бүрэн зөвхөн унших:
   session/progress бичих ямар ч форм байхгүй. "Эмчийн зөвлөмж" гэдэг нь дууссан сессүүдийн
   therapist-ийн бичсэн notes талбарыг харуулна (тусдаа recommendation загвар backend-д байхгүй
   тул шинээр нэмэхгүй). Ачаалах/сонголт логик бүхэлдээ хэвээр — зөвхөн визуал давхарга
   шинэчлэгдсэн. */
import { useEffect, useMemo, useState } from "react";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import UserAvatar from "@/components/ui/UserAvatar";
import { ActionButton } from "@/components/ui/ActionGroup";
import PromoBanner from "@/components/ui/PromoBanner";
import { listMyChildren, listTherapySessions, listProgress } from "@/lib/api/client";
import ParentHeader from "@/components/parent/ParentHeader";
import ChildOverviewCard from "@/components/parent/ChildOverviewCard";
import StatisticsCards from "@/components/parent/StatisticsCards";
import ProgressChartCard from "@/components/ui/ProgressChartCard";
import RecommendationPanel from "@/components/parent/RecommendationPanel";
import SessionHistoryTable from "@/components/parent/SessionHistoryTable";
import type { LinkedChild, TherapySession, Progress } from "@/types/therapy";
import Icon from "@/components/ui/Icon";

export default function ParentView({ onGoHome }: { onGoHome: () => void }) {
  const [children, setChildren] = useState<LinkedChild[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState<LinkedChild | null>(null);

  function load() {
    setLoading(true);
    setErr("");
    listMyChildren()
      .then((rows) => {
        setChildren(rows);
        if (rows.length === 1) setSelected(rows[0]);
      })
      .catch((e) => setErr(e.message || "Жагсаалт ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  if (selected) {
    return <ChildDetail child={selected} onBack={children.length > 1 ? () => setSelected(null) : undefined} onGoHome={onGoHome} />;
  }

  return (
    <>
      <ParentHeader childCount={children.length} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}
      {!loading && !err && children.length === 0 && (
        <Empty icon="family" title="Холбогдсон хүүхэд алга" hint="Админ таныг хүүхэдтэй холбохыг хүлээнэ үү" />
      )}

      {!loading && !err && children.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
          <div className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Хүүхэд</span>
            <span className="mono max-[760px]:hidden">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {children.map((c) => (
            <div
              className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13.5px] transition-colors duration-150 hover:bg-white/[.03]"
              key={c.id}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={c.child.name} size="sm" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{c.child.name}</span>
              </span>
              <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis max-[760px]:hidden">{c.child.email}</span>
              <span className="text-faint font-mono text-[11px]">{new Date(c.createdAt).toLocaleDateString("mn-MN")}</span>
              <ActionButton variant="primary" size="sm" className="justify-self-end" onClick={() => setSelected(c)}>
                Нээх
                <Icon name="arrowRight" size={13} />
              </ActionButton>
            </div>
          ))}
        </div>
      )}

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Аппын бусад боломжуудыг үзээрэй."
        actionLabel="Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}

function ChildDetail({ child, onBack, onGoHome }: { child: LinkedChild; onBack?: () => void; onGoHome: () => void }) {
  const userId = child.childUserId;
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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

  const completedSessions = sessions.filter((s) => s.status === "COMPLETED");
  const recommendations = completedSessions.filter((s) => s.notes && s.notes.trim().length > 0);

  return (
    <>
      <ChildOverviewCard child={child} onBack={onBack} onGoHome={onGoHome} />

      <StatisticsCards totalSessions={sessions.length} completedSessions={completedSessions.length} progressEntries={progress.length} />

      {loading && <Loading label="Ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          <ProgressChartCard data={chartData} height={240} marginTopClass="mt-[26px]" hideWhenEmpty />

          <RecommendationPanel recommendations={recommendations} />

          <SessionHistoryTable sessions={sessions} />
        </>
      )}
    </>
  );
}
