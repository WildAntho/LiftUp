import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExercices1746316968339 implements MigrationInterface {
  name = "AddExercices1746316968339";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` INSERT INTO "exercice" ("title", "serie", "rep", "image")
      VALUES 
        ('Développé incliné barre', 1, 1, '/file-inclinebench.png'),
        ('Squat', 1, 1, '/file-squat.png')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
