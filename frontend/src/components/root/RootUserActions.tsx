"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ui/ActionGroup";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/providers/ToastProvider";
import * as api from "@/lib/api/client";
import type { AdminUserRow, UserRole } from "@/types/auth";

const ASSIGNABLE_ROLES: UserRole[] = ["ADMIN", "CURATOR", "MODERATOR", "THERAPIST", "USER", "PARENT"];
const ROLE_LABEL_SHORT: Record<UserRole, string> = {
  ROOT: "ROOT",
  ADMIN: "Админ",
  CURATOR: "Куратор",
  MODERATOR: "Модератор",
  THERAPIST: "Эмч",
  USER: "Хэрэглэгч",
  PARENT: "Эцэг эх",
};

type Confirm =
  | { kind: "status"; user: AdminUserRow; next: "ACTIVE" | "BANNED" }
  | { kind: "reset"; user: AdminUserRow }
  | { kind: "logout"; user: AdminUserRow }
  | { kind: "delete"; user: AdminUserRow };

/* ROOT-ийн хэрэглэгчийн мөр доторх удирдлагын товчнууд — дүр солих (select), төлөв
   (идэвхжүүлэх/түдгэлзүүлэх), нууц үг сэргээх, бүх session-ийг албадан гаргах.
   `RootPro.tsx`-тэй ижил `ConfirmDialog` загварыг дагана. */
export default function RootUserActions({ user, onChanged }: { user: AdminUserRow; onChanged: () => void }) {
  const toast = useToast();
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function changeRole(role: UserRole) {
    setBusy(true);
    try {
      await api.setUserRole(user.id, role);
      toast.success(`${user.name} — дүр ${ROLE_LABEL_SHORT[role]} болов`);
      onChanged();
    } catch (err) {
      toast.error((err as Error).message || "Дүр солиход алдаа гарлаа");
    } finally {
      setBusy(false);
    }
  }

  async function apply() {
    if (!confirm || busy) return;
    setBusy(true);
    try {
      if (confirm.kind === "status") {
        await api.setUserStatus(confirm.user.id, confirm.next);
        toast.success(confirm.next === "BANNED" ? `${confirm.user.name} түдгэлзүүлэгдлээ` : `${confirm.user.name} идэвхжлээ`);
        onChanged();
      } else if (confirm.kind === "reset") {
        const { tempPassword: pw } = await api.resetUserPassword(confirm.user.id);
        setTempPassword(pw);
        toast.success("Түр нууц үг үүслээ — хэрэглэгчид дамжуулна уу");
      } else if (confirm.kind === "logout") {
        await api.revokeUserSessions(confirm.user.id);
        toast.success(`${confirm.user.name}-ийн бүх төхөөрөмж гарлаа`);
      } else {
        await api.deleteUser(confirm.user.id);
        toast.success(`${confirm.user.name} устгагдлаа`);
        onChanged();
      }
      setConfirm(null);
    } catch (err) {
      toast.error((err as Error).message || "Үйлдэл амжилтгүй боллоо");
    } finally {
      setBusy(false);
    }
  }

  if (user.role === "ROOT") {
    return <span className="text-faint text-caption">Системийн эзэмшигч</span>;
  }

  return (
    <>
      <div className="flex items-center gap-1.5 flex-wrap justify-end">
        <select
          className="bg-white/[.04] border border-white/[.08] text-ink text-caption rounded-full py-1.5 px-3 transition-colors duration-150 hover:bg-white/[.07] focus-visible:outline-none focus-visible:shadow-glow-aqua"
          value={user.role}
          disabled={busy}
          onChange={(e) => changeRole(e.target.value as UserRole)}
          aria-label={user.name + " — дүр солих"}
        >
          {ASSIGNABLE_ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL_SHORT[r]}
            </option>
          ))}
        </select>
        <ActionButton
          variant={user.status === "BANNED" ? "primary" : "danger"}
          size="sm"
          onClick={() => setConfirm({ kind: "status", user, next: user.status === "BANNED" ? "ACTIVE" : "BANNED" })}
        >
          {user.status === "BANNED" ? "Идэвхжүүлэх" : "Түдгэлзүүлэх"}
        </ActionButton>
        <ActionButton variant="secondary" size="sm" onClick={() => setConfirm({ kind: "reset", user })}>
          Нууц үг сэргээх
        </ActionButton>
        <ActionButton variant="secondary" size="sm" onClick={() => setConfirm({ kind: "logout", user })}>
          Гаргах
        </ActionButton>
        <ActionButton variant="danger" size="sm" onClick={() => setConfirm({ kind: "delete", user })}>
          Устгах
        </ActionButton>
      </div>

      <ConfirmDialog
        open={!!confirm}
        title={
          confirm?.kind === "status"
            ? confirm.next === "BANNED"
              ? "Хэрэглэгчийг түдгэлзүүлэх үү?"
              : "Хэрэглэгчийг идэвхжүүлэх үү?"
            : confirm?.kind === "reset"
              ? "Түр нууц үг үүсгэх үү?"
              : confirm?.kind === "logout"
                ? "Бүх төхөөрөмжийг гаргах уу?"
                : "Хэрэглэгчийг устгах уу?"
        }
        description={
          confirm
            ? `${confirm.user.name} (${confirm.user.email})` +
              (confirm.kind === "status" && confirm.next === "BANNED" ? " — идэвхтэй бүх session нэгэн зэрэг цуцлагдана." : "") +
              (confirm.kind === "delete" ? " — энэ үйлдлийг буцаах боломжгүй, бүх дата устана." : "")
            : ""
        }
        confirmLabel={
          confirm?.kind === "status" && confirm.next === "BANNED"
            ? "Түдгэлзүүлэх"
            : confirm?.kind === "reset"
              ? "Үүсгэх"
              : confirm?.kind === "logout"
                ? "Гаргах"
                : confirm?.kind === "delete"
                  ? "Устгах"
                  : "Идэвхжүүлэх"
        }
        tone={(confirm?.kind === "status" && confirm.next === "BANNED") || confirm?.kind === "delete" ? "danger" : "primary"}
        onConfirm={apply}
        onCancel={() => setConfirm(null)}
      />

      <ConfirmDialog
        open={!!tempPassword}
        title="Түр нууц үг үүслээ"
        description={tempPassword ? `Шинэ нууц үг: ${tempPassword} — энэ утгыг дахин харах боломжгүй, хэрэглэгчид одоо дамжуулна уу.` : ""}
        confirmLabel="Хаах"
        tone="primary"
        onConfirm={() => setTempPassword(null)}
        onCancel={() => setTempPassword(null)}
      />
    </>
  );
}
