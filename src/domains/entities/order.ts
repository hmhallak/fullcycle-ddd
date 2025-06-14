import OrderItem from './order_item'

// Aggregate example
export default class Order {

  private _id: string
  private _customerId: string
  private _items: OrderItem[] = []
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total();

    this.validate()
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  validate(): boolean {
    if(this._id.length === 0) {
      throw new Error("Id is required");
    }
    
    if(this._customerId.length === 0) {
      throw new Error("customerId is required");
    }
    
    if(this._items.length === 0) {
      throw new Error("at least one item is required");
    }

    if(this._items.some(item => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0")
    }

    return true
  }

  total(): number {
    return this._items.reduce((total, item) => total + item.orderItemTotal(), 0)
  }

  addItem(item: OrderItem) {
    this._items.push(item)
    this._total = this.total()
  }

  removeItem(itemId: string) {
    this._items = this._items.filter(item => item.id !== itemId)
    this._total = this.total()
  }
}