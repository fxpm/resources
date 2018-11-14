const { readFileSync } = require('fs');
const { join } = require('path');

let ACCESS_TOKEN = null;
try {
  ACCESS_TOKEN = readFileSync(
    join(GetResourcePath('fxm-api'), 'access_token'),
    'utf8',
  );
} catch (e) {
  console.error('Could not read ACCESS_TOKEN:', e.message);
}

if (!ACCESS_TOKEN) {
  console.error('No access token could be loaded.');
}

let HOST = null;
try {
  HOST = GetConvar('fxm_api', '');
} catch (e) {
  console.error('Could not read fxm_api Convar:', e.message);
}

if (HOST === '') {
  console.error('No `fxm_api` Convar is provided.');
}

let SOCKET_HOST = null;
try {
  SOCKET_HOST = GetConvar('fxm_io_host', '');
} catch (e) {
  console.error('Could not read fxm_io_host Convar:', e.message);
}

if (SOCKET_HOST === '') {
  console.error('No `fxm_io_host` Convar is provided.');
}
