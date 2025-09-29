import { makeApiRequest } from "../request";
import { MOBILE_API_PATH, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { Client } from "../Client";


/**
 * Performs Scope 1 mobile emissions related calculations by making a POST request to the mobile API endpoint.
 * 
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the mobile API
 * @return {Promise<string>} A promise that resolves to the calculation result string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const request = {
    "time": {
      "date": "2022-01-01"
    },
    "location": {
      "country": "USA",
      "stateProvince": "new york"
    },
    "activity": {
      "type": "Diesel Fuel",
      "value": 1500000,
      "unit": "l"
    },
    "includeDetails": false
  };
 * const result = await calculate(request);
 */

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
