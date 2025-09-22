import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

import { Query } from '@nestjs/common';
import { ProvidersResponseDto } from './dto/response/providers.response.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
    async find(@Query('userNames') userNames: string[] | string) {
      let names: string[] = [];
      if (Array.isArray(userNames)) {
        names = userNames;
      } else if (typeof userNames === 'string' && userNames.length > 0) {
        names = userNames.split(',');
      }
      const providers = await this.providerService.find(names);
      return new ProvidersResponseDto(providers);
  }
}
