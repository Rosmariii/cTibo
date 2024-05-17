import { Module } from '@nestjs/common';
import { CurrentAccountController } from '@src/modules/currentAccount/infrastructure/controller/current-acount.controller';
import { CurrentAccountService } from '@src/modules/currentAccount/application/current-account.service';
import { CurrentAccountRepository } from '@src/modules/currentAccount/infrastructure/repository/current-account.repository';
import { CURRENT_ACCOUNT_REPOSITORY } from '@src/modules/currentAccount/symbols';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentsAccounts } from '@src/modules/currentAccount/domain/entities/current-account.entity';
import { Flows } from '@src/modules/currentAccount/domain/entities/flows.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentsAccounts, Flows])],
  controllers: [CurrentAccountController],
  providers: [
    CurrentAccountService,
    CurrentAccountRepository,
    {
      provide: CURRENT_ACCOUNT_REPOSITORY,
      useClass: CurrentAccountRepository,
    },
  ],
  exports: [],
})
export class CurrentAccountModule {}
