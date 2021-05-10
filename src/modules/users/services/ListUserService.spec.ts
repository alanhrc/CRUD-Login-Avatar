import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUserService from '@modules/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUserService = new ListUserService(fakeUsersRepository);
  });

  it('should be able to list a product with filter', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
    });

    const users = await listUserService.execute();

    expect(users).toEqual([user, user2]);
  });
});
