'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useProductContext } from '@/contexts/product-context'
import styles from './product-card.module.css'

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
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>${product.price}</p>
          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}
