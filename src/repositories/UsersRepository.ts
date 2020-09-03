import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

interface IUserDTO {
  email: string;
}

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: IUserDTO): Promise<User | null> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser || null;
  }
}

export default UserRepository;
