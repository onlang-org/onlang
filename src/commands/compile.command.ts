import { Command, CommandRunner } from 'nest-commander';
import { CompileService } from '../services/compile.service';

interface ONLangCommandOptions {}

@Command({
  name: 'compile',
  description: 'Compile JSON schema for ONLang',
  options: { isDefault: true },
})
export class CompileCommand extends CommandRunner {
  constructor(private readonly compileService: CompileService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: ONLangCommandOptions,
  ): Promise<void> {
    try {
      (await this.compileService.readAndCompile(passedParams)).forEach(
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
