import { Client } from "../Client";
import { LOCATION_API_PATH } from "../Constants";
import { LocationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: LocationRequest,
  useProxy: boolean = false
): Promise<string> {
  const client = Client.getInstance();
  const url = useProxy
    ? LOCATION_API_PATH
    : client.getDomain() + LOCATION_API_PATH;

  return makeApiRequest<string>({
    method: "POST",
    url,
    data: payload,
  });
}
