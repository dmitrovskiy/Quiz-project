import hooks from './hooks';
import Order from '../order/model';

export default function () {
  const app = this;

  app
    .service('/stats/orders/relevance', {
      find: async ({ query = {} }) => {
        const inputSort = query.$sort || 'desc';
        const sort = inputSort.toLowerCase() === 'desc' ? -1 : 1;

        return Order.aggregate([
          { $group: { _id: '$orderedItem', frequency: { $sum: 1 } } },
          { $sort: { frequency: sort } },
        ]);
      }
    })
    .before(hooks.before)
    .after(hooks.after);
}
