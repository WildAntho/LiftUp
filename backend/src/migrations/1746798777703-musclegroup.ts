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
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 10, "secondaryMuscleId" = 15 WHERE title = 'Soulevé de terre jambes tendues';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé couché barre';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 3 WHERE title = 'Tractions pronation';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 11 WHERE title = 'Extensions quadriceps';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes inclinées';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 4 WHERE title = 'Extensions triceps corde';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes déclinées';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé couché altères';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 3 WHERE title = 'Muscle up';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 5, "secondaryMuscleId" = 4 WHERE title = 'Développé militaire altères';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 4, "secondaryMuscleId" = 2 WHERE title = 'Dips';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 11, "secondaryMuscleId" = 15 WHERE title = 'Squat';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé incliné barre';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé incliné altères';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 3, "secondaryMuscleId" = 6 WHERE title = 'Curl poulie barre';
        UPDATE "ExerciceModel" SET "primaryMuscleId" = 5 WHERE title = 'Elévations latérales altères';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
