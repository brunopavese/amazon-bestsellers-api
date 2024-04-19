import { Item, List, Data } from './types'

export function validate(body: unknown): body is Data {
  if (body !== null) {
    const obj = body as Data

    return (
      obj.bestSellers.every((list) => isValidList(list)) &&
      typeof obj.updateDate === 'string'
    )
  }

  return false
}

function isValidList(list: unknown): list is List {
  if (list !== null) {
    const obj = list as List
    return (
      typeof obj.category === 'string' &&
      obj.items.every((item) => isValidItem(item))
    )
  }
  return false
}

function isValidItem(item: unknown): item is Item {
  if (item !== null) {
    const obj = item as Item
    return (
      typeof obj.id === 'number' &&
      typeof obj.name === 'string' &&
      typeof obj.price === 'string' &&
      typeof obj.url === 'string'
    )
  }
  return false
}
