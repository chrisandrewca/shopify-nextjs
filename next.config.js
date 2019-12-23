//https://www.leighhalliday.com/secrets-env-vars-nextjs-now
//const nextEnv = require('next-env');
//const dotenvLoad = require('dotenv-load');
//dotenvLoad();
//const withNextEnv = nextEnv();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withCSS = require('@zeit/next-css');

module.exports = withBundleAnalyzer(
  withCSS({
    webpack(config, options) {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }
      return config
    },
    target: 'serverless',
    // WARNING: exposed client side
    env: {
      BASE_URL: process.env.BASE_URL,
      SHOPIFY_REDIRECT_URL: process.env.SHOPIFY_REDIRECT_URL,
      SNJS_DEBUG: process.env.SNJS_DEBUG
    }
  }));