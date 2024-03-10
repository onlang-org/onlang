import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ParseService } from '../../src/services/parse.service';
import { UtilityService } from '../../src/services/util.service';

describe('ParseService', () => {
  let parseService: ParseService;
  let utilityServiceMock: UtilityService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn(),
    } as unknown as ConfigService;

    utilityServiceMock = {
      readFiles: jest.fn(),
    } as unknown as UtilityService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParseService,
        { provide: ConfigService, useValue: configServiceMock },
        { provide: UtilityService, useValue: utilityServiceMock },
      ],
    }).compile();

    parseService = module.get<ParseService>(ParseService);
  });

  describe('readAndParse', () => {
    it('should return an array of fileObjects', async () => {
      const file = './test_data/test.onl';

      // Mock the read method to return file paths
      jest.spyOn(utilityServiceMock, 'readFiles').mockResolvedValue([file]);

      // Mock the Parse method to return a mock fileObject
      jest.spyOn(parseService, 'parse').mockResolvedValue(jest.fn() as unknown);

      const fileObjects = await parseService.readAndParse([]);

      expect(fileObjects).toHaveLength(1);
      expect(fileObjects[0]).toBeDefined();
    });
  });

  // Add more test cases for other methods as needed

  describe('Parse', () => {
    it('should compile and return a fileObject', async () => {
      const file = './test/test_data/test.onl';

      const fileObject = await parseService.parse(file);

      expect(fileObject).toBeDefined();
    });
  });
});
