export interface Item {
  name: string
  price: string
  url: string
}

export interface List {
  category: string
  items: Array<Item>
}
