import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

@Injectable()
export class ParseService {
  private onLangSchema;

  /**
   * Constructor for initializing the ConfigService.
   *
   * @param {ConfigService} configService - the configuration service
   * @return {void}
   */
  constructor(private readonly configService: ConfigService) {
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
    const files = await this.read(params);

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
   * Method to read files and directories.
   *
   * @param {string[]} params - array of file paths
   * @return {Promise<string[]>} array of found file paths
   */
  async read(params: string[]): Promise<string[]> {
    let foundFiles = [];
    if (params.length === 0) {
      const scriptsPath = this.configService.get('onlang.scriptsPath');
      console.log(`Scripts Directory: ${scriptsPath}`);

      //all files in directory schemaPath
      try {
        const files = await this.listFilesInDirectory(scriptsPath);
        files.forEach((file) => {
          console.log(`Script: ${file}`);
          foundFiles.push(`${scriptsPath}/${file}`);
        });
      } catch (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }
    } else {
      params.forEach((file) => {
        if (fs.existsSync(file)) {
          foundFiles.push(file);
          console.log(`Script: ${file} exists'}`);
        } else {
          console.log(`Script: ${file} does not exist`);
        }
      });
    }

    return foundFiles;
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
              return re.exec(file)[1].toLocaleLowerCase() === 'onl';
            }),
          );
        }
      });
    });
  }
}
