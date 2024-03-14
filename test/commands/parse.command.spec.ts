import { Test, TestingModule } from '@nestjs/testing';
import { CommandRunner } from 'nest-commander';
import { ParseService } from '../../src/services/parse.service';
import { ParseCommand } from '../../src/commands/parse.command';

describe('ParseCommand', () => {
  let parseCommand: CommandRunner;
  let parseServiceMock: ParseService;

  beforeEach(async () => {
    parseServiceMock = {
      readAndParse: jest.fn(),
    } as unknown as ParseService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ParseService,
          useValue: parseServiceMock,
        },
        ParseCommand,
      ],
    }).compile();

    parseCommand = module.get<CommandRunner>(ParseCommand);
  });

  describe('run', () => {
    it('should call readAndParse method and log valid scripts', async () => {
      const passedParams = ['../test_data/test.onl'];

      // Mock the readAndParse method to return mock ParseFunctions
      const mockFileObject = {
        data: { key: 'value' },
      } as unknown;
      jest
        .spyOn(parseServiceMock, 'readAndParse')
        .mockResolvedValue([mockFileObject]);

      // Mock console.log and console.error to spy on their calls
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await parseCommand.run(passedParams);

      expect(parseServiceMock.readAndParse).toHaveBeenCalledWith(passedParams);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should call readAndParse method and log errors for invalid scripts', async () => {
      const passedParams = ['path/to/invalid-schema.onl'];

      // Mock the readAndParse method to return mock ParseFunctions with errors
      const mockFileObject = {} as unknown;
      jest
        .spyOn(parseServiceMock, 'readAndParse')
        .mockResolvedValue([mockFileObject]);

      await parseCommand.run(passedParams);

      expect(parseServiceMock.readAndParse).toHaveBeenCalledWith(passedParams);
    });

    it('should log an error if readAndParse method throws an error', async () => {
      const passedParams = ['path/to/schema.onl'];

      // Mock the readAndParse method to throw an error
      jest
        .spyOn(parseServiceMock, 'readAndParse')
        .mockRejectedValue(new Error('Validation error'));

      // Mock console.log and console.error to spy on their calls
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await parseCommand.run(passedParams);

      expect(parseServiceMock.readAndParse).toHaveBeenCalledWith(passedParams);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  // Add more test cases for other scenarios as needed
});
