import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import Type from '@modules/types/infra/typeorm/entities/Type';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import { getRepository, Repository } from 'typeorm';

class TypeRepository implements ITypeRepository {
  private ormRepository: Repository<Type>;

  constructor() {
    this.ormRepository = getRepository(Type);
  }

  public async create(data: ICreateTypeDTO): Promise<Type> {
    const newType = this.ormRepository.create(data);

    await this.ormRepository.save(newType);

    return newType;
  }

  public async save(data: ICreateTypeDTO): Promise<Type> {
    const newType = await this.ormRepository.save(data);

    return newType;
  }

  public async index(): Promise<Type[]> {
    const types = await this.ormRepository.find({
      order: { type: 'ASC' },
    });

    return types;
  }

  public async findById(typeId: string): Promise<Type | undefined> {
    const favoriteCharacter = await this.ormRepository.findOne({
      where: { id: typeId },
    });

    return favoriteCharacter;
  }

  public async findByType(type: string): Promise<Type | undefined> {
    const favoriteCharacter = await this.ormRepository.findOne({
      where: { type },
    });

    return favoriteCharacter;
  }

  public async destroy(typeId: string): Promise<void> {
    const typeFound = await this.ormRepository.findOne({
      where: { id: typeId },
    });

    if (typeFound) {
      await this.ormRepository.delete(typeFound.id);
    }
  }
}

export default TypeRepository;
