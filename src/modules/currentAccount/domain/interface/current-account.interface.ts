import { AccountType } from '@src/modules/currentAccount/domain/enum/accountType.enum';

export class ICurrentAccount {
  balance: number;
  owner: string;
  created_at?: Date;
  updated_at?: Date;
  type: AccountType;
}
