import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { ToastProvider } from './ui/Toast.jsx'
import NotFound from './ui/NotFound.jsx'
import './styles.css'
import './ui/ui.css'

/* Provider дараалал: Router → Auth → Toast → хуудсууд.
   Одоо: "/" = үндсэн апп (landing + player), "*" = 404.
   Үе 2-т Player-ийн дотоод view-үүдийг /app/* бодит зам болгож,
   RequireAuth / RequireRole (routes/guards.jsx)-оор хамгаална. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
)
