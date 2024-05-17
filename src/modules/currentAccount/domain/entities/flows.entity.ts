import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Decimal128,
} from 'typeorm';
import { CurrentsAccounts } from '@src/modules/currentAccount/domain/entities/current-account.entity'; // Asume que la entidad CurrentAccount ya está definida
import { IsNumber, isNumber, Matches } from 'class-validator';

@Entity()
export class Flows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  @IsNumber()
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @ManyToOne(() => CurrentsAccounts, (account) => account.flows)
  @JoinColumn({ name: 'currents_accounts_id' })
  currents_accounts: CurrentsAccounts;
}
function IsNumeric(arg0: {
  precision: number;
  maxDecimalPlaces: number;
}): (target: Flows, propertyKey: 'amount') => void {
  throw new Error('Function not implemented.');
}
