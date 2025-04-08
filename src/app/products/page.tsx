'use client'

import { Suspense } from 'react'
import { ProductList } from '@/components/product-list/product-list'
import { SearchBar } from '@/components/search-bar/search-bar'
import { Cart } from '@/components/cart/cart'
import { ProductProvider } from '@/contexts/product-provider'
import styles from './page.module.css'

function LoadingFallback() {
  return <div className={styles.loadingFallback}>Loading products...</div>
}

export default function ProductsPage() {
  return (
    <ProductProvider>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>10SHOP</h1>
          <div className={styles.searchAndCartContainer}>
            <SearchBar />
            <Cart />
          </div>
        </header>

        <Suspense fallback={<LoadingFallback />}>
          <ProductList />
        </Suspense>
      </div>
    </ProductProvider>
  )
}
