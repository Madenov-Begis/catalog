import { Product } from '@/types'

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 13',
    price: 799,
    image: '/iphone-13.jpeg',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22',
    price: 749,
    image: '/s22.jpg',
  },
  {
    id: 3,
    name: 'Google Pixel 6',
    price: 599,
    image: '/pixel.png.webp',
  },
]

export const additionalProducts: Product[] = [
  {
    id: 4,
    name: 'OnePlus 10 Pro',
    price: 899,
    image: '/oneplus.png',
  },
  {
    id: 5,
    name: 'Xiaomi Mi 12',
    price: 749,
    image: '/mi12.png ',
  },
  {
    id: 6,
    name: 'Nothing Phone 1',
    price: 499,
    image: '/nothing.jpg',
  },
]

// export const getAllProducts = (): Product[] => {
//   return [...initialProducts, ...additionalProducts]
// }

// export const getProductById = (id: number): Product | undefined => {
//   return getAllProducts().find((product) => product.id === id)
// }
