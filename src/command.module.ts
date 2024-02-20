import { Module } from '@nestjs/common';
import { CompileCommand } from './commands/compile.command';
import { CompileService } from './services/compile.service';

@Module({
  imports: [],
  providers: [CompileCommand, CompileService],
})
export class CommandModule {}
