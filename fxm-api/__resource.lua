
-- Setup Base Requirements
server_script "Server/Main.js"
server_script "Server/HTTP.js"
server_script "Server/Socket.js"
server_script "Server/Utilities.js"

server_script "Server/Events/Command.js"

server_script "Handlers/Server/Commands.js"

resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

dependency 'yarn'