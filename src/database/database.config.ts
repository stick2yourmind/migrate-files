// database/database.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// Utility function to create the base database configuration
export function createDatabaseConfig(
  configService: ConfigService,
  options: { entitiesPath?: string; migrationsPath?: string } = {}
): DataSourceOptions {
  const {
    entitiesPath = 'dist/**/*.entity.{ts,js}',
    migrationsPath = 'dist/database/migrations/*.{ts,js}',
  } = options;

  const environment = configService.getOrThrow<string>('ENVIRONMENT');

  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    username: configService.getOrThrow<string>('DATABASE_USER'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    database: configService.getOrThrow<string>('DATABASE_NAME'),
    entities: [entitiesPath],
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [migrationsPath],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false,
    ssl: environment === 'local' 
      ? false 
      : { rejectUnauthorized: false },
  };
}

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return createDatabaseConfig(this.configService);
  }

  // Method to get DataSourceOptions (useful for migrations)
  getDataSourceOptions(): DataSourceOptions {
    return createDatabaseConfig(this.configService);
  }
}
