import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ONLangService } from './engine/onlang.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly onLangService: ONLangService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('process-onlang')
  processONLang(@Query('code') code: string): any {
    return this.onLangService.processONLangCode(code);
  }
}
