import Address from './address'
import Customer from './customer'

describe('Customer unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer("", "John")
    }).toThrow("Id is required")
  })
  
  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer("123", "")
    }).toThrow("Name is required")
  })
  
  // AAA
  it('should change the name', () => {
    // Arrange
    const customer = new Customer("123", "John")

    // Act
    customer.changeName("Jane")

    // Assert
    expect(customer.name).toBe("Jane")
  })

  it('should throw an error if address is not defined when activating the user', () => {
    expect(() => {
      const customer = new Customer("123", "John")
      
      customer.activate()
    }).toThrow("Address is mandatory to activate a customer")
  })

  it('should activate the customer', () => {
    const customer = new Customer("123", "John")
    
    customer.Address = new Address("Rua 1", 1, "7800-000", "Cuiabá")
    
    customer.activate()

    expect(customer.isActive()).toBe(true)
  })
 
  it('should deactivate the customer', () => {
    const customer = new Customer("123", "John")
    
    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })
})