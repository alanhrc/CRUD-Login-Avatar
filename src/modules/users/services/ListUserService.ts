import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  userLoggedId: string;
}
@injectable()
class ListProductService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userLoggedId }: IRequest): Promise<User[]> {
    const userAdmin = await this.usersRepository.findById(userLoggedId);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
      throw new AppError('Operation is not allowed', 401);
    }

    const users = await this.usersRepository.index();

    return users;
  }
}

export default ListProductService;
