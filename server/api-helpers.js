import { log, tryOrLogAsync } from "../utils/error";

/*
 * API middleware
 */
// const prewareByVerb = {
//   DELETE: [],
//   GET: [],
//   POST: [],
//   PUT: []
// }

/*
 * API responses
 */
export const badRequest = (res, error) => {
  res.status(400).json({ error });
}

export const internalError = (res, error = 'Internal error.') => {
  res.status(500).json({ error });
}

export const allGood = (res, obj) => {
  res.status(200).json(obj);
}

/*
 * API helpers
 */
const unhandled = async (req, res) => {
  // TODO error handling
  internalError(res);
}

const handlerByVerb = {
  DELETE: unhandled,
  GET: unhandled,
  POST: unhandled,
  PUT: unhandled
}

export const runApi = async (req, res, handlers) => { // preware=null) => {
  handlers = { ...handlerByVerb, ...handlers };

  const run = handlers[req.method];
  // preware = preware
  //   ? preware[req.method]
  //   : prewareByVerb[req.method];

  // req.mware_results = {};
  // for (const pre of preware) {
  //   if ((await pre(req, res))) {
  //     continue;
  //   }
  //   break;
  // }

  await log('run api', { method: req.method, url: req.url });
  const _null = await tryOrLogAsync(run(req, res));

  if (_null === null) {
    internalError(res);
  }
}