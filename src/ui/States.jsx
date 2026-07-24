/* Дахин ашиглагдах төлвүүд: Loading / Empty / Error.
   Ямар ч хуудсанд <Loading/>, <Empty .../>, <ErrorState .../> гэж ашиглана. */

export function Loading({ label = 'Ачааллаж байна…' }) {
  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <span className="state-spinner" aria-hidden="true"></span>
      <p>{label}</p>
    </div>
  )
}

export function Empty({ icon = '🎵', title = 'Хоосон байна', hint, action }) {
  return (
    <div className="state state-empty">
      <span className="state-ic" aria-hidden="true">{icon}</span>
      <b>{title}</b>
      {hint && <p>{hint}</p>}
      {action}
    </div>
  )
}

export function ErrorState({ title = 'Алдаа гарлаа', hint, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <span className="state-ic" aria-hidden="true">⚠️</span>
      <b>{title}</b>
      {hint && <p>{hint}</p>}
      {onRetry && <button className="bt bt-a" onClick={onRetry}>Дахин оролдох</button>}
    </div>
  )
}
