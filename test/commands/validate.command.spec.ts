import { Test, TestingModule } from '@nestjs/testing';
import { CommandRunner } from 'nest-commander';
import { ValidateService } from '../../src/services/validate.service';
import { ValidateCommand } from '../../src/commands/validate.command';
import { ValidateFunction } from 'ajv';

describe('ValidateCommand', () => {
  let validateCommand: CommandRunner;
  let validateServiceMock: ValidateService;

  beforeEach(async () => {
    validateServiceMock = {
      readAndValidate: jest.fn(),
    } as unknown as ValidateService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ValidateService,
          useValue: validateServiceMock,
        },
        ValidateCommand,
      ],
    }).compile();

    validateCommand = module.get<CommandRunner>(ValidateCommand);
  });

  describe('run', () => {
    it('should call readAndValidate method and log valid schemas', async () => {
      const passedParams = ['../test_data/test.json'];

      // Mock the readAndValidate method to return mock ValidateFunctions
      const mockValidateFunction = {
        errors: null,
        schema: { valueOf: jest.fn().mockResolvedValue({ "title": "Test" }) },
        schemaEnv: { valueOf: jest.fn() },
      } as unknown as ValidateFunction<unknown>;
      jest.spyOn(validateServiceMock, 'readAndValidate').mockResolvedValue([mockValidateFunction]);

      // Mock console.log and console.error to spy on their calls
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await validateCommand.run(passedParams);

      expect(validateServiceMock.readAndValidate).toHaveBeenCalledWith(passedParams);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should call readAndValidate method and log errors for invalid schemas', async () => {
      const passedParams = ['path/to/invalid-schema.json'];

      // Mock the readAndValidate method to return mock ValidateFunctions with errors
      const mockValidateFunction = {
        errors: null,
        schema: { valueOf: jest.fn() },
        schemaEnv: { valueOf: jest.fn() },
      } as unknown as ValidateFunction<unknown>;
      jest.spyOn(validateServiceMock, 'readAndValidate').mockResolvedValue([mockValidateFunction]);

      // Mock console.log and console.error to spy on their calls
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await validateCommand.run(passedParams);

      expect(validateServiceMock.readAndValidate).toHaveBeenCalledWith(passedParams);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should log an error if readAndValidate method throws an error', async () => {
      const passedParams = ['path/to/schema.json'];

      // Mock the readAndValidate method to throw an error
      jest.spyOn(validateServiceMock, 'readAndValidate').mockRejectedValue(new Error('Validation error'));

      // Mock console.log and console.error to spy on their calls
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await validateCommand.run(passedParams);

      expect(validateServiceMock.readAndValidate).toHaveBeenCalledWith(passedParams);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  // Add more test cases for other scenarios as needed
});
