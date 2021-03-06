import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.', 409);
    }

    user.name = String(name).trim();
    user.email = String(email).toLowerCase().trim();

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
        401,
      );
    }

    if (password && old_password) {
      const checkUserOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkUserOldPassword) {
        throw new AppError(
          'You need to inform the old password correct to set a new password.',
          401,
        );
      }

      user.password = await this.hashProvider.generateHash(
        String(password).trim(),
      );
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
