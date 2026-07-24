import BackBar from './BackBar.jsx'
import StatCard from './StatCard.jsx'
import { ICONS } from './constants.jsx'
import { fmtDur } from './format.js'
import { todayKey } from '../library.js'

/* Миний статистик — Player.jsx-аас тусад нь гаргасан.
   Props: stats (statsRef.current-ийн snapshot), byId(id)→track, onPlay(track), onBack() */
const EMPTY_STATS = { total: 0, vib: 0, byGenre: {}, byTrack: {}, days: {} }

export default function StatsView({ stats, byId, onPlay, onBack }) {
  const s = stats || EMPTY_STATS
  const topGenre = Object.entries(s.byGenre).sort((a, b) => b[1] - a[1])[0]
  const topTracks = Object.entries(s.byTrack).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([id, sec]) => ({ t: byId(isNaN(+id) ? id : +id), sec })).filter((x) => x.t)
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const k = todayKey(d)
    days.push({ label: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'][d.getDay()], sec: s.days[k] || 0, today: i === 0 })
  }
  const maxDay = Math.max(1, ...days.map((d) => d.sec))

  return (
    <>
      <BackBar title="Миний статистик" onBack={onBack} />
      <div className="st-cards">
        <StatCard icon={ICONS.phones} color="c-aqua" value={fmtDur(s.total)} label="Нийт сонссон" />
        <StatCard icon={ICONS.vibrate} color="c-gold" value={s.vib.toLocaleString()} label="Мэдэрсэн чичиргээ" />
        <StatCard icon={ICONS.music} color="c-purple" value={Object.keys(s.byTrack).length} label="Сонссон дуу" />
        <StatCard icon={ICONS.star} color="c-rose" value={topGenre ? topGenre[0] : '—'} label="Топ төрөл" />
      </div>

      <h3 className="st-h">Сүүлийн 7 хоног</h3>
      <div className="st-chart">
        {days.map((d, i) => (
          <div className="st-col" key={i}>
            <span className="st-val mono">{d.sec ? fmtDur(d.sec) : ''}</span>
            <i className={d.today ? 'today' : ''} style={{ height: Math.max(3, (d.sec / maxDay) * 100) + '%' }}></i>
            <span className={'mono' + (d.today ? ' st-today' : '')}>{d.label}</span>
          </div>
        ))}
      </div>

      {topTracks.length > 0 && (
        <>
          <h3 className="st-h">Хамгийн их сонссон</h3>
          <div className="sp-list">
            {topTracks.map(({ t, sec }, i) => (
              <button key={t.id} className="sp-lrow st-toprow" onClick={() => onPlay(t)}>
                <span className="sp-lno mono">{'0' + (i + 1)}</span>
                <img className="sp-lthumb" src={t.cover} alt="" />
                <span className="sp-lmeta"><b>{t.title}</b><i>{t.artist}</i></span>
                <span className="sp-lgenre mono">{fmtDur(sec)}</span>
                <span className="sp-lact" aria-hidden="true">▶</span>
              </button>
            ))}
          </div>
        </>
      )}
      {s.total === 0 && <p className="adm-empty">Дуу сонсож эхлэхэд статистик энд цуглана 🎶</p>}
    </>
  )
}
