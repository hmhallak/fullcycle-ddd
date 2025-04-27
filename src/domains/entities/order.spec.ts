import Order from './order'
import OrderItem from './order_item'

describe('Order unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order("", "123", [])
    }).toThrow("Id is required")
  })
  
  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order("123", "", [])
    }).toThrow("customerId is required")
  })

  it('should throw error when items is empty', () => {
    expect(() => {
      const order = new Order("123", "123", [])
    }).toThrow("at least one item is required")
  })
  
  it('should calculate total', () => {
    const priceItem1 = 10
    const item1 = new OrderItem("1", "Item 1", priceItem1, "p1", 2)

    const priceItem2 = 20
    const item2 = new OrderItem("2", "Item 2", priceItem2, "p2", 3)

    const order = new Order("1", "123", [item1, item2])

    const total = order.total()

    expect(total).toBe(item1.orderItemTotal() + item2.orderItemTotal())
  })

  it('should throw error if the item quantity is less than or equal to 0', () => {
    expect(() => {
      const priceItem1 = 10
      const item1 = new OrderItem("1", "Item 1", priceItem1, "p1", -1)
      const order = new Order("1", "123", [item1])
    }).toThrow("Quantity must be greater than 0")
  })
})