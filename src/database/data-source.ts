
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { createDatabaseConfig } from './database.config';

// Load environment variables for migrations
config({ path: '.env' });

const configService = new ConfigService();

// Use the utility function with specific paths for development
export const dataSourceOptions = createDatabaseConfig(configService, {
  entitiesPath: 'dist/**/*.entity.{ts,js}',
  migrationsPath: 'dist/database/migrations/*.{ts,js}',
});

export default new DataSource(dataSourceOptions);
