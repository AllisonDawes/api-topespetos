import { Router } from 'express';
//import { startOfDay, parseISO } from 'date-fns';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import OrdersDeliveryService from '../services/OrdersDeliveryService';

const orderRouter = Router();

orderRouter.post('/', async (request, response) => {
  const { user_id, products } = request.body;

  //const dateFormatted = startOfDay(new Date());

  const createOrdersDelivery = new OrdersDeliveryService();

  const ordersDelivery = await createOrdersDelivery.execute({
    user_id,
    products,
    order_status: 'Pedido em analise',
    send: 'Retirada no estabelecimento',
    date: new Date(),
  });

  return response.json(ordersDelivery);
});

export default orderRouter;
