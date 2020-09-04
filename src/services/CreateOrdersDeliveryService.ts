import { getRepository } from 'typeorm';

import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';

import AppError from '../errors/AppError';

interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
  order_status: string;
  send: string;
  date: Date;
}

class RequestDeliveryService {
  public async execute({
    user_id,
    order_status,
    send,
    date,
    products,
  }: IRequest): Promise<Order> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);
    const ordersRepository = getRepository(Order);

    const userExists = await userRepository.findOne(user_id);

    if (!userExists) {
      throw new AppError('User not found.');
    }

    const productExists = await productRepository.findByIds(products);

    if (!productExists.length) {
      throw new Error('Products not found');
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    }));

    const order = ordersRepository.create({
      user: userExists,
      order_deliverys: serializedProducts,
      order_status,
      send,
      date,
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default RequestDeliveryService;
