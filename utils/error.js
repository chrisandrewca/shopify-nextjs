export const log = async (msg, ...objs) => {
  if (process.env.SNJS_DEBUG) {
    objs = await Promise.all(
      objs.map(o => tryStringify(o))
    );

    if (typeof window === 'undefined') {
      console.debug();
      console.groupCollapsed(`[[ ${msg} ]]`, ...objs || 'trace');
      console.trace();
      console.groupEnd();
      console.debug();
    } else {
      console.groupCollapsed(msg, ...objs || 'trace');
      console.trace();
      console.groupEnd();
    }
  } // TODO production log
}

export const tryParse = (payload) =>
  tryOrLog(() => JSON.parse(payload)) || {}

export const tryStringify = (obj) =>
  tryOrLog(() => JSON.stringify(obj)) || ''

export const tryOrLog = (func, msg = '') => {
  try {
    return func();
  } catch (error) {
    log(`${msg} ${error.message}`, error);
    return null;
  }
}

export const tryOrLogAsync = async (promise, msg = '') => {
  try {
    return await promise;
  } catch (error) {
    log(`${msg} ${error.message}`, error);
    return null;
  }
}