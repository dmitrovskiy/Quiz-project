import path from 'path';
import compress from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import correlator from 'express-correlation-id';
import middleware from './middleware';
import services from './services';

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app
  .use(compress())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(correlator())
  .use(middleware.cidHandler())
  .use(middleware.packageVersion())
  .use(middleware.requestLogger())
  .configure(hooks())
  .configure(rest())
  .configure(services)
  .use(middleware.notFound())
  .use(middleware.errorLogger())
  .use(middleware.handler());

module.exports = app;
