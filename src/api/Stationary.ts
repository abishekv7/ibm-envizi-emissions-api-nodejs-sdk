import { Client } from "../Client";
import { GET, POST, STATIONARY_API_AREA, STATIONARY_API_PATH, STATIONARY_API_TYPES, STATIONARY_API_UNITS } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { makeApiRequest } from "../request";


/**
 * Performs Scope 1 stationary calculations by making a POST request to the stationary API endpoint.
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the stationary API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
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
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url =  client.getDomain() + STATIONARY_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}

/**
 * Retrieves available stationary emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available stationary emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + STATIONARY_API_TYPES;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the stationary emissions API.
 *
 * @export
 * @return {Promise<AreaResponse>} A promise that resolves to an AreaResponse containing the supported geographical areas
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const areas = await getArea();
 */
export async function getArea(
): Promise<AreaResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + STATIONARY_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific stationary emission type.
 *
 * @export
 * @param {string} type - The stationary emission type to get units for (e.g., "Coal - Lignite")
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * Get units for the "Petroleum Based Greases - NC:A" emission stationary type with subtype
 * const units = await getUnits("Petroleum Based Greases - NC:A");

 * Get units for the "Jet Kerosene" emission stationary type without subtype
 * const units = await getUnits("Jet Kerosene");
 */
export async function getUnits(
  type : string
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + STATIONARY_API_UNITS;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params : { type }
  });
}