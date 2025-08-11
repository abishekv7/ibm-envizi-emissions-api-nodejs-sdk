import { Client } from "../Client";
import { LOCATION_API_PATH, POST } from "../Constants";
import { LocationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: LocationRequest
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + LOCATION_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
