import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ValidateService } from '../../src/services/validate.service';
import { ValidateFunction } from 'ajv';

describe('ValidateService', () => {
    let validateService: ValidateService;
    let configServiceMock: ConfigService;

    beforeEach(async () => {
        configServiceMock = {
            get: jest.fn(),
        } as unknown as ConfigService;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateService,
                { provide: ConfigService, useValue: configServiceMock },
            ],
        }).compile();

        validateService = module.get<ValidateService>(ValidateService);
    });

    describe('readAndValidate', () => {
        it('should throw an error if no files are found', async () => {
            // Mock the read method to return an empty array
            jest.spyOn(validateService, 'read').mockResolvedValue([]);

            await expect(validateService.readAndValidate([])).rejects.toThrowError(
                'No files found',
            );
        });

        it('should return an array of validateFunctions', async () => {
            const file1 = './test_data/test.json';
            const file2 = './test_data/qualtrics.json';

            // Mock the read method to return file paths
            jest.spyOn(validateService, 'read').mockResolvedValue([file1, file2]);

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

    describe('listFilesInDirectory', () => {
        it('should return an array of file names', async () => {
            const directoryPath = './test/test_data';

            const files = await validateService.listFilesInDirectory(directoryPath);

            expect(files).toHaveLength(2);
        });

        // Add more test cases for different scenarios
    });
});
