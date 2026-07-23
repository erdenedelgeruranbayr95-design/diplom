import { useEffect, useState } from 'react'
import { loadUsers, saveUsers } from './AuthModal.jsx'
import { idbPut } from './idb.js'
import { loadCustomMeta, saveCustomMeta, removeCustomTrack, pushFeed } from './library.js'

export default function AdminPanel({ open, onClose, currentUser }) {
  const [users, setUsers] = useState([])
  const [tracks, setTracks] = useState([])
  const [tab, setTab] = useState('users') // 'users' | 'tracks'
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!open) return
    setUsers(loadUsers())
    setTracks(loadCustomMeta())
    setMsg('')
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
    dispatchEvent(new CustomEvent('medreh:users-changed'))
  }

  async function addTrack(e) {
    e.preventDefault()
    setMsg('')
    const f = new FormData(e.target)
    const title = (f.get('title') || '').trim()
    const singer = (f.get('singer') || '').trim()
    const composer = (f.get('composer') || '').trim()
    const genre = (f.get('genre') || '').trim() || 'Бусад'
    const audio = f.get('audio')
    const cover = f.get('cover')
    const coverUrl = (f.get('coverUrl') || '').trim()

    if (title.length < 2) { setMsg('❌ Дууны нэрээ оруулна уу'); return }
    if (singer.length < 2) { setMsg('❌ Дуучны нэрээ оруулна уу'); return }
    if (!audio || !audio.size) { setMsg('❌ Дууны mp3 файлаа сонгоно уу — энэ нь тоглогдох дуу тул заавал шаардлагатай'); return }
    if (!/audio\//.test(audio.type)) { setMsg('❌ Аудио талбарт зөвхөн дууны файл (mp3) оруулна — зураг биш'); return }
    if (coverUrl && !/^https?:\/\//.test(coverUrl)) { setMsg('❌ Зургийн линк http(s)://-ээр эхлэх ёстой'); return }

    setBusy(true)
    try {
      const id = 'c' + Date.now()
      await idbPut('audio-' + id, audio)
      /* обложка: файл давуу эрхтэй, үгүй бол линк */
      if (cover && cover.size) await idbPut('cover-' + id, cover)
      const meta = {
        id, title, singer, composer, genre,
        hasCover: !!(cover && cover.size),
        coverUrl: (!cover || !cover.size) ? coverUrl : '',
        added: Date.now(),
      }
      const next = [meta, ...loadCustomMeta()]
      saveCustomMeta(next)
      setTracks(next)
      /* бүх хэрэглэгчид мэдэгдэл очно */
      pushFeed('Шинэ дуу нэмэгдлээ: «' + title + '» — ' + singer, '🎵')
      setMsg('✅ «' + title + '» амжилттай нэмэгдлээ. Хэрэглэгчдэд мэдэгдэл илгээгдсэн.')
      e.target.reset()
    } catch (err) {
      setMsg('❌ Хадгалахад алдаа гарлаа: ' + err.message)
    }
    setBusy(false)
  }

  async function delTrack(t) {
    if (!confirm('«' + t.title + '» дууг устгах уу?')) return
    await removeCustomTrack(t.id)
    setTracks(loadCustomMeta())
  }

  const regular = users.filter((u) => u.role !== 'admin')

  return (
    <div className="auth-ov" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="auth-box admin-box" role="dialog" aria-modal="true" aria-label="Админ самбар">
        <button className="auth-x" onClick={onClose} aria-label="Хаах">✕</button>

        <span className="mono">МЭДРЭХ® / Админ самбар</span>

        <div className="auth-tabs" style={{ marginBottom: 0 }}>
          <button className={tab === 'users' ? 'on' : ''} onClick={() => setTab('users')}>Хэрэглэгчид</button>
          <button className={tab === 'tracks' ? 'on' : ''} onClick={() => setTab('tracks')}>Дууны сан</button>
        </div>

        {tab === 'users' && (
          <>
            <div className="adm-stats">
              <div><span className="mono">Нийт бүртгэл</span><b>{regular.length}</b></div>
              <div><span className="mono">PRO захиалагч</span><b>{regular.filter((u) => u.sub?.active).length}</b></div>
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
          </>
        )}

        {tab === 'tracks' && (
          <>
            <form className="adm-form" onSubmit={addTrack}>
              <span className="mono" style={{ fontSize: 9.5 }}>Шинэ дуу нэмэх</span>
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
                    <option value="Поп" /><option value="Рок" /><option value="Хип хоп" />
                    <option value="Электрон" /><option value="Ардын" /><option value="Чилл" />
                  </datalist>
                </label>
              </div>

              <label>
                <span className="mono">🎵 Дууны файл (mp3) *</span>
                <input name="audio" type="file" accept="audio/*" className="adm-file" />
              </label>

              <div className="adm-cover">
                <span className="mono">🖼 Обложка зураг — заавал биш, аль нэгийг нь л оруулна</span>
                <div className="adm-form-row">
                  <label>
                    <span className="mono" style={{ color: 'var(--faint)' }}>Файлаар</span>
                    <input name="cover" type="file" accept="image/*" className="adm-file" />
                  </label>
                  <label>
                    <span className="mono" style={{ color: 'var(--faint)' }}>Эсвэл линкээр</span>
                    <input name="coverUrl" type="url" placeholder="https://..." />
                  </label>
                </div>
                <p className="adm-hint">Хоёуланг нь оруулбал файл нь ашиглагдана. Юу ч оруулаагүй бол автомат обложка тавигдана.</p>
              </div>
              {msg && <p className={msg.startsWith('✅') ? 'auth-ok' : 'auth-err'} style={{ fontSize: 13 }}>{msg}</p>}
              <button type="submit" className="bt bt-a auth-sub" disabled={busy}>
                {busy ? 'Хадгалж байна…' : '+ Дуу нэмэх'}
              </button>
            </form>

            <div className="adm-list">
              <div className="adm-row adm-head adm-row-t">
                <span className="mono">Нэр</span>
                <span className="mono">Төрөл</span>
                <span className="mono">Огноо</span>
                <span></span>
              </div>
              {tracks.length === 0 && (
                <p className="adm-empty">Админы нэмсэн дуу алга — үндсэн 6 демо дуу ажиллаж байна</p>
              )}
              {tracks.map((t) => (
                <div className="adm-row adm-row-t" key={t.id}>
                  <span>
                    {t.title} <i className="adm-artist">— {t.singer || t.artist}</i>
                    {t.composer && <i className="adm-artist"> · зох. {t.composer}</i>}
                  </span>
                  <span className="adm-date">{t.genre}</span>
                  <span className="adm-date">{new Date(t.added).toLocaleDateString('mn-MN')}</span>
                  <button className="adm-del" onClick={() => delTrack(t)}>Устгах</button>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="auth-note mono">Нэвтэрсэн: {currentUser?.email}</p>
      </div>
    </div>
  )
}
