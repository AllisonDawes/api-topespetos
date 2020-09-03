import { Router } from 'express';

import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import DeleteProfileService from '../services/DeleteProfileService';

import ensureAutheticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensureAutheticated);

profileRouter.get('/', async (request, response) => {
  const user_id = request.user.id;

  const showProfile = new ShowProfileService();

  const profile = await showProfile.execute({ user_id });

  delete profile.password;

  return response.json(profile);
});

profileRouter.put('/', async (request, response) => {
  const user_id = request.user.id;

  const {
    name,
    email,
    address,
    number,
    district,
    city,
    phone,
    old_password,
    password,
  } = request.body;

  const updateProfile = new UpdateProfileService();

  const user = await updateProfile.execute({
    user_id,
    name,
    email,
    address,
    number,
    district,
    city,
    phone,
    old_password,
    password,
  });

  delete user.password;

  return response.json(user);
});

profileRouter.delete('/', async (request, response) => {
  const user_id = request.user.id;

  const deleteProfile = new DeleteProfileService();

  await deleteProfile.execute({ user_id });

  return response.status(200).json();
});

export default profileRouter;
