'use client'

import { ProductCard } from '../product-card/product-card'
import { useProductContext } from '@/contexts/product-context'
import styles from './product-list.module.css'
import { Button } from '../ui/button/button'

export const ProductList = () => {
  const { products, loadMoreProducts, hasMoreProducts } = useProductContext()

  return (
    <>
      {products.length === 0 ? (
        <div className={styles.noProducts}>Нет продуктов</div>
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
        <Button onClick={loadMoreProducts} style={{width: 300, margin: '30px auto', display: 'block'}}>Показать еще</Button>
      )}
    </>
  )
}
