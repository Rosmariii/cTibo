import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from '@src/app.configService';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: AppConfigService,
      useFactory: (config: ConfigService) => new AppConfigService(config),
      inject: [ConfigService],
    },
  ],
  exports: [AppConfigService],
})
export class ConfigurationModule {}
