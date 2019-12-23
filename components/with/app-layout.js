// css order of application to override polaris styles
import polaris from '@shopify/polaris/styles.css'
import appcss from '../../css/app.css'

import React from 'react'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'
import { parseCookies } from 'nookies'

import Nav from '../nav'
import { tryParse } from '../../utils/error'

export default (Component) => {
  const wrapper = (props) => {

    const withShopMarkup = (
      // <div style={{ background: 'red' }}>
      <div>
        <AppProvider>
          <Provider
            config={{
              apiKey: props.apiKey,
              shopOrigin: props.shopUrl,
              forceRedirect: true
            }}>
            <Component {...props} />
          </Provider>
        </AppProvider>
      </div>
    );

    const withoutShopMarkup = (
      // <div style={{ background: 'blue' }}>
      <div>
        <AppProvider>
          <Component {...props} />
        </AppProvider>
      </div>
    );

    const appMarkup = props.shopUrl
      ? withShopMarkup
      : withoutShopMarkup;

    return (
      <div>
        <Head>
          <title>Shopify NextJS - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        {appMarkup}
        <style jsx>{polaris}</style>
        <style jsx>{appcss}</style>
      </div>
    )
  }

  wrapper.getInitialProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const { shopUrl } = tryParse(cookies['user']);
    const apiKey = process.env.FOR_SERVER_CODE_SHOPIFY_API_KEY;

    const props = Component.getInitialProps &&
      (await Component.getInitialProps(ctx));
    return { ...props, apiKey, shopUrl };
  }

  return wrapper;
}