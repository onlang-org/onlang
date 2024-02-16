import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompileCommand } from './commands/compile';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true })],
  controllers: [],
  providers: [CompileCommand],
})
export class AppModule { }
