import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns';
import { classToClass } from 'class-transformer';

//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateOrdersDeliveryService from '../services/CreateOrdersDeliveryService';
import FindOrdersDeliveryService from '../services/FindOrdersDeliveryService';
import CanceledOrderService from '../services/CanceledOrderService';
import UpdateOrderAcceptedService from '../services/UpdateOrderAcceptedService';

const orderRouter = Router();

//orderRouter.use(ensureAuthenticated);

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

orderRouter.put('/', async (request, response) => {
  const user_id = request.user.id;
  const { order_id, order_accepted } = request.body;

  const updateOrderAccepted = new UpdateOrderAcceptedService();

  const orderAccepted = await updateOrderAccepted.execute({
    user_id,
    order_id,
    order_accepted,
  });

  return response.json(orderAccepted);
});

orderRouter.patch('/', async (request, response) => {
  const user_id = request.user.id;
  const { order_id, canceled } = request.body;

  const canceledOrderService = new CanceledOrderService();

  const canceledOrder = await canceledOrderService.execute({
    user_id,
    order_id,
    canceled,
  });

  return response.json(canceledOrder);
});

export default orderRouter;
