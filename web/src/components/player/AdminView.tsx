"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Loading, Empty, ErrorState } from "@/components/ui/States";
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

/* Админы хяналтын самбар — Player.jsx-аас тусад нь гаргасан.
   listUsers()-ээр бодит backend өгөгдөл ачаална (localStorage mock-оос сольсон).
   Props: allTracksCount, onOpenAdmin(), onGoHome() */
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
      <div className="flex justify-between items-end gap-5 flex-wrap mb-6">
        <div>
          <span className="mono">Хяналтын самбар</span>
          <h2 className="sp-h" style={{ margin: "8px 0 0" }}>
            Сайн уу, Админ 🛠
          </h2>
        </div>
        <button className="bt bt-a" onClick={onOpenAdmin}>
          Хэрэглэгч · Дуу удирдах →
        </button>
      </div>

      {loading && <Loading label="Хэрэглэгчид ачааллаж байна…" />}
      {!loading && err && <ErrorState title="Ачаалагдсангүй" hint={err} onRetry={load} />}

      {!loading && !err && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
            <StatCard icon={ICONS.users} color="c-aqua" value={regular.length} label="Нийт хэрэглэгч" />
            <StatCard icon={ICONS.phones} color="c-purple" value={therapistCount} label="Эмч" />
            <StatCard icon={ICONS.gem} color="c-gold" value={parentCount} label="Эцэг эх" />
            <StatCard icon={ICONS.music} color="c-rose" value={allTracksCount} label="Дууны сан" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5" style={{ marginTop: 14 }}>
            <StatCard icon={ICONS.star} color="c-aqua" value={proCount} label="PRO захиалагч" />
          </div>
        </>
      )}

      <div className="border border-line rounded-md bg-[rgba(20,28,27,.4)] p-[22px_24px] mt-[26px] flex flex-col gap-4 transition-[box-shadow,border-color] duration-250 hover:shadow-sm hover:border-white/[.16]">
        <div className="flex gap-4 items-start">
          {/* .st-ico + .c-gold эх CSS-д source order-ийн улмаас .st-ico-ийн саарал өнгө gold-ийг бүрэн дарж,
              gold tint харагдахгүй болсон бодит үзэгдэл — энэ visual bug-ийг яг хэвээр хадгалав (шинээр засаагүй) */}
          <span className="w-11 h-11 rounded-sm text-[#9FB0AC] bg-white/5 flex items-center justify-center flex-none" aria-hidden="true">
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
            className="flex-1 bg-white/[.04] border border-line text-ink font-body text-sm p-[13px_16px] rounded-sm transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-aqua focus-visible:shadow-glow-aqua"
          />
          <button type="submit" className="bt bt-a">
            Илгээх
          </button>
        </form>
        {bcastOk && (
          <p className={bcastOk.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
            {bcastOk}
          </p>
        )}
      </div>

      {!loading && !err && (
        <>
          <h3 className="st-h">Сүүлийн бүртгэлүүд</h3>
          {recentUsers.length === 0 ? (
            <Empty icon="👥" title="Бүртгүүлсэн хэрэглэгч алга" hint="Шинэ хэрэглэгч бүртгүүлэхэд энд харагдана" />
          ) : (
            <div className="bil-table">
              <div className="bil-row bil-head !grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:!grid-cols-[1fr_1fr_.7fr]">
                <span className="mono">Хэрэглэгч</span>
                <span className="mono">Имэйл</span>
                <span className="mono">Эрх</span>
                <span className="mono">Огноо</span>
                <span className="mono">Статус</span>
              </div>
              {recentUsers.map((u) => (
                <div className="bil-row !grid-cols-[1fr_1.4fr_.7fr_.8fr_.8fr] max-[760px]:!grid-cols-[1fr_1fr_.7fr]" key={u.id}>
                  <span className="ab-uname">
                    <i className="ab-uav" aria-hidden="true">
                      {(u.name || "?").charAt(0).toUpperCase()}
                    </i>
                    {u.name}
                  </span>
                  <span className="bil-mth">{u.email}</span>
                  <span>{ROLE_LABEL[u.role]}</span>
                  <span>{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
                  <span className={u.subActive ? "bil-ok" : "ab-free"}>{u.subActive ? "💎 PRO" : "Үнэгүй"}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="sp-banner" style={{ marginTop: 30 }}>
        <div>
          <b>Тоглуулагч руу шилжих</b>
          <p>Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай.</p>
        </div>
        <button className="bt" onClick={onGoHome}>
          🎧 Тоглуулагч нээх
        </button>
      </div>
    </>
  );
}
