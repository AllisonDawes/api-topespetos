import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import OrdersProducts from './OrdersProducts';

@Entity('products')
class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('numeric')
  price: number;

  @Column()
  category: string;

  @Column()
  avatar_product: string;

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    return this.avatar_product
      ? `${process.env.APP_API_URL}/files/${this.avatar_product}`
      : null;
  }

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Products;
