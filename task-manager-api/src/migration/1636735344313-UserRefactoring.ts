import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1636735344313 implements MigrationInterface {
    name = 'UserRefactoring1636735344313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "firstName" character varying NOT NULL`);
    }

}
