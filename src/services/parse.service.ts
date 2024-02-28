import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { UtilityService } from './util.service';

@Injectable()
export class ParseService {
  private onLangSchema: yaml.Schema;

  constructor(
    private readonly configService: ConfigService,
    private readonly utilService: UtilityService,
  ) {
    this.initializeSchema();
  }

  /**
   * Initializes the schema for the class.
   */
  private initializeSchema() {
    const onlangTag = new yaml.Type('!onlang', {
      kind: 'mapping',
      construct: function (data) {
        // Handle the construction of Survey objects
        return { data: data };
      },
    });

    this.onLangSchema = yaml.DEFAULT_SCHEMA.extend([onlangTag]);
  }

  /**
   * Read and parse the given parameters.
   *
   * @param {string[]} params - array of parameters to read and parse
   * @return {Promise<Array<unknown>>} a promise that resolves to an array of parsed objects
   */
  async readAndParse(params: string[]): Promise<Array<unknown>> {
    const files = await this.utilService.readFiles(
      params,
      this.configService.get('onlang.scriptsPath'),
      'onl',
    );

    const fileObjects: Array<unknown> = []; //array of js-yaml return objects

    if (files.length === 0) {
      throw new Error('No files found');
    } else {
      console.log(`parsing ${files.length} files`);

      files.forEach(async (file) => {
        console.log(`parsing ${file}`);
        try {
          const fileObject = await this.parse(file);
          fileObjects.push(fileObject);
        } catch (error) {
          console.error(`Error parsing ${file}: ${error.message}`);
        }
      });
    }

    return fileObjects;
  }

  /**
   * async function to parse a file and return a Promise of unknown type.
   *
   * @param {string} file - the path of the file to be parsed
   * @return {Promise<unknown>} the parsed document as a Promise
   */
  async parse(file: string): Promise<unknown> {
    // Get document, or throw exception on error
    try {
      const doc = yaml.load(fs.readFileSync(path.resolve(file), 'utf8'), {
        schema: this.onLangSchema,
      });

      return doc;
    } catch (e) {
      throw new Error(`Error parsing: ${e.message}`);
    }
  }
}
