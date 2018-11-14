const HTTP = require('../../Server/http');

const ActionExecuted = Event => {
  HTTP.patch(`/actions/${Event.action.id}`, {
    data: {
      type: 'actions',
      id: Event.action.id,
      attributes: {
        executed_at: new Date().toISOString(),
      },
    },
  });
};

const DispatchAction = Event => {
  emit(`FXM:API::Action:${Event.action.type.id}`, Event);
  emitNet(`FXM:API::Action:${Event.action.type.id}`, Event);
};

on('FXM:API::Events:Actions.ActionCreated', Event => {
  ActionExecuted(Event);
  DispatchAction(Event);
});
