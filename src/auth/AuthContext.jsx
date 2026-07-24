import { createContext, useContext, useState } from 'react'
import { loadSession, saveSession, loadUsers, saveUsers } from '../AuthModal.jsx'

/* Төвлөрсөн auth төлөв — session (localStorage) нэг эх сурвалж.
   Router-ийн бүх хуудас энэ context-оос user/эрхээ авна. Backend орох үед
   зөвхөн энэ файлын login/logout/... дотрыг API дуудлагаар солино. */
const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)

  const role = user?.role || null
  const isAdmin = role === 'admin'
  const subscribed = isAdmin || !!user?.sub?.active

  function login(u) {
    setUser(u)
    saveSession(u)
  }
  function logout() {
    setUser(null)
    saveSession(null)
  }
  function updateUser(patch) {
    setUser((prev) => {
      const nu = { ...prev, ...patch }
      saveSession(nu)
      return nu
    })
  }
  function setSub(sub) {
    setUser((prev) => {
      const nu = { ...prev, sub }
      saveSession(nu)
      return nu
    })
  }
  /* захиалга цуцлах — session + users store хоёуланд нь */
  function cancelSub() {
    setUser((prev) => {
      const nu = { ...prev, sub: { ...prev.sub, active: false } }
      saveSession(nu)
      const users = loadUsers()
      const u = users.find((x) => x.email === prev.email)
      if (u) { u.sub = nu.sub; saveUsers(users) }
      return nu
    })
  }

  return (
    <AuthCtx.Provider value={{ user, role, isAdmin, subscribed, login, logout, updateUser, setSub, cancelSub }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth-ийг AuthProvider дотор ашиглана уу')
  return ctx
}
