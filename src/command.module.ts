import { Module } from '@nestjs/common';
import { ValidateCommand } from './commands/validate.command';
import { ParseCommand } from './commands/parse.command';
import { ServiceModule } from './service.module';

@Module({
  imports: [ServiceModule],
  providers: [ParseCommand, ValidateCommand],
})
export class CommandModule {}
