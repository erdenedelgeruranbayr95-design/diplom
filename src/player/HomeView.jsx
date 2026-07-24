import { LikeBtn, SaveBtn, InfoBtn } from './TrackButtons.jsx'
import { PREVIEW_SEC } from './constants.jsx'

/* Нүүр — Player.jsx-аас тусад нь гаргасан (хамгийн олон prop-той view).
   LikeBtn/SaveBtn/InfoBtn-г шууд импортлов (Player-ийн closure-оор биш).
   Props: genres, genre, onGenre, list, query, curId, playing, onPlay,
          likes, saves, onToggleLike, onToggleSave, onInfo, subscribed, onSubscribe */
export default function HomeView({
  genres, genre, onGenre, list, query, curId, playing, onPlay,
  likes, saves, onToggleLike, onToggleSave, onInfo, subscribed, onSubscribe,
}) {
  return (
    <>
      <div className="sp-chips">
        {genres.map((g) => (
          <button key={g} className={'sp-chip' + (genre === g ? ' on' : '')} onClick={() => onGenre(g)}>
            {g}
          </button>
        ))}
      </div>

      <h2 className="sp-h">Тренд дуунууд</h2>
      {list.length === 0 && <p className="adm-empty">"{query}" — олдсонгүй</p>}
      <div className="sp-grid">
        {list.map((t) => {
          const isCur = curId === t.id
          return (
            <button key={t.id} className={'sp-card' + (isCur ? ' on' : '')} onClick={() => onPlay(t)}>
              <span className="sp-cover">
                <img src={t.cover} alt="" loading="lazy" />
                <LikeBtn id={t.id} active={likes.includes(t.id)} onToggle={() => onToggleLike(t.id)} />
                <SaveBtn id={t.id} active={saves.includes(t.id)} onToggle={() => onToggleSave(t.id)} />
                <InfoBtn t={t} onInfo={() => onInfo(t)} />
                <span className={'sp-playbtn' + (isCur && playing ? ' show' : '')} aria-hidden="true">
                  {isCur && playing ? '⏸' : '▶'}
                </span>
                {isCur && playing && (
                  <span className="pl-eq sp-eq" aria-hidden="true"><u></u><u></u><u></u></span>
                )}
              </span>
              <b>{t.title}{t.custom && <em className="sp-new"> шинэ</em>}</b>
              <i>{t.artist} · {t.genre}</i>
            </button>
          )
        })}
      </div>

      {list.length > 0 && (
        <>
          <h2 className="sp-h sp-h2">Бүх дуунууд</h2>
          <div className="sp-list">
            {list.map((t, i) => {
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

      {!subscribed && (
        <div className="sp-banner">
          <div>
            <b>МЭДРЭХ PRO болоорой</b>
            <p>Бүх дууг бүрэн сонсож, чичиргээ + гэрлийн горимыг хязгааргүй мэдэр. Үнэгүй горимд дуу тус бүрээс {PREVIEW_SEC} секунд сонсоно.</p>
          </div>
          <button className="bt bt-a" onClick={onSubscribe}>9'900₮ / сар — Захиалах</button>
        </div>
      )}
    </>
  )
}
