import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'hub-inteligencia:favoritos'

interface FavoritesContextValue {
  favoriteIds: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as string[]) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const value = useMemo<FavoritesContextValue>(() => ({
    favoriteIds,
    isFavorite: (id) => favoriteIds.includes(id),
    toggleFavorite: (id) => setFavoriteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
  }), [favoriteIds])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites precisa estar dentro de FavoritesProvider')
  return context
}
