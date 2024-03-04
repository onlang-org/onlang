import { InquirerService } from 'nest-commander';
import { UtilityService } from '../../src/services/util.service';
import * as fs from 'fs';

jest.mock('fs');

describe('UtilityService', () => {
  let utilityService: UtilityService;
  let inquirerServiceMock: InquirerService;

  beforeEach(() => {
    inquirerServiceMock = {
      get: jest.fn(),
    } as unknown as InquirerService;

    utilityService = new UtilityService(inquirerServiceMock);
  });

  it('should list files in directory', () => {
    const directoryPath = './test/test_data';
    const fileType = 'txt';

    const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
    const dirents: string[] = ['file1.txt', 'file2.txt', 'file3.txt'];

    mockReaddirSync.mockReturnValue(dirents as unknown as fs.Dirent[]);

    const result = utilityService.listFilesInDirectory(directoryPath, fileType);
    expect(result).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
    expect(mockReaddirSync).toHaveBeenCalledWith(directoryPath);
  });

  it('should read files from directory', () => {
    const params = [];
    const filesPath = './test/test_data';
    const fileType = 'json';

    const mockListFilesInDirectory = jest.spyOn(
      utilityService,
      'listFilesInDirectory',
    );
    mockListFilesInDirectory.mockReturnValue(['qualtrics.json', 'test.json']);

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(true);

    const result = utilityService.readFiles(params, filesPath, fileType);
    expect(result).resolves.toEqual([
      `${filesPath}/qualtrics.json`,
      `${filesPath}/test.json`,
    ]);
    expect(mockListFilesInDirectory).toHaveBeenCalledWith(filesPath, fileType);
  });

  it('should handle error when listing files', () => {
    const directoryPath = './test/test_data';
    const fileType = 'txt';

    const mockReaddirSync = jest.spyOn(fs, 'readdirSync');
    mockReaddirSync.mockImplementation(() => {
      throw new Error('Listing files error');
    });

    expect(() =>
      utilityService.listFilesInDirectory(directoryPath, fileType),
    ).toThrowError('Listing files error');
    expect(mockReaddirSync).toHaveBeenCalledWith(directoryPath);
  });

  it('should handle non-existing file', () => {
    const params = ['/path/to/nonexistent/file.txt'];
    const filesPath = './test/test_data';
    const fileType = 'txt';

    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockReturnValue(false);

    const result = utilityService.readFiles(params, filesPath, fileType);
    expect(result).resolves.toEqual(undefined);
    expect(mockExistsSync).toHaveBeenCalledWith(
      '/path/to/nonexistent/file.txt',
    );
  });
});
