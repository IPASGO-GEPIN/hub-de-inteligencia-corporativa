import { ArrowLeft, ArrowUpRight, Bookmark, Building2, CalendarDays, Database, RefreshCw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { ContentCard } from '../components/ContentCard'
import { ContentTypeIcon } from '../components/ContentTypeIcon'
import { catalog } from '../data/catalog'
import { useFavorites } from '../hooks/useFavorites'
import { formatDate, getRelatedItems } from '../utils/catalog'
import { NotFound } from './NotFound'

export function ContentDetail() {
  const { id } = useParams()
  const item = catalog.find((content) => content.id === id)
  const { isFavorite, toggleFavorite } = useFavorites()
  if (!item) return <NotFound />
  const favorite = isFavorite(item.id)
  const related = getRelatedItems(item)
  const actionLabel =
    item.tipo === 'Dashboard' ? 'Acessar dashboard'
    : item.tipo === 'Plataforma' ? 'Acessar plataforma'
    : item.tipo === 'Planilha' ? 'Abrir planilha'
    : item.tipo === 'Repositório' ? 'Abrir repositório'
    : item.tipo === 'Base de dados' ? 'Acessar base de dados'
    : `Acessar ${item.tipo.toLocaleLowerCase('pt-BR')}`

  const info = [
    { label: 'Área responsável', value: item.area, icon: Building2 },
    { label: 'Fonte dos dados', value: item.fonte, icon: Database },
    { label: 'Periodicidade', value: item.periodicidade, icon: RefreshCw },
    { label: 'Última atualização', value: formatDate(item.ultimaAtualizacao), icon: CalendarDays },
  ]

  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="border-b border-forest-dark bg-forest">
        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-sand hover:text-lime"><ArrowLeft size={16} /> Voltar ao catálogo</Link>
          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.09em] text-sand"><ContentTypeIcon type={item.tipo} size={16} /> {item.tipo}<span>/</span><span>{item.area}</span></div>
              <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-sand sm:text-4xl">{item.titulo}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-sand">{item.descricao}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => toggleFavorite(item.id)} aria-pressed={favorite} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${favorite ? 'border-lime bg-lime text-ink' : 'border-sand bg-white text-slate-700 hover:border-lime'}`}><Bookmark size={17} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Favoritado' : 'Favoritar'}</button>
              <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-light">{actionLabel} <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)] lg:px-8 lg:py-12">
        <div className="space-y-9">
          <section aria-labelledby="about-title"><h2 id="about-title" className="text-xl font-semibold tracking-tight text-ink">Sobre este conteúdo</h2><p className="mt-3 text-sm leading-7 text-slate-600">{item.descricaoCompleta}</p></section>
          <section aria-labelledby="questions-title"><h2 id="questions-title" className="text-xl font-semibold tracking-tight text-ink">O que este conteúdo responde</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{item.perguntas.map((question) => <li key={question} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{question}</li>)}</ul></section>
          <section aria-labelledby="indicators-title"><h2 id="indicators-title" className="text-xl font-semibold tracking-tight text-ink">Indicadores</h2><div className="mt-4 flex flex-wrap gap-2">{item.indicadores.map((indicator) => <Badge key={indicator} tone="accent">{indicator}</Badge>)}</div></section>
          <section aria-labelledby="tags-title"><h2 id="tags-title" className="text-sm font-semibold text-ink">Temas relacionados</h2><div className="mt-3 flex flex-wrap gap-2">{item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div></section>
        </div>
        <aside aria-labelledby="info-title"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft lg:sticky lg:top-24"><h2 id="info-title" className="text-sm font-semibold text-ink">Informações</h2><dl className="mt-4 space-y-4">{info.map(({ label, value, icon: Icon }) => <div key={label} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"><Icon size={17} className="mt-0.5 shrink-0 text-slate-400" /><div><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className="mt-1 text-sm leading-5 text-slate-700">{value}</dd></div></div>)}</dl></div></aside>
      </div>

      <section className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-12"><div className="mb-6"><p className="text-sm font-semibold text-forest">Conteúdos relacionados</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Você também pode precisar</h2></div><div className="grid gap-4 md:grid-cols-3">{related.map((relatedItem) => <ContentCard key={relatedItem.id} item={relatedItem} compact />)}</div></div></section>
    </main>
  )
}
