import { useEffect, useState } from 'react'

/* Демо auth — хэрэглэгчдийг localStorage-д хадгална (backend-гүй, дипломын үзүүлэнд). */
const USERS_KEY = 'medreh_users'
const SESSION_KEY = 'medreh_user'

export function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] } catch { return [] }
}
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/* Анхны админ бүртгэл — байхгүй бол үүсгэнэ (демо: admin@medreh.mn / admin123) */
export function seedAdmin() {
  const users = loadUsers()
  if (!users.some((u) => u.role === 'admin')) {
    users.unshift({ name: 'Админ', email: 'admin@medreh.mn', pass: scramble('admin123'), role: 'admin' })
    saveUsers(users)
  }
}
// Демо тул энгийн обфускаци — жинхэнэ систем дээр серверт хэшлэх ёстой
function scramble(s) {
  return btoa(unescape(encodeURIComponent(s + '·medreh')))
}

export function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}
export function saveSession(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(SESSION_KEY)
}

function PassInput({ name, autoComplete }) {
  const [show, setShow] = useState(false)
  return (
    <span className="pass-wrap">
      <input name={name} type={show ? 'text' : 'password'} placeholder="••••••••" autoComplete={autoComplete} />
      <button
        type="button"
        className="pass-eye"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Нууц үг нуух' : 'Нууц үг харах'}
        title={show ? 'Нуух' : 'Харах'}
      >
        {show ? (
          /* нээлттэй нүд */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
        ) : (
          /* дарсан нүд */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.6" />
            <line x1="4" y1="20" x2="20" y2="4" />
          </svg>
        )}
      </button>
    </span>
  )
}

export default function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    if (!open) return
    setMode('login') // нээгдэх бүрд "Нэвтрэх" табаас эхэлнэ
    setErr(''); setOk('')
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    setErr(''); setOk('')
    const f = new FormData(e.target)
    const email = (f.get('email') || '').trim().toLowerCase()
    const pass = f.get('pass') || ''

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('Имэйл хаяг буруу байна'); return }
    if (pass.length < 6) { setErr('Нууц үг дор хаяж 6 тэмдэгт байх ёстой'); return }

    const users = loadUsers()

    if (mode === 'register') {
      const name = (f.get('name') || '').trim()
      const pass2 = f.get('pass2') || ''
      if (name.length < 2) { setErr('Нэрээ оруулна уу'); return }
      if (pass !== pass2) { setErr('Нууц үг таарахгүй байна'); return }
      if (users.some((u) => u.email === email)) { setErr('Энэ имэйлээр аль хэдийн бүртгүүлсэн байна'); return }
      users.push({ name, email, pass: scramble(pass), role: 'user', created: Date.now() })
      saveUsers(users)
      /* шууд нэвтрүүлэхгүй — "Нэвтрэх" таб руу шилжүүлж, өөрөө нэвтэрнэ */
      setOk('Амжилттай бүртгүүллээ! Одоо нэвтэрнэ үү.')
      setTimeout(() => { setMode('login'); setOk('Бүртгэл үүслээ — имэйл, нууц үгээрээ нэвтэрнэ үү') }, 900)
    } else {
      const u = users.find((x) => x.email === email)
      if (!u || u.pass !== scramble(pass)) { setErr('Имэйл эсвэл нууц үг буруу байна'); return }
      onAuth({ name: u.name, email: u.email, role: u.role || 'user', sub: u.sub || null })
      setOk('Тавтай морил, ' + u.name + '!')
      setTimeout(onClose, 700)
    }
  }

  return (
    <div className="auth-ov" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="auth-box" role="dialog" aria-modal="true" aria-label="Нэвтрэх / Бүртгүүлэх">
        <button className="auth-x" onClick={onClose} aria-label="Хаах">✕</button>

        <span className="mono">МЭДРЭХ® / Хандалт</span>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'on' : ''} onClick={() => { setMode('login'); setErr(''); setOk('') }}>
            Нэвтрэх
          </button>
          <button className={mode === 'register' ? 'on' : ''} onClick={() => { setMode('register'); setErr(''); setOk('') }}>
            Бүртгүүлэх
          </button>
        </div>

        <form onSubmit={submit} key={mode}>
          {mode === 'register' && (
            <label>
              <span className="mono">Нэр</span>
              <input name="name" type="text" placeholder="Таны нэр" autoComplete="name" />
            </label>
          )}
          <label>
            <span className="mono">Имэйл</span>
            <input name="email" type="email" placeholder="you@mail.com" autoComplete="email" />
          </label>
          <label>
            <span className="mono">Нууц үг</span>
            <PassInput name="pass" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          </label>
          {mode === 'register' && (
            <label>
              <span className="mono">Нууц үг давтах</span>
              <PassInput name="pass2" autoComplete="new-password" />
            </label>
          )}

          {err && <p className="auth-err">{err}</p>}
          {ok && <p className="auth-ok">{ok}</p>}

          <button type="submit" className="bt bt-a auth-sub">
            {mode === 'login' ? 'Нэвтрэх →' : 'Бүртгүүлэх →'}
          </button>
        </form>

        <p className="auth-note mono">Демо горим — өгөгдөл зөвхөн энэ төхөөрөмжид хадгалагдана</p>
      </div>
    </div>
  )
}
