import { Bookmark, LayoutGrid, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

const navItems = [
  { label: 'Catálogo', to: '/', icon: LayoutGrid },
  { label: 'Favoritos', to: '/favoritos', icon: Bookmark },
]

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-xl px-3.5 py-2 text-sm font-medium transition ${isActive ? 'bg-lime text-ink' : 'text-sand hover:bg-sand hover:text-forest'}`
}

export function Header() {
  const { favoriteIds } = useFavorites()
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-forest-dark bg-forest">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3 font-semibold tracking-[-0.01em] text-sand" aria-label="Hub de Inteligência — início">
            <img src={`${import.meta.env.BASE_URL}brand/ipasgo-horizontal.png`} alt="Ipasgo Saúde" className="h-8 w-auto shrink-0" />
            <span className="hidden h-6 w-px bg-lime sm:block" aria-hidden="true" />
            <span className="truncate text-sm sm:text-base">Hub de Inteligência</span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navClass}>
                <span className="inline-flex items-center gap-2">{item.label}{item.to === '/favoritos' && favoriteIds.length > 0 && <span className="grid min-w-5 place-items-center rounded-full bg-sand px-1.5 py-0.5 text-[10px] text-forest">{favoriteIds.length}</span>}</span>
              </NavLink>
            ))}
          </nav>
          <Link to="/" className="rounded-xl p-2 text-sand hover:bg-lime hover:text-forest sm:hidden" aria-label="Abrir catálogo"><Search size={20} /></Link>
        </div>
      </header>
      <nav aria-label="Navegação móvel" className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 rounded-2xl border border-slate-300 bg-sand p-1.5 shadow-[0_12px_30px_-18px_rgba(47,48,42,.65)] sm:hidden">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium transition ${isActive ? 'bg-lime text-ink' : 'text-slate-600'}`}>
            <span className="relative"><Icon size={19} aria-hidden="true" />{to === '/favoritos' && favoriteIds.length > 0 && <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[9px] text-sand">{favoriteIds.length}</span>}</span>{label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
