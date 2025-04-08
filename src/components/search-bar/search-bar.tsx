'use client'

import { useState } from 'react'
import { useProductContext } from '@/contexts/product-context'
import styles from './search-bar.module.css'
import { useDebounce } from '@/hooks/use-debounce'

export const SearchBar = () => {
  const { searchProducts, searchQuery } = useProductContext()
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const debuncedValue = useDebounce(localSearch, 300)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    searchProducts(e.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search products..."
        value={localSearch}
        onChange={handleChange}
      />
    </div>
  )
}
