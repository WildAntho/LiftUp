import { MigrationInterface, QueryRunner } from "typeorm";

export class Createnotificationpreference1747144104572
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO notification_preference ("userId", "disabledTypes", "createdAt")
            SELECT id, '[]', NOW()
            FROM "user"
            WHERE id NOT IN (SELECT "userId" FROM notification_preference);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
