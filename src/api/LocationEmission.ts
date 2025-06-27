import { LocationRequest } from "../interfaces/locationApi";
import { makeApiRequest } from "../request";

export async function calculate(payload :LocationRequest): Promise<String> {
  return makeApiRequest<String>({
    method: 'POST',
    url: 'https://foundation-staging.agtech.ibm.com/v3/carbon/location',
    data: payload
  });
}