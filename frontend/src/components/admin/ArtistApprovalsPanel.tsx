"use client";

/* Админы «Уран бүтээлч» таб — бүртгүүлэхдээ ARTIST сонгосон хэрэглэгчдийн профайл.

   ⚠️ Энэ бол системийн ЦОРЫН ГАНЦ хаалга. Баталгаажсаны дараа тухайн уран бүтээлч
   дуу, цомгоо ШУУД нийтэлнэ — куратор дуу тус бүрийг харахгүй (эзэн нь тодорхой,
   хариуцлага хүлээнэ). Тиймээс энд «хүлээгдэж буй» мөрийг зүгээр өнгөрөөж
   болохгүй: дуу нэмэх эрхийг ЭНД олгож байна.

   Буцаах (approved=false) нь устгал БИШ — профайл, дуу нь үлдэнэ, зөвхөн ШИНЭ
   дуу/цомог нэмэх нь хаагдана. Тиймээс «буцаах» товч аюулгүй, эргэж болно. */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import { ActionButton } from "@/components/ui/ActionGroup";
import Icon from "@/components/ui/Icon";
import { TableCard } from "@/components/ui/Surface";
import { deleteArtist, fetchPendingArtists, setArtistApproval } from "@/lib/api/client";
import type { PendingArtist } from "@/types/song";

type Filter = "pending" | "approved" | "all";

const FILTERS: { v: Filter; label: string }[] = [
  { v: "pending", label: "Хүлээгдэж буй" },
  { v: "approved", label: "Баталгаажсан" },
  { v: "all", label: "Бүгд" },
];

