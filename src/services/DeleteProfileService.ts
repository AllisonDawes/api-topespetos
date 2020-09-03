import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface IRequest {
  user_id: string;
}

class DeleteProfileService {
  public async execute({ user_id }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.id !== user_id) {
      throw new AppError('User not allowed');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteProfileService;
