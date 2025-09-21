import { Provider } from 'src/provider/entities/provider.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Provider, (provider) => provider.user)
  @JoinColumn()
  provider: Provider;
}
