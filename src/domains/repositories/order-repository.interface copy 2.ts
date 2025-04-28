
import Order from '../entities/order';
import RepositoryInterface from './respository.interface';

export default interface OrderRepositoryInterface 
  extends RepositoryInterface<Order> {}