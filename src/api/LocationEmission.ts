import { API_DOMAIN, LOCATION_API_PATH } from "../Constants";
import { LocationRequest } from "../interfaces/locationApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: LocationRequest,
  useProxy: boolean = false
): Promise<string> {
  
 const url = useProxy
     ? LOCATION_API_PATH
     : API_DOMAIN + LOCATION_API_PATH;

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
