import Product from '../entities/product';
import RepositoryInterface from './respository.interface';

export default interface ProductRepositoryInterface 
  extends RepositoryInterface<Product> {}