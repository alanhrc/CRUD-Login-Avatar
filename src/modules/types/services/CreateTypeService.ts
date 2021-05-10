import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Type from '@modules/types/infra/typeorm/entities/Type';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';

interface IRequest {
  user_id: string;
  type: string;
  description: string;
}

@injectable()
class CreateTypeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({
    user_id,
    type,
    description,
  }: IRequest): Promise<Type> {
    const userAdmin = await this.usersRepository.findById(user_id);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
      throw new AppError('Operation is not allowed', 401);
    }

    const existentType = await this.typeRepository.findByType(type);

    if (existentType) {
      throw new AppError('Type already exists.', 409);
    }

    const newType = await this.typeRepository.create({
      type,
      description,
    });

    return newType;
  }
}

export default CreateTypeService;
