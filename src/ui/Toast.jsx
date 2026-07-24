import { createContext, useContext, useState, useCallback } from 'react'

/* Апп даяар мэдэгдэл (alert()-ийн оронд). useToast().success/error/info */
const ToastCtx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const push = useCallback((text, type = 'info', ms = 3800) => {
    const id = Date.now() + Math.random()
    setToasts((list) => [...list, { id, text, type }])
    if (ms > 0) setTimeout(() => remove(id), ms)
    return id
  }, [remove])

  const api = {
    show: push,
    success: (t, ms) => push(t, 'success', ms),
    error: (t, ms) => push(t, 'error', ms),
    info: (t, ms) => push(t, 'info', ms),
    dismiss: remove,
  }

  const icon = { success: '✓', error: '⚠', info: 'ℹ' }

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toast-wrap" role="region" aria-label="Мэдэгдэл" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={'toast toast-' + t.type} role="status">
            <span className="toast-ic" aria-hidden="true">{icon[t.type] || icon.info}</span>
            <p>{t.text}</p>
            <button className="toast-x" onClick={() => remove(t.id)} aria-label="Хаах">✕</button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast-ийг ToastProvider дотор ашиглана уу')
  return ctx
}
