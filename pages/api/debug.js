export default async (req, res) => {
  console.info(`BASE_URL: ${process.env.BASE_URL}`);
  console.info(`SHOPIFY_REDIRECT_URL: ${process.env.SHOPIFY_REDIRECT_URL}`);
  console.info(`FOR_SERVER_CODE_SHOPIFY_API_KEY: ${process.env.FOR_SERVER_CODE_SHOPIFY_API_KEY}`);
  console.info(`FOR_SERVER_CODE_SHOPIFY_API_SECRET: ${process.env.FOR_SERVER_CODE_SHOPIFY_API_SECRET}`);
  console.info(`typeof window ${typeof window}`);

  res.status(200).json({
    BASE_URL: process.env.BASE_URL,
    SHOPIFY_REDIRECT_URL: process.env.SHOPIFY_REDIRECT_URL
  });
}