import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserService from '@modules/users/services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to update an user with not root or admin user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique 2',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    await expect(
      updateUserService.execute({
        userLoggedId: userAdmin.id,
        user_id: user.id,
        name: 'Alan Henrique',
        email: 'alan3@alan.com',
        type: 'global',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user without admin user', async () => {
    await expect(
      updateUserService.execute({
        userLoggedId: 'inexistentUser',
        user_id: 'someoneUser',
        name: 'Alan Henrique',
        email: 'alan3@alan.com',
        type: 'global',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const updatedUser = await updateUserService.execute({
      userLoggedId: user.id,
      user_id: user.id,
      name: 'Alan Henrique2',
      email: 'alan2@alan.com',
      type: 'root',
      status: 'active',
    });

    expect(updatedUser.name).toBe('Alan Henrique2');
    expect(updatedUser.email).toBe('alan2@alan.com');
  });

  it('should be able to update the profile with no existing user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await expect(
      updateUserService.execute({
        userLoggedId: userAdmin.id,
        user_id: 'non-existing-user',
        name: 'Alan Henrique2',
        email: 'alan2@alan.com',
        type: 'root',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await expect(
      updateUserService.execute({
        userLoggedId: userAdmin.id,
        user_id: user.id,
        name: 'Alan Henrique3',
        email: 'alan@alan.com',
        type: 'root',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
      type: 'root',
      status: 'active',
    });

    const updatedUser = await updateUserService.execute({
      userLoggedId: userAdmin.id,
      user_id: userAdmin.id,
      name: 'Alan Henrique2',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    expect(updatedUser.password).toBe('123123');
  });
});
