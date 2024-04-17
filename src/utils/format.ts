type result = string | undefined | null

export function price(price: result, cents?: result): number {
  if (!price) return 0
  const newString = price.replace(/[^0-9]/g, '')

  if (!cents) return Number(newString)
  return Number(newString.concat('.', cents))
}

export function discount(discount: result): string {
  if (!discount) return ''

  const index = discount.indexOf('%')

  if (index !== -1) {
    return discount.slice(0, index + 1)
  } else {
    return discount
  }
}
