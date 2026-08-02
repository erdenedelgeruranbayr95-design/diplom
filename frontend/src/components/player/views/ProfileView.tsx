"use client";

/* Профайл ба тохиргоо.

   ⚠️ Урьд нь `saveProfile()` ба `changePass()` хоёул `lib/auth/auth-storage.ts`-ийн
   localStorage сан руу бичдэг байсан. Тэр сан ҮРГЭЛЖ ХООСОН (`seedAdmin()` хаанаас ч
   дуудагддаггүй) тул:
     · нууц үг солих  → "Одоогийн нууц үг буруу" гэж ҮРГЭЛЖ алдаа өгдөг байв
     · профайл хадгалах → "хадгалагдлаа" гэж хэлээд refresh хийхэд алга болдог байв
   Одоо хоёулаа backend руу (PATCH /users/me · PATCH /users/me/password) бодитоор бичнэ. */
import { useState } from "react";
import BackBar from "../BackBar";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { changePassword, deleteMyAccount, exportMyData, updateProfile } from "@/lib/api/client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSettings, { COLORS } from "@/components/profile/ProfileSettings";
import SecuritySettings from "@/components/profile/SecuritySettings";
import PrivacyDataSettings from "@/components/profile/PrivacyDataSettings";
import PreferenceSettings from "@/components/profile/PreferenceSettings";
import type { Prefs } from "@/types/player";

export default function ProfileView({
  onBack,
  prefs,
  onUpdatePrefs,
}: {
  onBack: () => void;
  prefs: Prefs;
  onUpdatePrefs: (patch: Partial<Prefs>) => void;
}) {
  const { user, updateUser, logout } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || "");
  const [color, setColor] = useState(user?.avatarColor || COLORS[0]);
  const [hearing, setHearing] = useState(user?.hearingProfile || "");
  const [savingProfile, setSavingProfile] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [changingPass, setChangingPass] = useState(false);

  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const isAdmin = user?.role === "ADMIN";

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Нэр дор хаяж 2 тэмдэгт байх ёстой");
      return;
    }
    setSavingProfile(true);
    try {
      const saved = await updateProfile({ name: name.trim(), avatarColor: color, hearingProfile: hearing });
      updateUser({ name: saved.name, avatarColor: saved.avatarColor, hearingProfile: saved.hearingProfile });
      toast.success("Профайл хадгалагдлаа");
    } catch (err) {
      toast.error((err as Error).message || "Хадгалахад алдаа гарлаа");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePass(e: React.FormEvent) {
    e.preventDefault();
    if (newPass.length < 6) {
      toast.error("Шинэ нууц үг дор хаяж 6 тэмдэгт");
      return;
    }
    if (newPass !== newPass2) {
      toast.error("Шинэ нууц үг таарахгүй байна");
      return;
    }
    setChangingPass(true);
    try {
      await changePassword({ currentPassword: oldPass, newPassword: newPass });
      setOldPass("");
      setNewPass("");
      setNewPass2("");
      /* Backend бүх refresh token-ыг хүчингүй болгосон тул бусад төхөөрөмж дээрх
         сесс дараагийн refresh дээр автоматаар дуусна. */
      toast.success("Нууц үг амжилттай солигдлоо — бусад төхөөрөмжөөс гарлаа");
    } catch (err) {
      toast.error((err as Error).message || "Нууц үг солиход алдаа гарлаа");
    } finally {
      setChangingPass(false);
    }
  }

  async function handleExportData() {
    try {
      const data = await exportMyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `medreh-medeelel-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Мэдээлэл татагдлаа");
    } catch (err) {
      toast.error((err as Error).message || "Мэдээлэл татахад алдаа гарлаа");
    }
  }

  async function handleDeleteAccount(password: string) {
    try {
      await deleteMyAccount(password);
      toast.success("Бүртгэл устгагдлаа");
      await logout();
    } catch (err) {
      toast.error((err as Error).message || "Бүртгэл устгахад алдаа гарлаа");
    }
  }

  return (
    <>
      <BackBar title="Профайл ба тохиргоо" onBack={onBack} />

      <ProfileHeader
        initial={initial}
        color={color}
        name={name}
        email={user?.email || ""}
        roleLabel={isAdmin ? "Админ эрх" : user?.sub?.active ? "PRO хэрэглэгч" : "Үнэгүй горим"}
      />

      <div className="max-w-[640px]">
        <ProfileSettings
          name={name}
          setName={setName}
          email={user?.email || ""}
          color={color}
          setColor={setColor}
          hearing={hearing}
          setHearing={setHearing}
          saving={savingProfile}
          onSubmit={saveProfile}
        />

        <PreferenceSettings prefs={prefs} viz={prefs.viz || DEFAULT_VIZ} onUpdatePrefs={onUpdatePrefs} />

        <SecuritySettings
          oldPass={oldPass}
          setOldPass={setOldPass}
          newPass={newPass}
          setNewPass={setNewPass}
          newPass2={newPass2}
          setNewPass2={setNewPass2}
          saving={changingPass}
          onSubmit={changePass}
        />

        <PrivacyDataSettings onExport={handleExportData} onDeleteAccount={handleDeleteAccount} />
      </div>
    </>
  );
}

const DEFAULT_VIZ = { mode: "bars" as const, particles: true, glow: 0.6 };
