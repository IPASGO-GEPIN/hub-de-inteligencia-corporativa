import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContentCard } from '../components/ContentCard'
import { catalog } from '../data/catalog'
import { useFavorites } from '../hooks/useFavorites'

export function Favorites() {
  const { favoriteIds } = useFavorites()
  const favorites = catalog.filter((item) => favoriteIds.includes(item.id))
  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="border-b border-forest-dark bg-forest"><div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><p className="text-sm font-semibold text-sand">Sua seleção</p><h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-sand">Favoritos</h1><p className="mt-2 text-sm text-sand">Acesse rapidamente os conteúdos que você consulta com mais frequência.</p></div></div>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {favorites.length > 0 ? <><p className="mb-5 text-sm font-medium text-slate-600">{favorites.length} {favorites.length === 1 ? 'conteúdo salvo' : 'conteúdos salvos'}</p><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{favorites.map((item) => <ContentCard key={item.id} item={item} />)}</div></> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-lime text-forest"><Bookmark size={22} /></span><h2 className="mt-4 text-lg font-semibold text-ink">Você ainda não adicionou nenhum conteúdo aos favoritos.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Use o ícone de favorito nos cards para montar uma lista de acesso rápido.</p><Link to="/" className="mt-5 inline-flex rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-sand hover:bg-forest-dark">Explorar catálogo</Link></div>}
      </div>
    </main>
  )
}
