import { eachNight } from '../lib/dates'

type Range = { start: string; end: string }

const occupancy: Record<string, Range[]> = {
  horizonte: [
    { start: '2026-09-05', end: '2026-09-08' },
    { start: '2026-09-12', end: '2026-09-14' },
    { start: '2026-09-19', end: '2026-09-21' },
    { start: '2026-09-26', end: '2026-09-28' },
    { start: '2026-10-02', end: '2026-10-06' },
    { start: '2026-10-10', end: '2026-10-12' },
    { start: '2026-10-16', end: '2026-10-19' },
    { start: '2026-10-30', end: '2026-11-03' },
    { start: '2026-11-14', end: '2026-11-16' },
    { start: '2026-11-20', end: '2026-11-23' },
    { start: '2026-12-18', end: '2026-12-22' },
    { start: '2026-12-24', end: '2027-01-04' },
    { start: '2027-01-15', end: '2027-01-18' },
    { start: '2027-01-22', end: '2027-01-25' },
  ],
  mare: [
    { start: '2026-09-04', end: '2026-09-07' },
    { start: '2026-09-11', end: '2026-09-14' },
    { start: '2026-09-18', end: '2026-09-20' },
    { start: '2026-09-25', end: '2026-09-28' },
    { start: '2026-10-08', end: '2026-10-12' },
    { start: '2026-10-17', end: '2026-10-20' },
    { start: '2026-10-30', end: '2026-11-03' },
    { start: '2026-11-07', end: '2026-11-10' },
    { start: '2026-11-19', end: '2026-11-23' },
    { start: '2026-12-12', end: '2026-12-15' },
    { start: '2026-12-20', end: '2027-01-05' },
    { start: '2027-01-09', end: '2027-01-12' },
    { start: '2027-01-28', end: '2027-02-01' },
  ],
  duna: [
    { start: '2026-09-03', end: '2026-09-08' },
    { start: '2026-09-18', end: '2026-09-22' },
    { start: '2026-10-01', end: '2026-10-05' },
    { start: '2026-10-09', end: '2026-10-13' },
    { start: '2026-10-23', end: '2026-10-26' },
    { start: '2026-10-30', end: '2026-11-04' },
    { start: '2026-11-13', end: '2026-11-16' },
    { start: '2026-11-19', end: '2026-11-24' },
    { start: '2026-12-08', end: '2026-12-12' },
    { start: '2026-12-19', end: '2027-01-06' },
    { start: '2027-01-16', end: '2027-01-20' },
  ],
}

function expandRanges(ranges: Range[]): Set<string> {
  const nights = new Set<string>()
  for (const range of ranges) {
    for (const night of eachNight(range.start, range.end)) {
      nights.add(night)
    }
  }
  return nights
}

const occupancySets: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(occupancy).map(([id, ranges]) => [id, expandRanges(ranges)]),
)

export function occupiedNights(chaletId: string): Set<string> {
  return occupancySets[chaletId] ?? new Set()
}

export function isNightOccupied(chaletId: string, iso: string): boolean {
  return occupiedNights(chaletId).has(iso)
}

export function rangeHitsOccupied(
  chaletId: string,
  checkIn: string,
  checkOut: string,
): boolean {
  return eachNight(checkIn, checkOut).some((night) => isNightOccupied(chaletId, night))
}
