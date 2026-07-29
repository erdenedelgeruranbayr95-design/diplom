import type { ListeningStats } from "@/types/track";
import type { Progress } from "@/types/therapy";

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  hint: string;
  unlocked: boolean;
  progressLabel: string;
}

function dayStreak(days: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  for (;;) {
    const k = d.toISOString().slice(0, 10);
    if (!days[k] || days[k] <= 0) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/* ListeningStats/Progress-оос badge тооцоолно — цэвэр функц, backend/state хамааралгүй. */
export function computeAchievements(stats: ListeningStats, progress: Progress[]): Achievement[] {
  const totalHours = stats.total / 3600;
  const trackCount = Object.keys(stats.byTrack).length;
  const streak = dayStreak(stats.days);
  const completedSessions = progress.filter((p) => (p.completionPct ?? 0) >= 100).length;
  const avgEngagement = progress.length ? progress.reduce((s, p) => s + (p.engagementScore ?? 0), 0) / progress.length : 0;

  return [
    {
      id: "first-listen",
      icon: "🎧",
      title: "Эхний алхам",
      hint: "Анхны дуугаа сонс",
      unlocked: stats.total > 0,
      progressLabel: stats.total > 0 ? "Дууссан" : "0 / 1",
    },
    {
      id: "hours-5",
      icon: "⏱",
      title: "5 цагийн аялал",
      hint: "Нийт 5 цаг сонс",
      unlocked: totalHours >= 5,
      progressLabel: `${Math.min(5, totalHours).toFixed(1)} / 5 цаг`,
    },
    {
      id: "hours-25",
      icon: "🏆",
      title: "25 цагийн тэвчээр",
      hint: "Нийт 25 цаг сонс",
      unlocked: totalHours >= 25,
      progressLabel: `${Math.min(25, totalHours).toFixed(1)} / 25 цаг`,
    },
    {
      id: "variety-10",
      icon: "🎵",
      title: "Олон талт сонсогч",
      hint: "10 өөр дуу сонс",
      unlocked: trackCount >= 10,
      progressLabel: `${Math.min(10, trackCount)} / 10 дуу`,
    },
    {
      id: "streak-3",
      icon: "🔥",
      title: "3 өдрийн дараалал",
      hint: "3 өдөр дараалан сонс",
      unlocked: streak >= 3,
      progressLabel: `${Math.min(3, streak)} / 3 өдөр`,
    },
    {
      id: "streak-7",
      icon: "⚡",
      title: "7 өдрийн дараалал",
      hint: "7 өдөр дараалан сонс",
      unlocked: streak >= 7,
      progressLabel: `${Math.min(7, streak)} / 7 өдөр`,
    },
    {
      id: "session-1",
      icon: "✅",
      title: "Анхны амжилт",
      hint: "1 эмчилгээний сессийг 100%-иар дуусга",
      unlocked: completedSessions >= 1,
      progressLabel: completedSessions >= 1 ? "Дууссан" : "0 / 1",
    },
    {
      id: "session-5",
      icon: "🌟",
      title: "Тогтмол ахиц",
      hint: "5 эмчилгээний сессийг 100%-иар дуусга",
      unlocked: completedSessions >= 5,
      progressLabel: `${Math.min(5, completedSessions)} / 5 сесс`,
    },
    {
      id: "engaged",
      icon: "💎",
      title: "Идэвхтэй оролцоо",
      hint: "Дундаж оролцооны оноо 80-аас дээш",
      unlocked: avgEngagement >= 80,
      progressLabel: `${Math.round(avgEngagement)} / 80`,
    },
  ];
}
