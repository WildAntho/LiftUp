import { MigrationInterface, QueryRunner } from "typeorm";

export class NewExercices1747001245563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "exercice_model" ("title", "serie", "rep", "image", "primaryMuscleId", "secondaryMuscleId")
            VALUES 
              ('Rowing barre', 1, 1, '/file-barbellrowing.webp', '1', '3'),
              ('Tirage horizontal poulie basse', 1, 1, '/file-rowingcable.webp', '1', '3'),
              ('Curl marteau altères', 1, 1, '/file-dumbellhammercurl.webp', '3', NULL),
              ('Curl incliné altères', 1, 1, '/file-inclinedumbellcurl.webp', '3', NULL);
              `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
