import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class InitialSeed1758499240469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('InitialSeed1758499240469 migration initialized');
    const seedPath = path.join(process.cwd(), 'src', 'database', 'seed');
    
    if (!fs.existsSync(seedPath)) {
      console.log(`Seed directory not found: ${seedPath}`);
      return;
    }

    const jsonFiles = fs.readdirSync(seedPath)
      .filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('No JSON files found in seed directory');
      return;
    }

    console.log(`Processing ${jsonFiles.length} JSON files...`);

    // Cache for already created providers
    const providerCache = new Map<string, number>();

    for (const file of jsonFiles) {
      const filePath = path.join(seedPath, file);
      console.log(`Processing ${file}...`);
      
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const items = Array.isArray(jsonData) ? jsonData : [jsonData];
      
      console.log(`Items details: ${JSON.stringify(items, null, 2)}`);
      for (const item of items) {
        console.log(`Inserting item: ${JSON.stringify(item)}`);
        if (!item.name || !item.provider) {
          console.warn(`Skipping invalid item: ${JSON.stringify(item)}`);
          continue;
        }

        const { content_module, auth_module } = item.provider;
        const providerKey = `${content_module}|${auth_module}`;
        
        let providerId = providerCache.get(providerKey);

        // Caching provider IDs to minimize DB queries
        if (!providerId) {
          // Check if it already exists in the DB
          const existingProvider = await queryRunner.query(
            `SELECT id FROM providers WHERE content_module = $1 AND auth_module = $2`,
            [Number(content_module.at(-1)), Number(auth_module.at(-1))]
          );

          if (existingProvider.length > 0) {
            providerId = existingProvider[0].id;
          } else {
            // Insert new provider
            const result = await queryRunner.query(
              `INSERT INTO providers (content_module, auth_module, created_at, updated_at) 
               VALUES ($1, $2, NOW(), NOW()) RETURNING id`,
              [Number(content_module.at(-1)), Number(auth_module.at(-1))]
            );
            providerId = result[0].id;
          }

          providerCache.set(providerKey, providerId!);
        }

        // Check if the user already exists
        const existingUser = await queryRunner.query(
          `SELECT * FROM users WHERE name = $1 AND provider_id = $2`,
          [item.name, providerId]
        );

        if (existingUser.length === 0) {
          // Insert user
          await queryRunner.query(
            `INSERT INTO users (name, provider_id, file, created_at, updated_at) 
             VALUES ($1, $2, $3, NOW(), NOW())`,
            [item.name, providerId, file]
          );
        }
      }
    }

    console.log('JSON seed migration completed successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar todos los datos insertados por la migración
    console.log('Reverting JSON seed migration...');
    
    // Eliminar usuarios primero (por foreign key constraint)
    await queryRunner.query(`DELETE FROM users`);
    
    // Luego eliminar providers
    await queryRunner.query(`DELETE FROM providers`);
    
    console.log('JSON seed migration reverted successfully');
  }

}
