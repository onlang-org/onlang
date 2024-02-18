import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CompileCommand } from '../../src/commands/compile';
import path from 'path';
import { readdirSync, unlinkSync } from 'fs';

describe('CompileCommand', () => {
  let compileCommand: CompileCommand;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompileCommand,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => path.resolve(__dirname + '/../test_data')), // Mock the config service
          },
        },
      ],
    }).compile();

    compileCommand = module.get<CompileCommand>(CompileCommand);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    const files = readdirSync(path.resolve(__dirname + '/../test_data'));
    files
      .filter((file) => path.parse(file).ext === '.ts')
      .forEach((file) => {
        unlinkSync(path.resolve(__dirname + '/../test_data/' + file));
      });
  });

  describe('run', () => {
    it('should call readAndCompile with passed parameters', async () => {
      const readAndCompileSpy = jest.spyOn(compileCommand, 'readAndCompile');
      const params = ['file1.json', 'file2.json'];
      const options = {};

      await compileCommand.run(params, options);

      expect(readAndCompileSpy).toHaveBeenCalledWith(params, options);
    });
  });

  describe('readAndCompile', () => {
    it('should read and compile files in the schema directory if no parameters are provided', async () => {
      const compileSpy = jest.spyOn(compileCommand, 'compile');
      const options = {};

      await compileCommand.readAndCompile([], options);

      expect(compileSpy).toHaveBeenCalledTimes(2);
      expect(
        readdirSync(path.resolve(__dirname + '/../test_data')).filter(
          (file) => path.parse(file).ext === '.ts',
        ).length,
      ).toBe(2);
    });

    it('should call compile for file provided as parameter', async () => {
      const compileSpy = jest.spyOn(compileCommand, 'compile');
      const testFilePath = path.resolve(__dirname + '/../test_data/test1.json');
      const params = [testFilePath];
      const options = {};

      await compileCommand.readAndCompile(params, options);

      expect(compileSpy).toHaveBeenCalledTimes(1);
      expect(
        readdirSync(path.resolve(__dirname + '/../test_data')).filter(
          (file) => path.parse(file).ext === '.ts',
        ).length,
      ).toBe(1);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
