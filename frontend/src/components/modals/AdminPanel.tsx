"use client";

import { useEffect, useMemo, useState } from "react";
import * as api from "@/lib/api/client";
import { analyzeAudioFile } from "@/lib/audio/analyze";
import { useClosingTransition } from "@/lib/ui/useClosingTransition";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminTab } from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import UsersTable from "@/components/admin/UsersTable";
import StaffCreationForm from "@/components/admin/StaffCreationForm";
import AssignmentsPanel from "@/components/admin/AssignmentsPanel";
import SongLibraryPanel from "@/components/admin/SongLibraryPanel";
import ProManagementPanel from "@/components/admin/ProManagementPanel";
import { applySubOverrides } from "@/lib/data/admin-sub-overrides";
import type { AdminUserRow, SessionUser } from "@/types/auth";
import type { Song } from "@/types/song";
import type { TherapistAssignmentRow } from "@/types/therapy";

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
  const [tab, setTab] = useState<AdminTab>("users");
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
      /* Backend дээр subActive/subPlan бичих endpoint байхгүй тул UsersTable-ийн
         Grant/Remove PRO нь зөвхөн localStorage demo-override хадгалдаг
         (admin-sub-overrides.ts) — жинхэнэ GET /users үр дүн дээр энд client талд
         л merge хийж харуулна. */
      .then((rows) => setUsers(applySubOverrides(rows)))
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
      className={
        "fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-6 " +
        (closing ? "[animation:aov-out_.2s_ease_forwards]" : "[animation:aov_.3s_ease]")
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-[720px] max-h-[88vh] overflow-y-auto bg-[rgba(9,14,14,.97)] border border-white/[.1] rounded-2xl p-[30px_30px_24px] shadow-lg [animation:abx_.4s_cubic-bezier(.16,.8,.24,1)]"
        role="dialog"
        aria-modal="true"
        aria-label="Админ самбар"
      >
        <AdminHeader tab={tab} setTab={setTab} onClose={handleClose} />

        {tab === "users" && (
          <>
            <AdminStats total={regular.length} proCount={regular.filter((u) => u.subActive).length} />

            <StaffCreationForm newRole={newRole} setNewRole={setNewRole} createMsg={createMsg} creating={creating} onSubmit={createStaff} />

            <UsersTable
              loading={usersLoading}
              error={userErr}
              onRetry={loadUsers}
              q={q}
              setQ={setQ}
              users={filteredUsers}
              onDelete={removeUser}
              onSubChanged={loadUsers}
            />
          </>
        )}

        {tab === "assign" && (
          <AssignmentsPanel
            therapists={therapists}
            patients={patients}
            assignTherapistId={assignTherapistId}
            setAssignTherapistId={setAssignTherapistId}
            assignUserId={assignUserId}
            setAssignUserId={setAssignUserId}
            assignMsg={assignMsg}
            assigning={assigning}
            onSubmit={createAssignment}
            loading={assignLoading}
            assignments={assignments}
            onRemove={removeAssignment}
          />
        )}

        {tab === "tracks" && <SongLibraryPanel msg={msg} busy={busy} onSubmit={addTrack} loading={songsLoading} songs={songs} />}

        {tab === "pro" && <ProManagementPanel users={users} />}

        <p className="mt-6 pt-4 border-t border-white/[.07] mono !text-[9px]">Нэвтэрсэн: {currentUser?.email}</p>
      </div>
    </div>
  );
}
