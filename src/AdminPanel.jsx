import { useEffect, useState } from 'react'
import { loadUsers, saveUsers } from './AuthModal.jsx'

export default function AdminPanel({ open, onClose, currentUser }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!open) return
    setUsers(loadUsers())
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function removeUser(email) {
    if (!confirm(email + ' — энэ хэрэглэгчийг устгах уу?')) return
    const next = users.filter((u) => u.email !== email)
    saveUsers(next)
    setUsers(next)
  }

  const regular = users.filter((u) => u.role !== 'admin')

  return (
    <div className="auth-ov" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="auth-box admin-box" role="dialog" aria-modal="true" aria-label="Админ самбар">
        <button className="auth-x" onClick={onClose} aria-label="Хаах">✕</button>

        <span className="mono">МЭДРЭХ® / Админ самбар</span>

        <div className="adm-stats">
          <div><span className="mono">Нийт бүртгэл</span><b>{regular.length}</b></div>
          <div><span className="mono">Админ</span><b>{users.length - regular.length}</b></div>
        </div>

        <div className="adm-list">
          <div className="adm-row adm-head">
            <span className="mono">Нэр</span>
            <span className="mono">Имэйл</span>
            <span className="mono">Огноо</span>
            <span className="mono">Захиалга</span>
            <span></span>
          </div>
          {regular.length === 0 && (
            <p className="adm-empty">Одоогоор бүртгүүлсэн хэрэглэгч алга</p>
          )}
          {regular.map((u) => (
            <div className="adm-row" key={u.email}>
              <span>{u.name}</span>
              <span className="adm-mail">{u.email}</span>
              <span className="adm-date">
                {u.created ? new Date(u.created).toLocaleDateString('mn-MN') : '—'}
              </span>
              <span className={'adm-sub' + (u.sub?.active ? ' on' : '')}>
                {u.sub?.active ? 'PRO' : '—'}
              </span>
              <button className="adm-del" onClick={() => removeUser(u.email)} aria-label={u.email + ' устгах'}>
                Устгах
              </button>
            </div>
          ))}
        </div>

        <p className="auth-note mono">Нэвтэрсэн: {currentUser?.email}</p>
      </div>
    </div>
  )
}
