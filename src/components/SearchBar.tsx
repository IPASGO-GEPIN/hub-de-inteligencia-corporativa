import { Search, X } from 'lucide-react'
import { useId, type FormEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  autoFocus?: boolean
  compact?: boolean
  label?: string
}

export function SearchBar({ value, onChange, onSubmit, autoFocus, compact = false, label = 'Buscar no catálogo' }: SearchBarProps) {
  const id = useId()
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <label htmlFor={id} className={`group flex items-center gap-3 border border-slate-300 bg-white transition focus-within:border-forest focus-within:ring-2 focus-within:ring-lime ${compact ? 'rounded-xl px-4 py-2.5' : 'rounded-2xl px-5 py-4'}`}>
        <span className="sr-only">{label}</span>
        <Search className="shrink-0 text-slate-400 transition group-focus-within:text-forest" size={compact ? 19 : 22} aria-hidden="true" />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoFocus={autoFocus}
          className={`min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-slate-400 ${compact ? 'text-sm' : 'text-base'}`}
          placeholder="Busque por painel, estudo, indicador, tema ou pergunta de negócio..."
        />
        {value && (
          <button type="button" onClick={() => onChange('')} aria-label="Limpar busca" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={17} />
          </button>
        )}
      </label>
    </form>
  )
}
