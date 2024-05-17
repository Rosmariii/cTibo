import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AccountType } from '@src/modules/currentAccount/domain/enum/accountType.enum';

export class UpdateDepositDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  balance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: AccountType;
}
