"use client";

/* Профайл ба тохиргоо — премиум account-center (Apple ID/Google Account/Notion Settings
   pattern) руу шинэчлэв: PageHeader-той нэгдсэн толгой хэсэг, дэд карт компонентуудыг
   (ProfileHeader/ProfileSettings/PreferenceSettings/SecuritySettings) тус тусад нь
   шинэчилсэн. saveProfile()/changePass() болон бүх state (name/color/hearing/oldPass/
   newPass/newPass2) хэвээр — зөвхөн визуал давхарга шинэчлэгдсэн. */
import { useState } from "react";
import BackBar from "./BackBar";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { updateUserFields, verifyPassword, setPassword } from "@/lib/auth/auth-storage";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSettings, { COLORS } from "@/components/profile/ProfileSettings";
import SecuritySettings from "@/components/profile/SecuritySettings";
import PreferenceSettings from "@/components/profile/PreferenceSettings";
import type { VizMode } from "@/lib/player/visualizer-modes";

interface SettingsPrefs {
  vib: number;
  light: number;
  bands: Record<string, boolean>;
  viz?: { mode: VizMode; particles: boolean; glow: number };
  theme?: "dark" | "light";
  language?: "mn" | "en";
  notifyFeed?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
}

const DEFAULT_VIZ = { mode: "bars" as VizMode, particles: true, glow: 0.6 };

export default function ProfileView({
  onBack,
  prefs,
  onUpdatePrefs,
}: {
  onBack: () => void;
  prefs: SettingsPrefs;
  onUpdatePrefs: (patch: Partial<SettingsPrefs>) => void;
}) {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const viz = prefs.viz || DEFAULT_VIZ

  const [name, setName] = useState(user?.name || '')
  const [color, setColor] = useState((user as any)?.color || COLORS[0])
  const [hearing, setHearing] = useState((user as any)?.hearing || '')

  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPass2, setNewPass2] = useState('')

  const initial = (name || '?').trim().charAt(0).toUpperCase()
  const isAdmin = user?.role === 'ADMIN'

  function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) { toast.error('Нэр дор хаяж 2 тэмдэгт байх ёстой'); return }
    if (!user) return
    updateUserFields(user.email, { name: name.trim() } as any)
    updateUser({ name: name.trim(), ...( { color, hearing } as any) })
    toast.success('Профайл хадгалагдлаа')
  }

  function changePass(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!verifyPassword(user.email, oldPass)) { toast.error('Одоогийн нууц үг буруу байна'); return }
    if (newPass.length < 6) { toast.error('Шинэ нууц үг дор хаяж 6 тэмдэгт'); return }
    if (newPass !== newPass2) { toast.error('Шинэ нууц үг таарахгүй байна'); return }
    setPassword(user.email, newPass)
    setOldPass(''); setNewPass(''); setNewPass2('')
    toast.success('Нууц үг амжилттай солигдлоо')
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
        <ProfileSettings name={name} setName={setName} email={user?.email || ""} color={color} setColor={setColor} hearing={hearing} setHearing={setHearing} onSubmit={saveProfile} />

        <PreferenceSettings prefs={prefs} viz={viz} onUpdatePrefs={onUpdatePrefs} />

        <SecuritySettings
          oldPass={oldPass}
          setOldPass={setOldPass}
          newPass={newPass}
          setNewPass={setNewPass}
          newPass2={newPass2}
          setNewPass2={setNewPass2}
          onSubmit={changePass}
        />
      </div>
    </>
  )
}
