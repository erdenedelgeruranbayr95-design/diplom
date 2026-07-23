export default function SideList({ tracks, curId, playing, onPlay }) {
  return (
    <div className="sp-side-recent">
      {tracks.map((t) => (
        <button key={t.id} className={'sp-rcard' + (curId === t.id ? ' on' : '')} onClick={() => onPlay(t)}>
          <img src={t.cover} alt="" />
          <span>{t.title}</span>
          {curId === t.id && playing
            ? <span className="pl-eq sp-req" aria-hidden="true"><u></u><u></u><u></u></span>
            : <i aria-hidden="true">▶</i>}
        </button>
      ))}
    </div>
  )
}
