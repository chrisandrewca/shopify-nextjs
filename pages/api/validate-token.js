import { parseCookies } from 'nookies'
import { allGood, runApi } from "../../server/api-helpers"
import { tryParse } from '../../utils/error'
import { validateJwt } from '../../server/auth'

export const GET = async (req, res) => {
  const cookies = parseCookies({ req });
  const { token } = tryParse(cookies['user']);
  const authorized = await validateJwt(token);
  allGood(res, { authorized });
}

export default async (req, res) => {
  await runApi(req, res, { GET });
}