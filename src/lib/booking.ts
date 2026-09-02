import type { Chalet } from '../data/chalets'
import { addDays, isWeekendNight, nightsBetween } from './dates'

export type Quote = {
  nights: number
  nightlyTotal: number
  cleaningFee: number
  subtotal: number
  pixDiscount: number
  pixTotal: number
  cardTotal: number
}

export function quoteStay(chalet: Chalet, checkIn: string, checkOut: string): Quote {
  const nights = nightsBetween(checkIn, checkOut)
  let nightlyTotal = 0
  let day = checkIn
  for (let i = 0; i < nights; i += 1) {
    nightlyTotal += isWeekendNight(day) ? chalet.weekendRate : chalet.nightlyRate
    day = addDays(day, 1)
  }

  const cleaningFee = chalet.cleaningFee
  const subtotal = nightlyTotal + cleaningFee
  const pixDiscount = Math.round(subtotal * 0.05)
  return {
    nights,
    nightlyTotal,
    cleaningFee,
    subtotal,
    pixDiscount,
    pixTotal: subtotal - pixDiscount,
    cardTotal: subtotal,
  }
}
