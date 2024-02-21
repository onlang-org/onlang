import { Command, CommandRunner } from 'nest-commander';
import { ValidateService } from '../services/validate.service';

interface ONLangCommandOptions {}

@Command({
  name: 'validate',
  description: 'validate JSON schema for ONLang',
  options: { isDefault: true },
})
export class ValidateCommand extends CommandRunner {
  /**
   * Constructor for initializing the ValidateService.
   *
   * @param {ValidateService} validateService - the service for validation
   * @return {void}
   */
  constructor(private readonly validateService: ValidateService) {
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
      (await this.validateService.readAndValidate(passedParams)).forEach(
        (validateFunction) => {
          if (validateFunction.errors) {
            validateFunction.errors.forEach((error) => {
              console.error(error);
            });
          } else {
            console.log(
              validateFunction.schema.valueOf()['title'] + ' Schema is valid',
            );
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
}