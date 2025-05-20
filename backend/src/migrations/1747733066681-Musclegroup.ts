import { MigrationInterface, QueryRunner } from "typeorm";

export class Musclegroup1747733066681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `TRUNCATE TABLE muscle_group RESTART IDENTITY CASCADE`
    );
    await queryRunner.query(`INSERT INTO muscle_group ("key", "label") VALUES
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
            ('glutes', 'Fessiers');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
