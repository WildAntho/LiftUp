import { MigrationInterface, QueryRunner } from "typeorm";

export class MuscleGroup1750186730063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO "exercice_model_muscles_muscle_group" ("exerciceModelId", "muscleGroupId")
          SELECT "id", "primaryMuscleId"
          FROM "exercice_model"
          WHERE "primaryMuscleId" IS NOT NULL
        `);

    await queryRunner.query(`
          INSERT INTO "exercice_model_muscles_muscle_group" ("exerciceModelId", "muscleGroupId")
          SELECT "id", "secondaryMuscleId"
          FROM "exercice_model"
          WHERE "secondaryMuscleId" IS NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
