import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return <main className="grid min-h-[calc(100vh-8rem)] place-items-center px-5 py-16 text-center"><div><span className="text-sm font-semibold text-forest">Erro 404</span><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Conteúdo não encontrado</h1><p className="mt-3 text-sm text-slate-600">O endereço pode ter mudado ou este conteúdo não está mais disponível.</p><Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-sand hover:bg-forest-dark"><ArrowLeft size={16} /> Voltar ao catálogo</Link></div></main>
}
