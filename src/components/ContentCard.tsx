import { ArrowUpRight, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import type { CatalogItem } from '../types/catalog'
import { Badge } from './Badge'
import { ContentTypeIcon } from './ContentTypeIcon'

export function ContentCard({ item, compact = false }: { item: CatalogItem; compact?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(item.id)
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-forest">
      <button
        type="button"
        onClick={() => toggleFavorite(item.id)}
        aria-label={favorite ? `Remover ${item.titulo} dos favoritos` : `Adicionar ${item.titulo} aos favoritos`}
        aria-pressed={favorite}
        title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className={`absolute right-4 top-4 z-10 rounded-xl p-2 transition ${favorite ? 'bg-lime text-ink' : 'text-slate-400 hover:bg-sand hover:text-forest'}`}
      >
        <Bookmark size={18} fill={favorite ? 'currentColor' : 'none'} />
      </button>
      <Link to={`/conteudo/${item.id}`} className={`flex h-full flex-col rounded-2xl focus:outline-none ${compact ? 'p-4' : 'p-5'}`} aria-label={`Ver detalhes de ${item.titulo}`}>
        <div className="flex items-center gap-2 pr-11 text-xs font-semibold uppercase tracking-[0.08em] text-forest"><ContentTypeIcon type={item.tipo} size={16} /> {item.tipo}</div>
        <h3 className={`font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:text-forest ${compact ? 'mt-4 text-base' : 'mt-5 text-lg'}`}>{item.titulo}</h3>
        <p className={`mt-2 text-sm leading-6 text-slate-600 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>{item.descricao}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{item.indicadores.slice(0, compact ? 2 : 3).map((indicator) => <Badge key={indicator}>{indicator}</Badge>)}</div>
        <div className="mt-auto border-t border-slate-100 pt-4 text-xs font-medium text-slate-600">{item.area}</div>
        {!compact && <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">Ver conteúdo <ArrowUpRight size={15} aria-hidden="true" /></span>}
      </Link>
    </article>
  )
}
