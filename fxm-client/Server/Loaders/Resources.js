AddEventHandler('FXM:Client::ResourcesWalked', async resources => {
  const publishData = [];
  for (let r = 0, rl = resources.length; r < rl; r++) {
    publishData.push({
      name: resources[r],
      state: GetResourceState(resources[r]),
      path: GetResourcePath(resources[r]),
    });
  }

  try {
    await HTTP.post('/resources/bulk', {
      data: publishData,
    });

    console.log('Resources have been published.');
    emit('FXM:Client::PublishActions', resources);
  } catch (e) {
    console.error(
      'Could not publish resources. Additional publishing is halted.',
    );
    console.error(e.message);
  }
});
