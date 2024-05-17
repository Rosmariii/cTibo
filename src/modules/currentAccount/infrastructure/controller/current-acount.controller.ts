import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentAccountService } from '@src/modules/currentAccount/application/current-account.service';
import { CreateCurrentAccountDto } from '@src/modules/currentAccount/domain/dto/create-current-account.dto';
import { ICurrentAccount } from '@src/modules/currentAccount/domain/interface/current-account.interface';
import { UpdateDepositDto } from '@src/modules/currentAccount/domain/dto/update-deposit-dto';

@ApiTags('Current Account')
@Controller('/current-account')
export class CurrentAccountController {
  constructor(private readonly _currentAccountService: CurrentAccountService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new current account' })
  async create(
    @Body() createCurrentAccountDto: CreateCurrentAccountDto,
  ): Promise<ICurrentAccount> {
    return this._currentAccountService.create(createCurrentAccountDto);
  }

  @Post('deposit')
  @ApiOperation({ summary: 'make a deposit into the account' })
  async deposit(
    @Body() UpdateDepositDto: UpdateDepositDto,
  ): Promise<ICurrentAccount> {
    return this._currentAccountService.deposit(UpdateDepositDto);
  }

  @Post('payment')
  @ApiOperation({ summary: 'make a payment' })
  async payment(
    @Body() UpdateDepositDto: UpdateDepositDto,
  ): Promise<ICurrentAccount> {
    return this._currentAccountService.payment(UpdateDepositDto);
  }
}
