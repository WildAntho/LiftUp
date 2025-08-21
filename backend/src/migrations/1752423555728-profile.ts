import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1752423555728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            -- Crée les profils
            INSERT INTO profile (name, type, "stripeProductId", "stripePriceMonth", "stripePriceYear")
            VALUES 
              ('User-Maestro', 'STUDENT', 'prod_SgRohXAgleoetP', 'price_1Rl4udCLW748OffEJRdZUUWa', 'price_1Rl4w6CLW748OffEiOLQo6Md'),
              ('Student-Maestro', 'STUDENT', null, null, null),
              ('Coach-Maestro', 'COACH', 'prod_SgSSXY3Fa3sbcp', 'price_1Rl5XJCLW748OffE0FHYbm9X', 'price_1Rl5Y3CLW748OffEsEg4THZX')
            ON CONFLICT (name) DO NOTHING;
      
            INSERT INTO profile_permissions_permission ("profileId", "permissionId")
            SELECT p.id, perm.id
            FROM profile p, permission perm
            WHERE p.name = 'User-Maestro'
              AND perm.key IN ('manage:Exercice', 'manage:Feedback', 'read:Video', 'read:Feedback', 'manage:Message')
            ON CONFLICT DO NOTHING;
      
            INSERT INTO profile_permissions_permission ("profileId", "permissionId")
            SELECT p.id, perm.id
            FROM profile p, permission perm
            WHERE p.name = 'Student-Maestro'
              AND perm.key IN ('manage:Feedback', 'read:Video', 'manage:Message', 'read:Feedback')
            ON CONFLICT DO NOTHING;
      
            INSERT INTO profile_permissions_permission ("profileId", "permissionId")
            SELECT p.id, perm.id
            FROM profile p, permission perm
            WHERE p.name = 'Coach-Maestro'
              AND perm.key IN ('manage:Exercice', 'manage:Video', 'read:Video', 'manage:Message', 'manage:Program', 'manage:Crew', 'read:Feedback')
            ON CONFLICT DO NOTHING;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
