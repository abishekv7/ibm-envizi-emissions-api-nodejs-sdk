import { makeApiRequest } from "../request";
import { API_DOMAIN, MOBILE_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";

export async function calculate(
  payload: CommonRequest,
  useProxy: boolean = false
): Promise<string> {
  
  const url = useProxy
    ? MOBILE_API_PATH
    : API_DOMAIN + MOBILE_API_PATH;

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
