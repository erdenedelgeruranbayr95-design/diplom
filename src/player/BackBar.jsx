export default function BackBar({ title, onBack }) {
  return (
    <div className="sp-backbar">
      <button className="sp-back" onClick={onBack}>← Буцах</button>
      <h2 className="sp-h" style={{ margin: 0 }}>{title}</h2>
    </div>
  )
}
