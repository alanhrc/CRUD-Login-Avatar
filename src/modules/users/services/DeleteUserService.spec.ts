import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageAvatar = new FakeStorageAvatar();

    deleteUserService = new DeleteUserService(
      fakeUsersRepository,
      fakeStorageAvatar,
    );
  });

  it('should be able to delete a user', async () => {
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
      type: 'global',
      status: 'active',
    });

    await expect(
      deleteUserService.execute({
        userLoggedId: userAdmin.id,
        id: user.id,
      }),
    ).resolves;
  });

  it('should not be able to delete a inexistent user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await expect(
      deleteUserService.execute({
        userLoggedId: userAdmin.id,
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a avatar user if exists', async () => {
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

    user.avatar = 'avatar.img';

    await expect(
      deleteUserService.execute({
        userLoggedId: userAdmin.id,
        id: user.id,
      }),
    ).resolves;
  });
});
