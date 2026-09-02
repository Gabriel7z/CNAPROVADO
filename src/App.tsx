import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ChaletDetailPage } from './pages/ChaletDetailPage'
import { ChaletsPage } from './pages/ChaletsPage'
import { ConfirmacaoPage } from './pages/ConfirmacaoPage'
import { HomePage } from './pages/HomePage'
import { ReservarPage } from './pages/ReservarPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chales" element={<ChaletsPage />} />
          <Route path="/chales/:id" element={<ChaletDetailPage />} />
          <Route path="/reservar" element={<ReservarPage />} />
          <Route path="/confirmacao" element={<ConfirmacaoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
