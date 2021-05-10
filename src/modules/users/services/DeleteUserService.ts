import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  userLoggedId: string;
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userLoggedId, id }: IRequest): Promise<void> {
    const userAdmin = await this.usersRepository.findById(userLoggedId);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root') {
      throw new AppError('Operation is not allowed', 401);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
