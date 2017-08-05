import hooks from './hooks';
import packageInfo from '../../helpers/package-info';

export default function () {
  const app = this;

  app
    .service('/', {
      find: async () => ({
        message: 'Welcome to Quiz project API',
        version: packageInfo.version
      })
    })
    .before(hooks.before)
    .after(hooks.after);
}
