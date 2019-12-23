import crypto from 'crypto'
import queryString from 'query-string'
import { addUser } from './db'
import { log } from '../utils/error'
import { tryPost, setBody } from '../utils/fetch-helpers'
import { generateJwt } from './auth'

export const addShopifyUser = async (query) => {
  const isValid = await isShopifyInstallRequest(query);
  if (!isValid) {
    return null;
  }

  const body = {
    client_id: process.env.FOR_SERVER_CODE_SHOPIFY_API_KEY,
    client_secret: process.env.FOR_SERVER_CODE_SHOPIFY_API_SECRET,
    code: query.code
  };

  const auth = await tryPost(`https://${query.shop}/admin/oauth/access_token`, setBody(body));
  if (!auth) {
    return null;
  }

  const user = await addUser(query, auth);
  if (!user) {
    return null;
  }

  const token = await generateJwt({
    hmac: query.hmac,
    code: query.code,
    shopUrl: query.shop
  });

  if (!token) {
    return null;
  }

  return { token, user };
}

// Notice: Keep as API so cache isn't involved with scope? Uhh...logging?
export const getAuthUrl = async (shopUrl) => {
  const apiKey = process.env.FOR_SERVER_CODE_SHOPIFY_API_KEY;
  const redirectUri = process.env.SHOPIFY_REDIRECT_URL;
  // TODO nonce
  const permissionUrl = `/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${redirectUri}`;
  const authUrl = `https://${shopUrl}/admin${permissionUrl}`;
  await log('created', { authUrl });
  return authUrl;
}

export const isShopifyInstallRequest = async (query) => {
  const result = (isValidShopifyRequest(query)
    && query.code);

  if (!result) {
    log(`query missing &code=XXX`, query);
  }

  return result;
}

const isValidShopifyRequest = async (query) => {
  query = { ...query };

  const hmac = query.hmac;
  delete query.hmac;
  query = queryString.stringify(query);

  const check = crypto
    .createHmac('sha256', process.env.FOR_SERVER_CODE_SHOPIFY_API_SECRET)
    .update(query)
    .digest('hex');

  const result = (hmac === check);

  if (!result) {
    await log('invalid hmac', { query, check, hmac });
  }

  return result;
}