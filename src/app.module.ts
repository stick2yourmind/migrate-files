import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { Provider } from './provider/entities/provider.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'local',
      database: 'staging',
      entities: [Provider, User],
      synchronize: false,
    }),
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
