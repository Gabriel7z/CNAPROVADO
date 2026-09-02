import { Link } from 'react-router-dom'
import { chalets } from '../data/chalets'
import { formatBRL } from '../lib/money'

export function ChaletsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-28 pb-20">
      <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Os chalés</p>
      <h1 className="mt-2 font-display text-5xl text-ocean">Escolha o seu ritmo</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Poucas unidades, cada uma com calendário próprio. Se o dia está riscado, o chalé está cheio — simples assim.
      </p>
      <div className="mt-12 space-y-10">
        {chalets.map((chalet, index) => (
          <article
            key={chalet.id}
            className={`grid overflow-hidden rounded-3xl bg-sand md:grid-cols-2 ${index % 2 === 1 ? 'md:[&>img]:order-2' : ''}`}
          >
            <img src={chalet.images[0]} alt={chalet.name} className="h-72 w-full object-cover md:h-full" />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h2 className="font-display text-4xl text-ocean">{chalet.name}</h2>
              <p className="mt-2 text-ink-soft">{chalet.tagline}</p>
              <p className="mt-4 leading-7 text-ink-soft">{chalet.description}</p>
              <p className="mt-5 text-sm">
                {chalet.bedrooms} quarto{chalet.bedrooms > 1 ? 's' : ''} · até {chalet.guests} hóspedes · {chalet.size}
              </p>
              <p className="mt-1 text-sm">A partir de {formatBRL(chalet.nightlyRate)} / noite</p>
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/chales/${chalet.id}`}
                  className="rounded-full border border-ocean px-5 py-2 text-sm text-ocean"
                >
                  Ver detalhes
                </Link>
                <Link
                  to={`/reservar?chalet=${chalet.id}`}
                  className="rounded-full bg-ocean px-5 py-2 text-sm text-linen"
                >
                  Ver calendário
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
