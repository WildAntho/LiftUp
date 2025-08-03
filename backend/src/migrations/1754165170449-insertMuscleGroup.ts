import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertMuscleGroup1754165170449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- Soulevé de terre jambes tendues → hamstring, glutes
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Soulevé de terre jambes tendues' AND mg.key IN ('hamstring', 'glutes');

        -- Développé couché barre → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Développé couché barre' AND mg.key IN ('pecs', 'triceps');

        -- Tractions pronation → back, biceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Tractions pronation' AND mg.key IN ('back', 'biceps');

        -- Extensions quadriceps → quads
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Extensions quadriceps' AND mg.key IN ('quads');

        -- Pompes → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Pompes' AND mg.key IN ('pecs', 'triceps');

        -- Pompes inclinées → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Pompes inclinées' AND mg.key IN ('pecs', 'triceps');

        -- Extensions triceps corde → triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Extensions triceps corde' AND mg.key IN ('triceps');

        -- Pompes déclinées → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Pompes déclinées' AND mg.key IN ('pecs', 'triceps');

        -- Développé couché altères → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Développé couché altères' AND mg.key IN ('pecs', 'triceps');

        -- Développé militaire altères → shoulders, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Développé militaire altères' AND mg.key IN ('shoulders', 'triceps');

        -- Dips → triceps, pecs
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Dips' AND mg.key IN ('triceps', 'pecs');

        -- Squat → quads, glutes
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Squat' AND mg.key IN ('quads', 'glutes', 'hamstring');

        -- Développé incliné barre → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Développé incliné barre' AND mg.key IN ('pecs', 'triceps');

        -- Développé incliné altères → pecs, triceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Développé incliné altères' AND mg.key IN ('pecs', 'triceps');

        -- Curl poulie barre → biceps, forearm
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Curl poulie barre' AND mg.key IN ('biceps', 'forearm');

        -- Elévations latérales altères → shoulders
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Elévations latérales altères' AND mg.key IN ('shoulders');

        -- Muscle up → back, biceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Muscle up' AND mg.key IN ('back', 'biceps');

        -- Rowing barre → back, biceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Rowing barre' AND mg.key IN ('back', 'biceps');

        -- Tirage horizontal poulie basse → back, biceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Tirage horizontal poulie basse' AND mg.key IN ('back', 'biceps');

        -- Curl marteau altères → biceps, forearm
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Curl marteau altères' AND mg.key IN ('biceps', 'forearm');

        -- Curl incliné altères → biceps
        INSERT INTO exercice_model_muscles_muscle_group ("exerciceModelId", "muscleGroupId")
        SELECT em.id, mg.id
        FROM exercice_model em, muscle_group mg
        WHERE em.title = 'Curl incliné altères' AND mg.key IN ('biceps');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
