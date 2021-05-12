import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import Type from '@modules/types/infra/typeorm/entities/Type';
import ITypeRepository from '@modules/types/repositories/ITypeRepository';
import { uuid } from 'uuidv4';

class FakeTypeRepository implements ITypeRepository {
  private types: Type[] = [];

  public async create(data: ICreateTypeDTO): Promise<Type> {
    const newType = new Type();

    Object.assign(newType, { id: uuid() }, data);

    this.types.push(newType);

    return newType;
  }

  public async index(): Promise<Type[]> {
    return this.types;
  }

  public async findById(typeId: string): Promise<Type | undefined> {
    const typeFound = this.types.find(typeF => typeF.id === typeId);

    return typeFound;
  }

  public async findByType(type: string): Promise<Type | undefined> {
    const typeFound = this.types.find(typeF => typeF.type === type);

    return typeFound;
  }

  public async save(data: ICreateTypeDTO): Promise<Type> {
    const findIndex = this.types.findIndex(
      findType => findType.type === data.type,
    );

    const newType = new Type();

    Object.assign(newType, { id: uuid() }, data);

    this.types[findIndex] = newType;

    return newType;
  }

  public async destroy(typeId: string): Promise<void> {
    const findIndex = this.types.findIndex(
      typeFound => typeFound.id === typeId,
    );

    this.types.splice(findIndex, 1);
  }
}

export default FakeTypeRepository;
