import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  userLoggedId?: string;
  name: string;
  email: string;
  password: string;
  type: string;
  status: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userLoggedId,
    name,
    email,
    password,
    type,
    status,
  }: IRequest): Promise<User> {
    if (userLoggedId) {
      const userAdmin = await this.usersRepository.findById(userLoggedId);

      if (!userAdmin) {
        throw new AppError('Operation is not allowed', 401);
      }

      if (userAdmin.type !== 'root' && userAdmin.type !== 'admin') {
        throw new AppError('Operation is not allowed', 401);
      }
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
      status,
    });

    return user;
  }
}

export default CreateUserService;
