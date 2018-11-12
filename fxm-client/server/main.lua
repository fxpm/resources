local resources = {}

--[[
  Event: FXM:ResourcesWalked

  Triggered when resources have been walked. Accepts
  the table of resources as it's only argument.
]]
AddEventHandler(
  "FXM:ResourcesWalked",
  function(r)
    resources = r
  end
)

--[[
  Event: FXM:ServerClientReady

  Triggers by onResourceStart.
]]
AddEventHandler(
  "FXM:ServerClientReady",
  function()
    TriggerEvent("FXM:WalkResources")
  end
)

--[[
  Event: onResourceStart

  Triggered when the fxm-client resource has been started
  by the FX Server resource manager.
]]
AddEventHandler(
  "onResourceStart",
  function(name)
    if name == GetCurrentResourceName() then
      TriggerEvent("FXM:ServerClientReady")
    end
  end
)

AddEventHandler(
  "FXM:ManagerEventReceived",
  function(event, payload)
  end
)
