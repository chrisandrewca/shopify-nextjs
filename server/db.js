import easyDB from 'easydb-io'
import uuidv4 from 'uuid/v4'
import { log } from '../utils/error'

const db = easyDB({
  database: '',
  token: ''
})

// TODO database states, review me
// User has no shopUrl
// User has shopUrl but has not been authorized (failed, otherwise)
// User registers twice and orphans its secrets object when new user id generated

export const addUser = async (query, auth) => {
  const previouslyRegisteredAs = await dbGet(query.shop);
  if (previouslyRegisteredAs) {
    await dbDelete(previouslyRegisteredAs.id);
  }

  try {
    const id = uuidv4();
    const user = {
      id,
      shopUrl: query.shop
    };
    await db.put(query.shop, user);

    const secrets = {
      id,
      shopifyToken: auth.access_token,
      shopifyScope: auth.scope
    };

    await db.put(id, secrets);

    await log('created user', { user, secrets });
    return user;

  } catch (error) {
    await log(`unable to create user: ${error.message}`, {
      error,
      id,
      user,
      secrets
    });
    return null;
  }
}

export const getUser = async (shopUrl) => {
  try {
    return await db.get(shopUrl);
  } catch (error) {
    await log(`unable to get user: ${error.message}`, { error, shopUrl });
    return null;
  }
}

export const getSecrets = async (userId) => {
  try {
    return await db.get(userId);
  } catch (error) {
    await log(`unable to get secrets: ${error.message}`, { error, userId });
    return null;
  }
}

const dbGet = async (key) => {
  try {
    return await db.get(key);
  } catch (error) {
    await log('dbGet', error);
    return null;
  }
}

const dbDelete = async (key) => {
  try {
    return await db.delete(key);
  } catch (error) {
    await log('dbDelete', error);
    return null;
  }
}