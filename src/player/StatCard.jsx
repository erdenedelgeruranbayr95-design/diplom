export default function StatCard({ icon, color, value, label }) {
  return (
    <div className="st-card">
      <span className={'st-ico ' + color} aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="st-meta">
        <b>{value}</b>
        <span className="mono">{label}</span>
      </span>
    </div>
  )
}
