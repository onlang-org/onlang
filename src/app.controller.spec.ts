import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ONLangModule } from './engine/onlang.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ONLangModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('processONLang', () => {
    it('should process ONLang code', () => {

      expect(appController.processONLang('object SampleObject generate-code')).toEqual({
        type: 'object',
        name: 'SampleObject',
        properties: [],
        commands: ['generate-code'],
      });
    });
  })
});
