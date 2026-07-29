"use client";

/* AdminPanel.tsx-ийн эмч-хэрэглэгч томилолтын таб — премиум relationship card (Linear Admin
   pattern) руу шинэчлэв, .adm-form/.adm-form-row legacy CSS-ийг Tailwind form card, мөр
   бүрийг эмч→хэрэглэгч холбоос badge-тэй харуулав. therapists/patients/assignTherapistId/
   assignUserId/assignMsg/assigning/onSubmit/loading/assignments/onRemove props бүгд хэвээр. */
import { Loading, Empty } from "@/components/ui/States";
import type { AdminUserRow } from "@/types/auth";
import type { TherapistAssignmentRow } from "@/types/therapy";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-[9px]";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-[14.5px] p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua";

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
      <form className="flex flex-col gap-3.5 border border-white/[.08] rounded-2xl p-5 mb-5 bg-white/[.02]" onSubmit={onSubmit}>
        <div>
          <b className="block font-display font-semibold text-[15px] text-ink">Эмчид хэрэглэгч томилох</b>
          <p className="text-dim text-[12.5px] mt-0.5">Эмч-хэрэглэгчийн харилцаа үүсгэнэ</p>
        </div>
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Эмч *</span>
            <select className={inputCls} value={assignTherapistId} onChange={(e) => setAssignTherapistId(e.target.value)}>
              <option className="bg-[#0D1414] text-ink" value="">
                — сонгох —
              </option>
              {therapists.map((t) => (
                <option className="bg-[#0D1414] text-ink" key={t.id} value={t.id}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
          </label>
          <label className={labelCls}>
            <span className={captionCls}>Хэрэглэгч *</span>
            <select className={inputCls} value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)}>
              <option className="bg-[#0D1414] text-ink" value="">
                — сонгох —
              </option>
              {patients.map((p) => (
                <option className="bg-[#0D1414] text-ink" key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>
        </div>
        {assignMsg && (
          <p className={"text-[13px] " + (assignMsg.startsWith("✅") ? "text-aqua" : "text-[#E88A9B]")} role="status">
            {assignMsg}
          </p>
        )}
        <button
          type="submit"
          className="rounded-full text-[13.5px] font-semibold bg-aqua text-[#04100E] py-2.5 px-5 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:shadow-glow-aqua w-fit"
          disabled={assigning}
        >
          {assigning ? "Томилж байна…" : "+ Томилох"}
        </button>
      </form>

      {loading && <Loading label="Томилолт ачааллаж байна…" />}
      {!loading && assignments.length === 0 && (
        <Empty icon="🧑‍⚕️" title="Одоогоор томилолт алга" hint="Дээрх формоор эмч-хэрэглэгч холбоос үүсгээрэй" />
      )}
      {!loading && assignments.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-[12.5px] bg-white/[.02] sticky top-0 z-[1]">
            <span className="mono">Эмч</span>
            <span className="mono">Хэрэглэгч</span>
            <span></span>
          </div>
          {assignments.map((a, i) => (
            <div
              className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-[13.5px] transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={a.id}
            >
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{a.therapist.name}</span>
                <i className="not-italic text-dim text-[11.5px] whitespace-nowrap overflow-hidden text-ellipsis">{a.therapist.email}</i>
              </span>
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{a.patient.name}</span>
                <i className="not-italic text-dim text-[11.5px] whitespace-nowrap overflow-hidden text-ellipsis">{a.patient.email}</i>
              </span>
              <button
                className="text-[11px] text-[#E88A9B] border border-[rgba(232,138,155,.3)] rounded-full py-1 px-2.5 whitespace-nowrap transition-colors duration-250 hover:bg-[#E88A9B] hover:text-[#140306] focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                onClick={() => onRemove(a.id)}
                aria-label="Томилолт цуцлах"
              >
                Цуцлах
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
