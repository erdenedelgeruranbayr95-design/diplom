import { useState } from 'react'
import StatCard from './StatCard.jsx'
import { ICONS } from './constants.jsx'
import { loadUsers } from '../AuthModal.jsx'
import { loadPayments, pushFeed } from '../library.js'

/* Админы хяналтын самбар — Player.jsx-аас тусад нь гаргасан.
   bcast/bcastOk state-ийг энэ component дотор нь шинээр зарласан.
   Props: allTracksCount, onOpenAdmin(), onGoHome() */
export default function AdminView({ allTracksCount, onOpenAdmin, onGoHome }) {
  const [bcast, setBcast] = useState('')
  const [bcastOk, setBcastOk] = useState('')

  const users = loadUsers().filter((u) => u.role !== 'admin')
  const proCount = users.filter((u) => u.sub?.active).length
  const revenue = users.reduce((sum, u) => sum + loadPayments(u.email).length * 9900, 0)
  const recentUsers = [...users].sort((a, b) => (b.created || 0) - (a.created || 0)).slice(0, 5)

  function sendBcast(e) {
    e.preventDefault()
    const text = bcast.trim()
    if (text.length < 3) { setBcastOk('❌ Зарлалын текстээ бичнэ үү'); return }
    pushFeed(text, '📢')
    setBcast('')
    setBcastOk('✅ Зарлал бүх хэрэглэгчид илгээгдлээ')
    setTimeout(() => setBcastOk(''), 3000)
  }

  return (
    <>
      <div className="ab-head">
        <div>
          <span className="mono">Хяналтын самбар</span>
          <h2 className="sp-h" style={{ margin: '8px 0 0' }}>Сайн уу, Админ 🛠</h2>
        </div>
        <button className="bt bt-a" onClick={onOpenAdmin}>Хэрэглэгч · Дуу удирдах →</button>
      </div>

      <div className="st-cards">
        <StatCard icon={ICONS.users} color="c-aqua" value={users.length} label="Нийт хэрэглэгч" />
        <StatCard icon={ICONS.gem} color="c-purple" value={proCount} label="PRO захиалагч" />
        <StatCard icon={ICONS.money} color="c-gold" value={revenue.toLocaleString() + '₮'} label="Нийт орлого (демо)" />
        <StatCard icon={ICONS.music} color="c-rose" value={allTracksCount} label="Дууны сан" />
      </div>

      <div className="ab-card">
        <div className="ab-card-h">
          <span className="st-ico c-gold" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              {ICONS.horn}
            </svg>
          </span>
          <div>
            <b>Бүх хэрэглэгчид зарлал илгээх</b>
            <p>Зарлал хэрэглэгч бүрийн хонхонд шууд очно. Дуу нэмэхэд мэдэгдэл автоматаар илгээгддэг.</p>
          </div>
        </div>
        <form className="ab-bcast" onSubmit={sendBcast}>
          <input
            type="text"
            value={bcast}
            onChange={(e) => setBcast(e.target.value)}
            placeholder="ж: Маргааш 20:00 цагт шинэ цомог нэмэгдэнэ!"
            aria-label="Зарлалын текст"
          />
          <button type="submit" className="bt bt-a">Илгээх</button>
        </form>
        {bcastOk && <p className={bcastOk.startsWith('✅') ? 'auth-ok' : 'auth-err'} style={{ fontSize: 13 }}>{bcastOk}</p>}
      </div>

      <h3 className="st-h">Сүүлийн бүртгэлүүд</h3>
      {recentUsers.length === 0 ? (
        <p className="adm-empty">Бүртгүүлсэн хэрэглэгч алга</p>
      ) : (
        <div className="bil-table">
          <div className="bil-row bil-head ab-urow">
            <span className="mono">Хэрэглэгч</span><span className="mono">Имэйл</span>
            <span className="mono">Огноо</span><span className="mono">Статус</span>
          </div>
          {recentUsers.map((u) => (
            <div className="bil-row ab-urow" key={u.email}>
              <span className="ab-uname">
                <i className="ab-uav" aria-hidden="true">{(u.name || '?').charAt(0).toUpperCase()}</i>
                {u.name}
              </span>
              <span className="bil-mth">{u.email}</span>
              <span>{u.created ? new Date(u.created).toLocaleDateString('mn-MN') : '—'}</span>
              <span className={u.sub?.active ? 'bil-ok' : 'ab-free'}>{u.sub?.active ? '💎 PRO' : 'Үнэгүй'}</span>
            </div>
          ))}
        </div>
      )}

      <div className="sp-banner" style={{ marginTop: 30 }}>
        <div>
          <b>Тоглуулагч руу шилжих</b>
          <p>Хэрэглэгчийн нүдээр аппаа туршиж, дуу сонсож, мэдрэх горимыг шалгаарай.</p>
        </div>
        <button className="bt" onClick={onGoHome}>🎧 Тоглуулагч нээх</button>
      </div>
    </>
  )
}
