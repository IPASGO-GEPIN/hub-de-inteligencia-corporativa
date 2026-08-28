import { AppWindow, BarChart3, BookOpenText, Database, FileChartColumn, FolderOpen, Table2 } from 'lucide-react'
import type { ContentType } from '../types/catalog'

const icons = {
  Dashboard: BarChart3,
  Plataforma: AppWindow,
  Planilha: Table2,
  Relatório: FileChartColumn,
  Estudo: BookOpenText,
  Repositório: FolderOpen,
  'Base de dados': Database,
}

export function ContentTypeIcon({ type, size = 18 }: { type: ContentType; size?: number }) {
  const Icon = icons[type]
  return <Icon size={size} aria-hidden="true" />
}
