import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns';
import { classToClass } from 'class-transformer';

//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateOrdersDeliveryService from '../services/CreateOrdersDeliveryService';
import FindOrdersDeliveryService from '../services/FindOrdersDeliveryService';
import Order from '../models/Order';

const orderRouter = Router();

orderRouter.get('/find_orders/:date_order', async (request, response) => {
  const { date_order } = request.params;

  const date = parseISO(date_order);

  const findOrdersDelivery = new FindOrdersDeliveryService();

  const orders = await findOrdersDelivery.execute({ date });

  return response.json(classToClass(orders));
});

orderRouter.post('/', async (request, response) => {
  const { user_id, products } = request.body;

  const newDate = new Date();

  const dateFormatted = startOfDay(newDate);

  const createOrdersDelivery = new CreateOrdersDeliveryService();

  const ordersDelivery = await createOrdersDelivery.execute({
    user_id,
    products,
    order_status: 'Pedido em analise',
    send: 'Retirada no estabelecimento',
    date: dateFormatted,
  });

  return response.json(classToClass(ordersDelivery));
});

export default orderRouter;
