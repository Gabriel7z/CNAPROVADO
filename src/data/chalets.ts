import { asset } from '../lib/assets'

export type Chalet = {
  id: string
  name: string
  tagline: string
  description: string
  guests: number
  bedrooms: number
  size: string
  nightlyRate: number
  weekendRate: number
  cleaningFee: number
  minNights: number
  images: string[]
  amenities: string[]
}

export const chalets: Chalet[] = [
  {
    id: 'horizonte',
    name: 'Chalé Horizonte',
    tagline: 'Para dois, com a vista inteira',
    description:
      'O chalé mais alto do terreno, na Passagem. Cama king, hidromassagem e varanda. A Praia do Forte fica a dez minutos a pé.',
    guests: 2,
    bedrooms: 1,
    size: '42 m²',
    nightlyRate: 480,
    weekendRate: 580,
    cleaningFee: 160,
    minNights: 2,
    images: [
      asset('images/varanda.jpg'),
      asset('images/cama.jpg'),
      asset('images/jacuzzi.jpg'),
      asset('images/por-do-sol.jpg'),
    ],
    amenities: [
      'Cama king',
      'Hidromassagem',
      'Varanda com vista',
      'Ar-condicionado',
      'Café da manhã cortesia',
      'Wi-Fi',
    ],
  },
  {
    id: 'mare',
    name: 'Chalé Maré',
    tagline: 'Família pequena, pé no quintal',
    description:
      'Dois quartos, cozinha completa e deck. Ideal para casal com filhos. O polo gastronômico da Passagem está na esquina.',
    guests: 4,
    bedrooms: 2,
    size: '68 m²',
    nightlyRate: 690,
    weekendRate: 820,
    cleaningFee: 220,
    minNights: 2,
    images: [
      asset('images/chale-madeira.jpg'),
      asset('images/interior.jpg'),
      asset('images/suite.jpg'),
      asset('images/cafe.jpg'),
    ],
    amenities: [
      '2 quartos',
      'Cozinha completa',
      'Deck e rede',
      'Ar-condicionado',
      'Churrasqueira',
      'Estacionamento',
    ],
  },
  {
    id: 'duna',
    name: 'Chalé Duna',
    tagline: 'O maior, para reunir a casa',
    description:
      'Três suítes, sala ampla e área gourmet. Reveillon, aniversário, encontro de família — a Região dos Lagos inteira a um pulo.',
    guests: 6,
    bedrooms: 3,
    size: '110 m²',
    nightlyRate: 980,
    weekendRate: 1180,
    cleaningFee: 280,
    minNights: 3,
    images: [
      asset('images/villa.jpg'),
      asset('images/deck-piscina.jpg'),
      asset('images/resort.jpg'),
      asset('images/dunas.jpg'),
    ],
    amenities: [
      '3 suítes',
      'Piscina privativa',
      'Sala gourmet',
      'Ar-condicionado',
      'Churrasqueira',
      'Estacionamento',
    ],
  },
]

export function getChalet(id: string | null | undefined): Chalet | undefined {
  return chalets.find((chalet) => chalet.id === id)
}
