import Fuse, { type IFuseOptions } from 'fuse.js'
import { catalog } from '../data/catalog'
import type { CatalogItem } from '../types/catalog'

const fuseOptions: IFuseOptions<CatalogItem> = {
  includeScore: true,
  ignoreDiacritics: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  threshold: 0.34,
  keys: [
    { name: 'titulo', weight: 0.25 },
    { name: 'indicadores', weight: 0.2 },
    { name: 'perguntas', weight: 0.2 },
    { name: 'tags', weight: 0.14 },
    { name: 'descricao', weight: 0.12 },
    { name: 'descricaoCompleta', weight: 0.04 },
    { name: 'area', weight: 0.03 },
    { name: 'tipo', weight: 0.02 },
  ],
}

const fuse = new Fuse(catalog, fuseOptions)

export interface SearchResult {
  item: CatalogItem
  score: number
}

const stopWords = new Set(['a', 'as', 'ao', 'aos', 'com', 'da', 'das', 'de', 'do', 'dos', 'e', 'em', 'na', 'nas', 'no', 'nos', 'o', 'os', 'para', 'por', 'que'])

const synonyms: Record<string, string[]> = {
  aumento: ['crescimento', 'evolução', 'variação', 'cresceu'],
  crescimento: ['aumento', 'evolução', 'variação', 'cresceram'],
  custo: ['custos', 'despesa', 'gasto'],
  custos: ['custo', 'despesa', 'gastos'],
  internacao: ['internações', 'hospitalar', 'admissões'],
  internacoes: ['internação', 'hospitalar', 'admissões'],
  cliente: ['clientes', 'carteira', 'beneficiários'],
  clientes: ['cliente', 'carteira', 'beneficiários'],
  vendas: ['comercial', 'receita nova', 'pipeline'],
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
}

export function searchCatalog(query: string): SearchResult[] {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return catalog.map((item) => ({ item, score: 0 }))

  const tokens = normalize(normalizedQuery).split(/[^a-z0-9]+/).filter((token) => token.length > 1 && !stopWords.has(token))
  const candidates = new Map<string, { item: CatalogItem; fullScore: number; groupScores: Map<number, number> }>()

  function candidateFor(item: CatalogItem) {
    const existing = candidates.get(item.id)
    if (existing) return existing
    const created = { item, fullScore: 0, groupScores: new Map<number, number>() }
    candidates.set(item.id, created)
    return created
  }

  fuse.search(normalizedQuery).forEach(({ item, score }) => {
    const value = score ?? 1
    if (value <= 0.22) candidateFor(item).fullScore = Math.max(0, 1 - value) * 3
  })

  tokens.forEach((token, groupIndex) => {
    const variants = [token, ...(synonyms[token] ?? [])]
    variants.forEach((variant) => {
      fuse.search(variant).forEach(({ item, score }) => {
        if ((score ?? 1) > 0.24) return
        const candidate = candidateFor(item)
        const value = Math.max(0, 1 - (score ?? 1))
        candidate.groupScores.set(groupIndex, Math.max(candidate.groupScores.get(groupIndex) ?? 0, value))
      })
    })
  })

  const requiredGroups = Math.max(1, Math.ceil(tokens.length * 0.6))
  return [...candidates.values()]
    .filter((candidate) => candidate.fullScore > 0 || candidate.groupScores.size >= requiredGroups)
    .map((candidate) => {
      const relevance = candidate.fullScore + [...candidate.groupScores.values()].reduce((total, value) => total + value, 0)
      return { item: candidate.item, score: 1 / (1 + relevance) }
    })
    .sort((a, b) => a.score - b.score || Number(b.item.destaque) - Number(a.item.destaque))
}
