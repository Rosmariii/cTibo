import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AccountType } from '@src/modules/currentAccount/domain/enum/accountType.enum';
import { Flows } from '@src/modules/currentAccount/domain/entities/flows.entity';
import { IsNumber, Matches } from 'class-validator';

@Entity()
export class CurrentsAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  @IsNumber({}, { message: 'balance must be a number' })
  balance: number;

  @Column({ type: 'varchar' })
  owner: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.USD,
  })
  type: AccountType;

  @OneToMany(() => Flows, (flows) => flows.currents_accounts)
  flows: Flows[];
}
function IsNumeric(arg0: {
  precision: number;
  maxDecimalPlaces: number;
}): (target: CurrentsAccounts, propertyKey: 'balance') => void {
  throw new Error('Function not implemented.');
}
