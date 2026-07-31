"use client";

import { useState } from "react";
import StatCard from "@/components/player/StatCard";
import { TableCard } from "@/components/ui/Surface";
import StatusBadge from "@/components/ui/StatusBadge";
import { Empty } from "@/components/ui/States";
import { ActionButton } from "@/components/ui/ActionGroup";
import UserAvatar from "@/components/ui/UserAvatar";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import { setUserSubscription } from "@/lib/api/client";
import RootSection from "../RootSection";
import type { RootData } from "@/lib/root/hooks/useRootMetrics";
import type { AdminUserRow } from "@/types/auth";

/* PRO эрхийн удирдлага — PATCH /users/:id/subscription (аль хэдийн байгаа endpoint).
   `admin/ConfirmDialog` ба `ProviderToast`-ыг дахин ашиглана. */
export default function RootPro({ data }: { data: RootData }) {
  const toast = useToast();
  const [target, setTarget] = useState<{ user: AdminUserRow; grant: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  const staff = new Set(["ROOT", "ADMIN"]);
  const rows = data.users.filter((u) => !staff.has(u.role));
  const pro = rows.filter((u) => u.subActive);

  async function apply() {
    if (!target || busy) return;
    setBusy(true);
    try {
      await setUserSubscription(target.user.id, target.grant, target.grant ? "МЭДРЭХ PRO" : undefined);
      toast.success(target.grant ? `${target.user.name} — PRO эрх олгогдлоо ✓` : `${target.user.name} — PRO эрх цуцлагдлаа`);
      setTarget(null);
      data.reload();
    } catch (err) {
      toast.error((err as Error).message || "PRO эрх өөрчлөхөд алдаа гарлаа");
    } finally {
      setBusy(false);
    }
  }

  return (
    <RootSection
      title="PRO эрх"
      eyebrow="ROOT"
      description="PATCH /users/:id/subscription — эрх DB-д бодитоор бичигдэнэ, хэрэглэгч шууд харна."
      loading={data.loading}
      error={data.error}
      onRetry={data.reload}
    >
      <div className="grid grid-cols-3 max-nav:grid-cols-1 gap-3.5 mb-6">
        <StatCard icon="crown" color="c-gold" value={pro.length.toLocaleString()} label="PRO хэрэглэгч" />
        <StatCard icon="users" color="c-aqua" value={rows.length.toLocaleString()} label="Нийт хэрэглэгч" />
        <StatCard
          icon="chart"
          color="c-purple"
          value={rows.length ? Math.round((pro.length / rows.length) * 100) + "%" : "0%"}
          label="Хөрвөлт"
        />
      </div>

      {rows.length === 0 ? (
        <Empty icon="users" title="Хэрэглэгч алга" />
      ) : (
        <TableCard>
          <div className="grid grid-cols-[1.2fr_1.5fr_.8fr_.9fr_auto] max-nav:grid-cols-[1fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Нэр</span>
            <span className="mono max-nav:hidden">Имэйл</span>
            <span className="mono">Төлөв</span>
            <span className="mono max-nav:hidden">План</span>
            <span></span>
          </div>
          {rows.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-[1.2fr_1.5fr_.8fr_.9fr_auto] max-nav:grid-cols-[1fr_.8fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={u.name} size="sm" />
                <span className="truncate">{u.name}</span>
              </span>
              <span className="text-dim truncate max-nav:hidden">{u.email}</span>
              {u.subActive ? <StatusBadge label="PRO" tone="aqua" /> : <StatusBadge label="Үнэгүй" tone="faint" />}
              <span className="text-dim text-caption truncate max-nav:hidden">{u.subPlan || "—"}</span>
              <ActionButton
                variant={u.subActive ? "danger" : "primary"}
                size="sm"
                className="justify-self-end"
                onClick={() => setTarget({ user: u, grant: !u.subActive })}
              >
                {u.subActive ? "Цуцлах" : "Олгох"}
              </ActionButton>
            </div>
          ))}
        </TableCard>
      )}

      <ConfirmDialog
        open={!!target}
        title={target?.grant ? "PRO эрх олгох уу?" : "PRO эрхийг цуцлах уу?"}
        description={target ? `${target.user.name} (${target.user.email})` : ""}
        confirmLabel={target?.grant ? "Олгох" : "Цуцлах"}
        tone={target?.grant ? "primary" : "danger"}
        onConfirm={apply}
        onCancel={() => setTarget(null)}
      />
    </RootSection>
  );
}
