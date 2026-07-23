export function LikeBtn({ id, row, active, onToggle }) {
  return (
    <span className={'sp-like' + (row ? ' sp-like-row' : '') + (active ? ' on' : '')}
      role="button" tabIndex={0}
      aria-label={active ? 'Дуртайгаас хасах' : 'Дуртайд нэмэх'}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onToggle() } }}
    >{active ? '♥' : '♡'}</span>
  )
}

export function SaveBtn({ id, row, active, onToggle }) {
  return (
    <span className={'sp-like' + (row ? ' sp-like-row sp-save-row' : ' sp-save') + (active ? ' on' : '')}
      role="button" tabIndex={0}
      aria-label={active ? 'Хадгалснаас хасах' : 'Хадгалах'}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onToggle() } }}
    >
      <svg width={row ? 14 : 15} height={row ? 14 : 15} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M6 3h12v18l-6-3.6L6 21V3z" />
      </svg>
    </span>
  )
}

export function InfoBtn({ t, row, onInfo }) {
  return (
    <span className={'sp-like sp-info' + (row ? ' sp-like-row' : '')}
      role="button" tabIndex={0} aria-label={t.title + ' — дэлгэрэнгүй'}
      onClick={(e) => { e.stopPropagation(); onInfo() }}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onInfo() } }}
    >ⓘ</span>
  )
}
