import { CartItem, Product } from '@/types'
import { createContext, useContext } from 'react'

interface ProductContextType {
  products: Product[]
  loadMoreProducts: () => void
  hasMoreProducts: boolean
  searchProducts: (query: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
)

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('Context error')
  }
  return context
}
