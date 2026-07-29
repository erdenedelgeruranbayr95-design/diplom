"use client";

/* Админы хяналтын самбар — Player.jsx-аас тусад нь гаргасан. Премиум SaaS admin dashboard
   (Stripe/Vercel Dashboard pattern) руу шинэчлэв: .ab-uname/.ab-uav/.bil-table/.bil-mth/
   .bil-ok/.ab-free/.sp-banner/.auth-ok/.auth-err legacy CSS-ийг Tailwind KPI card/table/
   badge/CTA болгов. listUsers()-ээр бодит backend өгөгдөл ачаална (localStorage mock-оос
   сольсон) — энэ урсгал, sendBcast() логик, бүх тооцоолол (regular/therapistCount/
   parentCount/proCount/recentUsers) хэвээр.
   Props: allTracksCount, onOpenAdmin(), onGoHome() */
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import PromoBanner from "@/components/ui/PromoBanner";
import { ICONS } from "@/lib/player/constants";
import { listUsers } from "@/lib/api/client";
import { pushFeed } from "@/lib/data/library";
import type { AdminUserRow } from "@/types/auth";

const ROLE_LABEL: Record<AdminUserRow["role"], string> = {
  USER: "Хэрэглэгч",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  ADMIN: "Админ",
};

export default function AdminView({
  allTracksCount,
  onOpenAdmin,
  onGoHome,
}: {
  allTracksCount: number;
  onOpenAdmin: () => void;
  onGoHome: () => void;
}) {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [bcast, setBcast] = useState("");
  const [bcastOk, setBcastOk] = useState("");

  function load() {
    setLoading(true);
    setErr("");
    listUsers()
      .then(setUsers)
      .catch((e) => setErr(e.message || "Хэрэглэгч ачаалахад алдаа гарлаа"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const regular = users.filter((u) => u.role !== "ADMIN");
  const therapistCount = users.filter((u) => u.role === "THERAPIST").length;
  const parentCount = users.filter((u) => u.role === "PARENT").length;
  const proCount = users.filter((u) => u.subActive).length;
  const recentUsers = regular.slice(0, 5);

  function sendBcast(e: React.FormEvent) {
    e.preventDefault();
    const text = bcast.trim();
    if (text.length < 3) {
      setBcastOk("❌ Зарлалын текстээ бичнэ үү");
      return;
    }
    pushFeed(text, "📢");
    setBcast("");
    setBcastOk("✅ Зарлал бүх хэрэглэгчид илгээгдлээ");
    setTimeout(() => setBcastOk(""), 3000);
  }

  return (
    <>
      <PageHeader
        eyebrow="Хяналтын самбар"
        title="Сайн уу, Админ 🛠"
        actions={
          <ActionButton variant="primary" onClick={onOpenAdmin}>
            Хэрэглэгч · Дуу удирдах →
          </ActionButton>
        }
      />

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
          <StatCard icon={ICONS.users} color="c-aqua" value={regular.length} label="Нийт хэрэглэгч" />
          <StatCard icon={ICONS.phones} color="c-purple" value={therapistCount} label="Эмч" />
          <StatCard icon={ICONS.gem} color="c-gold" value={parentCount} label="Эцэг эх" />
          <StatCard icon={ICONS.music} color="c-rose" value={allTracksCount} label="Дууны сан" />
          <StatCard icon={ICONS.star} color="c-aqua" value={proCount} label="PRO захиалагч" />
        </div>
      )}

      <div className="border border-white/[.08] rounded-2xl bg-white/[.02] p-6 mt-7 flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:border-white/[.14]">
        <div className="flex gap-4 items-start">
          {/* .st-ico + .c-gold эх CSS-д source order-ийн улмаас .st-ico-ийн саарал өнгө gold-ийг бүрэн дарж,
              gold tint харагдахгүй болсон бодит үзэгдэл — энэ visual bug-ийг яг хэвээр хадгалав (шинээр засаагүй) */}
          <span className="w-11 h-11 rounded-xl text-[#9FB0AC] bg-white/5 flex items-center justify-center flex-none" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              {ICONS.horn}
            </svg>
          </span>
          <div>
            <b className="text-base font-semibold block mb-1">Бүх хэрэглэгчид зарлал илгээх</b>
            <p className="text-dim text-[13px] leading-[1.5] max-w-[60ch]">
              Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг.
            </p>
          </div>
        </div>
        <form className="flex gap-3 max-[640px]:flex-col" onSubmit={sendBcast}>
          <input
            type="text"
            value={bcast}
            onChange={(e) => setBcast(e.target.value)}
            placeholder="ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!"
            aria-label="Зарлалын текст"
            className="flex-1 bg-white/[.04] border border-white/[.08] text-ink font-body text-sm p-[13px_16px] rounded-lg transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-aqua focus-visible:outline-none focus-visible:shadow-glow-aqua"
          />
          <button
            type="submit"
            className="rounded-full text-[13px] font-semibold bg-aqua text-[#04100E] py-3 px-6 transition-[background,transform] duration-200 hover:bg-[#6FF3DE] active:scale-[.97] focus-visible:outline-none focus-visible:shadow-glow-aqua flex-none"
          >
            Илгээх
          </button>
        </form>
        {bcastOk && (
          <p className={"text-[13px] " + (bcastOk.startsWith("✅") ? "text-aqua" : "text-[#E88A9B]")} role="status">
            {bcastOk}
          </p>
        )}
      </div>

      {!loading && !err && (
        <>
          <h3 className="font-display font-semibold text-[17px] tracking-[-.02em] text-ink mt-8 mb-4">Сүүлийн бүртгэлүүд</h3>
          {recentUsers.length === 0 ? (
            <Empty icon="👥" title="Бүртгүүлсэн хэрэглэгч алга" hint="Шинэ хэрэглэгч бүртгүүлэхэд энд харагдана" />
          ) : (
            <div className="border border-white/[.08] rounded-2xl overflow-hidden bg-white/[.015]">
              <div className="grid grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:grid-cols-[1fr_1fr_.7fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
                <span className="mono">Хэрэглэгч</span>
                <span className="mono max-[760px]:hidden">Имэйл</span>
                <span className="mono">Эрх</span>
                <span className="mono max-[760px]:hidden">Огноо</span>
                <span className="mono">Статус</span>
              </div>
              {recentUsers.map((u) => (
                <div
                  className="grid grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:grid-cols-[1fr_1fr_.7fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-[13.5px] transition-colors duration-150 hover:bg-white/[.03]"
                  key={u.id}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar name={u.name} size="sm" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{u.name}</span>
                  </span>
                  <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis max-[760px]:hidden">{u.email}</span>
                  <span>{ROLE_LABEL[u.role]}</span>
                  <span className="text-faint font-mono text-[11px] max-[760px]:hidden">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
                  <StatusBadge label={u.subActive ? "💎 PRO" : "Үнэгүй"} tone={u.subActive ? "aqua" : "faint"} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."
        actionLabel="🎧 Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}
