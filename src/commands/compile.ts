import { ConfigService } from '@nestjs/config';
import { Command, CommandRunner } from 'nest-commander';
import * as fs from 'fs';
import { compileFromFile } from '@rajatasusual/json-schema-2-ts';
import path from 'path';

interface ONLangCommandOptions {
}

@Command({ name: 'compile', description: 'Compile JSON schema for ONLang', options: { isDefault: true } })
export class CompileCommand extends CommandRunner {
  /**
   * Constructor for initializing the ConfigService.
   *
   * @param {ConfigService} configService - the configuration service
   * @return {void} 
   */
  constructor(private readonly configService: ConfigService) {
    super();
  }

  /**
   * A description of the entire function.
   *
   * @param {string[]} passedParams - description of parameter
   * @param {ONLangCommandOptions} options - description of parameter
   * @return {Promise<void>} description of return value
   */
  async run(passedParams: string[], options?: ONLangCommandOptions): Promise<void> {
    await this.readAndCompile(passedParams, options);
  }

  /**
   * Asynchronously reads and compiles the specified files.
   *
   * @param {string[]} params - an array of file paths to read and compile
   * @param {ONLangCommandOptions} [options] - optional command options
   * @return {Promise<void>} a Promise that resolves when the files are read and compiled
   */
  async readAndCompile(params: string[], options?: ONLangCommandOptions): Promise<void> {
    const files = await this.read(params);

    if (files.length === 0) {
      console.log('No files to compile');
      return;
    } else {
      console.log(`Compiling ${files.length} files`);

      files.forEach(async file => {
        console.log(`Compiling ${file}`);
        await this.compile(file)
      });
    }

  }

  /**
   * Read function to process the given parameters and return found files.
   *
   * @param {string[]} params - array of parameters to process
   * @return {Promise<string[]>} array of found files
   */
  private async read(params: string[]): Promise<string[]> {

    let foundFiles = [];
    if (params.length === 0) {
      const schemaPath = this.configService.get('onlang.schemaPath');
      console.log(`Schema Directory: ${schemaPath}`);

      //all files in directory schemaPath
      try {
        const files = await this.listFilesInDirectory(schemaPath);
        files.forEach(file => {
          console.log(`Schema: ${file}`);
          foundFiles.push(`${schemaPath}/${file}`);
        });
      } catch (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }
    } else {
      params.forEach(file => {
        if (fs.existsSync(file)) {
          foundFiles.push(file);
          console.log(`Schema: ${file} exists'}`);
        } else {
          console.log(`Schema: ${file} does not exist`);
        }

      })
    }

    return foundFiles;
  }

  /**
   * Compiles the given file to a TypeScript file and logs the result.
   *
   * @param {string} file - the file to compile
   * @return {Promise<void>} a Promise that resolves when the compilation is complete
   */
  async compile(file: string): Promise<void> {
    try{
      fs.writeFileSync(`${path.parse(file).dir}/${path.parse(file).name}.ts`, await compileFromFile(file));
      console.log(`Compiled ${path.parse(file).dir}/${path.parse(file).name}.ts`);
    } catch (error) {
      throw new Error(`Error compiling ${file}: ${error.message}`);
    }
  }

  /**
   * Asynchronously lists files in a directory and returns an array of string representing the file names.
   *
   * @param {string} directoryPath - the path of the directory to list files from
   * @return {Promise<string[]>} a promise that resolves with an array of string representing the file names
   */
  private async listFilesInDirectory(directoryPath: string): Promise<string[]> {
    var re = /(?:\.([^.]+))?$/;

    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.filter(file => {
            return re.exec(file)[1].toLocaleLowerCase() === 'json';
          }));
        }
      });
    });
  }
}