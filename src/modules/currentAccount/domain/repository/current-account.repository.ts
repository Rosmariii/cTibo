import { CreateCurrentAccountDto } from '@src/modules/currentAccount/domain/dto/create-current-account.dto';
import { ICurrentAccount } from '@src/modules/currentAccount/domain/interface/current-account.interface';
import { UpdateDepositDto } from '@src/modules/currentAccount/domain/dto/update-deposit-dto';

export interface ICurrentAccountRepository {
  create(
    createCurrentAccountDto: CreateCurrentAccountDto,
  ): Promise<ICurrentAccount>;
  deposit(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount>;
  payment(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount>;
}
