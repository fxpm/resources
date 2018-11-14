const CommandExecuted = async Event => {
  try {
    await HTTP.patch(`/commands/${Event.command.id}`, {
      data: {
        type: 'commands',
        id: Event.command.id.toString(),
        attributes: {
          executed_at: new Date().toISOString(),
        },
      },
    });
  } catch (e) {
    console.error(`Could not mark ${Event.command.id} as completed.`);
  }
};

on('FXM:API::Events:Commands.CommandCreated', Event => {
  try {
    ExecuteCommand(Event.command.command);
  } catch (e) {
    console.log(
      `Failed to execute command [${Event.command.command}]:`,
      e.message,
    );
  }

  CommandExecuted(Event);
});

on('FXM:API::Events:Commands.CommandUpdated', Event => {
  if (Event.executed_at !== null) {
    return;
  }

  CommandExecuted(Event);
});
