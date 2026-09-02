import { useEffect, useMemo, useRef, useState } from 'react'
import { occupiedNights, rangeHitsOccupied } from '../data/availability'
import {
  WEEKDAYS,
  addMonths,
  isBefore,
  monthLabel,
  startOfMonth,
  toISODate,
  todayISO,
} from '../lib/dates'

type CalendarProps = {
  chaletId: string
  checkIn: string | null
  checkOut: string | null
  onChange: (checkIn: string | null, checkOut: string | null) => void
}

function daysInGrid(month: Date): (string | null)[] {
  const first = startOfMonth(toISODate(month))
  const startPad = first.getDay()
  const lastDate = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const cells: (string | null)[] = []
  for (let i = 0; i < startPad; i += 1) cells.push(null)
  for (let day = 1; day <= lastDate; day += 1) {
    cells.push(toISODate(new Date(first.getFullYear(), first.getMonth(), day)))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export function StayCalendar({ chaletId, checkIn, checkOut, onChange }: CalendarProps) {
  const today = todayISO()
  const [anchor, setAnchor] = useState(() => startOfMonth(today))
  const [hint, setHint] = useState<string | null>(null)
  const occupied = useMemo(() => occupiedNights(chaletId), [chaletId])
  const months = [anchor, addMonths(anchor, 1)]

  const previousChalet = useRef(chaletId)
  useEffect(() => {
    if (previousChalet.current === chaletId) return
    previousChalet.current = chaletId
    onChange(null, null)
    setHint(null)
  }, [chaletId, onChange])

  function isValidCheckout(iso: string): boolean {
    return Boolean(checkIn && !checkOut && iso > checkIn && !rangeHitsOccupied(chaletId, checkIn, iso))
  }

  function handleDay(iso: string) {
    if (iso < today) return

    if (occupied.has(iso) && !isValidCheckout(iso)) {
      if (!checkIn || checkOut) {
        setHint('Este dia está cheio. Escolha uma data livre para chegar.')
      } else {
        setHint('Esse período cruza noites já reservadas. Ajuste a saída.')
      }
      return
    }

    setHint(null)

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null)
      return
    }

    if (iso === checkIn) {
      onChange(null, null)
      return
    }

    if (isBefore(iso, checkIn)) {
      if (occupied.has(iso)) {
        setHint('Este dia está cheio.')
        return
      }
      onChange(iso, null)
      return
    }

    onChange(checkIn, iso)
  }

  function inStayNight(iso: string): boolean {
    if (!checkIn || !checkOut) return false
    return iso >= checkIn && iso < checkOut
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          className="rounded-full border border-sand-deep px-3 py-1.5 text-sm text-ink-soft hover:bg-sand"
          onClick={() => setAnchor((current) => addMonths(current, -1))}
        >
          ←
        </button>
        <p className="font-display text-xl capitalize text-ocean">Disponibilidade</p>
        <button
          type="button"
          className="rounded-full border border-sand-deep px-3 py-1.5 text-sm text-ink-soft hover:bg-sand"
          onClick={() => setAnchor((current) => addMonths(current, 1))}
        >
          →
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {months.map((month) => (
          <MonthGrid
            key={toISODate(month)}
            month={month}
            today={today}
            occupied={occupied}
            checkIn={checkIn}
            checkOut={checkOut}
            inStayNight={inStayNight}
            onDay={handleDay}
            canPress={(iso) => {
              if (iso < today) return false
              if (occupied.has(iso)) return isValidCheckout(iso)
              return true
            }}
          />
        ))}
      </div>

      {hint && <p className="mt-4 rounded-xl bg-sunset/10 px-3 py-2 text-sm text-sunset">{hint}</p>}

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-ink-soft">
        <Legend swatch="bg-white border border-sand-deep" label="Livre" />
        <Legend swatch="day-occupied bg-[#efe4d4]" label="Cheio — não reserva" />
        <Legend swatch="bg-ocean" label="Sua estadia" />
        <Legend swatch="border border-dashed border-lagoon bg-white" label="Hoje" />
      </div>
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-4 w-4 rounded-sm ${swatch}`} />
      {label}
    </span>
  )
}

function MonthGrid({
  month,
  today,
  occupied,
  checkIn,
  checkOut,
  inStayNight,
  onDay,
  canPress,
}: {
  month: Date
  today: string
  occupied: Set<string>
  checkIn: string | null
  checkOut: string | null
  inStayNight: (iso: string) => boolean
  onDay: (iso: string) => void
  canPress: (iso: string) => boolean
}) {
  const cells = daysInGrid(month)

  return (
    <div>
      <h3 className="mb-3 font-display text-2xl capitalize text-ink">{monthLabel(month)}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wide text-ink-soft">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((iso, index) => {
          if (!iso) return <div key={`e-${index}`} />
          const isOccupied = occupied.has(iso)
          const isPast = iso < today
          const isStart = iso === checkIn
          const isEnd = iso === checkOut
          const stayNight = inStayNight(iso)
          const isToday = iso === today
          const blocked = !canPress(iso)

          return (
            <button
              key={iso}
              type="button"
              disabled={blocked}
              aria-disabled={blocked}
              title={isOccupied ? 'Cheio' : undefined}
              onClick={() => onDay(iso)}
              className={[
                'relative aspect-square rounded-md text-sm transition',
                isOccupied ? 'day-occupied text-occupied' : '',
                blocked ? 'cursor-not-allowed opacity-80' : '',
                isPast && !isOccupied ? 'text-sand-deep' : '',
                !isOccupied && !isPast && !stayNight && !isStart ? 'hover:bg-sand text-ink' : '',
                stayNight || isStart ? 'bg-ocean text-linen' : '',
                isEnd && !isOccupied ? 'bg-ocean/70 text-linen' : '',
                isEnd && isOccupied ? 'ring-2 ring-ocean' : '',
                isToday && !stayNight && !isStart ? 'border border-dashed border-lagoon' : '',
              ].join(' ')}
            >
              {Number(iso.slice(-2))}
              {isOccupied && (
                <span className="pointer-events-none absolute right-0.5 top-0.5 text-[10px] leading-none text-occupied">
                  ×
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
