import debug from 'debug';
import pkginfo from '../package.json';
import app from './app';

const debugServer = debug('app:server');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  debugServer(`${pkginfo.name} application started on ${app.get('host')}:${port}`)
);
