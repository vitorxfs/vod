import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProgressTable1776291768841 implements MigrationInterface {
    name = 'CreateProgressTable1776291768841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecture_progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lectureId" uuid NOT NULL, "userId" uuid NOT NULL, "completed" boolean NOT NULL DEFAULT false, "elapsedTime" bigint NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lectureIdId" uuid NOT NULL, "userIdId" uuid NOT NULL, CONSTRAINT "PK_95a6266aedf0fb6ea54f2c0400a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lecture_progress" ADD CONSTRAINT "FK_e12fd9c58ac78a6d4b1dee5a39e" FOREIGN KEY ("lectureIdId") REFERENCES "lectures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture_progress" ADD CONSTRAINT "FK_ed84ae39c51a7e5df56420a690e" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture_progress" DROP CONSTRAINT "FK_ed84ae39c51a7e5df56420a690e"`);
        await queryRunner.query(`ALTER TABLE "lecture_progress" DROP CONSTRAINT "FK_e12fd9c58ac78a6d4b1dee5a39e"`);
        await queryRunner.query(`DROP TABLE "lecture_progress"`);
    }

}
