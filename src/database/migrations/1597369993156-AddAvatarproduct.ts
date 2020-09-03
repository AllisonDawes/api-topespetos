import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarproduct1597369993156
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'avatar_product',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'avatar_product');
  }
}
