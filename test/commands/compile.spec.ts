import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Task Command', () => {
  let commandInstance: TestingModule;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule],
    }).compile();
  });

  it('should call the "init" method', async () => {
    const run = jest.spyOn(commandInstance, 'init');
    await CommandTestFactory.run(commandInstance);
    expect(run).toHaveBeenCalledTimes(1);
  });
});
