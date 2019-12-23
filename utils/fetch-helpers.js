import fetch from 'isomorphic-unfetch'
import { log, tryOrLog, tryStringify } from './error'
import queryString from 'query-string'

export const setQuery = (query, obj = {}) => {
  query = tryOrLog(() => queryString.stringify(query)) || '';
  query = query
    ? `?${query}`
    : '';
  return { ...obj, query: `${query}` };
}

export const setHeaders = (headers, obj = {}) => {
  headers = !!obj && obj.headers
    ? { ...obj.headers, ...headers }
    : { ...headers };
  return { ...obj, headers };
}

export const setMethod = (method, obj = {}) => {
  return { ...obj, method };
}

export const setBody = (body, obj = {}) => {
  body = tryStringify(body);
  return { ...obj, body };
}

export const tryPost = async (url, init) => {
  init = setMethod('post',
    setHeaders({ 'Content-Type': 'application/json' }, init)
  );

  return await tryFetch(url, init);
}

export const tryPostApi = async (endpoint, payload) => {
  init = setMethod('post',
    setHeaders({ 'Content-Type': 'application/json' }, init)
  );

  return await tryFetch(`${process.env.BASE_URL}${endpoint}`, init);
}

export const tryGetApi = async (endpoint, init) => {
  init = setMethod('get',
    setHeaders({ credentials: 'same-origin' },
      init.query ? init : setQuery('', init)
    )
  );

  const url = `${process.env.BASE_URL}${endpoint}${init.query}`;
  return await tryFetch(url, init);
}

const tryFetch = async (url, init) => {
  try {
    await log('fetch', { url, init });
    const res = await fetch(url, init);

    if (res.ok) {
      await log('response', { url: res.url, status: res.status, text: res.statusText });
      return await res.json();
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    const code = response
      ? response.status
      : 400;
    const message = response
      ? response.statusText
      : error.message;
    await log('response', { message, code });
    return {};
  }
}