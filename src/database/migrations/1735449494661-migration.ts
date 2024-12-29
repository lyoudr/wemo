import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735449494661 implements MigrationInterface {
    name = 'Migration1735449494661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scooter" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, CONSTRAINT "PK_d34b48695ebd552222c6e8ec675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rent" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "userId" integer, "scooterId" integer, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_49296d11229074f058b7274ae2e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_9f27603c221180fd09baadd83e8" FOREIGN KEY ("scooterId") REFERENCES "scooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_9f27603c221180fd09baadd83e8"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_49296d11229074f058b7274ae2e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rent"`);
        await queryRunner.query(`DROP TABLE "scooter"`);
    }

}
