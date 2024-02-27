import { Module } from '@nestjs/common';
import { ValidateCommand } from './commands/validate.command';
import { ValidateService } from './services/validate.service';
import { ParseCommand } from './commands/parse.command';
import { ParseService } from './services/parse.service';

@Module({
  imports: [],
  providers: [ValidateCommand, ValidateService, ParseCommand, ParseService],
})
export class CommandModule {}
