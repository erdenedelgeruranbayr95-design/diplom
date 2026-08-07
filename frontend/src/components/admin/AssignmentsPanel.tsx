"use client";

/* AdminPanel.tsx-ийн эмч-хэрэглэгч + эцэг эх-хvvхэд томилолтын таб — премиум relationship
   card (Linear Admin pattern) руу шинэчлэв, .adm-form/.adm-form-row legacy CSS-ийг Tailwind
   form card, мөр бүрийг харилцаа-badge-тэй харуулав. Эцэг эх-хvvхэд хэсэг нь эмчийн
   хэсэгтэй яг ижил pattern (backend: POST/GET/DELETE /assignments/parents — эмчийн
   /assignments/therapists-тэй ижил, зvгээр өөр Prisma загвар ParentLink дээр суурилна)
   гэвч тусдаа state/props (parent* prefix), учир нь эх сурвалж (parents/children) ба
   зорилтот backend endpoint огт ялгаатай. */
import { Loading, Empty } from "@/components/ui/States";
import type { AdminUserRow } from "@/types/auth";
import type { ParentLinkRow, TherapistAssignmentRow } from "@/types/therapy";
import { ActionButton } from "@/components/ui/ActionGroup";

const labelCls = "flex flex-col gap-1.5";
const captionCls = "mono !text-micro";
const inputCls =
  "bg-white/[.04] border border-white/[.08] text-ink font-body text-copy p-[12px_14px] rounded-lg transition-[border-color,background,box-shadow] duration-250 focus:border-aqua focus:bg-aqua/[.05] focus-visible:outline-none focus-visible:shadow-glow-aqua";

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
  parents,
  childUsers,
  linkParentId,
  setLinkParentId,
  linkChildId,
  setLinkChildId,
  linkMsg,
  linking,
  onLinkSubmit,
  linksLoading,
  parentLinks,
  onUnlink,
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
  parents: AdminUserRow[];
  childUsers: AdminUserRow[];
  linkParentId: string;
  setLinkParentId: (id: string) => void;
  linkChildId: string;
  setLinkChildId: (id: string) => void;
  linkMsg: string;
  linking: boolean;
  onLinkSubmit: (e: React.FormEvent) => void;
  linksLoading: boolean;
  parentLinks: ParentLinkRow[];
  onUnlink: (id: string) => void;
}) {
  return (
    <>
      <form className="flex flex-col gap-3.5 border border-white/[.08] rounded-2xl p-5 mb-5 bg-white/[.02]" onSubmit={onSubmit}>
        <div>
          <b className="block font-display font-semibold text-lead text-ink">Эмчид хэрэглэгч томилох</b>
          <p className="text-dim text-note mt-0.5">Эмч-хэрэглэгчийн харилцаа үүсгэнэ</p>
        </div>
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Эмч *</span>
            <select className={inputCls} value={assignTherapistId} onChange={(e) => setAssignTherapistId(e.target.value)}>
              <option className="bg-surface text-ink" value="">
                — сонгох —
              </option>
              {therapists.map((t) => (
                <option className="bg-surface text-ink" key={t.id} value={t.id}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
          </label>
          <label className={labelCls}>
            <span className={captionCls}>Хэрэглэгч *</span>
            <select className={inputCls} value={assignUserId} onChange={(e) => setAssignUserId(e.target.value)}>
              <option className="bg-surface text-ink" value="">
                — сонгох —
              </option>
              {patients.map((p) => (
                <option className="bg-surface text-ink" key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>
        </div>
        {assignMsg && (
          <p className={"text-body " + (assignMsg.startsWith("✅") ? "text-aqua" : "text-danger")} role="status">
            {assignMsg}
          </p>
        )}
        <ActionButton type="submit" variant="primary" className="w-fit" disabled={assigning}>
          {assigning ? "Томилж байна…" : "+ Томилох"}
        </ActionButton>
      </form>

      {loading && <Loading label="Томилолт ачааллаж байна…" />}
      {!loading && assignments.length === 0 && (
        <Empty icon="stethoscope" title="Одоогоор томилолт алга" hint="Дээрх формоор эмч-хэрэглэгч холбоос үүсгээрэй" />
      )}
      {!loading && assignments.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent] mb-8">
          <div className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-note bg-[#0d1413] backdrop-blur-xl sticky top-0 z-[1]">
            <span className="mono">Эмч</span>
            <span className="mono">Хэрэглэгч</span>
            <span></span>
          </div>
          {assignments.map((a, i) => (
            <div
              className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-body transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={a.id}
            >
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{a.therapist.name}</span>
                <i className="not-italic text-dim text-caption whitespace-nowrap overflow-hidden text-ellipsis">{a.therapist.email}</i>
              </span>
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{a.patient.name}</span>
                <i className="not-italic text-dim text-caption whitespace-nowrap overflow-hidden text-ellipsis">{a.patient.email}</i>
              </span>
              <button
                className="text-caption text-danger border border-[rgba(232,138,155,.3)] rounded-full py-1 px-2.5 whitespace-nowrap transition-colors duration-250 hover:bg-danger hover:text-danger-ink focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                onClick={() => onRemove(a.id)}
                aria-label="Томилолт цуцлах"
              >
                Цуцлах
              </button>
            </div>
          ))}
        </div>
      )}

      <form className="flex flex-col gap-3.5 border border-white/[.08] rounded-2xl p-5 mb-5 bg-white/[.02]" onSubmit={onLinkSubmit}>
        <div>
          <b className="block font-display font-semibold text-lead text-ink">Эцэг эхэд хvvхэд холбох</b>
          <p className="text-dim text-note mt-0.5">Эцэг эх-хvvхдийн харилцаа vvсгэнэ</p>
        </div>
        <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3">
          <label className={labelCls}>
            <span className={captionCls}>Эцэг эх *</span>
            <select className={inputCls} value={linkParentId} onChange={(e) => setLinkParentId(e.target.value)}>
              <option className="bg-surface text-ink" value="">
                — сонгох —
              </option>
              {parents.map((p) => (
                <option className="bg-surface text-ink" key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>
          <label className={labelCls}>
            <span className={captionCls}>Хvvхэд *</span>
            <select className={inputCls} value={linkChildId} onChange={(e) => setLinkChildId(e.target.value)}>
              <option className="bg-surface text-ink" value="">
                — сонгох —
              </option>
              {childUsers.map((c) => (
                <option className="bg-surface text-ink" key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </label>
        </div>
        {linkMsg && (
          <p className={"text-body " + (linkMsg.startsWith("✅") ? "text-aqua" : "text-danger")} role="status">
            {linkMsg}
          </p>
        )}
        <ActionButton type="submit" variant="primary" className="w-fit" disabled={linking}>
          {linking ? "Холбож байна…" : "+ Холбох"}
        </ActionButton>
      </form>

      {linksLoading && <Loading label="Холбоос ачааллаж байна…" />}
      {!linksLoading && parentLinks.length === 0 && (
        <Empty icon="family" title="Одоогоор холбоос алга" hint="Дээрх формоор эцэг эх-хvvхэд холбоос vvсгээрэй" />
      )}
      {!linksLoading && parentLinks.length > 0 && (
        <div className="border border-white/[.08] rounded-2xl max-h-[320px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--faint)_transparent]">
          <div className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.08] text-note bg-[#0d1413] backdrop-blur-xl sticky top-0 z-[1]">
            <span className="mono">Эцэг эх</span>
            <span className="mono">Хvvхэд</span>
            <span></span>
          </div>
          {parentLinks.map((l, i) => (
            <div
              className="grid grid-cols-[1.3fr_1.3fr_.6fr] max-[640px]:grid-cols-[1fr_1fr_.6fr] gap-3 items-center py-3 px-4 border-b border-white/[.06] text-body transition-colors duration-150 last:border-b-0 hover:bg-white/[.03] [animation:row-in_.3s_cubic-bezier(.2,.8,.2,1)_backwards]"
              style={{ animationDelay: i >= 1 && i <= 7 ? `${Math.min(i, 7) * 0.03}s` : undefined }}
              key={l.id}
            >
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{l.parent.name}</span>
                <i className="not-italic text-dim text-caption whitespace-nowrap overflow-hidden text-ellipsis">{l.parent.email}</i>
              </span>
              <span className="flex flex-col min-w-0">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{l.child.name}</span>
                <i className="not-italic text-dim text-caption whitespace-nowrap overflow-hidden text-ellipsis">{l.child.email}</i>
              </span>
              <button
                className="text-caption text-danger border border-[rgba(232,138,155,.3)] rounded-full py-1 px-2.5 whitespace-nowrap transition-colors duration-250 hover:bg-danger hover:text-danger-ink focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(232,138,155,.3)]"
                onClick={() => onUnlink(l.id)}
                aria-label="Холбоос цуцлах"
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
