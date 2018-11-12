const EchoInstance = require('laravel-echo');
const Axios = require('axios');
const fs = require('fs');
const { resolve, join, basename } = require('path');
const io = require('socket.io-client');

const resources = [];
var walkResources = function(dir, fileArray) {
  let files = fs.readdirSync(dir);
  let filelist = fileArray || [];

  files.forEach(function(file) {
    if (fs.statSync(join(dir, file)).isDirectory()) {
      filelist = walkResources(join(dir, file, '/'), filelist);
    } else {
      if (fs.existsSync(join(dir, '__resource.lua'))) {
        const resourceName = basename(dir);
        if (resources.indexOf(resourceName) === -1) {
          resources.push(resourceName);
        }
      }
    }
  });
};

let ACCESS_TOKEN = null;
try {
  ACCESS_TOKEN = fs.readFileSync(
    resolve(GetResourcePath(GetCurrentResourceName()), './access_token'),
    'utf8',
  );

  console.log(ACCESS_TOKEN);
} catch (e) {
  console.error(e.message);
}

if (!ACCESS_TOKEN) {
  console.error('No access_token file exists.');
}

const HOST = GetConvar('fxm_io_host', '');
if (HOST === '') {
  console.error(
    'FXM requires a Socket server to function. Functionality is limited.',
  );
} else {
  global.Echo = new EchoInstance({
    broadcaster: 'socket.io',
    host: HOST,
    client: io,
    namespace: 'FXM.Events',
    auth: {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  });

  global.HTTP = Axios.create({
    baseURL: GetConvar('fxm_api', ''),
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  Echo.channel('General');
  Echo.private(`Server.${GetConvar('fxm_guid', '')}`)
    .listen('Commands.CommandCreated', e => {
      emit('FXM:Events:Commands.CommandCreated', e);
      HTTP.patch(`/commands/${e.command.id}`, {
        data: {
          id: e.command.id.toString(),
          type: 'commands',
          attributes: {
            executed_at: new Date().toISOString(),
          },
        },
      })
        .then(r => {
          console.log(
            'Told FX Manager that Command has finished:',
            e.command.command,
          );
        })
        .catch(e => {
          console.error('Could not tell FXM command finished:', e.message);
        });
    })
    .listen('Commands.CommandCreated', e => {
      emit('FXM:Events:Commands.CommandCreated', e);
    });
}

on('FXM:WalkResources', () => {
  console.log('Beginning Resource Walk...');
  walkResources(resolve('../'));
  console.log(`Found ${resources.length} potential resources.`);

  emit('FXM:ResourcesWalked', resources);
});
