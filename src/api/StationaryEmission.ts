import { Client } from "../Client";
import { STATIONARY_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: CommonRequest,
  useProxy: boolean = false
): Promise<string> {
  const client = Client.getInstance();
  const url = useProxy
    ? STATIONARY_API_PATH
    : client.getDomain() + STATIONARY_API_PATH;

  return makeApiRequest<string>({
    method: "POST",
    url,
    data: payload,
  });
}
