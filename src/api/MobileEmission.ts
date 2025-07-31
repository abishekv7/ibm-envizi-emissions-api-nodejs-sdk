import { makeApiRequest } from "../request";
import { MOBILE_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { Client } from "../Client";

export async function calculate(
  payload: CommonRequest,
  useProxy: boolean = false
): Promise<string> {
  const client = Client.getInstance();
  const url = useProxy ? MOBILE_API_PATH : client.getDomain() + MOBILE_API_PATH;

  return makeApiRequest<string>({
    method: "POST",
    url,
    data: payload,
  });
}
