import Address from './domains/entities/address';
import Customer from './domains/entities/customer';
import Order from './domains/entities/order';
import OrderItem from './domains/entities/order_item';

let customer = new Customer("123", "Hu100");
const address = new Address("Rua 1", 2, "7800-000", "Cuiabá");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);

const order = new Order("1", "123", [item1, item2]);
