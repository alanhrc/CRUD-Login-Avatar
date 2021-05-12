import Type from '@modules/types/infra/typeorm/entities/Type';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListTypesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Type[]> {
    const userAdmin = await this.usersRepository.findById(user_id);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
      throw new AppError('Operation is not allowed', 401);
    }

    const types = await this.typeRepository.index();

    return types;
  }
}

export default ListTypesService;
