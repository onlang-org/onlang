import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

/**
 * Asynchronous function for bootstrapping.
 *
 */
async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

/**
 * Asynchronously initializes the function, creating a default environment if the .env file does not exist, and then bootstraps the application.
 *
 * @return {Promise<void>} A promise that resolves once the initialization and bootstrapping are complete.
 */
async function intialize() {
  if (!existsSync('./.env')) {
    console.error('.env file not found. Creating default environment');
    //create default .env file
    writeFileSync(
      './.env',
      'onlang.schemaPath=./schema\nonlang.scriptsPath=./onl',
      'utf8',
    );

    require('dotenv').config();

    console.log('Created default environment.');
  }

  await bootstrap();
}

intialize();
