import { Link } from 'react-router-dom'
import { chalets } from '../data/chalets'
import { formatBRL } from '../lib/money'

export function HomePage() {
  return (
    <main>
      <section className="grain relative flex min-h-screen items-end">
        <img
          src="/images/hero-mar.jpg"
          alt="Mar de Cabo Frio visto do alto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/20" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-40">
          <p className="text-xs tracking-[0.35em] text-gold uppercase">Cabo Frio · Rio de Janeiro</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] text-linen sm:text-7xl">
            A vista é o destino.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sand">
            Três chalés no alto de Cabo Frio. Reserva direta, calendário real e pagamento no nosso site — do jeito que a
            casa merece, sem plataforma no meio.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/reservar"
              className="rounded-full bg-linen px-6 py-3 text-sm font-medium text-ocean hover:bg-white"
            >
              Ver datas e reservar
            </Link>
            <Link
              to="/chales"
              className="rounded-full border border-linen/40 px-6 py-3 text-sm text-linen hover:bg-linen/10"
            >
              Conhecer os chalés
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-lagoon uppercase">O lugar</p>
          <h2 className="mt-3 font-display text-4xl text-ocean sm:text-5xl">Mirante, mar e tempo lento.</h2>
          <p className="mt-5 text-ink-soft leading-7">
            Estamos em Cabo Frio, na Região dos Lagos. Da varanda se vê o azul que só existe aqui: Praia do Forte,
            canal, dunas, o dia inteiro mudando de cor. Os chalés são poucos de propósito. Quem reserva, reserva a casa
            — não um anúncio no meio de mil outros.
          </p>
          <p className="mt-4 text-ink-soft leading-7">
            Instagram continua sendo a vitrine. O site é onde a estadia fecha: datas livres, valor, Pix ou cartão, tudo
            com a gente.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src="/images/praia-areia.jpg" alt="Areia e mar" className="h-64 w-full rounded-2xl object-cover" />
          <img src="/images/dunas.jpg" alt="Dunas" className="mt-8 h-64 w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Hospedagem</p>
              <h2 className="mt-2 font-display text-4xl text-ocean">Três chalés, três ritmos</h2>
            </div>
            <Link to="/chales" className="hidden text-sm text-ocean underline underline-offset-4 sm:inline">
              Ver todos
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {chalets.map((chalet) => (
              <Link
                key={chalet.id}
                to={`/chales/${chalet.id}`}
                className="group overflow-hidden rounded-3xl bg-linen shadow-sm"
              >
                <img
                  src={chalet.images[0]}
                  alt={chalet.name}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="font-display text-2xl text-ocean">{chalet.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{chalet.tagline}</p>
                  <p className="mt-4 text-sm">
                    Até {chalet.guests} hóspedes · a partir de {formatBRL(chalet.nightlyRate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="text-xs tracking-[0.3em] text-lagoon uppercase">Como funciona</p>
        <h2 className="mt-2 font-display text-4xl text-ocean">Reservar aqui, pagar aqui.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { n: '01', t: 'Escolha o chalé', d: 'Horizonte, Maré ou Duna. Cada um com sua vista e sua capacidade.' },
            { n: '02', t: 'Veja o que está cheio', d: 'O calendário marca os dias ocupados. Só entra data que ainda está livre.' },
            { n: '03', t: 'Pague no site', d: 'Pix com 5% de cortesia, ou cartão. Sem sair para outro aplicativo.' },
            { n: '04', t: 'Confirmação na hora', d: 'A reserva fica com a gente. O hóspede é nosso, não da plataforma.' },
          ].map((step) => (
            <div key={step.n} className="rounded-3xl border border-sand-deep p-6">
              <p className="font-display text-3xl text-gold">{step.n}</p>
              <h3 className="mt-3 font-medium text-ocean">{step.t}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.d}</p>
            </div>
          ))}
        </div>
        <Link
          to="/reservar"
          className="mt-10 inline-flex rounded-full bg-ocean px-6 py-3 text-sm text-linen hover:bg-ocean-mid"
        >
          Abrir o calendário
        </Link>
      </section>

      <section className="relative overflow-hidden">
        <img src="/images/costa.jpg" alt="Costa" className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-ocean/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-3xl px-5 text-center text-linen">
            <h2 className="font-display text-4xl sm:text-5xl">A hospedagem do Chalé Mirante, no Chalé Mirante.</h2>
            <p className="mt-4 text-sand">
              Este protótipo mostra o caminho completo: disponibilidade, valor e a etapa de pagamento — ainda em
              demonstração, do jeito que vai viver no site.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
