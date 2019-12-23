export const redirect = (res, code, path) => {
  res.writeHeader(code, { Location: path });
  res.end();
}