import { Link, useParams } from 'react-router-dom'
import { getChalet } from '../data/chalets'
import { formatBRL } from '../lib/money'

export function ChaletDetailPage() {
  const { id } = useParams()
  const chalet = getChalet(id)

  if (!chalet) {
    return (
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-20">
        <h1 className="font-display text-4xl text-ocean">Chalé não encontrado</h1>
        <Link to="/chales" className="mt-4 inline-block text-sm underline">
          Voltar aos chalés
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Cabo Frio</p>
      <h1 className="mt-2 font-display text-5xl text-ocean">{chalet.name}</h1>
      <p className="mt-2 text-lg text-ink-soft">{chalet.tagline}</p>

      <div className="mt-8 grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <img
          src={chalet.images[0]}
          alt=""
          className="h-64 w-full rounded-3xl object-cover md:col-span-2 md:row-span-2 md:h-full"
        />
        {chalet.images.slice(1, 4).map((src) => (
          <img key={src} src={src} alt="" className="h-40 w-full rounded-3xl object-cover md:h-full" />
        ))}
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="leading-8 text-ink-soft">{chalet.description}</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {chalet.amenities.map((item) => (
              <li key={item} className="rounded-full bg-sand px-4 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-3xl border border-sand-deep bg-white p-6">
          <p className="font-display text-3xl text-ocean">{formatBRL(chalet.nightlyRate)}</p>
          <p className="text-sm text-ink-soft">por noite · fim de semana {formatBRL(chalet.weekendRate)}</p>
          <p className="mt-4 text-sm text-ink-soft">
            Até {chalet.guests} hóspedes · mínima de {chalet.minNights} noites · taxa de limpeza{' '}
            {formatBRL(chalet.cleaningFee)}
          </p>
          <Link
            to={`/reservar?chalet=${chalet.id}`}
            className="mt-6 block rounded-full bg-ocean py-3 text-center text-sm text-linen"
          >
            Ver dias livres e reservar
          </Link>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Pagamento com Pix ou cartão entra no próximo passo, no próprio site.
          </p>
        </aside>
      </div>
    </main>
  )
}
