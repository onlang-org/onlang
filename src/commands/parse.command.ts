import { Command, CommandRunner } from 'nest-commander';
import { ParseService } from '../services/parse.service';

interface CommandOptions {}

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
   * @param {CommandOptions} [_options] - optional options for the command
   * @return {Promise<void>} a Promise that resolves when the function completes
   */
  async run(passedParams: string[], _options?: CommandOptions): Promise<void> {
    try {
      const fileObjects = await this.parseService.readAndParse(passedParams);
      for (const returnObject of fileObjects) {
        if (returnObject) {
          console.log(Object.keys(returnObject)[0] + ' is valid');
        } else {
          console.error(returnObject + ' is invalid');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
