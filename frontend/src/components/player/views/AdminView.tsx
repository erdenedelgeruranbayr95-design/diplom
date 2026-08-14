"use client";

/* Админы хяналтын самбар — Player.jsx-аас тусад нь гаргасан. Премиум SaaS admin dashboard
   (Stripe/Vercel Dashboard pattern) руу шинэчлэв: .ab-uname/.ab-uav/.bil-table/.bil-mth/
   .bil-ok/.ab-free/.sp-banner/.auth-ok/.auth-err legacy CSS-ийг Tailwind KPI card/table/
   badge/CTA болгов. listUsers()-ээр бодит backend өгөгдөл ачаална (localStorage mock-оос
   сольсон) — энэ урсгал, sendBcast() логик, бүх тооцоолол (regular/artistCount/
   staffCount/proCount/recentUsers) хэвээр.
   Props: allTracksCount, onOpenAdmin(), onGoHome() */
import { useEffect, useState } from "react";
import StatCard from "../StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
import StatusBadge from "@/components/ui/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionButton } from "@/components/ui/ActionGroup";
import PromoBanner from "@/components/ui/PromoBanner";
import { ICONS } from "@/lib/player/constants";
import { broadcastNotification, listUsers } from "@/lib/api/client";
import { APP_EVENTS, emitAppEvent } from "@/lib/data/events";
import type { AdminUserRow } from "@/types/auth";
import Icon from "@/components/ui/Icon";
import { TableCard } from "@/components/ui/Surface";

