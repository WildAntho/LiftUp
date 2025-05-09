import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMuscle1746806446772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE "exercice_model" SET "primaryMuscleId" = 10, "secondaryMuscleId" = 15 WHERE title = 'Soulevé de terre jambes tendues';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé couché barre';
        UPDATE "exercice_model" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 3 WHERE title = 'Tractions pronation';
        UPDATE "exercice_model" SET "primaryMuscleId" = 11 WHERE title = 'Extensions quadriceps';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes inclinées';
        UPDATE "exercice_model" SET "primaryMuscleId" = 4 WHERE title = 'Extensions triceps corde';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Pompes déclinées';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé couché altères';
        UPDATE "exercice_model" SET "primaryMuscleId" = 1, "secondaryMuscleId" = 4 WHERE title = 'Muscle up';
        UPDATE "exercice_model" SET "primaryMuscleId" = 5, "secondaryMuscleId" = 4 WHERE title = 'Développé militaire altères';
        UPDATE "exercice_model" SET "primaryMuscleId" = 4, "secondaryMuscleId" = 2 WHERE title = 'Dips';
        UPDATE "exercice_model" SET "primaryMuscleId" = 11, "secondaryMuscleId" = 15 WHERE title = 'Squat';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé incliné barre';
        UPDATE "exercice_model" SET "primaryMuscleId" = 2, "secondaryMuscleId" = 4 WHERE title = 'Développé incliné altères';
        UPDATE "exercice_model" SET "primaryMuscleId" = 3, "secondaryMuscleId" = 6 WHERE title = 'Curl poulie barre';
        UPDATE "exercice_model" SET "primaryMuscleId" = 5 WHERE title = 'Elévations latérales altères';`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
