import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  email: string;
  address: string;
  number: string;
  district: string;
  city: string;
  phone: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    address,
    number,
    district,
    city,
    phone,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const checkExists = await usersRepository.findByEmail({ email });

    console.log(checkExists);

    if (checkExists) {
      throw new AppError('E-mail address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      address,
      number,
      district,
      city,
      phone,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
