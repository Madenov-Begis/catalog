'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Product, CartItem } from '@/types'
import { initialProducts, additionalProducts } from '@/data/products'
import { ProductContext } from './product-context'

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(initialProducts)
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const loadMoreProducts = () => {
    setDisplayedProducts((prev) => [...prev, ...additionalProducts])
    setHasMoreProducts(false)
  }

  const searchProducts = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setDisplayedProducts(initialProducts)
      setHasMoreProducts(true)
      return
    }

    const allProducts = [...initialProducts, ...additionalProducts]
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )

    setDisplayedProducts(filteredProducts)
    setHasMoreProducts(false)
  }

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === productId
      )

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      } else {
        return prevCart.filter((item) => item.product.id !== productId)
      }
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <ProductContext.Provider
      value={{
        products: displayedProducts,
        loadMoreProducts,
        hasMoreProducts,
        searchProducts,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
