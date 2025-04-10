'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { getProductById } from '@/data/products'
import { Product } from '@/types'
import { useProductContext } from '@/contexts/product-context'
import { ProductProvider } from '@/contexts/product-provider'
import styles from './page.module.css'
import { Button } from '@/components/ui/button/button'

function ProductDetailContent() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useProductContext()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isImageError, setIsImageError] = useState(false)

  useEffect(() => {
    if (params.id) {
      const productId = parseInt(params.id as string, 10)
      const foundProduct = getProductById(productId)

      if (foundProduct) {
        setProduct(foundProduct)
      }

      setIsLoading(false)
    }
  }, [params.id])

  const handleBackClick = () => {
    router.back()
  }

  const handleAddToCart = () => {
    
    if (product) {
      addToCart(product)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>
  }

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backButton} onClick={handleBackClick}>
        ← Back to products
      </button>

      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={isImageError ? '' : product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            onError={() => setIsImageError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>${product.price}</p>
          <p className={styles.productDescription}>{product.description}</p>
          <Button className={styles.addToCartButton} onClick={handleAddToCart}>
            Добавит в корзину
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <ProductProvider>
      <ProductDetailContent />
    </ProductProvider>
  )
}