const ROLE_LABEL: Record<AdminUserRow["role"], string> = {
  ROOT: "Систем эзэмшигч",
  USER: "Хэрэглэгч",
  ARTIST: "Уран бүтээлч",
  ADMIN: "Админ",
  CURATOR: "Куратор",
  MODERATOR: "Модератор",
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
  const [sendingBcast, setSendingBcast] = useState(false);

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
  const artistCount = users.filter((u) => u.role === "ARTIST").length;
  const staffCount = users.filter((u) => u.role === "CURATOR" || u.role === "MODERATOR").length;
  const proCount = users.filter((u) => u.subActive).length;
  const recentUsers = regular.slice(0, 5);

  /* Зарлал нь `Notification(userId = null)` болж DB-д бичигдэнэ — БҮХ хэрэглэгчид
     хүрнэ. Урьд нь `pushFeed()` localStorage руу бичдэг байсан тул зөвхөн энэ админы
     browser-т үлдээд "бүх хэрэглэгчид илгээгдлээ" гэж ХУДАЛ мэдээлдэг байв. */
  async function sendBcast(e: React.FormEvent) {
    e.preventDefault();
    const text = bcast.trim();
    if (text.length < 3) {
      setBcastOk("❌ Зарлалын текстээ бичнэ үү");
      return;
    }
    setSendingBcast(true);
    try {
      await broadcastNotification(text);
      setBcast("");
      setBcastOk("✅ Зарлал бүх хэрэглэгчид илгээгдлээ");
      emitAppEvent(APP_EVENTS.feedChanged);
    } catch (err) {
      setBcastOk("❌ " + ((err as Error).message || "Илгээхэд алдаа гарлаа"));
    } finally {
      setSendingBcast(false);
      setTimeout(() => setBcastOk(""), 3000);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Хяналтын самбар"
        title="Сайн уу, Админ"
        actions={
          <ActionButton variant="primary" onClick={onOpenAdmin}>
            Хэрэглэгч · Дуу удирдах
            <Icon name="arrowRight" size={15} />
          </ActionButton>
        }
      />

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(196px,1fr))] gap-4">
          {/* icon-ууд семантикаараа тааруулсан: уран бүтээлч→микрофон, каталогийн
              ажилтан→бамбай, дууны сан→винил диск, PRO→титэм */}
          <StatCard icon={ICONS.users} color="c-aqua" value={regular.length} label="Нийт хэрэглэгч" />
          <StatCard icon={ICONS.mic} color="c-purple" value={artistCount} label="Уран бүтээлч" />
          <StatCard icon={ICONS.shield} color="c-gold" value={staffCount} label="Каталогийн ажилтан" />
          <StatCard icon={ICONS.disc} color="c-rose" value={allTracksCount} label="Дууны сан" />
          <StatCard icon={ICONS.crown} color="c-aqua" value={proCount} label="PRO захиалагч" />
        </div>
      )}

      <div className="border border-white/[.07] rounded-2xl [background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.008))] shadow-[inset_0_1px_0_rgba(255,255,255,.04)] p-6 mt-7 flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:border-white/[.14]">
        <div className="flex gap-4 items-start">
          {/* KPI картуудтай ижил icon-tile хэв маяг: тунгалаг tint + нимгэн inset hairline
              (өмнө нь саарал tile байсан нь зарлалын warm семантиктай зөрж байв) */}
          <span className="w-[42px] h-[42px] rounded-md text-warm bg-warm/[.10] shadow-[inset_0_0_0_1px_rgba(217,165,76,.24)] flex items-center justify-center flex-none" aria-hidden="true">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              {ICONS.megaphone}
            </svg>
          </span>
          <div>
            <b className="text-base font-semibold block mb-1">Бүх хэрэглэгчид зарлал илгээх</b>
            <p className="text-dim text-body leading-[1.5] max-w-[60ch]">
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
          <ActionButton type="submit" variant="primary" size="lg" className="flex-none" disabled={sendingBcast}>
            {sendingBcast ? "Илгээж байна…" : "Илгээх"}
          </ActionButton>
        </form>
        {bcastOk && (
          <p className={"text-body " + (bcastOk.startsWith("✅") ? "text-aqua" : "text-danger")} role="status">
            {bcastOk}
          </p>
        )}
      </div>

      {!loading && !err && (
        <>
          <h3 className="font-display font-semibold text-title tracking-[-.02em] text-ink mt-8 mb-4">Сүүлийн бүртгэлүүд</h3>
          {recentUsers.length === 0 ? (
            <Empty icon="users" title="Бүртгүүлсэн хэрэглэгч алга" hint="Шинэ хэрэглэгч бүртгүүлэхэд энд харагдана" />
          ) : (
            <TableCard>
              <div className="grid grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:grid-cols-[1fr_1fr_.7fr] gap-3 items-center py-3 px-5 border-b border-white/[.08] bg-white/[.02]">
                <span className="mono">Хэрэглэгч</span>
                <span className="mono max-[760px]:hidden">Имэйл</span>
                <span className="mono">Эрх</span>
                <span className="mono max-[760px]:hidden">Огноо</span>
                <span className="mono">Статус</span>
              </div>
              {recentUsers.map((u) => (
                <div
                  className="grid grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:grid-cols-[1fr_1fr_.7fr] gap-3 items-center py-3 px-5 border-b border-white/[.06] last:border-b-0 text-body transition-colors duration-150 hover:bg-white/[.03]"
                  key={u.id}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar name={u.name} size="sm" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{u.name}</span>
                  </span>
                  <span className="text-dim whitespace-nowrap overflow-hidden text-ellipsis max-[760px]:hidden">{u.email}</span>
                  <span>{ROLE_LABEL[u.role]}</span>
                  <span className="text-faint font-mono text-caption max-[760px]:hidden">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
                  <StatusBadge label={u.subActive ? "PRO" : "Үнэгүй"} tone={u.subActive ? "aqua" : "faint"} dot />
                </div>
              ))}
            </TableCard>
          )}
        </>
      )}

      <PromoBanner
        title="Тоглуулагч руу шилжих"
        description="Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай."
        actionLabel="Тоглуулагч нээх"
        onAction={onGoHome}
      />
    </>
  );
}
