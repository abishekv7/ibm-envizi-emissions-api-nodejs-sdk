import { Client } from "../Client";
import { GENERIC_CALCULATION_API_PATH, POST } from "../Constants";
import { CalculationRequest } from "../interfaces/Api";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { makeApiRequest } from "../request";


/**
 * Performs emission calculations by making a POST request to the generic calculation API endpoint.
 *
 * @export
 * @param {CalculationRequest} payload - The calculation request data to be sent to the API
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
      "type":"Waste Combusted - Steel Cans:Default factor",
      "unit": "kg",
      "value": 1223123.121
    },
    "includeDetails": true
  };
 * const result = await calculate(calculationRequest);
 */
export async function calculate(
  payload: CalculationRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url = client.getDomain() + GENERIC_CALCULATION_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}

