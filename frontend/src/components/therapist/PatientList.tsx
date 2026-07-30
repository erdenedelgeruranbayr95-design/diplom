"use client";

/* TherapistView.tsx-ийн томилогдсон хэрэглэгчдийн жагсаалт (хайлт + жагсаалт + сонголт) —
   премиум elevated-card table (Supabase Studio pattern) руу шинэчлэв, .plv-create/.plv-search/
   .bil-table/.ab-uname/.ab-uav legacy CSS-ийг Tailwind search pill + avatar row болгов.
   loading/err/onRetry/q/setQ/patients/onSelect props болон сонголтын логик бүхэлдээ хэвээр. */
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import UserAvatar from "@/components/ui/UserAvatar";
import { ActionButton } from "@/components/ui/ActionGroup";
import type { AssignedPatient } from "@/types/therapy";
import Icon from "@/components/ui/Icon";

export default function PatientList({
  loading,
  err,
  onRetry,
  q,
  setQ,
  patients,
  onSelect,
}: {
  loading: boolean;
  err: string;
  onRetry: () => void;
  q: string;
  setQ: (q: string) => void;
  patients: AssignedPatient[];
  onSelect: (p: AssignedPatient) => void;
}) {
  return (
    <>
      <div className="relative mb-5">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-faint pointer-events-none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[.05] border border-white/[.08] text-ink text-[14px] transition-[border-color,box-shadow,background] duration-250 focus:bg-white/[.08] focus:border-aqua/60 focus-visible:outline-none focus-visible:shadow-glow-aqua placeholder:text-faint"
          placeholder="Нэр эсвэл имэйлээр хайх…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Хэрэглэгч хайх"
        />
      </div>

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={onRetry} />}
      {!loading && !err && patients.length === 0 && (
        <Empty icon="stethoscope" title="Томилогдсон хэрэглэгч алга" hint="Админ таныг хэрэглэгчид томилохыг хүлээнэ үү" />
      )}

      {!loading && !err && patients.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
          <div className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Хэрэглэгч</span>
            <span className="mono max-[760px]:hidden">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {patients.map((p) => (
            <div
              className="grid grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:grid-cols-[1fr_1fr_.8fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13.5px] transition-colors duration-150 hover:bg-white/[.03]"
              key={p.id}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={p.patient.name} size="sm" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{p.patient.name}</span>
              </span>
              <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis max-[760px]:hidden">{p.patient.email}</span>
              <span className="text-faint font-mono text-[11px]">{new Date(p.createdAt).toLocaleDateString("mn-MN")}</span>
              <ActionButton variant="primary" size="sm" className="justify-self-end" onClick={() => onSelect(p)}>
                Нээх
                <Icon name="arrowRight" size={13} />
              </ActionButton>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
