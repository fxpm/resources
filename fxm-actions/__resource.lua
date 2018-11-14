
fxm_action 'TeleportPlayer' {
  label = "Teleport a Player",
  description = "Teleport a player to a specified waypoint.",
  arguments = {
    {
      key = "player",
      label = "Player",
      help = "The player which should be teleported.",
      field = "search",
      options = {
        endpoint = "players",
        key = "license",
        display = "name"
      }
    },
    {
      key = "location",
      label = "Location",
      help = "Click a place on the map to teleport to.",
      field = "map_click"
    }
  }
}

fxm_action 'KickPlayer' {
  label = "Kick a Player",
  description = "Teleport a player to a specified waypoint.",
  arguments = {
    {
      key = "player",
      label = "Player",
      help = "The player which should be teleported.",
      field = "search",
      options = {
        endpoint = "players",
        key = "license",
        display = "name"
      },
      validate = {
        required = true
      }
    },
    {
      key = "reason",
      label = "Reason for Kick",
      help = "This will be provided to the kicked player.",
      field = "textarea",
      validate = {
        required = true
      }
    }
  }
}