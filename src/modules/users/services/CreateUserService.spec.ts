import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should not be able to create a new user with inexistent user admin', async () => {
    await expect(
      createUser.execute({
        userLoggedId: 'inexistentId',
        name: 'Alan Henrique',
        email: 'alan@alan.com',
        password: '123123',
        type: 'root',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with not root or admin user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    await expect(
      createUser.execute({
        userLoggedId: userAdmin.id,
        name: 'Alan Henrique',
        email: 'alan@alan.com',
        password: '123123',
        type: 'root',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const user = await createUser.execute({
      userLoggedId: userAdmin.id,
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await expect(
      createUser.execute({
        userLoggedId: userAdmin.id,
        name: 'Alan Henrique',
        email: userAdmin.email,
        password: '123123',
        type: 'global',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
