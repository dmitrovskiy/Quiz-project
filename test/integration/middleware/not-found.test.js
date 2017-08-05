import test from 'ava';
import supertest from 'supertest-promised';
import app from '../../../src/app';

const request = supertest(app);

test('not found middleware works as expected', async () => {
  await request
    .get('/evil')
    .send()
    .expect(404);
});
