import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ParseService } from '../../src/services/parse.service';

describe('ParseService', () => {
  let parseService: ParseService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn(),
    } as unknown as ConfigService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParseService,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    parseService = module.get<ParseService>(ParseService);
  });

  describe('readAndParse', () => {
    it('should throw an error if no files are found', async () => {
      // Mock the read method to return an empty array
      jest.spyOn(parseService, 'read').mockResolvedValue([]);

      await expect(parseService.readAndParse([])).rejects.toThrowError(
        'No files found',
      );
    });

    it('should return an array of fileObjects', async () => {
      const file = './test_data/test.onl';

      // Mock the read method to return file paths
      jest.spyOn(parseService, 'read').mockResolvedValue([file]);

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

  describe('listFilesInDirectory', () => {
    it('should return an array of file names', async () => {
      const directoryPath = './test/test_data';

      const files = await parseService.listFilesInDirectory(directoryPath);

      expect(files).toHaveLength(1);
    });

    // Add more test cases for different scenarios
  });
});
