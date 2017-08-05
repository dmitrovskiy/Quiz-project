import test from 'ava';
import { assert } from 'chai';
import _ from 'lodash';
import supertest from 'supertest-promised';
import app from '../../../src/app';
import data from '../../../config/orders.json';

const request = supertest(app);
let orders = [...data];

test.before('create orders', async () => {
  const responses = await Promise.all(
    _.map(orders, (order) => {
      return request
        .post('/orders')
        .set('content-type', 'application/json')
        .send(order)
        .expect(201);
    })
  );

  orders = _.map(responses, ({ body }) => body);
});

test('/stats/orders/relevance works as expected', async () => {
  const { body } = await request
    .get('/stats/orders/relevance')
    .set('content-type', 'application/json')
    .send()
    .expect(200);

  const first = _.first(body);
  assert.isDefined(first._id);
  assert.isDefined(first.frequency);
  assert.isAtLeast(first.frequency, 2);
});

test.after('delete orders', async () => {
  await Promise.all(_.map((order) => {
    return request
      .delete(`/orders/${order.id}`)
      .set('content-type', 'application/json')
      .send()
      .expect(200);
  }));
});
