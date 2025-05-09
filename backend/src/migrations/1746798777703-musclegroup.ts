import { MigrationInterface, QueryRunner } from "typeorm";

export class Musclegroup1746798777703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "muscle_group" ("key", "label")
      VALUES 
        ('back', 'Dos'),
        ('pecs', 'Pectoraux'),
        ('biceps', 'Biceps'),
        ('triceps', 'Triceps'),
        ('shoulders', 'Epaules'),
        ('forearm', 'Avant-bras'),
        ('traps', 'Trapèzes'),
        ('abs', 'Abdominaux'),
        ('oblics', 'Obliques'),
        ('hamstring', 'Ischio-jambiers'),
        ('quads', 'Quadriceps'),
        ('adds', 'Adducteurs'),
        ('abds', 'Abducteurs'),
        ('calves', 'Mollets'),
        ('glutes', 'Fessiers');
        `);

    await queryRunner.query(`
        UPDATE "exercice_model" SET "primaryMuscleId" = 10, "secondaryMuscleId" = 15 WHERE id = 16;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 17;
        UPDATE "exercice_model" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 3 WHERE id = 1;
        UPDATE "exercice_model" SET "primaryMuscleId" = 11 WHERE id = 19;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 20;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 21;
        UPDATE "exercice_model" SET "primaryMuscleId" = 4 WHERE id = 13;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 22;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 18;
        UPDATE "exercice_model" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 3 WHERE id = 4;
        UPDATE "exercice_model" SET "primaryMuscleId" = 5, "secondaryMuscleId" = 4 WHERE id = 11;
        UPDATE "exercice_model" SET "primaryMuscleId" = 4, "secondaryMuscleId" = 2 WHERE id = 2;
        UPDATE "exercice_model" SET "primaryMuscleId" = 11, "secondaryMuscleId" = 15 WHERE id = 3;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 10;
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE id = 12;
        UPDATE "exercice_model" SET "primaryMuscleId" = 3, "secondaryMuscleId" = 6 WHERE id = 14;
        UPDATE "exercice_model" SET "primaryMuscleId" = 5 WHERE id = 15;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
