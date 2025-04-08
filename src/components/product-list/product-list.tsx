'use client'

import { ProductCard } from '../product-card/product-card'
import { useProductContext } from '@/contexts/product-context'
import styles from './product-list.module.css'

export const ProductList = () => {
  const { products, loadMoreProducts, hasMoreProducts } = useProductContext()

  return (
    <>
      {products.length === 0 ? (
        <div className={styles.noProducts}>No products</div>
      ) : (
        <div className={styles.productList}>
          {products.map((product) => (
            <div className={styles.productItem} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {hasMoreProducts && (
        <button className={styles.loadMoreButton} onClick={loadMoreProducts}>
          Show More
        </button>
      )}
    </>
  )
}
