import Order from '../../domains/entities/order';
import OrderItem from '../../domains/entities/order_item';
import OrderRepositoryInterface from '../../domains/repositories/order-repository.interface copy 2';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    });
  }

  async update(entity: Order): Promise<void> {
    const orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"]
    })

    if (!orderModel) {
      throw new Error(`Order with id ${entity.id} not found`);
    }
  
    orderModel.customerId = entity.customerId;
    orderModel.total = entity.total();
  
    const existingItems = orderModel.items;
    const newItems = entity.items;
  
    // Remove deleted items
    await Promise.all(existingItems.filter(item => !newItems.find(newItem => newItem.id === item.id)).map(item => item.destroy()));
  
    // Update existing items
    await Promise.all(existingItems.filter(item => 
      newItems.find(newItem => newItem.id === item.id)).map(async item => {

      const newItem = newItems.find(newItem => newItem.id === item.id);

      item.name = newItem.name;
      item.price = newItem.price;
      item.productId = newItem.productId;
      item.quantity = newItem.quantity;

      await item.save();
    }));
  
    // Add new items
    await Promise.all(newItems.filter(item => 
      !existingItems.find(existingItem => existingItem.id === item.id)).map(async item => {

      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id
      });

    }));
  
    await orderModel.save();
  }

  async find(id: string): Promise<Order> { 
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"]
    });

    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      ))
    )
  }

  async findAll(): Promise<Order[]> { 
    const orderModels = await OrderModel.findAll({
      include: ["items"]
    });

    return orderModels.map(orderModel => 
      new Order(
        orderModel.id,
        orderModel.customerId,
        orderModel.items.map(item => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        ))
      )
    )
  }
}