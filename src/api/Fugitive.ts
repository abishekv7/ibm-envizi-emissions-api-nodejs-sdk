import { Client } from "../Client";
import { FUGITIVE_API_AREA, FUGITIVE_API_PATH, FUGITIVE_API_TYPES, FUGITIVE_API_UNITS, GET, POST } from "../Constants";
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

/**
 * Retrieves available fugitive emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available fugitive emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + FUGITIVE_API_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the fugitive emissions API.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the supported geographical areas
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const areas = await getArea();
 */
export async function getArea(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + FUGITIVE_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific fugitive emission type.
 *
 * @export
 * @param {string} type - The fugitive emission type to get units for (e.g., "R134A")
 * @return {Promise<string>} A promise that resolves to a string containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "Natural Gas - Scope 3:AAA" emission fugitive type with subtype
 * const units = await getUnits("Natural Gas - Scope 3:AAA");

 * // Get units for the "R-426A" emission fugitive type without subtype
 * const units = await getUnits("R-426A");
 */
export async function getUnits(
  type : string
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + FUGITIVE_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}