import { Client } from "../Client";
import { LOCATION_API_PATH, POST } from "../Constants";
import { LocationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

/**
 * Performs scope 2 purchased energy Emission calculations by making a POST request to the location API endpoint.
 * 
 * @export
 * @param {LocationRequest} payload - The location request data to be sent to the API
 * @return {Promise<string>} A promise that resolves to the purchased energy emission result string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const calculationRequest = {
             "time" : {
                "date": "2025-01-04"
            },
            "location": {
                "country": "usa",
								"stateProvince": "new york"
            },
            "activity": {
							"type":"electricity",
							"unit": "kwh",
							"value": 14123143
            },
            "includeDetails": true
        };
 * const result = await calculate(calculationRequest);
 */
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
