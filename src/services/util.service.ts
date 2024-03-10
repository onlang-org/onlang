// utility.service.ts
import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { InquirerService } from 'nest-commander';
import * as onst from '@onlang-org/onst';

@Injectable()
export class UtilityService {
  constructor(private readonly inquirerService: InquirerService) {}
  /**
   * List all files with a specific file type in the given directory.
   *
   * @param {string} directoryPath - the path of the directory to list files from
   * @param {string} fileType - the type of files to list
   * @return {string[]} an array of file names with the specified file type
   */
  listFilesInDirectory(directoryPath: string, fileType: string): string[] {
    const re = /(?:\.([^.]+))?$/;

    return fs.readdirSync(directoryPath).filter((file) => {
      return re.exec(file)[1].toLocaleLowerCase() === fileType;
    });
  }

  /**
   * Reads files from the specified directory or from the list of provided file paths.
   *
   * @param {string[]} params - array of file paths to be checked
   * @param {string} filesPath - the directory path to read files from
   * @param {string} fileType - the type of files to look for
   * @return {string[]} array of found file paths
   */
  async readFiles(
    params: string[],
    filesPath: string,
    fileType: string,
  ): Promise<string[]> {
    const foundFiles: string[] = [];

    if (params.length === 0) {
      console.log(`Files Directory: ${filesPath}`);

      //all files in directory schemaPath
      try {
        const files = this.listFilesInDirectory(filesPath, fileType);
        files.forEach((file) => {
          console.log(`File: ${file}`);
          foundFiles.push(`${filesPath}/${file}`);
        });
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.info(`The directory ${filesPath} does not exist.`);
          switch (fileType) {
            case onst.FileType.SCHEMA:
              await this.inquirerService.inquirer
                .prompt({
                  name: 'answer',
                  message:
                    'Do you want to create it and download default schemata?',
                  type: 'confirm',
                })
                .then(async (input) => {
                  if (input['answer']) {
                    await this.inquirerService.inquirer
                      .prompt({
                        name: 'answer',
                        message:
                          'Where do you want to download the schemata from?',
                        type: 'list',
                        choices: ['onst', 'Schemastore'],
                      })
                      .then(async (input) => {
                        await onst.fetchSchemata(
                          input['answer'] === 'Schemastore',
                        );
                      });
                  }
                });
              break;
            case onst.FileType.ONLANG:
              await this.inquirerService.inquirer
                .prompt({
                  name: 'answer',
                  message:
                    'Do you want to create it and download examples from schemata?',
                  type: 'confirm',
                })
                .then(async (input) => {
                  if (input['answer']) {
                    const source = await this.inquirerService.inquirer.prompt({
                      name: 'answer',
                      message:
                        'Where do you want to download the examples from?',
                      type: 'list',
                      choices: ['onst', 'Schemastore'],
                    });

                    await onst.generateExampleONL({
                      schemastore: source['answer'] === 'Schemastore',
                      write: true,
                      destination: filesPath,
                    });
                  }
                });
          }
        }
      }
    } else {
      params.forEach((file) => {
        if (fs.existsSync(file)) {
          foundFiles.push(file);
          console.log(`File: ${file} exists'}`);
        } else {
          console.log(`File: ${file} does not exist`);
        }
      });
    }

    return foundFiles;
  }
}
