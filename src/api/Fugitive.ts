import { Client } from "../Client";
import { FUGITIVE_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

/**
 * Performs scope 1 fugitve emission calculations by making a POST request to the fugitive API endpoint.
 * 
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the API
 * @return {Promise<string>} A promise that resolves to the calculation result string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const request = {
      "time": {
        "date": "2025-01-04"
      },
      "location": {
        "country": "usa"
      },
      "activity": {
        "type": "R134A",
        "value": 150,
        "unit": "kg"
      },
      "includeDetails": false
  };
 * const result = await calculate(request);
 */

export async function calculate(
  payload: CommonRequest
): Promise<string> {
  const client = Client.getInstance();
  const url =  client.getDomain() + FUGITIVE_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
