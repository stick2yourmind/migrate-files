import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    // ...existing code...
    return 'This action adds a new provider';
  }

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
      .innerJoin('provider.users', 'user')
      .where('user.name IN (:...userNames)', { userNames })
      .distinct(true)
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
