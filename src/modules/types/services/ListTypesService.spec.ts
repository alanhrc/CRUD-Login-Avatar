import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import ListTypesService from '@modules/types/services/ListTypesService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTypeRepository: FakeTypeRepository;
let listTypesService: ListTypesService;

describe('ListTypes', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTypeRepository = new FakeTypeRepository();

    listTypesService = new ListTypesService(
      fakeUsersRepository,
      fakeTypeRepository,
    );
  });

  it('should not be able to list all types with inexistent user', async () => {
    await expect(
      listTypesService.execute({
        user_id: 'inexistent-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to list all types with not admin or root user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    await expect(
      listTypesService.execute({
        user_id: userAdmin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list all types with admin user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const type = await fakeTypeRepository.create({
      type: 'root',
      description: 'admin master application',
    });

    const types = await listTypesService.execute({
      user_id: userAdmin.id,
    });

    expect(types).toEqual([type]);
  });
});
