import { MobileRequest } from "../interfaces/mobileApi";
import { makeApiRequest } from "../request";
import { API_DOMAIN, MOBILE_API_PATH } from "../Constants";

export async function calculate(
  payload: MobileRequest,
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
