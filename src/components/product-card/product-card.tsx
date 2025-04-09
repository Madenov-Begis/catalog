'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useProductContext } from '@/contexts/product-context'
import styles from './product-card.module.css'
import { Button } from '../ui/button/button'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useProductContext()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>${product.price}</p>
          <Button onClick={handleAddToCart}>Добавить в корзину</Button>
        </div>
      </div>
    </Link>
  )
}
