import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ContentCard } from '../components/ContentCard'
import { EmptyState } from '../components/EmptyState'
import { Filters } from '../components/Filters'
import { SearchBar } from '../components/SearchBar'
import type { CatalogFilters, ContentArea, ContentType, SortOption } from '../types/catalog'
import { searchCatalog } from '../utils/search'

function initialFilters(params: URLSearchParams): CatalogFilters {
  return {
    tipos: params.getAll('tipo') as ContentType[],
    areas: params.getAll('area') as ContentArea[],
    periodicidades: [],
  }
}

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<CatalogFilters>(() => initialFilters(searchParams))
  const [sort, setSort] = useState<SortOption>((searchParams.get('ordenar') as SortOption) || 'titulo')
  const emptyFilters: CatalogFilters = { tipos: [], areas: [], periodicidades: [] }
  const activeCount = filters.tipos.length + filters.areas.length

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    filters.tipos.forEach((value) => params.append('tipo', value))
    filters.areas.forEach((value) => params.append('area', value))
    if (sort !== 'titulo') params.set('ordenar', sort)
    setSearchParams(params, { replace: true })
  }, [filters, query, setSearchParams, sort])

  const results = useMemo(() => {
    const filtered = searchCatalog(query).filter(({ item }) =>
      (filters.tipos.length === 0 || filters.tipos.includes(item.tipo)) &&
      (filters.areas.length === 0 || filters.areas.includes(item.area)),
    )
    if (sort === 'titulo') return [...filtered].sort((a, b) => a.item.titulo.localeCompare(b.item.titulo, 'pt-BR'))
    if (sort === 'atualizacao') return [...filtered].sort((a, b) => b.item.ultimaAtualizacao.localeCompare(a.item.ultimaAtualizacao))
    return filtered
  }, [filters, query, sort])

  function clearAll() {
    setQuery('')
    setFilters(emptyFilters)
    setSort('titulo')
  }

  return (
    <main className="min-h-[calc(100vh-8rem)]">
      <div className="border-b border-forest-dark bg-forest">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="max-w-3xl"><p className="text-sm font-semibold text-sand">Biblioteca corporativa</p><h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-sand">Catálogo de inteligência</h1><p className="mt-2 text-sm leading-6 text-sand">Descubra painéis, relatórios, estudos e fontes de dados disponíveis na organização.</p></div>
          <div className="mt-6 max-w-4xl"><SearchBar value={query} onChange={setQuery} compact /></div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <Filters value={filters} onChange={setFilters} onClear={() => setFilters(emptyFilters)} activeCount={activeCount} />
        <section aria-labelledby="results-title" className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div><h2 id="results-title" className="font-semibold text-ink" aria-live="polite">{results.length} {results.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}</h2>{query && <p className="mt-0.5 text-xs text-slate-500">Resultados relacionados a “{query}”</p>}</div>
            <label className="relative flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal size={15} /><span className="sr-only">Ordenar resultados</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-forest"><option value="titulo">Título</option><option value="relevancia">Relevância</option><option value="atualizacao">Atualização mais recente</option></select><ChevronDown size={14} className="pointer-events-none absolute right-2.5" /></label>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map(({ item }) => <ContentCard key={item.id} item={item} />)}</div>
          ) : (
            <EmptyState title="Nenhum conteúdo encontrado" description="Tente usar um termo mais amplo, remover algum filtro ou buscar pela pergunta que você deseja responder." action={<button onClick={clearAll} className="rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-sand hover:bg-forest-dark">Limpar busca e filtros</button>} />
          )}
        </section>
      </div>
    </main>
  )
}
