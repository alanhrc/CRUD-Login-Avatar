import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  userLoggedId: string;
  user_id: string;
  name: string;
  email: string;
  type: string;
  status: string;
  password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userLoggedId,
    user_id,
    name,
    email,
    type,
    status,
    password,
  }: IRequest): Promise<User> {
    const userAdmin = await this.usersRepository.findById(userLoggedId);

    if (!userAdmin) {
      throw new AppError('Operation is not allowed', 401);
    }

    if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
      throw new AppError('Operation is not allowed', 401);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.', 409);
    }

    user.name = String(name).trim();
    user.email = String(email).toLowerCase().trim();
    user.type = String(type).toLowerCase().trim();
    user.status = String(status).toLowerCase().trim();

    if (password) {
      user.password = await this.hashProvider.generateHash(
        String(password).trim(),
      );
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
