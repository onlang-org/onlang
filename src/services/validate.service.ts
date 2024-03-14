import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Ajv, { ValidateFunction } from 'ajv';
import * as fs from 'fs';
import path from 'path';
import { UtilityService } from './util.service';
import addFormat from 'ajv-formats';

@Injectable()
export class ValidateService {
  /**
   * Constructor for initializing the ConfigService and UtilityService.
   *
   * @param {ConfigService} configService - the config service for the application
   * @param {UtilityService} utilService - the utility service for the application
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly utilService: UtilityService,
  ) {}

  /**
   * Read and validate the given parameters.
   *
   * @param {string[]} params - array of parameters to be validated
   * @return {Promise<Array<ValidateFunction>>} an array of validateFunctions
   */
  async readAndValidate(params: string[]): Promise<Array<ValidateFunction>> {
    const files = await this.utilService.readFiles(
      params,
      this.configService.get('onlang.schemaPath'),
      'json',
    );

    const validateFunctions: Array<ValidateFunction> = [];

    if (files.length === 0) {
      console.error('No files found');
    } else {
      console.log(`validating ${files.length} files`);

      for (const file of files) {
        console.log(`validating ${file}`);
        try {
          const validateFunction = await this.validate(file);
          validateFunctions.push(validateFunction);
        } catch (error) {
          console.error(`Error validating ${file}: ${error.message}`);
        }
      }
    }

    return validateFunctions;
  }

  /**
   * Validate a JSON schema file using Ajv.
   *
   * @param {string} file - the path to the JSON schema file
   * @return {ValidateFunction} a function for validating data against the JSON schema
   */
  validate(file: string): ValidateFunction {
    const jsonSchema = {
      ...JSON.parse(fs.readFileSync(path.resolve(file), 'utf8')),
    } as const;

    if (jsonSchema.$schema) {
      delete jsonSchema.$schema;
    }

    if (jsonSchema.id) {
      delete jsonSchema.id;
    }

    const ajv = new Ajv({
      strict: false,
      coerceTypes: true,
    });

    addFormat(ajv);

    return ajv.compile(jsonSchema);
  }
}
