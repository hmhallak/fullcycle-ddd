import Order from '../entities/order';

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0)
  }
}