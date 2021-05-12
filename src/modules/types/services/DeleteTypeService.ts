import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  typeId: string;
}

@injectable()
class DeleteFavoriteCharacterService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,
  ) {}

  public async execute({ user_id, typeId }: IRequest): Promise<void> {
    const userAdmin = await this.usersRepository.findById(user_id);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
      throw new AppError('Operation is not allowed', 401);
    }

    const typeFound = await this.typeRepository.findById(typeId);

    if (!typeFound) {
      throw new AppError('Type found', 404);
    }

    await this.typeRepository.destroy(typeId);
  }
}

export default DeleteFavoriteCharacterService;
