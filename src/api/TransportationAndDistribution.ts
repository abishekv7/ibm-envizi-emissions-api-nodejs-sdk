import { Client } from "../Client";
import { TRANSPORTATION_AND_DISTRIBUTION_API_PATH, POST } from "../Constants";
import { CalculationRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";

/**
 * Performs Scope 3 transportation and distribution emission calculations by making a POST request to the transportation and distribution API endpoint.
 *
 * @export
 * @param {CalculationRequest} payload - The calculation request data for transportation and distribution operations
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const request = {
    "time" : {
      "date": "2025-01-04"
    },
    "location": {
      "country": "usa"
    },
    "activity": {
      "type": "Freight - Cargo Ship - Bulk Carrier - 0-9999 dwt",
      "unit": ["t","km"],
      "value": [1.0,1.0]
    },
    "includeDetails": true
  };
 * const result = await calculate(request);
 */
export async function calculate(
  payload: CalculationRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}

