import { Module } from '@nestjs/common';
import { CommandModule } from './command.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CommandModule,
  ],
  providers: [],
})
export class AppModule {}
