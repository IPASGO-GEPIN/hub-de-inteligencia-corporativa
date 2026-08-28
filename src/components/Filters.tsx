import { Filter, RotateCcw } from 'lucide-react'
import { contentAreas, contentTypes, type CatalogFilters, type ContentArea, type ContentType } from '../types/catalog'

interface FiltersProps {
  value: CatalogFilters
  onChange: (filters: CatalogFilters) => void
  onClear: () => void
  activeCount: number
}

interface FilterGroupProps<T extends string> {
  title: string
  options: readonly T[]
  selected: T[]
  onToggle: (option: T) => void
}

function FilterGroup<T extends string>({ title, options, selected, onToggle }: FilterGroupProps<T>) {
  return (
    <fieldset className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
      <legend className="mb-3 text-sm font-semibold text-ink">{title}</legend>
      <div className="space-y-2.5">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 hover:text-ink">
            <input type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(option)} className="h-4 w-4 rounded border-slate-300 accent-[#007940]" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function FiltersContent({ value, onChange }: Pick<FiltersProps, 'value' | 'onChange'>) {
  function toggle<T>(collection: T[], item: T) {
    return collection.includes(item) ? collection.filter((value) => value !== item) : [...collection, item]
  }
  return (
    <div className="space-y-5">
      <FilterGroup title="Tipo" options={contentTypes} selected={value.tipos} onToggle={(tipo: ContentType) => onChange({ ...value, tipos: toggle(value.tipos, tipo) })} />
      <FilterGroup title="Área responsável" options={contentAreas} selected={value.areas} onToggle={(area: ContentArea) => onChange({ ...value, areas: toggle(value.areas, area) })} />
    </div>
  )
}

export function Filters({ value, onChange, onClear, activeCount }: FiltersProps) {
  return (
    <>
      <aside className="hidden lg:block" aria-label="Filtros do catálogo">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-semibold text-ink"><Filter size={16} /> Filtros</h2>{activeCount > 0 && <button onClick={onClear} className="text-xs font-semibold text-forest hover:underline">Limpar</button>}</div>
          <FiltersContent value={value} onChange={onChange} />
        </div>
      </aside>
      <details className="group rounded-xl border border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-ink">
          <span className="flex items-center gap-2"><Filter size={17} /> Filtros {activeCount > 0 && <span className="rounded-full bg-forest px-2 py-0.5 text-[10px] text-white">{activeCount}</span>}</span>
          {activeCount > 0 && <button type="button" onClick={(event) => { event.preventDefault(); onClear() }} className="flex items-center gap-1.5 text-xs text-forest"><RotateCcw size={14} /> Limpar</button>}
        </summary>
        <div className="border-t border-slate-200 p-4"><FiltersContent value={value} onChange={onChange} /></div>
      </details>
    </>
  )
}
