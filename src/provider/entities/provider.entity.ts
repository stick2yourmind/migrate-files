import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contentModule: string;

  @Column()
  authModule: string;

  @OneToOne(() => User, (user) => user.provider)
  user: User;
}
