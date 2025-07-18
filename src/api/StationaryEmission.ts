import { API_DOMAIN, STATIONARY_API_PATH } from "../Constants";
import { StationaryRequest } from "../interfaces/stationaryApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: StationaryRequest,
  useProxy: boolean = false
): Promise<string> {

  const url = useProxy
         ? STATIONARY_API_PATH
         : API_DOMAIN + STATIONARY_API_PATH;

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
