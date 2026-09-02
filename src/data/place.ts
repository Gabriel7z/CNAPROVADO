import { asset } from '../lib/assets'

export const place = {
  name: 'Chalé Mirante',
  neighborhood: 'Passagem',
  city: 'Cabo Frio',
  state: 'RJ',
  address: 'Rua do Céu, 72 — Passagem',
  cep: '28906-230',
  lat: -22.88045,
  lng: -42.01096,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+do+C%C3%A9u+72,+Passagem,+Cabo+Frio',
  osmEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-42.022%2C-22.888%2C-42.000%2C-22.873&layer=mapnik&marker=-22.88045%2C-42.01096',
  phones: ['(22) 3031-0067', '(22) 99825-5180'],
  instagram: 'https://www.instagram.com/chalemirantecabofrio',
}

export type Spot = {
  name: string
  kind: 'praia' | 'passeio' | 'comer'
  time: string
  blurb: string
  image: string
}

export const beaches: Spot[] = [
  {
    name: 'Praia do Forte',
    kind: 'praia',
    time: '10 min a pé',
    blurb:
      'A praia-cartão da cidade: areia branca, mar claro e o Forte São Mateus no canto. Quiosques, ciclovia e o pôr do sol que Cabo Frio mostra no Instagram.',
    image: asset('images/regiao/praia-forte-orla.jpg'),
  },
  {
    name: 'Dunas da Praia do Forte',
    kind: 'praia',
    time: '12 min a pé',
    blurb: 'Faixa de dunas e restinga no Parque Estadual da Costa do Sol, colada na orla principal.',
    image: asset('images/regiao/praia-forte-dunas.jpg'),
  },
  {
    name: 'Praia do Peró',
    kind: 'praia',
    time: '15 min de carro',
    blurb: 'Sete quilômetros, selo Bandeira Azul, ondas para surf e trechos calmos para família.',
    image: asset('images/regiao/praia-pero.jpg'),
  },
  {
    name: 'Praia das Conchas',
    kind: 'praia',
    time: '12 min de carro',
    blurb: 'Mar mais manso, boa para criança, vizinha do Peró e da restinga.',
    image: asset('images/regiao/praia-conchas.jpg'),
  },
]

export const sights: Spot[] = [
  {
    name: 'Forte São Mateus',
    kind: 'passeio',
    time: '14 min a pé',
    blurb: 'Fortificação de 1616–1620 na ponta da Praia do Forte. Entrada franca, vista do canal e do mar aberto.',
    image: asset('images/regiao/forte-sao-mateus.jpg'),
  },
  {
    name: 'Canal Itajuru',
    kind: 'passeio',
    time: '8 min a pé',
    blurb: 'O canal que corta a cidade. Pôr do sol, barcos, Boulevard Canal e o passeio de trenzinho.',
    image: asset('images/regiao/canal-itajuru.jpg'),
  },
  {
    name: 'Morro da Guia',
    kind: 'passeio',
    time: '20 min a pé',
    blurb: 'Capela de Nossa Senhora da Guia no alto. O mirante de verdade: canal, Gamboa e o mar num só olhar.',
    image: asset('images/regiao/morro-da-guia.jpg'),
  },
  {
    name: 'Bairro da Passagem',
    kind: 'passeio',
    time: 'na porta',
    blurb: 'O bairro mais antigo de Cabo Frio. Casario, polo gastronômico e o ritmo lento que o centro não tem.',
    image: asset('images/regiao/panorama-cabo.jpg'),
  },
]

export const food: Spot[] = [
  {
    name: 'Polo gastronômico da Passagem',
    kind: 'comer',
    time: '2–8 min a pé',
    blurb: 'A vida noturna charmosa da cidade: italiano, frutos do mar e mesa na rua, sem precisar de carro.',
    image: asset('images/regiao/caminhos-mar.jpg'),
  },
  {
    name: 'Tia Maluca',
    kind: 'comer',
    time: 'perto, na Passagem',
    blurb: 'Clássico local, bem avaliado e a poucos quarteirões. Mesa de família, sem frescura.',
    image: asset('images/regiao/praia-forte-vista.jpg'),
  },
  {
    name: 'Picolino',
    kind: 'comer',
    time: '10 min de carro',
    blurb: 'No Boulevard Canal. Arroz de polvo, moqueca, rabada — o restaurante que a cidade indica há décadas.',
    image: asset('images/regiao/canal-itajuru.jpg'),
  },
  {
    name: 'Mercado de Peixe',
    kind: 'comer',
    time: '8 min de carro',
    blurb: 'Peixe do dia na Gamboa. Escolhe o pescado e manda grelhar. Cabo Frio no prato.',
    image: asset('images/regiao/hero-praia-forte.jpg'),
  },
]
