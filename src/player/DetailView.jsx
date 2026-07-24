import BackBar from './BackBar.jsx'
import { FEEL, FEEL_DEFAULT } from './constants.jsx'

/* Дууны дэлгэрэнгүй — Player.jsx-аас тусад нь гаргасан.
   Props: track, isCurrent, playing, onPlay(), onFeelTest(), onBack() */
export default function DetailView({ track, isCurrent, playing, onPlay, onFeelTest, onBack }) {
  const t = track
  if (!t) return null
  const f = FEEL[t.genre] || FEEL_DEFAULT
  const tot = f.pattern.reduce((a, b) => a + b, 0)

  return (
    <>
      <BackBar title="Дууны дэлгэрэнгүй" onBack={onBack} />
      <div className="dt-wrap">
        <div className="dt-left">
          <img className="dt-cover" src={t.cover} alt={t.title} />
          <div className="dt-btns">
            <button className="bt bt-a" onClick={onPlay}>
              {isCurrent && playing ? '⏸ Зогсоох' : '▶ Тоглуулах'}
            </button>
            <button className="bt" onClick={onFeelTest}>📳 Туршиж мэдрэх</button>
          </div>
        </div>
        <div className="dt-right">
          <span className="sp-chip on dt-genre">{t.genre}</span>
          <h2 className="dt-title">{t.title}</h2>
          <p className="dt-artist">
            Дуучин: {t.artist}
            {t.composer && <> · Зохиолч: {t.composer}</>}
          </p>

          <h3 className="st-h">Энэ дуу хэрхэн мэдрэгдэх вэ?</h3>
          <p className="dt-feel">{f.text}</p>

          <div className="dt-bands">
            {[['Бас', f.bass, '20—250 Hz'], ['Дунд', f.mid, '250 Hz—4 kHz'], ['Өндөр', f.high, '4—20 kHz']].map(([lbl, v, hz]) => (
              <div className="dt-band" key={lbl}>
                <div className="dt-band-top"><b>{lbl}</b><span className="mono">{hz}</span><span className="dt-pct">{v}%</span></div>
                <div className="dt-meter"><i style={{ width: v + '%' }}></i></div>
              </div>
            ))}
          </div>

          <h3 className="st-h">Чичиргээний хэв маяг</h3>
          <div className="dt-hap" aria-label="Чичиргээний хэв маяг">
            {f.pattern.map((ms, i) => (
              i % 2 === 0
                ? <i key={i} style={{ flex: ms / tot + ' 0 0' }} title={ms + ' мс чичиргээ'}></i>
                : <u key={i} style={{ flex: ms / tot + ' 0 0' }}></u>
            ))}
          </div>
          <p className="dt-hap-lb mono">{f.pattern.join(' · ')} мс</p>
        </div>
      </div>
    </>
  )
}
