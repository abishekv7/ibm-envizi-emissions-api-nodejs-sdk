import { Client } from "../Client";
import { POST, STATIONARY_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: CommonRequest
): Promise<string> {
  const client = Client.getInstance();
  const url =  client.getDomain() + STATIONARY_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
