export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function startOfMonth(iso: string): Date {
  const date = parseISODate(iso)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function isBefore(a: string, b: string): boolean {
  return a < b
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseISODate(checkIn).getTime()
  const b = parseISODate(checkOut).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function eachNight(checkIn: string, checkOut: string): string[] {
  const nights: string[] = []
  let cursor = checkIn
  while (cursor < checkOut) {
    nights.push(cursor)
    cursor = addDays(cursor, 1)
  }
  return nights
}

export function monthLabel(date: Date): string {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export function formatLong(iso: string): string {
  return parseISODate(iso).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatShort(iso: string): string {
  return parseISODate(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function isWeekendNight(iso: string): boolean {
  const day = parseISODate(iso).getDay()
  return day === 5 || day === 6
}

export const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
