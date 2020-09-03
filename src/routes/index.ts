import { Router } from 'express';

import userRouter from './users.routes';
import sessionRouter from './sessions.routes';
import profileRouter from './profile.routes';
import productsRouter from './products.routes';

import orderRouter from './order.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);

routes.use('/orders_delivery', orderRouter);

export default routes;
