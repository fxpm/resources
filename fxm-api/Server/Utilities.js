const Handler = (Group, EventName) => {
  Echo.private(`Server.${GetConvar('fxm_server_id', 'Public')}`).listen(
    `${Group}.${EventName}`,
    EventData => {
      setImmediate(() => {
        console.log(Group, EventName, 'emitted');
        emit(`FXM:API::Events:${Group}.${EventName}`, EventData);
        emitNet(`FXM:API::Events:${Group}.${EventName}`, EventData);
      });
    },
  );
};
