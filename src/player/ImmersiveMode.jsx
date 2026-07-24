/* Мэдрэх горим (immersive overlay) — Player.jsx-аас тусад нь гаргасан.
   barsRef, pulseRef, flashRef нь Player.jsx-ийн useRef — RAF loop эдгээрт шууд бичдэг тул
   энд ШИНЭ useRef БҮҮ үүсгэ; зөвхөн prop-оор ирсэн ref-үүдийг холбоно.
   Props: track, onClose(), barsRef (28 bar), pulseRef (ring), flashRef (beat flash) */
export default function ImmersiveMode({ track, onClose, barsRef, pulseRef, flashRef }) {
  return (
    <div className="sp-imm" onClick={onClose} role="dialog" aria-label="Мэдрэх горим">
      <img className="sp-imm-bg" src={track.cover} alt="" aria-hidden="true" />
      <div className="sp-imm-veil" aria-hidden="true"></div>
      <span className="sp-imm-flash" ref={flashRef} aria-hidden="true"></span>

      <button
        className="sp-imm-x"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Мэдрэх горимоос гарах"
        title="Гарах (ESC)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="sp-imm-center">
        <span className="sp-imm-ring" ref={pulseRef} aria-hidden="true"></span>
        <img className="sp-imm-cover" src={track.cover} alt="" />
      </div>
      <div className="sp-imm-info">
        <span className="mono">Мэдрэх горим</span>
        <h2>{track.title}</h2>
        <p>{track.artist} · {track.genre}</p>
      </div>
      <div className="sp-imm-bars" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <i key={i} ref={(el) => { barsRef.current[i] = el }}></i>
        ))}
      </div>
      <span className="sp-imm-exit mono">ESC эсвэл дэлгэц дээр дарж гарна</span>
    </div>
  )
}
