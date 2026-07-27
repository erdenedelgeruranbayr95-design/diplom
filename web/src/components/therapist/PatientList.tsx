"use client";

/* TherapistView.tsx-ийн томилогдсон хэрэглэгчдийн жагсаалт (хайлт + жагсаалт + сонголт) —
   тусад нь гаргасан. CSS/behavior бүгд өөрчлөгдөөгүй, зөвхөн component boundary шилжсэн. */
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import type { AssignedPatient } from "@/types/therapy";

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
      <form className="plv-create" onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 20 }}>
        <input className="plv-search" placeholder="Нэр эсвэл имэйлээр хайх…" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={onRetry} />}
      {!loading && !err && patients.length === 0 && (
        <Empty icon="🧑‍⚕️" title="Томилогдсон хэрэглэгч алга" hint="Админ таныг хэрэглэгчид томилохыг хүлээнэ үү" />
      )}

      {!loading && !err && patients.length > 0 && (
        <div className="bil-table">
          <div className="bil-row bil-head !grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]">
            <span className="mono">Хэрэглэгч</span>
            <span className="mono">Имэйл</span>
            <span className="mono">Холбогдсон</span>
            <span></span>
          </div>
          {patients.map((p) => (
            <div className="bil-row !grid-cols-[1.2fr_1.5fr_.9fr_.7fr] max-[760px]:!grid-cols-[1fr_1fr_.8fr]" key={p.id}>
              <span className="ab-uname">
                <i className="ab-uav" aria-hidden="true">
                  {(p.patient.name || "?").charAt(0).toUpperCase()}
                </i>
                {p.patient.name}
              </span>
              <span className="bil-mth">{p.patient.email}</span>
              <span>{new Date(p.createdAt).toLocaleDateString("mn-MN")}</span>
              <button className="bt bt-a" onClick={() => onSelect(p)}>
                Нээх →
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
