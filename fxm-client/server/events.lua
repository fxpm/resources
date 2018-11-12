

AddEventHandler('FXM:Events:Commands.CommandCreated', function(event)
  ExecuteCommand(event.command.command)
end)