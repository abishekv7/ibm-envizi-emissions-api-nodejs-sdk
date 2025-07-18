import { LocationRequest } from "../interfaces/locationApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: LocationRequest,
  useProxy: boolean = false
): Promise<string> {
  const url = useProxy
    ? '/v3/carbon/location'
    : 'https://foundation-staging.agtech.ibm.com/v3/carbon/location';

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
