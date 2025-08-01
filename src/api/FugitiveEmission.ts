import { API_DOMAIN, FUGITIVE_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: CommonRequest,
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
