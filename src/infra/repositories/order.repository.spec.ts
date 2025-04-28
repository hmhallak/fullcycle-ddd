import { Sequelize } from 'sequelize-typescript';
import Address from '../../domains/entities/address';
import Customer from '../../domains/entities/customer';
import Order from '../../domains/entities/order';
import OrderItem from '../../domains/entities/order_item';
import Product from '../../domains/entities/product';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';
import { ProductModel } from '../db/sequelize/model/product.model';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);

    const order = new Order('123', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: orderItem.productId,
        }
      ]
    })
  });
});