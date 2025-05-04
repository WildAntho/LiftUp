import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewExercices1746354079073 implements MigrationInterface {
  name = "AddNewExercices1746354079073";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "exercice_model" ("title", "serie", "rep", "image") VALUES
        ('Muscle up', 1, 1, '/file-muscleup.png'),
        ('Dips', 1, 1, '/file-dips.png'),
        ('Développé militaire altères', 1, 1, '/file-militaryPressDumbell.png'),
        ('Squat', 1, 1, '/file-squat.png'),
        ('Développé incliné barre', 1, 1, '/file-inclinebench.png'),
        ('Développé incliné altères', 1, 1, '/file-inclinebenchdumbell.png'),
        ('Curl poulie barre', 1, 1, '/file-curlpoulibar.png'),
        ('Élévations latérales altères', 1, 1, '/file-lateralraisedumbell.png'),
        ('Soulevé de terre jambes tendues', 1, 1, '/file-stifdeadlift.png'),
        ('Développé couché barre', 1, 1, '/file-benchpress.png'),
        ('Développé couché altères', 1, 1, '/file-benchdumbellpress.png'),
        ('Tractions pronation', 1, 1, '/file-pullup.png'),
        ('Extensions quadriceps', 1, 1, '/file-quadextension.png'),
        ('Pompes', 1, 1, '/file-pushup.png'),
        ('Pompes inclinées', 1, 1, '/file-inclinepushup.png'),
        ('Extensions triceps corde', 1, 1, '/file-tricepsropeextension.png'),
        ('Pompes déclinées', 1, 1, '/file-declinepushup.png');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
