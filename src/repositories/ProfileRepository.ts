import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class ProductsRepository extends Repository<User> {}

export default ProductsRepository;
