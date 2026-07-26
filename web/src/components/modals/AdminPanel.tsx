"use client";

import { useEffect, useMemo, useState } from "react";
import * as api from "@/lib/api/client";
import { analyzeAudioFile } from "@/lib/audio/analyze";
import { Loading, Skeleton, Empty, ErrorState } from "@/components/ui/States";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import type { AdminUserRow, SessionUser } from "@/types/auth";
import type { Song } from "@/types/song";
import type { TherapistAssignmentRow } from "@/types/therapy";

const ROLE_LABEL: Record<AdminUserRow["role"], string> = {
  USER: "Хэрэглэгч",
  THERAPIST: "Эмч",
  PARENT: "Эцэг эх",
  ADMIN: "Админ",
};

export default function AdminPanel({
  open,
  onClose,
  currentUser,
}: {
  open: boolean;
  onClose: () => void;
  currentUser: SessionUser | null;
}) {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [assignments, setAssignments] = useState<TherapistAssignmentRow[]>([]);
  const [tab, setTab] = useState<"users" | "tracks" | "assign">("users");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [userErr, setUserErr] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState(true);
  const [assignLoading, setAssignLoading] = useState(true);
  const [q, setQ] = useState("");

  const [newRole, setNewRole] = useState<"THERAPIST" | "ADMIN">("THERAPIST");
  const [createMsg, setCreateMsg] = useState("");
  const [creating, setCreating] = useState(false);

  const [assignTherapistId, setAssignTherapistId] = useState("");
  const [assignUserId, setAssignUserId] = useState("");
  const [assignMsg, setAssignMsg] = useState("");
  const [assigning, setAssigning] = useState(false);

  function loadSongs() {
    setSongsLoading(true);
    api
      .listSongs()
      .then(setSongs)
      .catch(() => {})
      .finally(() => setSongsLoading(false));
  }
  function loadUsers() {
    setUsersLoading(true);
    setUserErr("");
    api
      .listUsers()
      .then(setUsers)
      .catch((e) => setUserErr(e.message))
      .finally(() => setUsersLoading(false));
  }
  function loadAssignments() {
    setAssignLoading(true);
    api
      .listTherapistAssignments()
      .then(setAssignments)
      .catch(() => {})
      .finally(() => setAssignLoading(false));
  }

  const { closing, handleClose } = useClosingTransition(onClose);

  useEffect(() => {
    if (!open) return;
    loadUsers();
    loadSongs();
    loadAssignments();
    setMsg("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  const filteredUsers = useMemo(() => {
    const term = q.trim().toLowerCase();
    const regular = users.filter((u) => u.role !== "ADMIN");
    if (!term) return regular;
    return regular.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  }, [users, q]);

  if (!open) return null;

  async function removeUser(u: AdminUserRow) {
    if (!confirm(u.email + " — энэ хэрэглэгчийг устгах уу?")) return;
    try {
      await api.deleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (e) {
      setUserErr((e as Error).message);
    }
  }

  async function createStaff(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateMsg("");
    const f = new FormData(e.currentTarget);
    const name = ((f.get("name") as string) || "").trim();
    const email = ((f.get("email") as string) || "").trim();
    const password = (f.get("password") as string) || "";

    if (name.length < 2) {
      setCreateMsg("❌ Нэрээ оруулна уу");
      return;
    }
    if (password.length < 6) {
      setCreateMsg("❌ Нууц үг дор хаяж 6 тэмдэгт байх ёстой");
      return;
    }

    setCreating(true);
    try {
      await api.createUser({ name, email, password, role: newRole });
      setCreateMsg("✅ Бүртгэгдлээ");
      (e.target as HTMLFormElement).reset();
      loadUsers();
    } catch (err) {
      setCreateMsg("❌ " + (err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault();
    setAssignMsg("");
    if (!assignTherapistId || !assignUserId) {
      setAssignMsg("❌ Эмч болон хэрэглэгч хоёуланг сонгоно уу");
      return;
    }
    setAssigning(true);
    try {
      await api.createTherapistAssignment(assignTherapistId, assignUserId);
      setAssignMsg("✅ Томилогдлоо");
      setAssignTherapistId("");
      setAssignUserId("");
      loadAssignments();
    } catch (err) {
      setAssignMsg("❌ " + (err as Error).message);
    } finally {
      setAssigning(false);
    }
  }

  async function removeAssignment(id: string) {
    if (!confirm("Энэ томилолтыг цуцлах уу?")) return;
    try {
      await api.removeTherapistAssignment(id);
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      setAssignMsg("❌ " + (e as Error).message);
    }
  }

  async function addTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = ((f.get("title") as string) || "").trim();
    const singer = ((f.get("singer") as string) || "").trim();
    const composer = ((f.get("composer") as string) || "").trim();
    const genre = ((f.get("genre") as string) || "").trim() || "Бусад";
    const audio = f.get("audio") as File;

    if (title.length < 2) {
      setMsg("❌ Дууны нэрээ оруулна уу");
      return;
    }
    if (singer.length < 2) {
      setMsg("❌ Дуучны нэрээ оруулна уу");
      return;
    }
    if (!audio || !audio.size) {
      setMsg("❌ Дууны mp3 файлаа сонгоно уу — энэ нь тоглогдох дуу тул заавал шаардлагатай");
      return;
    }
    if (!/audio\//.test(audio.type)) {
      setMsg("❌ Аудио талбарт зөвхөн дууны файл (mp3) оруулна — зураг биш");
      return;
    }

    setBusy(true);
    try {
      const uploadForm = new FormData();
      uploadForm.set("title", title);
      uploadForm.set("artist", singer);
      if (composer) uploadForm.set("composer", composer);
      uploadForm.set("genre", genre);
      uploadForm.set("file", audio);

      const song = await api.uploadSong(uploadForm);
      setMsg("✅ «" + title + "» амжилттай нэмэгдлээ. Анализ хийгдэж байна…");
      loadSongs();
      form.reset();

      /* Upload дуусмагц шууд, автоматаар client-side (browser) анализ эхэлнэ. */
      try {
        const result = await analyzeAudioFile(song.fileUrl);
        await api.submitAnalysis(song.id, result);
        setMsg("✅ «" + title + "» нэмэгдэж, анализ дууслаа.");
        loadSongs();
      } catch (analyzeErr) {
        setMsg("⚠️ «" + title + "» нэмэгдсэн ч анализ амжилтгүй боллоо: " + (analyzeErr as Error).message);
      }
    } catch (err) {
      setMsg("❌ Хадгалахад алдаа гарлаа: " + (err as Error).message);
    }
    setBusy(false);
  }

  const regular = users.filter((u) => u.role !== "ADMIN");
  const therapists = users.filter((u) => u.role === "THERAPIST");
  const patients = users.filter((u) => u.role === "USER");

  return (
    <div
      className={"auth-ov" + (closing ? " closing" : "")}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="auth-box admin-box" role="dialog" aria-modal="true" aria-label="Админ самбар">
        <button className="auth-x" onClick={handleClose} aria-label="Хаах">
          ✕
        </button>

        <span className="mono">МЭДРЭХ® / Админ самбар</span>

        <div className="auth-tabs" style={{ marginBottom: 0 }}>
          <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>
            Хэрэглэгчид
          </button>
          <button className={tab === "assign" ? "on" : ""} onClick={() => setTab("assign")}>
            Эмч томилолт
          </button>
          <button className={tab === "tracks" ? "on" : ""} onClick={() => setTab("tracks")}>
            Дууны сан
          </button>
        </div>

        {tab === "users" && (
          <>
            <div className="adm-stats">
              <div>
                <span className="mono">Нийт бүртгэл</span>
                <b>{regular.length}</b>
              </div>
              <div>
                <span className="mono">PRO захиалагч</span>
                <b>{regular.filter((u) => u.subActive).length}</b>
              </div>
            </div>

            <form className="adm-form" onSubmit={createStaff}>
              <span className="mono" style={{ fontSize: 9.5 }}>
                Ажилтан бүртгэх (Админ/Эмч)
              </span>
              <div className="adm-form-row">
                <label>
                  <span className="mono">Нэр *</span>
                  <input name="name" type="text" placeholder="ж: Б.Оюунаа" />
                </label>
                <label>
                  <span className="mono">Имэйл *</span>
                  <input name="email" type="email" placeholder="name@example.com" />
                </label>
              </div>
              <div className="adm-form-row">
                <label>
                  <span className="mono">Нууц үг *</span>
                  <input name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
                </label>
                <label>
                  <span className="mono">Эрх</span>
                  <select value={newRole} onChange={(e) => setNewRole(e.target.value as "THERAPIST" | "ADMIN")}>
                    <option value="THERAPIST">Эмч</option>
                    <option value="ADMIN">Админ</option>
                  </select>
                </label>
              </div>
              {createMsg && (
                <p className={createMsg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
                  {createMsg}
                </p>
              )}
              <button type="submit" className="bt bt-a auth-sub" disabled={creating}>
                {creating ? "Бүртгэж байна…" : "+ Ажилтан бүртгэх"}
              </button>
            </form>

            {usersLoading && <Skeleton variant="row" rows={5} />}
            {!usersLoading && userErr && <ErrorState title="Ачаалагдсангүй" hint={userErr} onRetry={loadUsers} />}

            {!usersLoading && !userErr && (
              <>
                <form className="plv-create" onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 14 }}>
                  <input className="plv-search" placeholder="Нэр эсвэл имэйлээр хайх…" value={q} onChange={(e) => setQ(e.target.value)} />
                </form>

                {filteredUsers.length === 0 ? (
                  <Empty icon="👥" title="Хэрэглэгч олдсонгүй" hint={q ? "Хайлтад тохирох хэрэглэгч алга" : "Одоогоор бүртгүүлсэн хэрэглэгч алга"} />
                ) : (
                  <div className="adm-list">
                    <div className="adm-row adm-head adm-row-u">
                      <span className="mono">Нэр</span>
                      <span className="mono">Имэйл</span>
                      <span className="mono">Эрх</span>
                      <span className="mono">Огноо</span>
                      <span className="mono">Захиалга</span>
                      <span></span>
                    </div>
                    {filteredUsers.map((u) => (
                      <div className="adm-row adm-row-u" key={u.id}>
                        <span>{u.name}</span>
                        <span className="adm-mail">{u.email}</span>
                        <span>{ROLE_LABEL[u.role]}</span>
                        <span className="adm-date">{u.createdAt ? new Date(u.createdAt).toLocaleDateString("mn-MN") : "—"}</span>
                        <span className={"adm-sub" + (u.subActive ? " on" : "")}>{u.subActive ? "PRO" : "—"}</span>
                        <button className="adm-del" onClick={() => removeUser(u)} aria-label={u.email + " устгах"}>
                          Устгах
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {tab === "assign" && (
          <>
            <form className="adm-form" onSubmit={createAssignment}>
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

            {assignLoading && <Loading label="Томилолт ачааллаж байна…" />}
            {!assignLoading && assignments.length === 0 && (
              <Empty icon="🧑‍⚕️" title="Одоогоор томилолт алга" hint="Дээрх формоор эмч-хэрэглэгч холбоос үүсгээрэй" />
            )}
            {!assignLoading && assignments.length > 0 && (
              <div className="adm-list">
                <div className="adm-row adm-head adm-arow">
                  <span className="mono">Эмч</span>
                  <span className="mono">Хэрэглэгч</span>
                  <span></span>
                </div>
                {assignments.map((a) => (
                  <div className="adm-row adm-arow" key={a.id}>
                    <span>
                      {a.therapist.name} <i className="adm-artist">— {a.therapist.email}</i>
                    </span>
                    <span>
                      {a.patient.name} <i className="adm-artist">— {a.patient.email}</i>
                    </span>
                    <button className="adm-del" onClick={() => removeAssignment(a.id)} aria-label="Томилолт цуцлах">
                      Цуцлах
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === "tracks" && (
          <>
            <form className="adm-form" onSubmit={addTrack}>
              <span className="mono" style={{ fontSize: 9.5 }}>
                Шинэ дуу нэмэх
              </span>
              <div className="adm-form-row">
                <label>
                  <span className="mono">Дууны нэр *</span>
                  <input name="title" type="text" placeholder="ж: Хөх тэнгэр" />
                </label>
                <label>
                  <span className="mono">Дуучин *</span>
                  <input name="singer" type="text" placeholder="ж: Батаа" />
                </label>
              </div>
              <div className="adm-form-row">
                <label>
                  <span className="mono">Зохиолч (заавал биш)</span>
                  <input name="composer" type="text" placeholder="ж: Д.Дорж" />
                </label>
                <label>
                  <span className="mono">Төрөл (заавал биш)</span>
                  <input name="genre" type="text" placeholder="ж: Поп" list="genres" />
                  <datalist id="genres">
                    <option value="Поп" />
                    <option value="Рок" />
                    <option value="Хип хоп" />
                    <option value="Электрон" />
                    <option value="Ардын" />
                    <option value="Чилл" />
                  </datalist>
                </label>
              </div>

              <label>
                <span className="mono">🎵 Дууны файл (mp3) *</span>
                <input name="audio" type="file" accept="audio/*" className="adm-file" />
              </label>

              {msg && (
                <p className={msg.startsWith("✅") ? "auth-ok" : "auth-err"} style={{ fontSize: 13 }}>
                  {msg}
                </p>
              )}
              <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
                {busy ? "Хадгалж, анализ хийж байна…" : "+ Дуу нэмэх"}
              </button>
            </form>

            {songsLoading && <Loading label="Дуунууд ачааллаж байна…" />}
            {!songsLoading && songs.length === 0 && (
              <Empty icon="🎵" title="Backend-д нэмсэн дуу алга" hint="Дээрх формоор шинэ дуу нэмээрэй" />
            )}
            {!songsLoading && songs.length > 0 && (
              <div className="adm-list">
                <div className="adm-row adm-head adm-row-t">
                  <span className="mono">Нэр</span>
                  <span className="mono">Төрөл</span>
                  <span className="mono">BPM</span>
                  <span></span>
                </div>
                {songs.map((s) => (
                  <div className="adm-row adm-row-t" key={s.id}>
                    <span>
                      {s.title} <i className="adm-artist">— {s.artist}</i>
                    </span>
                    <span className="adm-date">{s.genre || "—"}</span>
                    <span className="adm-date">{s.analyzedBpm ?? s.bpm ?? "—"}</span>
                    <span></span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <p className="auth-note mono">Нэвтэрсэн: {currentUser?.email}</p>
      </div>
    </div>
  );
}
