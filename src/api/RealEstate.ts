import { Client } from "../Client";
import { REAL_ESTATE_API_AREA, REAL_ESTATE_API_PATH, REAL_ESTATE_API_TYPES, REAL_ESTATE_API_UNITS, GET, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { makeApiRequest } from "../request";

/**
 * Performs scope 3 Real estate emission calculations by making a POST request to the real estate API endpoint.
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
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
      "type": "Commercial Real Estate:Industrial distribution warehouse",
      "value": 17000.123,
      "unit": "m2"
    },
    "includeDetails": false
  };
 * const result = await calculate(request);
 */

export async function calculate(
  payload: CommonRequest
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url =  client.getDomain() + REAL_ESTATE_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}

/**
 * Retrieves available Real estate emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available Real estate emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + REAL_ESTATE_API_TYPES;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the real estate emissions API.
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
  const url = client.getDomain() + REAL_ESTATE_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific Real estate emission type.
 *
 * @export
 * @param {string} type - The Real estate emission type to get units for (e.g., "R134A")
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "Commercial Real Estate:Industrial distribution warehouse" emission real estate type with subtype
 * const units = await getUnits("Commercial Real Estate:Industrial distribution warehouse");

 */
export async function getUnits(
  type : string
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + REAL_ESTATE_API_UNITS;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params : { type }
  });
}