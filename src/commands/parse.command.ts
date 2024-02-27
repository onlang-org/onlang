import { Command, CommandRunner } from 'nest-commander';
import { ParseService } from '../services/parse.service';

interface ONLangCommandOptions {}

@Command({
  name: 'parse',
  description: 'parse ONLang script',
  options: { isDefault: true },
})
export class ParseCommand extends CommandRunner {
  constructor(private readonly parseService: ParseService) {
    super();
  }

  /**
   * Asynchronously runs the function with the given parameters and options.
   *
   * @param {string[]} passedParams - an array of strings representing the parameters
   * @param {ONLangCommandOptions} [options] - optional options for the command
   * @return {Promise<void>} a Promise that resolves when the function completes
   */
  async run(
    passedParams: string[],
    options?: ONLangCommandOptions,
  ): Promise<void> {
    try {
      (await this.parseService.readAndParse(passedParams)).forEach(
        (returnObject) => {
          if (returnObject) {
            const parsedFileObject = (returnObject as any).data;
            console.log(Object.keys(parsedFileObject)[0] + ' is valid');
          } else {
            console.error(returnObject);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
}
