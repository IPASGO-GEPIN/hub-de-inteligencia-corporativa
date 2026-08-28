import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { FavoritesProvider } from './hooks/useFavorites'
import { Catalog } from './pages/Catalog'
import { ContentDetail } from './pages/ContentDetail'
import { Favorites } from './pages/Favorites'
import { NotFound } from './pages/NotFound'

function RedirectToCatalog() {
  const location = useLocation()
  return <Navigate to={{ pathname: '/', search: location.search }} replace />
}

export default function App() {
  return (
    <FavoritesProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/catalogo" element={<RedirectToCatalog />} />
        <Route path="/conteudo/:id" element={<ContentDetail />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="border-t border-forest-dark bg-forest pb-24 pt-6 text-center text-xs text-sand sm:pb-6">
        Hub de Inteligência Corporativa · Informação confiável para decisões melhores
      </footer>
    </FavoritesProvider>
  )
}
