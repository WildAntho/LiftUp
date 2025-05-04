import { MigrationInterface, QueryRunner } from "typeorm";

export class Unaccent1746380130311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);
    await queryRunner.query(`
      UPDATE "exercice_model"
      SET "image" = regexp_replace("image", '\\.png$', '.webp')
      WHERE "image" LIKE '%.png'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS unaccent`);
    await queryRunner.query(`
      UPDATE "exercice_model"
      SET "image" = regexp_replace("image", '\\.webp$', '.png')
      WHERE "image" LIKE '%.webp'
    `);
  }
}
