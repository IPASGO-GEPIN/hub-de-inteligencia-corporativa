export const contentTypes = ['Dashboard', 'Plataforma', 'Planilha', 'Relatório', 'Estudo', 'Repositório', 'Base de dados'] as const
export const contentAreas = ['GEPIN', 'Assessoria DIREP', 'GEBEN', 'GEGOV', 'GEPAS'] as const
export const updateFrequencies = ['Diário', 'Semanal', 'Mensal', 'Trimestral', 'Eventual'] as const

export type ContentType = (typeof contentTypes)[number]
export type ContentArea = (typeof contentAreas)[number]
export type UpdateFrequency = (typeof updateFrequencies)[number]

export interface CatalogItem {
  id: string
  titulo: string
  tipo: ContentType
  area: ContentArea
  descricao: string
  descricaoCompleta: string
  indicadores: string[]
  tags: string[]
  perguntas: string[]
  fonte: string
  periodicidade: UpdateFrequency
  ultimaAtualizacao: string
  url: string
  destaque: boolean
}

export interface CatalogFilters {
  tipos: ContentType[]
  areas: ContentArea[]
  periodicidades: UpdateFrequency[]
}

export type SortOption = 'relevancia' | 'titulo' | 'atualizacao'
