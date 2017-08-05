import service from 'feathers-mongoose';
import Model from './model';
import hooks from './hooks';

export default function () {
  const app = this;

  app.service(
      '/orders',
      service({
        Model,
        lean: false
      })
    )
    .before(hooks.before)
    .after(hooks.after);
}
