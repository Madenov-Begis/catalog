'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useProductContext } from '@/contexts/product-context'
import styles from './cart.module.css'

export const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useProductContext()
  const [isOpen, setIsOpen] = useState(false)

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    alert('Success!')
    clearCart()
    setIsOpen(false)
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartIcon} onClick={toggleCart}>
        🛒
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </div>

      <div
        className={`${styles.cartDropdown} ${
          !isOpen ? styles.cartDropdownHidden : ''
        }`}
      >
        <h3>Your Cart</h3>

        {cart.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className={styles.cartItem} key={item.product.id}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="60px"
                  />
                </div>
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.product.name}</p>
                  <p className={styles.itemPrice}>${item.product.price}</p>
                </div>
                <div className={styles.itemQuantity}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    -
                  </button>
                  <span className={styles.quantityText}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => addToCart(item.product)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.cartTotal}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
