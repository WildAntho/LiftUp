import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryExercice1754223937373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO exercice_category (key, label)
        VALUES 
        ('strength', 'Renforcement'),
        ('cardio', 'Cardio'),
        ('warming', 'Echauffement'),
        ('stretching', 'Etirement'),
        ('mobility', 'Mobilité');`);
    
    await queryRunner.query(`UPDATE exercice_model
        SET "categoryId" = (
        SELECT id FROM exercice_category WHERE key = 'strength'
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
