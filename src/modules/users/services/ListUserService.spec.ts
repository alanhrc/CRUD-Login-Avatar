import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUserService from '@modules/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUserService = new ListUserService(fakeUsersRepository);
  });

  it('should not be able to list all users with not root or admin user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    await expect(
      listUserService.execute({
        userLoggedId: userAdmin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list all users without admin user', async () => {
    await expect(
      listUserService.execute({
        userLoggedId: 'inexistentUser',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all users', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const users = await listUserService.execute({
      userLoggedId: user.id,
    });

    expect(users).toEqual([user, user2]);
  });
});
