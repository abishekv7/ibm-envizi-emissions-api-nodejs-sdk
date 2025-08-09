import { Client } from "../Client";
import { TRANSPORTATION_AND_DISTRIBUTION_API_PATH, POST } from "../Constants";
import { GenericCalculationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: GenericCalculationRequest
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
