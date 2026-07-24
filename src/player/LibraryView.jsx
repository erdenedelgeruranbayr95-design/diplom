import BackBar from './BackBar.jsx'
import { Empty } from '../ui/States.jsx'
import { LikeBtn, SaveBtn, InfoBtn } from './TrackButtons.jsx'

/* Дуртай / Хадгалсан / Саяхан сонссон — бүтэн хуудсаар харуулах нийтлэг view.
   HomeView-ийн «Бүх дуунууд» мөрийн бүтцийг дахин ашиглав. */
export default function LibraryView({
  title, tracks, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo, onBack,
  emptyIcon = '🎵', emptyTitle = 'Хоосон байна', emptyHint,
}) {
  const playAll = () => { if (tracks[0]) onPlay(tracks[0]) }
  return (
    <>
      <BackBar title={title} onBack={onBack} />

      {tracks.length === 0 ? (
        <Empty icon={emptyIcon} title={emptyTitle} hint={emptyHint} />
      ) : (
        <>
          <div className="plv-openhead">
            <span className="mono">{tracks.length} дуу</span>
            <div className="plv-openact">
              <button className="bt bt-a" onClick={playAll}>▶ Бүгдийг тоглуулах</button>
            </div>
          </div>

          <div className="sp-list">
            {tracks.map((t, i) => {
              const isCur = curId === t.id
              return (
                <button key={t.id} className={'sp-lrow' + (isCur ? ' on' : '')} onClick={() => onPlay(t)}>
                  <span className="sp-lno mono">{String(i + 1).padStart(2, '0')}</span>
                  <img className="sp-lthumb" src={t.cover} alt="" loading="lazy" />
                  <span className="sp-lmeta">
                    <b>{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
                    <i>{t.artist}</i>
                  </span>
                  <span className="sp-lgenre mono">{t.genre}</span>
                  <LikeBtn id={t.id} row active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                  <SaveBtn id={t.id} row active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                  <InfoBtn t={t} row onInfo={() => onInfo(t)} />
                  <span className="sp-lact" aria-hidden="true">
                    {isCur && playing
                      ? <span className="pl-eq" style={{ height: 14 }}><u></u><u></u><u></u></span>
                      : '▶'}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
