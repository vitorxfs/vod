import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLecturesTable1776283810158 implements MigrationInterface {
    name = 'CreateLecturesTable1776283810158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lectures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseId" uuid NOT NULL, "position" bigint NOT NULL, "title" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "courseIdId" uuid NOT NULL, CONSTRAINT "PK_0fbf04287eb4e401af19caf7677" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lectures" ADD CONSTRAINT "FK_45b2fb5921a6183945b5b08186d" FOREIGN KEY ("courseIdId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lectures" DROP CONSTRAINT "FK_45b2fb5921a6183945b5b08186d"`);
        await queryRunner.query(`DROP TABLE "lectures"`);
    }

}
