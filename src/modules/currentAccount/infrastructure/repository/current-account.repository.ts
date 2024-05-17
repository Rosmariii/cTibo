import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCurrentAccountDto } from '@src/modules/currentAccount/domain/dto/create-current-account.dto';
import { ICurrentAccount } from '@src/modules/currentAccount/domain/interface/current-account.interface';
import { CurrentsAccounts } from '@src/modules/currentAccount/domain/entities/current-account.entity';
import { Repository } from 'typeorm';
import { handleHTTPException } from '@src/common/handlerError';
import { UpdateDepositDto } from '@src/modules/currentAccount/domain/dto/update-deposit-dto';
import { Flows } from '@src/modules/currentAccount/domain/entities/flows.entity';

Injectable();
export class CurrentAccountRepository {
  constructor(
    @InjectRepository(CurrentsAccounts)
    private currentAccountRepository: Repository<CurrentsAccounts>,
    @InjectRepository(Flows)
    private flowsRepository: Repository<Flows>,
  ) {}
  async create(
    createCurrentAccountDto: CreateCurrentAccountDto,
  ): Promise<ICurrentAccount> {
    try {
      const { owner } = createCurrentAccountDto;

      const existingAccount = await this.currentAccountRepository.findOne({
        where: { owner },
      });
      if (existingAccount) {
        throw new Error(
          JSON.stringify({
            message: 'An account with this owner already exists.',
            code: 409,
          }),
        );
      }

      const currentAccount = new CurrentsAccounts();
      currentAccount.balance = createCurrentAccountDto.balance;
      currentAccount.owner = createCurrentAccountDto.owner;
      currentAccount.type = createCurrentAccountDto.type;

      return await this.currentAccountRepository.save(currentAccount);
    } catch (error) {
      handleHTTPException(error);
    }
  }

  async deposit(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount> {
    try {
      const { id, balance, type } = updateDeposit;
      const currentAccount = await this.currentAccountRepository.findOne({
        where: { id },
      });

      if (!currentAccount) {
        throw new Error(
          JSON.stringify({ message: 'Account not found.', code: 400 }),
        );
      }

      currentAccount.balance += balance;
      currentAccount.type = type;

      const flow = new Flows();
      flow.amount = balance;
      flow.currents_accounts = currentAccount;
      await this.flowsRepository.save(flow);

      return await this.currentAccountRepository.save(currentAccount);
    } catch (error) {
      handleHTTPException(error);
    }
  }

  async payment(updateDeposit: UpdateDepositDto): Promise<ICurrentAccount> {
    try {
      const { id, balance, type } = updateDeposit;
      const currentAccount = await this.currentAccountRepository.findOne({
        where: { id },
      });

      if (!currentAccount) {
        throw new Error('Account not found.');
      }

      if (currentAccount.balance < balance) {
        throw new Error(
          JSON.stringify({ message: 'Insufficient funds.', code: 400 }),
        );
      }

      currentAccount.balance -= balance;
      currentAccount.type = type;

      const flow = new Flows();
      flow.amount = balance;
      flow.currents_accounts = currentAccount;
      await this.flowsRepository.save(flow);

      return await this.currentAccountRepository.save(currentAccount);
    } catch (error) {
      handleHTTPException(error);
    }
  }
}
