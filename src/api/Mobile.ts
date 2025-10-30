import { makeApiRequest } from "../request";
import { GET, MOBILE_API_AREA, MOBILE_API_PATH, MOBILE_API_TYPES, MOBILE_API_UNITS, POST } from "../Constants";
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


/**
 * Retrieves available mobile emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available mobile emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get all available mobile emission types
 * const types = await getTypes();
 * const typesData = JSON.parse(types);
 * console.log("Available mobile emission types:", typesData);
 */
export async function getTypes(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the mobile emissions API.
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
  const url = client.getDomain() + MOBILE_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific mobile emission type.
 *
 * @export
 * @param {string} type - The mobile emission type to get units for (e.g., "Diesel Fuel")
 * @return {Promise<string>} A promise that resolves to a string containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * Get units for the "Cars:B20:(NE)" emission mobile type with subtype
 * const units = await getUnits("Cars:B20:(NE)");

 * Get units for the "Cars by Size - Large Car - Hybrid" emission mobile type without subtype
 * const units = await getUnits("Cars by Size - Large Car - Hybrid");
 */
export async function getUnits(
  type : string
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}