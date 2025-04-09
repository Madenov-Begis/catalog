'use client'

import { useState } from 'react'
import { useProductContext } from '@/contexts/product-context'
import styles from './search-bar.module.css'

export const SearchBar = () => {
  const { searchProducts, searchQuery } = useProductContext()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    searchProducts(e.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Поиск продуктов..."
        value={localSearch}
        onChange={handleChange}
      />
    </div>
  )
}
