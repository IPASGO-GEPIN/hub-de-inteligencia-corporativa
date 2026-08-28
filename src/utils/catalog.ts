import { catalog } from '../data/catalog'
import type { CatalogItem } from '../types/catalog'

function overlap(first: string[], second: string[]) {
  const normalized = new Set(first.map((value) => value.toLocaleLowerCase('pt-BR')))
  return second.filter((value) => normalized.has(value.toLocaleLowerCase('pt-BR'))).length
}

export function getRelatedItems(current: CatalogItem, limit = 3) {
  return catalog
    .filter((item) => item.id !== current.id)
    .map((item) => ({
      item,
      score:
        (item.area === current.area ? 5 : 0) +
        overlap(item.indicadores, current.indicadores) * 3 +
        overlap(item.tags, current.tags) * 2 +
        overlap(item.perguntas, current.perguntas),
    }))
    .sort((a, b) => b.score - a.score || b.item.ultimaAtualizacao.localeCompare(a.item.ultimaAtualizacao))
    .slice(0, limit)
    .map(({ item }) => item)
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
}
