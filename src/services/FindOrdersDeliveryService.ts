import { getRepository } from 'typeorm';

import Order from '../models/Order';

interface IRequest {
  date: Date;
}

class FindOrdersDeliveryService {
  public async execute({ date }: IRequest): Promise<Order[]> {
    const ordersRepository = getRepository(Order);

    const findOrders = ordersRepository.find({
      where: { date, canceled: false },
      relations: ['order_deliverys', 'user'],
    });

    return findOrders;
  }
}

export default FindOrdersDeliveryService;
