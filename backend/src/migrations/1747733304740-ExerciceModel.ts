import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciceModel1747733304740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "exercice_model" ("title", "serie", "rep", "image") VALUES
            ('Soulevé de terre jambes tendues', 1, 1, '/file-stifdeadlift.webp'),
            ('Développé couché barre', 1, 1, '/file-benchpress.webp'),
            ('Tractions pronation', 1, 1, '/file-pullup.webp'),
            ('Extensions quadriceps', 1, 1, '/file-quadextension.webp'),
            ('Pompes', 1, 1, '/file-pushup.webp'),
            ('Pompes inclinées', 1, 1, '/file-inclinepushup.webp'),
            ('Extensions triceps corde', 1, 1, '/file-tricepsropeextension.webp'),
            ('Pompes déclinées', 1, 1, '/file-declinepushup.webp'),
            ('Développé couché altères', 1, 1, '/file-benchdumbellpress.webp'),
            ('Développé militaire altères', 1, 1, '/file-militaryPressDumbell.webp'),
            ('Dips', 1, 1, '/file-dips.webp'),
            ('Squat', 1, 1, '/file-squat.webp'),
            ('Développé incliné barre', 1, 1, '/file-inclinebench.webp'),
            ('Développé incliné altères', 1, 1, '/file-inclinebenchdumbell.webp'),
            ('Curl poulie barre', 1, 1, '/file-curlpoulibar.webp'),
            ('Elévations latérales altères', 1, 1, '/file-lateralraisedumbell.webp'),
            ('Muscle up', 1, 1, '/file-muscleup.webp'),
            ('Rowing barre', 1, 1, '/file-barbellrowing.webp'),
            ('Tirage horizontal poulie basse', 1, 1, '/file-rowingcable.webp'),
            ('Curl marteau altères', 1, 1, '/file-dumbellhammercurl.webp'),
            ('Curl incliné altères', 1, 1, '/file-inclinedumbellcurl.webp');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
