import { MigrationInterface, QueryRunner } from "typeorm";

export class Progress1748023745400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO progress_session ("userId")
            SELECT id FROM "user";
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
