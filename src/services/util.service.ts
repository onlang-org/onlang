// utility.service.ts
import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class UtilityService {
  /**
   * List all files with a specific file type in the given directory.
   *
   * @param {string} directoryPath - the path of the directory to list files from
   * @param {string} fileType - the type of files to list
   * @return {string[]} an array of file names with the specified file type
   */
  listFilesInDirectory(directoryPath: string, fileType: string): string[] {
    var re = /(?:\.([^.]+))?$/;

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
  readFiles(params: string[], filesPath: string, fileType: string): string[] {
    let foundFiles = [];
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
        throw new Error(`Error listing files: ${error.message}`);
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
