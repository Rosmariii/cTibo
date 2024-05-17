import { Inject, Injectable } from '@nestjs/common';
import { CreateCurrentAccountDto } from '@src/modules/currentAccount/domain/dto/create-current-account.dto';
import { ICurrentAccount } from '@src/modules/currentAccount/domain/interface/current-account.interface';
import { CURRENT_ACCOUNT_REPOSITORY } from '@src/modules/currentAccount/symbols';
import { ICurrentAccountRepository } from '@src/modules/currentAccount/domain/repository/current-account.repository';
import { UpdateDepositDto } from '@src/modules/currentAccount/domain/dto/update-deposit-dto';

@Injectable()
export class CurrentAccountService {
  constructor(
    @Inject(CURRENT_ACCOUNT_REPOSITORY)
    private readonly _currentAccountRepository: ICurrentAccountRepository,
  ) {}
  async create(
    createCurrentAccountDto: CreateCurrentAccountDto,
  ): Promise<ICurrentAccount> {
    return this._currentAccountRepository.create(createCurrentAccountDto);
  }

  async deposit(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount> {
    return this._currentAccountRepository.deposit(updateDeposit);
  }

  async payment(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount> {
    return this._currentAccountRepository.payment(updateDeposit);
  }
}
