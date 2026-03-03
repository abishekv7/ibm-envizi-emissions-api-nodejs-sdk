import { Client } from "../Client";
import { LOCATION_API_PATH, POST } from "../Constants";
import { LocationRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";

/**
 * Performs scope 2 purchased energy Emission calculations by making a POST request to the location API endpoint.
 *
 * @export
 * @param {LocationRequest} payload - The location request data to be sent to the API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
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
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url = client.getDomain() + LOCATION_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}