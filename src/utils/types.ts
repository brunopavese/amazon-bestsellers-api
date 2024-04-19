export interface Item {
  id: number
  name: string
  price: string
  url: string
}

export interface List {
  category: string
  items: Array<Item>
}

export interface Data {
  bestSellers: Array<List>
  updateDate: string
}
