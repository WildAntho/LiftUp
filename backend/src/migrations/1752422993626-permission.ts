import { MigrationInterface, QueryRunner } from "typeorm";

export class Permission1752422993626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO permission (key, description)
            VALUES
              ('manage:Program', 'Peut créer, modifier et supprimer des programmes'),
              ('manage:Exercice', 'Peut créer, modifier et supprimer des exercices'),
              ('manage:Feedback', 'Peut créer, modifier et supprimer des feedbacks'),
              ('read:Video', 'Peut lire des vidéos'),
              ('manage:Message', 'Accès à la messagerie'),
              ('manage:Crew', 'Peut créer, modifier et supprimer des équipes'),
              ('manage:Video', 'Peut créer, modifier et supprimer des vidéos'),
              ('read:Feedback', 'Peut lire les feedbacks')
            ON CONFLICT (key) DO NOTHING;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
