import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    address,
    number,
    district,
    city,
    phone,
    password,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    address,
    number,
    district,
    city,
    phone,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
