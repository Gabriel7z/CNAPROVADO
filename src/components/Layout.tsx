import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'O lugar', end: true },
  { to: '/chales', label: 'Chalés' },
  { to: '/reservar', label: 'Reservar' },
]

export function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const overHero = location.pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-linen">
      <header
        className={`fixed inset-x-0 top-0 z-40 transition ${
          overHero ? 'bg-transparent' : 'bg-linen/95 shadow-sm backdrop-blur'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <NavLink to="/" className="flex items-baseline gap-2">
            <span className={`font-display text-2xl tracking-wide ${overHero ? 'text-linen' : 'text-ocean'}`}>
              Chalé Mirante
            </span>
            <span className={`hidden text-xs tracking-[0.2em] uppercase sm:inline ${overHero ? 'text-sand' : 'text-ink-soft'}`}>
              Cabo Frio
            </span>
          </NavLink>
          <nav className="flex items-center gap-1 text-sm sm:gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 ${
                      isActive
                        ? 'bg-ocean text-linen'
                        : overHero
                          ? 'text-sand hover:text-white'
                          : 'text-ink-soft hover:text-ink'
                    }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-sand-deep bg-ocean text-sand">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-linen">Chalé Mirante</p>
            <p className="mt-2 text-sm text-sand-deep">Cabo Frio · Região dos Lagos · RJ</p>
          </div>
          <div className="text-sm leading-7">
            <p>Reserva e pagamento no próprio site.</p>
            <p>Sem intermediário. Sem comissão de plataforma.</p>
            <a
              className="mt-2 inline-block underline decoration-gold/60 underline-offset-4"
              href="https://www.instagram.com/chalemirantecabofrio"
              target="_blank"
              rel="noreferrer"
            >
              @chalemirantecabofrio
            </a>
          </div>
          <div className="text-sm leading-7">
            <p>Check-in 15h · Check-out 11h</p>
            <p>Pix ou cartão na confirmação da reserva</p>
            <p className="mt-3 text-xs text-sand-deep">Protótipo para apresentação — nenhum pagamento real é processado.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
