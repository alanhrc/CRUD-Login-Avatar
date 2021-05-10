import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  // eslint-disable-next-line prettier/prettier
  UpdateDateColumn
} from 'typeorm';

@Entity('favorite_characters')
class FavoriteCharacter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column('integer')
  code: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail_path: string;

  @Column()
  thumbnail_extension: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FavoriteCharacter;
