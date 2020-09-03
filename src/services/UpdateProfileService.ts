import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  address: string;
  number: string;
  district: string;
  city: string;
  phone: string;
  old_password?: string;
  password?: string;
}

class UpdateProfileService {
  public async execute({
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
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdateEmail = await usersRepository.findOne({
      where: { name },
    });

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;
    user.address = address;
    user.number = number;
    user.district = district;
    user.city = city;
    user.phone = phone;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (password === old_password) {
        throw new AppError('Old password must not be the same as new password');
      }

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
