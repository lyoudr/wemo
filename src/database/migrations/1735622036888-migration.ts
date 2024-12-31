import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735622036888 implements MigrationInterface {
    name = 'Migration1735622036888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."scooter_status_enum" AS ENUM('AVAILABLE', 'RENTED')`);
        await queryRunner.query(`ALTER TABLE "scooter" ADD "status" "public"."scooter_status_enum" NOT NULL DEFAULT 'AVAILABLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scooter" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."scooter_status_enum"`);
    }

}
