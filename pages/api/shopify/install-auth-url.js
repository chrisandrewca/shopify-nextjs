import { getAuthUrl } from "../../../server/shopify-server"
import { allGood, badRequest, runApi } from "../../../server/api-helpers"

export const GET = async (req, res) => {
  const { shopUrl } = req.query;
  const authUrl = await getAuthUrl(shopUrl);
  if (!authUrl) {
    return badRequest(res, 'Invalid shop url');
  }

  allGood(res, { authUrl, apiKey: process.env.FOR_SERVER_CODE_SHOPIFY_API_KEY });
}

export default async (req, res) => {
  await runApi(req, res, { GET });
}