import { Module } from '@nestjs/common';
import { CommandModule } from './command.module';
import { ValidateService } from './services/validate.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CommandModule,
  ],
  providers: [ValidateService],
})
export class AppModule {}
