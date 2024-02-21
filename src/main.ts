import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

/**
 * Asynchronous function for bootstrapping.
 *
 */
async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error']);
}
bootstrap();
