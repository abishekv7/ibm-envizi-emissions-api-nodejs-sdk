import { MobileRequest } from "../interfaces/mobileApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: MobileRequest,
  useProxy: boolean = false
): Promise<string> {
  const url = useProxy
    ? '/v3/carbon/mobile'
    : 'https://foundation-staging.agtech.ibm.com/v3/carbon/mobile';

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
