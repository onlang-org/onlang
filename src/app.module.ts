import { Module } from '@nestjs/common';
import { CommandModule } from './command.module';
import { CompileService } from './services/compile.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    CommandModule,
  ],
  providers: [CompileService],
})
export class AppModule {}
