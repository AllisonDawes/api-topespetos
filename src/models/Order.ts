import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import User from '../models/User';
import OrdersProducts from '../models/OrdersProducts';
import SecondAddress from '../models/SecondAddress';

@Entity('orders')
class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_deliverys: OrdersProducts[];

  @OneToOne(() => SecondAddress)
  @JoinColumn({ name: 'address_id' })
  second_address: SecondAddress;

  @Column('time with time zone')
  date: Date;

  @Column()
  order_accepted: boolean;

  @Column()
  order_status: string;

  @Column()
  send: string;

  @Column('boolean')
  canceled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Request;
