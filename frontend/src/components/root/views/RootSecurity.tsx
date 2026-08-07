"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/player/StatCard";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import { Empty } from "@/components/ui/States";
import UserAvatar from "@/components/ui/UserAvatar";
import { listUserSessions, getSecurityOverview, type BlockedIpRow, type FailedLoginRow } from "@/lib/api/client";
import RootSection from "../RootSection";
import RootUserActions from "../RootUserActions";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow } from "@/types/auth";

/* Аюулгүй байдлын тойм:
   1. Түдгэлзсэн бүртгэлүүд — шууд идэвхжүүлэх/нууц үг сэргээх боломжтой.
   2. JWT Sessions — сонгосон хэрэглэгчийн идэвхтэй RefreshToken-ууд (GET /users/:id/sessions).
   3. Blocked IP · Failed Login — LoginAttempt хүснэгтэд бодитоор бичигдсэн бүртгэл
      (см. GET /security-overview) — "Blocked" гэдгийг сүүлийн 60 минутад >=5 амжилтгүй
      оролдлоготой IP гэж тодорхойлно (AuthController-ийн Throttle({limit:5,ttl:60000})-той
      нийцтэй босго). */
export default function RootSecurity({ data }: { data: RootData }) {
  const [sessionTarget, setSessionTarget] = useState<AdminUserRow | null>(null);
  const [sessions, setSessions] = useState<{ id: string; createdAt: string; expiresAt: string }[] | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const banned = data.users.filter((u) => u.status === "BANNED");
  const staff = data.users.filter((u) => u.role !== "ROOT");

  const [blockedIps, setBlockedIps] = useState<BlockedIpRow[] | null>(null);
  const [recentFailed, setRecentFailed] = useState<FailedLoginRow[] | null>(null);
  const [loadingSecurity, setLoadingSecurity] = useState(true);

  useEffect(() => {
    let alive = true;
    getSecurityOverview()
      .then((res) => {
        if (!alive) return;
        setBlockedIps(res.blockedIps);
        setRecentFailed(res.recentFailedLogins);
      })
      .catch(() => {
        if (alive) {
          setBlockedIps([]);
          setRecentFailed([]);
        }
      })
      .finally(() => alive && setLoadingSecurity(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!sessionTarget) {
      setSessions(null);
      return;
    }
    let alive = true;
    setLoadingSessions(true);
    listUserSessions(sessionTarget.id)
      .then((rows) => alive && setSessions(rows))
      .catch(() => alive && setSessions([]))
      .finally(() => alive && setLoadingSessions(false));
    return () => {
      alive = false;
    };
  }, [sessionTarget]);

  return (
    <RootSection
      title="Аюулгүй байдал"
      eyebrow="ROOT"
      description="PATCH /users/:id/status, GET/DELETE /users/:id/sessions — идэвхтэй сесс/түдгэлзүүлэлт бодитоор удирдагдана."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-2 max-nav:grid-cols-1 gap-3.5 mb-6">
        <StatCard icon="users" color="c-aqua" value={data.users.length.toLocaleString()} label="Нийт бүртгэл" />
        <StatCard icon="eye" color="c-rose" value={banned.length.toLocaleString()} label="Түдгэлзүүлсэн" />
      </div>

      <div className="mb-4">
        <span className="mono !text-meta">JWT Sessions</span>
        <p className="text-dim text-caption mt-1">Хэрэглэгч сонгож идэвхтэй session-ийг харна.</p>
        <select
          className="mt-2 w-full max-w-[420px] bg-white/[.04] border border-white/[.08] text-ink text-body rounded-full py-2.5 px-4 transition-colors duration-150 hover:bg-white/[.07] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={sessionTarget?.id || ""}
          onChange={(e) => setSessionTarget(staff.find((u) => u.id === e.target.value) || null)}
          aria-label="Session харах хэрэглэгч сонгох"
        >
          <option className="bg-surface text-ink" value="">— Хэрэглэгч сонгох —</option>
          {staff.map((u) => (
            <option className="bg-surface text-ink" key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      {sessionTarget && (
        <div className="mb-8">
          {loadingSessions ? (
            <p className="text-dim text-body">Ачаалж байна…</p>
          ) : !sessions || sessions.length === 0 ? (
            <Empty icon="eye" title="Идэвхтэй session алга" />
          ) : (
            <TableCard>
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
                <span className="mono">Session ID</span>
                <span className="mono">Үүссэн</span>
                <span className="mono">Дуусах</span>
              </div>
              {sessions.map((s) => (
                <div key={s.id} className="grid grid-cols-[1fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body">
                  <span className="font-mono text-caption text-faint truncate">{s.id}</span>
                  <span className="text-dim text-caption">{new Date(s.createdAt).toLocaleString("mn-MN")}</span>
                  <span className="text-dim text-caption">{new Date(s.expiresAt).toLocaleString("mn-MN")}</span>
                </div>
              ))}
            </TableCard>
          )}
        </div>
      )}

      <div className="mb-4">
        <span className="mono !text-meta">Түдгэлзүүлсэн бүртгэлүүд</span>
      </div>
      {banned.length === 0 ? (
        <Empty icon="eye" title="Түдгэлзүүлсэн бүртгэл алга" hint="Хэрэглэгчийн жагсаалтаас 'Түдгэлзүүлэх' товчоор энд нэмэгдэнэ" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1fr_1.4fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Нэр</span>
            <span className="mono max-nav:hidden">Имэйл</span>
            <span className="mono text-right">Удирдлага</span>
          </div>
          {banned.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-[1fr_1.4fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={u.name} size="sm" />
                <span className="truncate">{u.name}</span>
              </span>
              <span className="text-dim truncate max-nav:hidden">{u.email}</span>
              <RootUserActions user={u} onChanged={data.reload} />
            </div>
          ))}
        </TableCard>
      )}

      <div className="mt-8 mb-4">
        <span className="mono !text-meta">Blocked IP (сүүлийн 60 минут, ≥5 амжилтгүй оролдлого)</span>
      </div>
      {loadingSecurity ? (
        <p className="text-dim text-body">Ачаалж байна…</p>
      ) : !blockedIps || blockedIps.length === 0 ? (
        <Empty icon="eye" title="Блоклогдсон IP алга" hint="Сүүлийн 60 минутад 5-аас дээш амжилтгүй нэвтрэлт хийсэн IP энд гарна" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">IP хаяг</span>
            <span className="mono">Амжилтгүй</span>
            <span className="mono max-nav:hidden">Өөр имэйл</span>
            <span className="mono text-right">Сүүлд</span>
          </div>
          {blockedIps.map((row) => (
            <div key={row.ip} className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body">
              <span className="font-mono text-caption text-ink truncate">{row.ip}</span>
              <span className="text-danger text-caption font-semibold">{row.failedCount}</span>
              <span className="text-dim text-caption max-nav:hidden">{row.distinctEmails}</span>
              <span className="text-dim text-caption text-right">{new Date(row.lastAttemptAt).toLocaleString("mn-MN")}</span>
            </div>
          ))}
        </TableCard>
      )}

      <div className="mt-8 mb-4">
        <span className="mono !text-meta">Сүүлийн амжилтгүй нэвтрэлтүүд</span>
      </div>
      {loadingSecurity ? (
        <p className="text-dim text-body">Ачаалж байна…</p>
      ) : !recentFailed || recentFailed.length === 0 ? (
        <Empty icon="eye" title="Амжилтгүй нэвтрэлт алга" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Имэйл</span>
            <span className="mono">IP</span>
            <span className="mono text-right">Огноо</span>
          </div>
          {recentFailed.map((row) => (
            <div key={row.id} className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body">
              <span className="text-ink truncate">{row.email}</span>
              <span className="font-mono text-caption text-dim truncate">{row.ip || "—"}</span>
              <span className="text-dim text-caption text-right">{new Date(row.createdAt).toLocaleString("mn-MN")}</span>
            </div>
          ))}
        </TableCard>
      )}

      <p className="mono !text-micro mt-6">
        <StatusBadge label="Хязгаарлалт" tone="faint" /> 2FA · имэйл баталгаажуулалт хараахан хэрэгжээгүй.
      </p>
    </RootSection>
  );
}
