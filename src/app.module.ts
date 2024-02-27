import { Module } from '@nestjs/common';
import { CommandModule } from './command.module';
import { ValidateService } from './services/validate.service';
import { ConfigModule } from '@nestjs/config';
import { ParseService } from './services/parse.service';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CommandModule,
  ],
  providers: [ValidateService, ParseService],
})
export class AppModule {}
