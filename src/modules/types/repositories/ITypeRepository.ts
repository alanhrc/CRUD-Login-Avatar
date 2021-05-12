import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import Type from '@modules/types/infra/typeorm/entities/Type';

export default interface ITypeRepository {
  findById(typeId: string): Promise<Type | undefined>;
  findByType(type: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  index(): Promise<Type[]>;
  save(data: ICreateTypeDTO): Promise<Type>;
  destroy(typeId: string): Promise<void>;
}
