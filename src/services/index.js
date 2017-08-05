import mongoose from 'mongoose';
import Promise from 'bluebird';
import main from './main';
import orderRelevance from './order-relevance';
import order from './order';

export default function () {
  const app = this;

  mongoose.connect(app.get('database'), { useMongoClient: true });
  mongoose.Promise = Promise;

  app
    .configure(main)
    .configure(order)
    .configure(orderRelevance);
}
