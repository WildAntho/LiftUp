import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciceModel1747733304740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "exercice_model" ("title", "serie", "rep", "image", "primaryMuscleId", "secondaryMuscleId") VALUES
            ('Soulevé de terre jambes tendues', 1, 1, '/file-stifdeadlift.webp', 10, 15),
            ('Développé couché barre', 1, 1, '/file-benchpress.webp', 2, 4),
            ('Tractions pronation', 1, 1, '/file-pullup.webp', 1, 3),
            ('Extensions quadriceps', 1, 1, '/file-quadextension.webp', 11, NULL),
            ('Pompes', 1, 1, '/file-pushup.webp', 2, 4),
            ('Pompes inclinées', 1, 1, '/file-inclinepushup.webp', 2, 4),
            ('Extensions triceps corde', 1, 1, '/file-tricepsropeextension.webp', 4, NULL),
            ('Pompes déclinées', 1, 1, '/file-declinepushup.webp', 2, 4),
            ('Développé couché altères', 1, 1, '/file-benchdumbellpress.webp', 2, 4),
            ('Développé militaire altères', 1, 1, '/file-militaryPressDumbell.webp', 5, 4),
            ('Dips', 1, 1, '/file-dips.webp', 4, 2),
            ('Squat', 1, 1, '/file-squat.webp', 11, 15),
            ('Développé incliné barre', 1, 1, '/file-inclinebench.webp', 2, 4),
            ('Développé incliné altères', 1, 1, '/file-inclinebenchdumbell.webp', 2, 4),
            ('Curl poulie barre', 1, 1, '/file-curlpoulibar.webp', 3, 6),
            ('Elévations latérales altères', 1, 1, '/file-lateralraisedumbell.webp', 5, NULL),
            ('Muscle up', 1, 1, '/file-muscleup.webp', 1, 3),
            ('Rowing barre', 1, 1, '/file-barbellrowing.webp', 1, 3),
            ('Tirage horizontal poulie basse', 1, 1, '/file-rowingcable.webp', 1, 3),
            ('Curl marteau altères', 1, 1, '/file-dumbellhammercurl.webp', 3, NULL),
            ('Curl incliné altères', 1, 1, '/file-inclinedumbellcurl.webp', 3, NULL);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
