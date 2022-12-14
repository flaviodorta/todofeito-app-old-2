import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLabels1669831581983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'labels',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'type',
            type: 'varchar',
          },

          {
            name: 'title',
            type: 'varchar',
          },

          {
            name: 'colorName',
            type: 'timestamp',
          },

          {
            name: 'class',
            type: 'timestamp',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('labels');
  }
}
