import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameToUsername1652388641303 implements MigrationInterface {
  name = 'RenameToUsername1652388641303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "name" TO "username"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "username" TO "name"`,
    );
  }
}
