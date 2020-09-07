import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Order from '../models/Order';
import User from '../models/User';

interface IRequest {
  user_id: string;
  order_id: string;
  canceled: boolean;
}

class CanceledOrderService {
  public async execute({
    user_id,
    order_id,
    canceled,
  }: IRequest): Promise<Order> {
    const orderRepository = getRepository(Order);
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new AppError('User not found.');
    }

    const findOrder = await orderRepository.findOne({
      where: { id: order_id },
    });

    if (!findOrder) {
      throw new AppError('Order not found.');
    }

    findOrder.canceled = canceled;

    await orderRepository.save(findOrder);

    return findOrder;
  }
}

export default CanceledOrderService;
