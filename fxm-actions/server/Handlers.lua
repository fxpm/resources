

AddEventHandler('FXM:Actions::' .. GetCurrentResourceName() .. ':KickPlayer', function(Action)
  print('KickPlayer action has been executed.')
end)