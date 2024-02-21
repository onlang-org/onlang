import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Ajv, { ValidateFunction } from 'ajv';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class ValidateService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Read and validate the given parameters.
   *
   * @param {string[]} params - array of parameters to be validated
   * @return {Promise<Array<ValidateFunction>>} an array of validateFunctions
   */
  async readAndValidate(params: string[]): Promise<Array<ValidateFunction>> {
    const files = await this.read(params);

    const validateFunctions: Array<ValidateFunction> = []; //array of validateFunctions

    if (files.length === 0) {
      throw new Error('No files found');
    } else {
      console.log(`validating ${files.length} files`);

      files.forEach(async (file) => {
        console.log(`validating ${file}`);
        try {
          const validateFunction = await this.validate(file);
          validateFunctions.push(validateFunction);
        } catch (error) {
          console.error(`Error validating ${file}: ${error.message}`);
        }
      });
    }

    return validateFunctions;
  }

  /**
   * Method to read files and directories.
   *
   * @param {string[]} params - array of file paths
   * @return {Promise<string[]>} array of found file paths
   */
  async read(params: string[]): Promise<string[]> {
    let foundFiles = [];
    if (params.length === 0) {
      const schemaPath = this.configService.get('onlang.schemaPath');
      console.log(`Schema Directory: ${schemaPath}`);

      //all files in directory schemaPath
      try {
        const files = await this.listFilesInDirectory(schemaPath);
        files.forEach((file) => {
          console.log(`Schema: ${file}`);
          foundFiles.push(`${schemaPath}/${file}`);
        });
      } catch (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }
    } else {
      params.forEach((file) => {
        if (fs.existsSync(file)) {
          foundFiles.push(file);
          console.log(`Schema: ${file} exists'}`);
        } else {
          console.log(`Schema: ${file} does not exist`);
        }
      });
    }

    return foundFiles;
  }

  /**
   * Validates a given file using a JSON schema.
   *
   * @param {string} file - the file path to be validated
   * @return {Promise<ValidateFunction>} a Promise that resolves to a function for validating the JSON schema
   */
  async validate(file: string): Promise<ValidateFunction> {
    const jsonSchema = {
      ...JSON.parse(fs.readFileSync(path.resolve(file), 'utf8')),
    } as const;
    const ajv = new Ajv({
      strict: false,
      coerceTypes: true,
    });

    const addFormats = require('ajv-formats').default;

    addFormats(ajv);

    return ajv.compile(jsonSchema);
  }

  /**
   * A function that lists files in a directory.
   *
   * @param {string} directoryPath - the path of the directory
   * @return {Promise<string[]>} a promise that resolves to an array of strings
   */
  async listFilesInDirectory(directoryPath: string): Promise<string[]> {
    var re = /(?:\.([^.]+))?$/;

    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            files.filter((file) => {
              return re.exec(file)[1].toLocaleLowerCase() === 'json';
            }),
          );
        }
      });
    });
  }
}
