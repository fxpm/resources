const EchoInstance = require("laravel-echo");
const fs = require("fs");
const { resolve, join, basename } = require("path");
const io = require("socket.io-client");

const resources = [];
var walkResources = function(dir, fileArray) {
  let files = fs.readdirSync(dir);
  let filelist = fileArray || [];
  files.forEach(function(file) {
    if (fs.statSync(join(dir, file)).isDirectory()) {
      filelist = walkResources(join(dir, file, "/"), filelist);
    } else {
      if (fs.existsSync(join(dir, "__resource.lua"))) {
        const resourceName = basename(dir);
        if (resources.indexOf(resourceName) === -1) {
          resources.push(resourceName);
        }
      }
    }
  });
};

const HOST = GetConvar("fxm_io_host", "");
if (HOST === "") {
  console.error(
    "FXM requires a Socket server to function. Functionality is limited."
  );
} else {
  global.Echo = new EchoInstance({
    broadcaster: "socket.io",
    host: HOST,
    client: io,
    auth: {
      headers: {
        Authorization: `Bearer ${GetConvar("fxm_key", "")}`
      }
    }
  });

  Echo.channel("General");
  Echo.private("Server.1");
}

on("FXM:WalkResources", () => {
  console.log("Beginning Resource Walk...");
  walkResources(resolve("../"));
  console.log(`Found ${resources.length} potential resources.`);

  emit("FXM:ResourcesWalked", resources);
});
