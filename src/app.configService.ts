import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') || '';
  }

  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') || Number('');
  }

  get databaseUsername(): string {
    return this.configService.get<string>('DATABASE_USERNAME') || '';
  }

  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') || '';
  }

  get databaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA') || '';
  }

  get port(): string {
    return this.configService.get<string>('PORT') || '';
  }
}
