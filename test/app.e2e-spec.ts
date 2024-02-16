import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/process-onlang (GET)', () => {
    return request(app.getHttpServer())
      .get('/process-onlang?code=object SampleObject generate-code')
      .expect(200)
      .expect({
        type: 'object',
        name: 'SampleObject',
        properties: [],
        commands: [ 'generate-code' ]
      });
  })

  afterAll(async () => {
    await app.close();
  })
});
