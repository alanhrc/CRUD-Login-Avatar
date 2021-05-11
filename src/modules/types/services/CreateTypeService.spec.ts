import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import CreateTypeService from '@modules/types/services/CreateTypeService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTypeRepository: FakeTypeRepository;
let createTypeService: CreateTypeService;

describe('CreateType', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTypeRepository = new FakeTypeRepository();

    createTypeService = new CreateTypeService(
      fakeUsersRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to create a new type', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const newType = await createTypeService.execute({
      user_id: userAdmin.id,
      type: 'root',
      description: 'Admin master application',
    });

    expect(newType).toHaveProperty('id');
  });

  it('should not be able to create a new existent type', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await createTypeService.execute({
      user_id: userAdmin.id,
      type: 'root',
      description: 'Admin master application',
    });

    await expect(
      createTypeService.execute({
        user_id: userAdmin.id,
        type: 'root',
        description: 'Admin master application',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new type with not User Admin', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    await expect(
      createTypeService.execute({
        user_id: userAdmin.id,
        type: 'root',
        description: 'Admin master application',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new type without user', async () => {
    await expect(
      createTypeService.execute({
        user_id: 'inexistentUser',
        type: 'root',
        description: 'Admin master application',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
