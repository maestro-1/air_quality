import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1660043221979 implements MigrationInterface {
    name = 'initialMigration1660043221979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pollution" ("id" SERIAL NOT NULL, "aqius" integer NOT NULL, "aqicn" integer NOT NULL, "mainus" character varying NOT NULL, "maincn" character varying NOT NULL, "ts" character varying NOT NULL, "locationId" integer, CONSTRAINT "PK_819e8f6e6d3ff983d249a45289f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "countryId" integer, CONSTRAINT "UQ_ae9cc28fa716b66a5288c86a941" UNIQUE ("city"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pollution" ADD CONSTRAINT "FK_0c8509bf32edd1c67dff81fc2c3" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_ae647b71c989dba1b15f7c2558d" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_ae647b71c989dba1b15f7c2558d"`);
        await queryRunner.query(`ALTER TABLE "pollution" DROP CONSTRAINT "FK_0c8509bf32edd1c67dff81fc2c3"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "pollution"`);
    }

}
