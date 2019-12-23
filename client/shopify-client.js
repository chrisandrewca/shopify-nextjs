import { Redirect } from '@shopify/app-bridge/actions'
import { createApp } from '@shopify/app-bridge'
import { setQuery, tryGetApi } from '../utils/fetch-helpers';
import { log, tryOrLog } from '../utils/error';

export const redirectToShopifyAuth = async (shopUrl) => {
  const { authUrl, apiKey } = (await getInstallAuthUrl(shopUrl));
  if (!authUrl) {
    await log('Invalid shopify authorize url', { authUrl, shopUrl });
    return;
  }

  if (window.top === window.self) {
    window.location.assign(authUrl);
  } else {
    tryOrLog(() => {
      const app = createApp({
        apiKey: apiKey,
        shopOrigin: shopUrl
      });
      Redirect.create(app).dispatch(Redirect.Action.ADMIN_PATH, authUrl);
    });
  }
}

const getInstallAuthUrl = async (shopUrl) => {
  const init = setQuery({ shopUrl });
  return await tryGetApi('/api/shopify/install-auth-url', init);
}