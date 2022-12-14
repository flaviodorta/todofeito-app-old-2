import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLabels1669830766659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sections',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'index',
            type: 'int',
          },

          {
            name: 'title',
            type: 'varchar',
          },

          {
            name: 'type',
            type: 'varchar',
          },

          {
            name: 'date',
            type: 'timestamp',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sections');
  }
}
