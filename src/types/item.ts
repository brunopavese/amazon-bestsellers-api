export interface Item {
  name: string | null | undefined
  url: string | null | undefined
  seller: string | undefined
  originalPrice: number
  promotionPrice: number
  discount: string
  freeShipping: boolean
  imageUrl: string | null | undefined
}
