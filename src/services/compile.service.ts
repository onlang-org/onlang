import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Ajv, { ValidateFunction } from 'ajv';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class CompileService {
  constructor(private readonly configService: ConfigService) {}

  async readAndCompile(params: string[]): Promise<Array<ValidateFunction>> {
    const files = await this.read(params);

    const validateFunctions: Array<ValidateFunction> = []; //array of validateFunctions

    if (files.length === 0) {
      throw new Error('No files found');
    } else {
      console.log(`Compiling ${files.length} files`);

      files.forEach(async (file) => {
        console.log(`Compiling ${file}`);
        try {
          const validateFunction = await this.compile(file);
          validateFunctions.push(validateFunction);
        } catch (error) {
          console.error(`Error compiling ${file}: ${error.message}`);
        }
      });
    }

    return validateFunctions;
  }

  private async read(params: string[]): Promise<string[]> {
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

  private async compile(file: string): Promise<ValidateFunction> {
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

  private async listFilesInDirectory(directoryPath: string): Promise<string[]> {
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
