import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import DeleteTypeService from '@modules/types/services/DeleteTypeService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeTypeRepository: FakeTypeRepository;
let deleteTypeService: DeleteTypeService;

describe('DeleteType', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTypeRepository = new FakeTypeRepository();

    deleteTypeService = new DeleteTypeService(
      fakeUsersRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to delete a type with admin or root user', async () => {
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

    await expect(
      deleteTypeService.execute({
        user_id: userAdmin.id,
        typeId: type.id,
      }),
    ).resolves;
  });

  it('should not be able to delete a type without user', async () => {
    await expect(
      deleteTypeService.execute({
        user_id: 'inexistent-user',
        typeId: 'inexistent-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a type with not admin or root user', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'global',
      status: 'active',
    });

    const type = await fakeTypeRepository.create({
      type: 'root',
      description: 'admin master application',
    });

    await expect(
      deleteTypeService.execute({
        user_id: userAdmin.id,
        typeId: type.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a inexistent type', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    await expect(
      deleteTypeService.execute({
        user_id: userAdmin.id,
        typeId: 'inexistent-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
