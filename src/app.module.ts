import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { CurrentAccountModule } from '@src/modules/currentAccount/current-account.module';
import { AppConfigService } from '@src/app.configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from '@src/app.config.module';
import { CurrentsAccounts } from '@src/modules/currentAccount/domain/entities/current-account.entity';
import { Flows } from '@src/modules/currentAccount/domain/entities/flows.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          type: 'mysql',
          host: appConfigService.databaseHost,
          port: appConfigService.databasePort,
          username: appConfigService.databaseUsername,
          password: appConfigService.databasePassword,
          database: appConfigService.databaseSchema,
          synchronize: true,
          logging: true,
          entities: [CurrentsAccounts, Flows],
        };
      },
      inject: [AppConfigService],
    }),
    TypeOrmModule.forFeature([CurrentsAccounts, Flows]),
    CurrentAccountModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: AppConfigService,
      useFactory: (config: ConfigService) => new AppConfigService(config),
      inject: [ConfigService],
    },
  ],
  exports: [AppConfigService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
