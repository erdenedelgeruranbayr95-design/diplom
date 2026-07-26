"use client";

import { useState } from "react";
import BackBar from "./BackBar";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { updateUserFields, verifyPassword, setPassword } from "@/lib/auth/auth-storage";
import { VIB_LEVELS, LIGHT_LEVELS } from "@/lib/player/constants";
import type { VizMode } from "@/lib/player/visualizer-modes";

const COLORS = ['#38E8CE', '#D9A54C', '#D98FA8', '#9FB6E8', '#7FD8E8', '#B5E88F']
const HEARING = [
  { v: 'deaf', label: 'Сонсголгүй' },
  { v: 'hoh', label: 'Сул сонсголтой' },
  { v: 'hearing', label: 'Сонсголтой' },
  { v: '', label: 'Хэлэхгүй' },
]
const VIZ_MODES: { v: VizMode; label: string }[] = [
  { v: "bars", label: "Спектр" },
  { v: "waveform", label: "Долгион" },
  { v: "circular", label: "Тойрог" },
  { v: "beat-pulse", label: "Цохилт" },
  { v: "bass-explosion", label: "Бас дэлбэрэлт" },
  { v: "ambient", label: "Ая тохиролт" },
]

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
      <BackBar title="Профайл засах" onBack={onBack} />

      <div className="pv-top">
        <span className="sp-avatar sp-avatar-lg" style={{ background: color, color: '#04100E' }} aria-hidden="true">{initial}</span>
        <div>
          <b>{name || '—'}</b>
          <i>{user?.email}</i>
          <span className="pv-role">{isAdmin ? 'Админ эрх' : user?.sub?.active ? 'PRO хэрэглэгч' : 'Үнэгүй горим'}</span>
        </div>
      </div>

      <form className="pv-card" onSubmit={saveProfile}>
        <h3 className="st-h" style={{ marginTop: 0 }}>Үндсэн мэдээлэл</h3>

        <label className="pv-field">
          <span className="mono">Нэр</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Таны нэр" />
        </label>

        <label className="pv-field">
          <span className="mono">Имэйл (өөрчлөх боломжгүй)</span>
          <input value={user?.email || ''} disabled />
        </label>

        <div className="pv-field">
          <span className="mono">Аватар өнгө</span>
          <div className="pv-colors">
            {COLORS.map((c) => (
              <button type="button" key={c}
                className={'pv-swatch' + (color === c ? ' on' : '')}
                style={{ background: c }} onClick={() => setColor(c)}
                aria-label={'Өнгө ' + c} aria-pressed={color === c} />
            ))}
          </div>
        </div>

        <div className="pv-field">
          <span className="mono">Сонсголын байдал (нууц — тохиргоог сайжруулахад)</span>
          <div className="sp-seg pv-hearing">
            {HEARING.map((h) => (
              <button type="button" key={h.v}
                className={hearing === h.v ? 'on' : ''}
                onClick={() => setHearing(h.v)}>{h.label}</button>
            ))}
          </div>
        </div>

        <button type="submit" className="bt bt-a">Хадгалах</button>
      </form>

      <div className="pv-card">
        <h3 className="st-h" style={{ marginTop: 0 }}>Харагдац</h3>

        <div className="pv-field">
          <span className="mono">Загвар (Theme)</span>
          <div className="sp-seg">
            <button type="button" className={(prefs.theme || "dark") === "dark" ? "on" : ""} onClick={() => onUpdatePrefs({ theme: "dark" })}>Харанхуй</button>
            <button type="button" className={prefs.theme === "light" ? "on" : ""} onClick={() => onUpdatePrefs({ theme: "light" })}>Цайвар</button>
          </div>
        </div>

        <div className="pv-field">
          <span className="mono">Хэл (Language)</span>
          <div className="sp-seg">
            <button type="button" className={(prefs.language || "mn") === "mn" ? "on" : ""} onClick={() => onUpdatePrefs({ language: "mn" })}>Монгол</button>
            <button type="button" className={prefs.language === "en" ? "on" : ""} onClick={() => onUpdatePrefs({ language: "en" })}>English</button>
          </div>
        </div>
      </div>

      <div className="pv-card">
        <h3 className="st-h" style={{ marginTop: 0 }}>Мэдрэх горим — үндсэн тохиргоо</h3>

        <div className="pv-field">
          <span className="mono">Чичиргээний хүч</span>
          <div className="sp-seg">
            {VIB_LEVELS.map((v, i) => (
              <button type="button" key={v.label} className={prefs.vib === i ? "on" : ""} onClick={() => onUpdatePrefs({ vib: i })}>{v.label}</button>
            ))}
          </div>
        </div>

        <div className="pv-field">
          <span className="mono">Гэрлийн эрч</span>
          <div className="sp-seg">
            {LIGHT_LEVELS.map((v, i) => (
              <button type="button" key={v.label} className={prefs.light === i ? "on" : ""} onClick={() => onUpdatePrefs({ light: i })}>{v.label}</button>
            ))}
          </div>
        </div>

        <div className="pv-field">
          <span className="mono">Визуалайзерийн үндсэн горим</span>
          <div className="sp-seg pv-vizmodes">
            {VIZ_MODES.map((m) => (
              <button type="button" key={m.v} className={viz.mode === m.v ? "on" : ""} onClick={() => onUpdatePrefs({ viz: { ...viz, mode: m.v } })}>{m.label}</button>
            ))}
          </div>
        </div>

        <label className="pv-toggle">
          <input type="checkbox" checked={viz.particles} onChange={(e) => onUpdatePrefs({ viz: { ...viz, particles: e.target.checked } })} />
          <span>Тоосонцор эффект идэвхжүүлэх</span>
        </label>
      </div>

      <div className="pv-card">
        <h3 className="st-h" style={{ marginTop: 0 }}>Мэдэгдэл ба хандалт</h3>

        <label className="pv-toggle">
          <input type="checkbox" checked={prefs.notifyFeed ?? true} onChange={(e) => onUpdatePrefs({ notifyFeed: e.target.checked })} />
          <span>Зарлал/мэдэгдэл хүлээн авах</span>
        </label>

        <label className="pv-toggle">
          <input type="checkbox" checked={prefs.reducedMotion ?? false} onChange={(e) => onUpdatePrefs({ reducedMotion: e.target.checked })} />
          <span>Хөдөлгөөн багасгах (визуалайзер/анимаци эрчмийг бууруулна)</span>
        </label>

        <label className="pv-toggle">
          <input type="checkbox" checked={prefs.largeText ?? false} onChange={(e) => onUpdatePrefs({ largeText: e.target.checked })} />
          <span>Том фонт ашиглах</span>
        </label>
      </div>

      <form className="pv-card" onSubmit={changePass}>
        <h3 className="st-h" style={{ marginTop: 0 }}>Нууц үг солих</h3>
        <label className="pv-field">
          <span className="mono">Одоогийн нууц үг</span>
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
        </label>
        <label className="pv-field">
          <span className="mono">Шинэ нууц үг</span>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
        </label>
        <label className="pv-field">
          <span className="mono">Шинэ нууц үг давтах</span>
          <input type="password" value={newPass2} onChange={(e) => setNewPass2(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
        </label>
        <button type="submit" className="bt">Нууц үг солих</button>
      </form>
    </>
  )
}
