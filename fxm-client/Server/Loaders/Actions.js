const ACTION_METADATA_NAME = 'fxm_action';

AddEventHandler('FXM:Client::PublishActions', async resources => {
  const publishData = [];
  for (let r = 0, rl = resources.length; r < rl; r++) {
    const numMetadata = GetNumResourceMetadata(
      resources[r],
      ACTION_METADATA_NAME,
    );

    for (let m = 0, ml = numMetadata; m < ml; m++) {
      const name = GetResourceMetadata(resources[r], ACTION_METADATA_NAME, m);
      const config = GetResourceMetadata(
        resources[r],
        `${ACTION_METADATA_NAME}_extra`,
        m,
      );

      publishData.push({
        name,
        resource: resources[r],
        ...JSON.parse(config),
      });
    }
  }

  try {
    await HTTP.post('/action-types/bulk', {
      data: publishData,
    });

    console.log(`Published ${publishData.length} resource actions.`);
    publishData.forEach(a => {
      emit('FXM:Client::ResourceActionPublished', a.resource, a.name);
    });
  } catch (e) {
    console.log('Publish of resource actions failed.', e.message);
  }
});
