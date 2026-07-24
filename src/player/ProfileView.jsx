import { useState } from 'react'
import BackBar from './BackBar.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { useToast } from '../ui/Toast.jsx'
import { updateUserFields, verifyPassword, setPassword } from '../AuthModal.jsx'

const COLORS = ['#38E8CE', '#D9A54C', '#D98FA8', '#9FB6E8', '#7FD8E8', '#B5E88F']
const HEARING = [
  { v: 'deaf', label: 'Сонсголгүй' },
  { v: 'hoh', label: 'Сул сонсголтой' },
  { v: 'hearing', label: 'Сонсголтой' },
  { v: '', label: 'Хэлэхгүй' },
]

export default function ProfileView({ onBack }) {
  const { user, updateUser } = useAuth()
  const toast = useToast()

  const [name, setName] = useState(user?.name || '')
  const [color, setColor] = useState(user?.color || COLORS[0])
  const [hearing, setHearing] = useState(user?.hearing || '')

  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPass2, setNewPass2] = useState('')

  const initial = (name || '?').trim().charAt(0).toUpperCase()
  const isAdmin = user?.role === 'admin'

  function saveProfile(e) {
    e.preventDefault()
    if (name.trim().length < 2) { toast.error('Нэр дор хаяж 2 тэмдэгт байх ёстой'); return }
    updateUserFields(user.email, { name: name.trim(), color, hearing })
    updateUser({ name: name.trim(), color, hearing })
    toast.success('Профайл хадгалагдлаа')
  }

  function changePass(e) {
    e.preventDefault()
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
