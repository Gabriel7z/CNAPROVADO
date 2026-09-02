import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StayCalendar } from '../components/StayCalendar'
import { chalets } from '../data/chalets'
import { quoteStay } from '../lib/booking'
import { formatLong, nightsBetween } from '../lib/dates'
import { formatBRL } from '../lib/money'
import type { Chalet } from '../data/chalets'

type Step = 'dates' | 'guests' | 'pay'

export type BookingRecord = {
  code: string
  chaletId: string
  checkIn: string
  checkOut: string
  guests: number
  name: string
  email: string
  phone: string
  method: 'pix' | 'card'
  total: number
}

export function ReservarPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initial = params.get('chalet')
  const [chaletId, setChaletId] = useState(initial && chalets.some((c) => c.id === initial) ? initial : chalets[0].id)
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [step, setStep] = useState<Step>('dates')
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState<'pix' | 'card'>('pix')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const chalet = chalets.find((item) => item.id === chaletId) as Chalet
  const quote = useMemo(() => {
    if (!checkIn || !checkOut) return null
    return quoteStay(chalet, checkIn, checkOut)
  }, [chalet, checkIn, checkOut])

  function onDates(nextIn: string | null, nextOut: string | null) {
    setCheckIn(nextIn)
    setCheckOut(nextOut)
    setStep('dates')
    setError(null)
  }

  function goGuests() {
    if (!checkIn || !checkOut || !quote) {
      setError('Escolha a chegada e a saída no calendário.')
      return
    }
    if (quote.nights < chalet.minNights) {
      setError(`Este chalé pede no mínimo ${chalet.minNights} noites.`)
      return
    }
    setError(null)
    setStep('guests')
  }

  function goPay() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Preencha nome, e-mail e WhatsApp para seguir ao pagamento.')
      return
    }
    setError(null)
    setStep('pay')
  }

  function confirm() {
    if (!checkIn || !checkOut || !quote) return
    if (method === 'card' && (cardNumber.replace(/\s/g, '').length < 16 || cardCvv.length < 3)) {
      setError('No site final, o cartão será validado aqui. Para o protótipo, use 16 dígitos e um CVV.')
      return
    }
    setBusy(true)
    setError(null)
    window.setTimeout(() => {
      const booking: BookingRecord = {
        code: `CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        chaletId,
        checkIn,
        checkOut,
        guests,
        name,
        email,
        phone,
        method,
        total: method === 'pix' ? quote.pixTotal : quote.cardTotal,
      }
      sessionStorage.setItem('chale-mirante-booking', JSON.stringify(booking))
      navigate('/confirmacao')
    }, 900)
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Reserva direta</p>
      <h1 className="mt-2 font-display text-5xl text-ocean">Escolha as datas</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Dias com listra estão <strong className="font-medium text-occupied">cheios</strong>. O pagamento — Pix ou cartão
        — acontece neste mesmo fluxo, no site do Chalé Mirante.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {chalets.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setChaletId(item.id)
              setCheckIn(null)
              setCheckOut(null)
              setStep('dates')
              setError(null)
              setGuests(Math.min(guests, item.guests))
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              item.id === chaletId ? 'bg-ocean text-linen' : 'bg-sand text-ink-soft'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <StayCalendar chaletId={chaletId} checkIn={checkIn} checkOut={checkOut} onChange={onDates} />
        </section>

        <aside className="h-fit rounded-3xl border border-sand-deep bg-white p-6">
          <p className="text-xs tracking-[0.2em] text-lagoon uppercase">
            {step === 'dates' && '1 · Estadia'}
            {step === 'guests' && '2 · Hóspedes'}
            {step === 'pay' && '3 · Pagamento no site'}
          </p>
          <h2 className="mt-2 font-display text-3xl text-ocean">{chalet.name}</h2>
          <p className="text-sm text-ink-soft">{chalet.tagline}</p>

          {checkIn && checkOut ? (
            <div className="mt-5 space-y-1 text-sm">
              <p>
                Chegada · <span className="capitalize">{formatLong(checkIn)}</span>
              </p>
              <p>
                Saída · <span className="capitalize">{formatLong(checkOut)}</span>
              </p>
              <p>{nightsBetween(checkIn, checkOut)} noite(s)</p>
            </div>
          ) : (
            <p className="mt-5 text-sm text-ink-soft">Clique no dia de chegada e, em seguida, no dia de saída.</p>
          )}

          {quote && (
            <ul className="mt-5 space-y-2 border-t border-sand-deep pt-4 text-sm">
              <li className="flex justify-between">
                <span>Diárias</span>
                <span>{formatBRL(quote.nightlyTotal)}</span>
              </li>
              <li className="flex justify-between">
                <span>Limpeza</span>
                <span>{formatBRL(quote.cleaningFee)}</span>
              </li>
              <li className="flex justify-between text-ink-soft">
                <span>Pix (5% de cortesia)</span>
                <span>{formatBRL(quote.pixTotal)}</span>
              </li>
              <li className="flex justify-between font-medium text-ocean">
                <span>Cartão</span>
                <span>{formatBRL(quote.cardTotal)}</span>
              </li>
            </ul>
          )}

          {error && <p className="mt-4 rounded-xl bg-sunset/10 px-3 py-2 text-sm text-sunset">{error}</p>}

          {step === 'dates' && (
            <button
              type="button"
              onClick={goGuests}
              className="mt-6 w-full rounded-full bg-ocean py-3 text-sm text-linen"
            >
              Continuar
            </button>
          )}

          {step === 'guests' && (
            <form
              className="mt-6 space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
                goPay()
              }}
            >
              <label className="block text-sm">
                Hóspedes
                <select
                  className="mt-1 w-full rounded-xl border border-sand-deep bg-linen px-3 py-2"
                  value={guests}
                  onChange={(event) => setGuests(Number(event.target.value))}
                >
                  {Array.from({ length: chalet.guests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Nome completo" value={name} onChange={setName} />
              <Field label="E-mail" type="email" value={email} onChange={setEmail} />
              <Field label="WhatsApp" value={phone} onChange={setPhone} placeholder="(22) 9 0000-0000" />
              <button type="submit" className="w-full rounded-full bg-ocean py-3 text-sm text-linen">
                Ir para o pagamento
              </button>
              <button type="button" className="w-full text-sm text-ink-soft" onClick={() => setStep('dates')}>
                Voltar às datas
              </button>
            </form>
          )}

          {step === 'pay' && quote && (
            <div className="mt-6">
              <div className="rounded-2xl bg-sand px-4 py-3 text-xs leading-5 text-ink-soft">
                <p className="font-medium text-ocean">Como vai funcionar no site</p>
                <p>
                  O hóspede paga aqui mesmo — Pix na hora ou cartão. Neste protótipo nenhum valor é cobrado; o fluxo já
                  é o da versão final.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <PayMethod
                  active={method === 'pix'}
                  title="Pix"
                  hint={`Pague ${formatBRL(quote.pixTotal)}`}
                  onClick={() => setMethod('pix')}
                />
                <PayMethod
                  active={method === 'card'}
                  title="Cartão"
                  hint={formatBRL(quote.cardTotal)}
                  onClick={() => setMethod('card')}
                />
              </div>

              {method === 'pix' ? (
                <div className="mt-4 rounded-2xl border border-sand-deep p-4 text-center">
                  <PixPattern />
                  <p className="mt-3 text-xs text-ink-soft">Pix Copia e Cola (demonstração)</p>
                  <p className="mt-1 break-all rounded-lg bg-linen px-2 py-2 font-mono text-[10px] text-ink-soft">
                    00020126BR.GOV.BCB.PIX|chalemirante|CM-PROTOTIPO
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <Field label="Nome no cartão" value={cardName} onChange={setCardName} />
                  <Field
                    label="Número"
                    value={cardNumber}
                    onChange={(value) => setCardNumber(maskCard(value))}
                    placeholder="ACCT-000003"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Validade" value={cardExpiry} onChange={setCardExpiry} placeholder="MM/AA" />
                    <Field label="CVV" value={cardCvv} onChange={setCardCvv} placeholder="123" />
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={busy}
                onClick={confirm}
                className="mt-5 w-full rounded-full bg-sunset py-3 text-sm text-linen disabled:opacity-60"
              >
                {busy ? 'Confirmando…' : `Pagar ${formatBRL(method === 'pix' ? quote.pixTotal : quote.cardTotal)}`}
              </button>
              <button type="button" className="mt-2 w-full text-sm text-ink-soft" onClick={() => setStep('guests')}>
                Voltar
              </button>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-sand-deep bg-linen px-3 py-2 outline-none ring-ocean focus:ring-2"
      />
    </label>
  )
}

function PayMethod({
  active,
  title,
  hint,
  onClick,
}: {
  active: boolean
  title: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-3 py-3 text-left ${
        active ? 'border-ocean bg-ocean text-linen' : 'border-sand-deep bg-linen text-ink'
      }`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className={`text-xs ${active ? 'text-sand' : 'text-ink-soft'}`}>{hint}</p>
    </button>
  )
}

function maskCard(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function PixPattern() {
  const cells = [
    1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1,
  ]
  return (
    <div className="mx-auto grid w-40 grid-cols-8 gap-0.5 rounded-xl bg-white p-3">
      {cells.map((cell, index) => (
        <span key={index} className={`aspect-square ${cell ? 'bg-ink' : 'bg-sand'}`} />
      ))}
    </div>
  )
}
