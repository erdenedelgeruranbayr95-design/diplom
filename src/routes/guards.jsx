import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

/* Нэвтрээгүй бол нүүр рүү буцаана (Guest дүр байхгүй — заавал нэвтэрнэ). */
export function RequireAuth({ children }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/" state={{ from: loc.pathname, needAuth: true }} replace />
  return children
}

/* Тодорхой дүрүүдэд л зөвшөөрнө. Дүр таарахгүй бол апп руу буцаана. */
export function RequireRole({ roles, children }) {
  const { user, role } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/" state={{ from: loc.pathname, needAuth: true }} replace />
  if (!roles.includes(role)) return <Navigate to="/app" replace />
  return children
}
