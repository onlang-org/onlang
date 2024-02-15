import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ONLangModule } from './engine/onlang.module';

@Module({
  imports: [ONLangModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
