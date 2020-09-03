import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrdersDelivery1598485541497
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_accepted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'order_status',
            type: 'varchar',
          },
          {
            name: 'send',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'canceled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}

/**
 * id
 * order_accepted: false
 * order_status: 'não entregue'
 * date
 * canceled
 * created_at
 * updated_at
 */
