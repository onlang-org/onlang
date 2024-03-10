import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ValidateService } from '../../src/services/validate.service';
import { ValidateFunction } from 'ajv';
import { UtilityService } from '../../src/services/util.service';

describe('ValidateService', () => {
  let validateService: ValidateService;
  let configServiceMock: ConfigService;
  let utilityServiceMock: UtilityService;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn(),
    } as unknown as ConfigService;

    utilityServiceMock = {
      readFiles: jest.fn(),
    } as unknown as UtilityService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateService,
        { provide: ConfigService, useValue: configServiceMock },
        { provide: UtilityService, useValue: utilityServiceMock },
      ],
    }).compile();

    validateService = module.get<ValidateService>(ValidateService);
  });

  describe('readAndValidate', () => {
    it('should return an array of validateFunctions', async () => {
      const file1: string = './test_data/test.json';
      const file2: string = './test_data/qualtrics.json';

      const files: string[] = [file1, file2];

      // Mock the read method to return file paths
      jest.spyOn(utilityServiceMock, 'readFiles').mockResolvedValue(files);

      // Mock the validate method to return a mock ValidateFunction
      jest
        .spyOn(validateService, 'validate')
        .mockResolvedValue(jest.fn() as unknown as ValidateFunction);

      const validateFunctions = await validateService.readAndValidate([]);

      expect(validateFunctions).toHaveLength(2);
      expect(validateFunctions[0]).toBeDefined();
      expect(validateFunctions[1]).toBeDefined();
    });
  });

  // Add more test cases for other methods as needed

  describe('validate', () => {
    it('should compile and return a ValidateFunction', async () => {
      const file = './test/test_data/test.json';

      const validateFunction = await validateService.validate(file);

      expect(validateFunction).toBeDefined();
    });
  });
});
