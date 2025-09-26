import { Client } from "../Client";
import { POST, STATIONARY_API_PATH } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";


/**
 * Performs Scope 1 stationary calculations by making a POST request to the stationary API endpoint.
 * 
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the stationary API
 * @return {Promise<string>} A promise that resolves to the calculation result string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const request = {
             "time" : {
                "date": "2025-01-04"
            },
            "location": {
                "country": "usa",
								"stateProvince": "new york"
            },
            "activity": {
							"type":"Coal - Lignite",
							"unit": "KJ",
							"value": 3
            },
            "includeDetails": true
      };
 * const result = await calculate(request);
 */

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
