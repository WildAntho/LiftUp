import { MigrationInterface, QueryRunner } from "typeorm";

export class OfferCategory1747733863347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO offer_category (label) VALUES
            ('Streetlifting'),
            ('Musculation (Hypertrophie)'),
            ('Powerlifting'),
            ('Calisthénie (poids du corps)'),
            ('Endurance'),
            ('Préparation physique générale'),
            ('Sans matériel'),
            ('Réathlétisation / Retour de blessure');
             `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
