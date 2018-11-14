const EchoClient = require('laravel-echo');
const io = require('socket.io-client');

const Echo = new EchoClient({
  broadcaster: 'socket.io',
  host: SOCKET_HOST,
  client: io,
  namespace: 'FXM.Events',
  auth: {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  },
});

Echo.connector.socket.on('connect', () => {
  console.log('FXM Socket has connected successfully.');
});

Echo.connector.socket.on('disconnect', reason => {
  console.error('FXM Socket has been disconnected.', reason);
});

Echo.connector.socket.on('reconnect', attemptNumber => {
  console.log('FXM Socket has reconnected after', attemptNumber, 'attempts.');
});

Echo.connector.socket.on('reconnecting', attemptNumber => {
  console.log(
    'FXM Socket is attempting to reconnect. This is attempt number',
    attemptNumber,
    '.',
  );
});

Echo.connector.socket.on('reconnect_failed', error => {
  console.error(
    'FXM Socket failed to reconnect and will not try again. Restart the resource.',
  );
  console.error(error.message);
});