export default function ArtistApprovalsPanel() {
  const [rows, setRows] = useState<PendingArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState<Filter>("pending");
  /* Аль мөр дээр хүсэлт явж байгаа — товчийг түгжиж давхар дарахаас сэргийлнэ. */
  const [busyId, setBusyId] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setErr("");
    fetchPendingArtists()
      .then(setRows)
      .catch((e) => setErr((e as Error).message || "Ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /* «Хүлээгдэж буй» гэдэг нь ЭЗЭНТЭЙ бөгөөд шийдвэр хүлээж буй хүсэлт. Эзэнгүй
     мөр нь шийдвэр биш — цэвэрлэгээ, тиймээс тусад нь тоологдоно. */
  const pendingCount = useMemo(() => rows.filter((r) => r.owner && !r.approved).length, [rows]);
  const orphanCount = useMemo(() => rows.filter((r) => !r.owner).length, [rows]);
  const shown = useMemo(
    () =>
      rows.filter((r) =>
        filter === "all" ? true : filter === "pending" ? !!r.owner && !r.approved : r.approved,
      ),
    [rows, filter],
  );

  async function decide(artist: PendingArtist, approved: boolean) {
    setBusyId(artist.id);
    setErr("");
    try {
      await setArtistApproval(artist.id, approved);
      /* Серверийн хариуг бүхэлд нь тавихгүй — тэр нь `owner`/`_count`-гүй
         тайруулсан Artist. Зөвхөн өөрчлөгдсөн талбарыг нь шинэчилнэ. */
      setRows((prev) =>
        prev.map((r) =>
          r.id === artist.id ? { ...r, approved, approvedAt: approved ? new Date().toISOString() : null } : r,
        ),
      );
    } catch (e) {
      setErr((e as Error).message || "Хадгалахад алдаа гарлаа");
    } finally {
      setBusyId("");
    }
  }

  /** Хоосон профайл цэвэрлэх — ихэвчлэн эзэн нь бүртгэлээ устгасан тохиолдол.
   *  Дуутай дуучныг сервер өөрөө 409-ээр татгалзана. */
  async function remove(artist: PendingArtist) {
    if (!confirm(`«${artist.name}» профайлыг устгах уу?`)) return;
    setBusyId(artist.id);
    setErr("");
    try {
      await deleteArtist(artist.id);
      setRows((prev) => prev.filter((r) => r.id !== artist.id));
    } catch (e) {
      setErr((e as Error).message || "Устгахад алдаа гарлаа");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start justify-between max-[640px]:flex-col">
        <div className="flex gap-4 items-start">
          <span
            className="w-[42px] h-[42px] rounded-md text-purple bg-purple/[.10] shadow-[inset_0_0_0_1px_rgba(180,156,255,.24)] flex items-center justify-center flex-none"
            aria-hidden="true"
          >
            <Icon name="mic" size={21} strokeWidth={1.75} />
          </span>
          <div>
            <b className="text-base font-semibold block mb-1">Уран бүтээлчийн баталгаажуулалт</b>
            <p className="text-dim text-body leading-[1.5] max-w-[60ch]">
              Баталгаажсан уран бүтээлч дуу, цомгоо шууд нийтэлнэ. Буцаавал шинэ дуу нэмэх нь
              хаагдана — нийтлэгдсэн дуу нь хэвээр үлдэнэ.
            </p>
          </div>
        </div>
        <span className="flex gap-2 flex-none">
          {pendingCount > 0 && <StatusBadge label={`${pendingCount} хүлээгдэж буй`} tone="warm" dot />}
          {/* Эзэнгүй мөр «Бүгд» шүүлтүүрт л харагдана — эндээс сануулахгүй бол
              админ түүнийг хэзээ ч олохгүй. */}
          {orphanCount > 0 && <StatusBadge label={`${orphanCount} эзэнгүй`} tone="rose" dot />}
        </span>
      </div>

      <div className="grid grid-cols-3 border border-white/[.08] rounded-xl overflow-hidden" role="tablist" aria-label="Шүүлтүүр">
        {FILTERS.map((f) => (
          <button
            key={f.v}
            role="tab"
            aria-selected={filter === f.v}
            onClick={() => setFilter(f.v)}
            className={
              "font-display text-note tracking-[-.02em] py-2.5 px-2 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-glow-aqua " +
              (filter === f.v ? "bg-aqua text-on-aqua font-semibold" : "text-dim hover:bg-white/[.05] hover:text-ink")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <Loading label="Уран бүтээлчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && shown.length === 0 && (
        <Empty
          icon="mic"
          title={filter === "pending" ? "Хүлээгдэж буй хүсэлт алга" : "Бичлэг алга"}
          hint="Хэрэглэгч «Уран бүтээлч» гэж бүртгүүлэхэд энд харагдана"
        />
      )}

      {!loading && !err && shown.length > 0 && (
        <TableCard>
          <div className="grid grid-cols-[1.2fr_1.3fr_.6fr_.8fr_auto] max-[760px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
            <span className="mono">Уран бүтээлч</span>
            <span className="mono max-[760px]:hidden">Эзэн · Имэйл</span>
            <span className="mono max-[760px]:hidden">Дуу</span>
            <span className="mono max-[760px]:hidden">Статус</span>
            <span className="mono text-right">Үйлдэл</span>
          </div>
          {shown.map((a) => (
            <div
              key={a.id}
              className="grid grid-cols-[1.2fr_1.3fr_.6fr_.8fr_auto] max-[760px]:grid-cols-[1fr_auto] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={a.name} size="sm" />
                <span className="min-w-0">
                  <span className="block whitespace-nowrap overflow-hidden text-ellipsis">{a.name}</span>
                  {/* Нарийн дэлгэцэнд багана хураагдсан тул имэйлийг энд нөхнө. */}
                  <span className="hidden max-[760px]:block text-faint text-caption whitespace-nowrap overflow-hidden text-ellipsis">
                    {a.owner?.email ?? "—"}
                  </span>
                </span>
              </span>

              <span className="text-dim min-w-0 max-[760px]:hidden">
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">{a.owner?.name ?? "—"}</span>
                <span className="block text-faint text-caption whitespace-nowrap overflow-hidden text-ellipsis">
                  {a.owner?.email ?? "—"}
                </span>
              </span>

              <span className="font-mono text-caption text-faint tabular-nums max-[760px]:hidden">
                {a._count?.songs ?? 0} · {a._count?.albums ?? 0} цомог
              </span>

              <span className="max-[760px]:hidden">
                <StatusBadge
                  label={!a.owner ? "Эзэнгүй" : a.approved ? "Баталгаажсан" : "Хүлээгдэж буй"}
                  tone={!a.owner ? "rose" : a.approved ? "aqua" : "warm"}
                  dot
                />
              </span>

              <span className="flex gap-2 items-center justify-end flex-none">
                {/* Эзэнгүй мөрд батлах утгагүй — нэвтрэх хүн нь байхгүй.
                    Үлдсэн цорын ганц үйлдэл нь устгах. */}
                {!a.owner ? null : a.approved ? (
                  <ActionButton
                    variant="danger"
                    size="sm"
                    disabled={busyId === a.id}
                    onClick={() => decide(a, false)}
                  >
                    Буцаах
                  </ActionButton>
                ) : (
                  <ActionButton
                    variant="primary"
                    size="sm"
                    disabled={busyId === a.id}
                    onClick={() => decide(a, true)}
                  >
                    <Icon name="check" size={14} />
                    Батлах
                  </ActionButton>
                )}
                {/* Устгах нь ЗӨВХӨН хоосон профайлд утгатай — дуутай бол сервер
                    409 буцаана. Товчийг нуухгүй: эзэнгүй сүүдэр мөрийг цэвэрлэх
                    цорын ганц зам энэ. */}
                {(a._count?.songs ?? 0) === 0 && (a._count?.albums ?? 0) === 0 && (
                  <button
                    type="button"
                    onClick={() => remove(a)}
                    disabled={busyId === a.id}
                    aria-label={`«${a.name}» профайлыг устгах`}
                    className="p-1.5 rounded-md text-dim transition-colors duration-150 hover:text-danger hover:bg-danger/[.08] disabled:opacity-40 focus-visible:outline-none focus-visible:shadow-glow-aqua"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                )}
              </span>
            </div>
          ))}
        </TableCard>
      )}
    </div>
  );
}
