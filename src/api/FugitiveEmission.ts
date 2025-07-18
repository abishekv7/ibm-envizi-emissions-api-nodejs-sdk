import { FugitiveRequest } from "../interfaces/fugitiveApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: FugitiveRequest,
  useProxy: boolean = false
): Promise<string> {
  const url = useProxy
    ? '/v3/carbon/fugitive'
    : 'https://foundation-staging.agtech.ibm.com/v3/carbon/fugitive';

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
