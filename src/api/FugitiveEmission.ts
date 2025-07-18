import { API_DOMAIN, FUGITIVE_API_PATH } from "../Constants";
import { FugitiveRequest } from "../interfaces/fugitiveApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: FugitiveRequest,
  useProxy: boolean = false
): Promise<string> {

   const url = useProxy
       ? FUGITIVE_API_PATH
       : API_DOMAIN + FUGITIVE_API_PATH;

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
