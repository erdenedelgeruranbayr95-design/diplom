import { useEffect, useState } from 'react'
import BackBar from './BackBar.jsx'
import { useToast } from '../ui/Toast.jsx'
import { Empty } from '../ui/States.jsx'
import {
  loadPlaylists, createPlaylist, deletePlaylist,
  addToPlaylist, removeFromPlaylist,
} from '../library.js'

/* Playlist удирдах — үүсгэх / жагсаах / нээх / дуу нэмэх-хасах / тоглуулах */
export default function PlaylistsView({ email, tracks, onPlay, curId, playing, onBack }) {
  const toast = useToast()
  const [lists, setLists] = useState([])
  const [name, setName] = useState('')
  const [openId, setOpenId] = useState(null)
  const [adding, setAdding] = useState(false)
  const [q, setQ] = useState('')

  const refresh = () => setLists(loadPlaylists(email))
  useEffect(() => {
    refresh()
    const on = () => refresh()
    addEventListener('medreh:playlists-changed', on)
    return () => removeEventListener('medreh:playlists-changed', on)
  }, [email])

  const byId = (id) => tracks.find((t) => t.id === id)
  const open = lists.find((p) => p.id === openId)

  function create(e) {
    e.preventDefault()
    if (name.trim().length < 2) { toast.error('Жагсаалтын нэрээ оруулна уу'); return }
    createPlaylist(email, name.trim())
    setName('')
    toast.success('«' + name.trim() + '» жагсаалт үүслээ')
  }
  function remove(p) {
    deletePlaylist(email, p.id)
    if (openId === p.id) setOpenId(null)
    toast.info('«' + p.name + '» устгагдлаа')
  }
  function playAll(p) {
    const first = p.tracks.map(byId).find(Boolean)
    if (first) onPlay(first)
    else toast.error('Жагсаалт хоосон байна')
  }

  /* ---- нээсэн жагсаалт ---- */
  if (open) {
    const items = open.tracks.map(byId).filter(Boolean)
    const candidates = tracks.filter((t) => !open.tracks.includes(t.id) &&
      (t.title + ' ' + t.artist).toLowerCase().includes(q.trim().toLowerCase()))
    return (
      <>
        <BackBar title={open.name} onBack={() => { setOpenId(null); setAdding(false) }} />
        <div className="plv-openhead">
          <span className="mono">{items.length} дуу</span>
          <div className="plv-openact">
            <button className="bt bt-a" onClick={() => playAll(open)} disabled={!items.length}>▶ Бүгдийг тоглуулах</button>
            <button className="bt" onClick={() => setAdding((a) => !a)}>{adding ? 'Хаах' : '＋ Дуу нэмэх'}</button>
          </div>
        </div>

        {adding && (
          <div className="plv-add">
            <input className="plv-search" placeholder="Дуу хайх…" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="sp-list">
              {candidates.length === 0 && <p className="adm-empty">Нэмэх дуу алга</p>}
              {candidates.slice(0, 20).map((t) => (
                <div key={t.id} className="sp-lrow plv-cand">
                  <img className="sp-lthumb" src={t.cover} alt="" />
                  <span className="sp-lmeta"><b>{t.title}</b><i>{t.artist}</i></span>
                  <button className="bt bt-a plv-addbtn" onClick={() => { addToPlaylist(email, open.id, t.id); toast.success('Нэмэгдлээ') }}>＋</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <Empty icon="🎧" title="Жагсаалт хоосон" hint="«＋ Дуу нэмэх» товчоор дуу нэмээрэй" />
        ) : (
          <div className="sp-list">
            {items.map((t, i) => {
              const isCur = curId === t.id
              return (
                <div key={t.id} className={'sp-lrow' + (isCur ? ' on' : '')}>
                  <span className="sp-lno mono">{String(i + 1).padStart(2, '0')}</span>
                  <img className="sp-lthumb" src={t.cover} alt="" />
                  <button className="sp-lmeta plv-play" onClick={() => onPlay(t)}>
                    <b>{t.title}</b><i>{t.artist}</i>
                  </button>
                  <span className="sp-lgenre mono">{t.genre}</span>
                  <button className="adm-del" onClick={() => { removeFromPlaylist(email, open.id, t.id); toast.info('Хасагдлаа') }}>Хасах</button>
                  <span className="sp-lact" aria-hidden="true">{isCur && playing ? '▮▮' : '▶'}</span>
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }

  /* ---- жагсаалтуудын жагсаалт ---- */
  return (
    <>
      <BackBar title="Миний жагсаалтууд" onBack={onBack} />

      <form className="plv-create" onSubmit={create}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Шинэ жагсаалтын нэр…" />
        <button type="submit" className="bt bt-a">＋ Үүсгэх</button>
      </form>

      {lists.length === 0 ? (
        <Empty icon="🎵" title="Жагсаалт алга" hint="Дээрээс шинэ жагсаалт үүсгээд, дуртай дуугаа цуглуулаарай" />
      ) : (
        <div className="plv-grid">
          {lists.map((p) => {
            const cover = p.tracks.map(byId).find(Boolean)?.cover
            return (
              <div className="plv-card" key={p.id}>
                <button className="plv-open" onClick={() => setOpenId(p.id)}>
                  <span className="plv-cover">
                    {cover ? <img src={cover} alt="" /> : <span className="plv-cover-empty" aria-hidden="true">♫</span>}
                  </span>
                  <b>{p.name}</b>
                  <i>{p.tracks.length} дуу</i>
                </button>
                <div className="plv-cardact">
                  <button className="plv-mini" onClick={() => playAll(p)} disabled={!p.tracks.length} aria-label="Тоглуулах">▶</button>
                  <button className="plv-mini danger" onClick={() => remove(p)} aria-label="Устгах">🗑</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
