import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async find(userNames?: string[]) {
    if (!userNames || userNames.length === 0) {
      return await this.findAll();
    }

    return await this.findByUserNames(userNames);
  }

  async findAll() {
    return await this.providerRepository.find({ relations: ['users'] });
  }

  async findByUserNames(userNames: string[]) {
    return this.providerRepository
      .createQueryBuilder('provider')
      .innerJoinAndSelect('provider.users', 'user')
      .where('user.name IN (:...userNames)', { userNames })
      .distinct(true)
      .getMany();
  }
}
