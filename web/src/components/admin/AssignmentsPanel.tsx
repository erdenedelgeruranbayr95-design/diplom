"use client";

/* AdminPanel.tsx-ийн эмч-хэрэглэгч томилолтын таб — тусад нь гаргасан. CSS/behavior
   бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { Loading, Empty } from "@/components/ui/States";
import type { AdminUserRow } from "@/types/auth";
import type { TherapistAssignmentRow } from "@/types/therapy";

export default function AssignmentsPanel({
  therapists,
  patients,
  assignTherapistId,
  setAssignTherapistId,
  assignUserId,
  setAssignUserId,
  assignMsg,
  assigning,
  onSubmit,
  loading,
  assignments,
  onRemove,
}: {
  therapists: AdminUserRow[];
  patients: AdminUserRow[];
  assignTherapistId: string;
  setAssignTherapistId: (id: string) => void;
  assignUserId: string;
  setAssignUserId: (id: string) => void;
  assignMsg: string;
  assigning: boolean;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  assignments: TherapistAssignmentRow[];
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <form className="adm-form" onSubmit={onSubmit}>
        <span className="mono" style={{ fontSize: 9.5 }}>
          Эмчид хэрэглэгч томилох
        </span>
        <div className="adm-form-row">
          <label>
            <span className="mono">Эмч *</span>
            <select value={assignTherapistId} onChange={(e) => setAssignTherapistId(e.target.value)}>
              <option value="">— сонгох —</option>
              {therapists.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mono">Хэрэглэгч *</span>
            <select value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)}>
              <option value="">— сонгох —</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>
        </div>
        {assignMsg && (
          <p className={assignMsg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
            {assignMsg}
          </p>
        )}
        <button type="submit" className="bt bt-a auth-sub" disabled={assigning}>
          {assigning ? "Томилж байна…" : "+ Томилох"}
        </button>
      </form>

      {loading && <Loading label="Томилолт ачааллаж байна…" />}
      {!loading && assignments.length === 0 && (
        <Empty icon="🧑‍⚕️" title="Одоогоор томилолт алга" hint="Дээрх формоор эмч-хэрэглэгч холбоос үүсгээрэй" />
      )}
      {!loading && assignments.length > 0 && (
        <div className="border border-line rounded-sm max-h-[300px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Эмч</span>
            <span className="mono">Хэрэглэгч</span>
            <span></span>
          </div>
          {assignments.map((a, i) => (
            <div
              className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-line text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.035] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={a.id}
            >
              <span>
                {a.therapist.name} <i className="adm-artist">— {a.therapist.email}</i>
              </span>
              <span>
                {a.patient.name} <i className="adm-artist">— {a.patient.email}</i>
              </span>
              <button className="adm-del" onClick={() => onRemove(a.id)} aria-label="Томилолт цуцлах">
                Цуцлах
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
