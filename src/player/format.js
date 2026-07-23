export function fmt(t) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60), s = Math.floor(t % 60)
  return m + ':' + String(s).padStart(2, '0')
}
export function fmtDur(sec) {
  if (sec < 60) return sec + ' сек'
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60)
  return h > 0 ? h + ' цаг ' + m + ' мин' : m + ' мин'
}
export function relTime(ts) {
  const d = Math.floor((Date.now() - ts) / 60000)
  if (d < 1) return 'дөнгөж сая'
  if (d < 60) return d + ' мин өмнө'
  if (d < 1440) return Math.floor(d / 60) + ' цаг өмнө'
  return Math.floor(d / 1440) + ' өдрийн өмнө'
}
