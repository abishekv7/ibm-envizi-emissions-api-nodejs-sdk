import { makeApiRequest } from "../request";
import { MOBILE_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { Client } from "../Client";

export async function calculate(
  payload: CommonRequest
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
