"use client";

import { useEffect, useMemo, useState } from "react";
import * as api from "@/lib/api/client";
import { uploadSongWithAnalysis } from "@/lib/songs/upload";
import { useModalShell } from "@/hooks/useModalShell";
import AdminHeader from "@/components/admin/AdminHeader";
import type { AdminTab } from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import UsersTable from "@/components/admin/UsersTable";
import StaffCreationForm from "@/components/admin/StaffCreationForm";
import AssignmentsPanel from "@/components/admin/AssignmentsPanel";
import SongLibraryPanel from "@/components/admin/SongLibraryPanel";
import ProManagementPanel from "@/components/admin/ProManagementPanel";
import type { AdminUserRow, SessionUser } from "@/types/auth";
import type { Song, SongLicense } from "@/types/song";
import type { ParentLinkRow, TherapistAssignmentRow } from "@/types/therapy";

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

  const [parentLinks, setParentLinks] = useState<ParentLinkRow[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);
  const [linkParentId, setLinkParentId] = useState("");
  const [linkChildId, setLinkChildId] = useState("");
  const [linkMsg, setLinkMsg] = useState("");
  const [linking, setLinking] = useState(false);

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
  function loadParentLinks() {
    setLinksLoading(true);
    api
      .listParentLinks()
      .then(setParentLinks)
      .catch(() => {})
      .finally(() => setLinksLoading(false));
  }

  /* Гарах animation · Escape · focus trap · backdrop-click — дөрвүүлээ нэг hook-т. */
  const { closing, handleClose, trapRef, backdropProps } = useModalShell({ open, onClose });

  useEffect(() => {
    if (!open) return;
    loadUsers();
    loadSongs();
    loadAssignments();
    loadParentLinks();
    setMsg("");
  }, [open]);

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

  async function createLink(e: React.FormEvent) {
    e.preventDefault();
    setLinkMsg("");
    if (!linkParentId || !linkChildId) {
      setLinkMsg("❌ Эцэг эх болон хvvхэд хоёуланг сонгоно уу");
      return;
    }
    setLinking(true);
    try {
      await api.createParentLink(linkParentId, linkChildId);
      setLinkMsg("✅ Холбогдлоо");
      setLinkParentId("");
      setLinkChildId("");
      loadParentLinks();
    } catch (err) {
      setLinkMsg("❌ " + (err as Error).message);
    } finally {
      setLinking(false);
    }
  }

  async function removeLink(id: string) {
    if (!confirm("Энэ холбоосыг цуцлах уу?")) return;
    try {
      await api.removeParentLink(id);
      setParentLinks((prev) => prev.filter((l) => l.id !== id));
    } catch (e) {
      setLinkMsg("❌ " + (e as Error).message);
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
    const license = (f.get("license") as SongLicense) || "ORIGINAL";
    const licenseSrc = ((f.get("licenseSrc") as string) || "").trim();

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
    if (license === "LICENSED" && licenseSrc.length < 1) {
      setMsg("❌ Гэрээт лиценз сонгосон бол эх сурвалж/гэрээний тайлбар заавал бичнэ үү");
      return;
    }

    setBusy(true);
    try {
      const { analyzed, analyzeError } = await uploadSongWithAnalysis({
        title,
        artist: singer,
        composer,
        genre,
        file: audio,
        license,
        licenseSrc: license === "LICENSED" ? licenseSrc : undefined,
      });
      form.reset();
      loadSongs();
      if (analyzed) setMsg("✅ «" + title + "» нэмэгдэж, анализ дууслаа.");
      else setMsg("⚠️ «" + title + "» нэмэгдсэн ч анализ амжилтгүй боллоо: " + analyzeError?.message);
    } catch (err) {
      setMsg("❌ Хадгалахад алдаа гарлаа: " + (err as Error).message);
    }
    setBusy(false);
  }

  const regular = users.filter((u) => u.role !== "ADMIN");
  const therapists = users.filter((u) => u.role === "THERAPIST");
  const patients = users.filter((u) => u.role === "USER");
  const parents = users.filter((u) => u.role === "PARENT");
  /* ParentLink.childUserId нь USER (эмчийн patients-тэй ижил эх) — эцэг эх хvvхдээ
     сонгохдоо мєн энэ жагсаалтаас сонгоно (харилцаа THERAPIST-ийн patients-тэй давхцаж
     болно, PARENT ба THERAPIST хоёр өөр context-д тухайн хэрэглэгчид хамаарна). */
  const childUsers = patients;

  return (
    <div
      className={
        "fixed inset-0 z-[10000] bg-[rgba(4,7,7,.72)] backdrop-blur-lg flex items-center justify-center p-6 " +
        (closing ? "[animation:aov-out_.2s_ease_forwards]" : "[animation:aov_.3s_ease]")
      }
      {...backdropProps}
    >
      <div
        ref={trapRef}
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
            parents={parents}
            childUsers={childUsers}
            linkParentId={linkParentId}
            setLinkParentId={setLinkParentId}
            linkChildId={linkChildId}
            setLinkChildId={setLinkChildId}
            linkMsg={linkMsg}
            linking={linking}
            onLinkSubmit={createLink}
            linksLoading={linksLoading}
            parentLinks={parentLinks}
            onUnlink={removeLink}
          />
        )}

        {tab === "tracks" && <SongLibraryPanel msg={msg} busy={busy} onSubmit={addTrack} loading={songsLoading} songs={songs} />}

        {tab === "pro" && <ProManagementPanel users={users} />}

        <p className="mt-6 pt-4 border-t border-white/[.07] mono !text-micro">Нэвтэрсэн: {currentUser?.email}</p>
      </div>
    </div>
  );
}
