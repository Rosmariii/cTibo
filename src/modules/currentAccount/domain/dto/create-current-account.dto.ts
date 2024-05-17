import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccountType } from '@src/modules/currentAccount/domain/enum/accountType.enum';

export class CreateCurrentAccountDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  balance?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: AccountType;
}
