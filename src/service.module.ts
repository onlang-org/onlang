import { Module } from '@nestjs/common';
import { ValidateService } from './services/validate.service';
import { ParseService } from './services/parse.service';
import { UtilityService } from './services/util.service';

@Module({
  imports: [],
  providers: [UtilityService, ValidateService, ParseService],
  exports: [UtilityService, ValidateService, ParseService],
})
export class ServiceModule {}
