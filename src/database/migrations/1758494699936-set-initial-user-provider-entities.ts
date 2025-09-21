import { MigrationInterface, QueryRunner } from "typeorm";

export class SetInitialUserProviderEntities1758494699936 implements MigrationInterface {
    name = 'SetInitialUserProviderEntities1758494699936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content_module" character varying NOT NULL, "auth_module" character varying NOT NULL, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider_id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_5e3a2b86fd9a9c22c266ae04731" UNIQUE ("provider_id"), CONSTRAINT "REL_5e3a2b86fd9a9c22c266ae0473" UNIQUE ("provider_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5e3a2b86fd9a9c22c266ae04731" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5e3a2b86fd9a9c22c266ae04731"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "provider"`);
    }

}
