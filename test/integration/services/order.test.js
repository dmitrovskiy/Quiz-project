import test from 'ava';
import { assert } from 'chai';
import _ from 'lodash';
import supertest from 'supertest-promised';
import app from '../../../src/app';
import data from '../../../config/orders.json';

const request = supertest(app);
let orders = [...data];

test.serial('create orders work as expected', async () => {
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

test.serial('update order works as expected', async () => {
  const order = _.first(orders);
  order.orderedItem = 'Test';

  const { body } = await request
    .put(`/orders/${order.id}`)
    .set('content-type', 'application/json')
    .send(order)
    .expect(200);

  assert.equal(body.orderedItem, order.orderedItem);
});

test.serial('patch order works as expected', async () => {
  const order = _.first(orders);
  order.orderedItem = 'Macbook';

  const { body } = await request
    .patch(`/orders/${order.id}`)
    .set('content-type', 'application/json')
    .send({ orderedItem: order.orderedItem })
    .expect(200);

  assert.equal(body.orderedItem, order.orderedItem);
});

test.serial('get all orders', async () => {
  const response = await request
    .get('/orders')
    .set('content-type', 'application/json')
    .send()
    .expect(200);

  assert.isAtLeast(response.body.length, orders.length);
});

test.serial('get order', async () => {
  const order = _.first(orders);

  const response = await request
    .get(`/orders/${order.id}`)
    .set('content-type', 'application/json')
    .send()
    .expect(200);

  assert.equal(response.body.id, order.id);
});

test.serial('delete orders', async () => {
  await Promise.all(_.map((order) => {
    return request
      .delete(`/orders/${order.id}`)
      .set('content-type', 'application/json')
      .send()
      .expect(200);
  }));
});
