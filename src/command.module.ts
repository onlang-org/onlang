import { Module } from '@nestjs/common';
import { ValidateCommand } from './commands/validate.command';
import { ValidateService } from './services/validate.service';

@Module({
  imports: [],
  providers: [ValidateCommand, ValidateService],
})
export class CommandModule {}
