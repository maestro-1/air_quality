import { MigrationInterface, QueryRunner } from "typeorm";

export class addDateColumn1660127634793 implements MigrationInterface {
    name = 'addDateColumn1660127634793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pollution" DROP COLUMN "ts"`);
        await queryRunner.query(`ALTER TABLE "pollution" ADD "recordedPollutionTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pollution" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pollution" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "location" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "location" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "pollution" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "pollution" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "pollution" DROP COLUMN "recordedPollutionTime"`);
        await queryRunner.query(`ALTER TABLE "pollution" ADD "ts" character varying NOT NULL`);
    }

}
