const fs = require('fs');
const { basename } = require('path');

const resources = [];
const walkResources = (dir, fileArray) => {
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

on('onResourceStart', name => {
  if (name !== GetCurrentResourceName()) {
    return;
  }

  walkResources('./');
  emit('FXM:Client::ResourcesWalked', resources);
});
