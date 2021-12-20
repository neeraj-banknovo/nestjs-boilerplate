import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1639995665602 implements MigrationInterface {
    name = 'createTables1639995665602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."document_upload_status_enum" AS ENUM('PENDING', 'UPLOADED', 'EXPIRED', 'UNLINKED')`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying(255), "file_type" character varying(10), "pre_signed_get_url" text NOT NULL, "pre_signed_put_url" text NOT NULL, "key" text NOT NULL, "upload_status" "public"."document_upload_status_enum" NOT NULL DEFAULT 'PENDING', "is_deleted" boolean NOT NULL DEFAULT false, "is_parsed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "division_code" character varying(255), "division_name" character varying(255), "quantity" integer, "amount" numeric(20,6), "document_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f3c398bfb3fc1c16b9348fa00b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client_data" ADD CONSTRAINT "FK_a2390be9a546c5212f41db9c113" FOREIGN KEY ("document_id") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_data" DROP CONSTRAINT "FK_a2390be9a546c5212f41db9c113"`);
        await queryRunner.query(`DROP TABLE "client_data"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TYPE "public"."document_upload_status_enum"`);
    }

}
