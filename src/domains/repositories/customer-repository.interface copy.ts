
import Customer from '../entities/customer';
import RepositoryInterface from './respository.interface';

export default interface CustomerRepositoryInterface 
  extends RepositoryInterface<Customer> {}