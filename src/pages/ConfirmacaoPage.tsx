import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getChalet } from '../data/chalets'
import { formatLong } from '../lib/dates'
import { formatBRL } from '../lib/money'
import type { BookingRecord } from './ReservarPage'

function readBooking(): BookingRecord | null {
  const raw = sessionStorage.getItem('chale-mirante-booking')
  if (!raw) return null
  try {
    return JSON.parse(raw) as BookingRecord
  } catch {
    return null
  }
}

export function ConfirmacaoPage() {
  const navigate = useNavigate()
  const [booking] = useState(() => readBooking())
  const chalet = booking ? getChalet(booking.chaletId) : undefined

  if (!booking || !chalet) {
    return (
      <main className="mx-auto max-w-xl px-5 pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl text-ocean">Nenhuma reserva nesta sessão</h1>
        <button type="button" className="mt-6 text-sm underline" onClick={() => navigate('/reservar')}>
          Voltar ao calendário
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Reserva confirmada</p>
      <h1 className="mt-2 font-display text-5xl text-ocean">Até logo em Cabo Frio.</h1>
      <p className="mt-4 text-ink-soft">
        {booking.name}, o {chalet.name} está separado em seu nome. No site final, o comprovante de Pix ou a aprovação do
        cartão dispara este mesmo e-mail.
      </p>

      <article className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
        <img src={chalet.images[0]} alt="" className="h-48 w-full object-cover" />
        <div className="space-y-3 p-6 text-sm">
          <p className="font-display text-3xl text-ocean">{booking.code}</p>
          <p>
            {chalet.name} · {booking.guests} hóspede{booking.guests > 1 ? 's' : ''}
          </p>
          <p className="capitalize">Chegada · {formatLong(booking.checkIn)}</p>
          <p className="capitalize">Saída · {formatLong(booking.checkOut)}</p>
          <p>
            Pagamento · {booking.method === 'pix' ? 'Pix' : 'Cartão'} · {formatBRL(booking.total)}
          </p>
          <p className="rounded-xl bg-sand px-3 py-2 text-xs text-ink-soft">
            Demonstração: nenhum pagamento foi processado. A etapa que você acabou de ver é a que entra no ar com Pix e
            cartão reais.
          </p>
        </div>
      </article>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="rounded-full bg-ocean px-5 py-2 text-sm text-linen">
          Voltar ao início
        </Link>
        <a
          href="https://www.instagram.com/chalemirantecabofrio"
          className="rounded-full border border-ocean px-5 py-2 text-sm text-ocean"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </main>
  )
}
