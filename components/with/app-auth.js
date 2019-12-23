import React from 'react'
import { tryGetApi, setHeaders } from '../../utils/fetch-helpers'

export default (Component, redirectUrl = null) => {
  const wrapper = (props) => {
    return (
      <Component {...props} />
    )
  }

  wrapper.getInitialProps = async (ctx) => {
    const { authorized } = await validateToken(ctx);

    if (authorized) {
      const props = Component.getInitialProps &&
        (await Component.getInitialProps(ctx));
      return { ...props };
    } else {
      if (!redirectUrl) {
        redirectUrl = '/app/login';
      }
      ctx.res.writeHead(303, { Location: redirectUrl });
      ctx.res.end();
    }
  }

  return wrapper;
}

const validateToken = async ({ req }) => {
  const init = setHeaders({ cookie: req.headers.cookie });
  return await tryGetApi('/api/validate-token', init);
}