import { Link } from 'react-router-dom'
import { beaches, food, place, sights, type Spot } from '../data/place'

export function RegiaoPage() {
  return (
    <main className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Localização</p>
        <h1 className="mt-2 font-display text-5xl text-ocean">Passagem, Cabo Frio</h1>
        <p className="mt-4 max-w-2xl text-ink-soft leading-7">
          O Chalé Mirante fica na Rua do Céu, no bairro da Passagem — o pedaço mais antigo da cidade, a uma caminhada da
          Praia do Forte e do canal. Sem carro para o essencial. Com carro, Peró, Conchas e Arraial.
        </p>
      </div>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        <iframe
          title="Mapa do Chalé Mirante em Cabo Frio"
          src={place.osmEmbed}
          className="h-[360px] w-full rounded-3xl border-0 bg-sand md:h-[420px]"
        />
        <aside className="rounded-3xl bg-sand p-8">
          <p className="font-display text-3xl text-ocean">{place.address}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {place.neighborhood} · {place.city}/{place.state} · CEP {place.cep}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>Praia do Forte · 10 min a pé</li>
            <li>Forte São Mateus · 14 min a pé</li>
            <li>Canal Itajuru · 8 min a pé</li>
            <li>Arraial do Cabo · 20 min de carro</li>
          </ul>
          <a
            href={place.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-ocean px-5 py-2.5 text-sm text-linen"
          >
            Abrir no Google Maps
          </a>
        </aside>
      </section>

      <SpotBlock
        kicker="Praias"
        title="O mar que fica perto"
        spots={beaches}
      />
      <SpotBlock
        kicker="Passeios"
        title="História, canal e mirante"
        spots={sights}
        sand
      />
      <SpotBlock
        kicker="Mesa"
        title="Onde comer sem sair do ritmo"
        spots={food}
      />

      <div className="mx-auto mt-8 max-w-6xl px-5 text-center">
        <Link to="/reservar" className="inline-flex rounded-full bg-ocean px-6 py-3 text-sm text-linen">
          Ver datas livres
        </Link>
      </div>
    </main>
  )
}

function SpotBlock({
  kicker,
  title,
  spots,
  sand = false,
}: {
  kicker: string
  title: string
  spots: Spot[]
  sand?: boolean
}) {
  return (
    <section className={`mt-20 py-16 ${sand ? 'bg-sand' : ''}`}>
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs tracking-[0.3em] text-lagoon uppercase">{kicker}</p>
        <h2 className="mt-2 font-display text-4xl text-ocean">{title}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {spots.map((spot) => (
            <article key={spot.name} className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <img src={spot.image} alt={spot.name} className="h-52 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs tracking-wide text-lagoon uppercase">{spot.time}</p>
                <h3 className="mt-1 font-display text-2xl text-ocean">{spot.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{spot.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
