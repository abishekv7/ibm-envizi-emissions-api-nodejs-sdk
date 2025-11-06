import { Client } from "../Client";
import { GET, POST, STATIONARY_API_AREA, STATIONARY_API_PATH, STATIONARY_API_TYPES, STATIONARY_API_UNITS } from "../Constants";
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

/**
 * Retrieves available stationary emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available stationary emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + STATIONARY_API_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the stationary emissions API.
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
  const url = client.getDomain() + STATIONARY_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific stationary emission type.
 *
 * @export
 * @param {string} type - The stationary emission type to get units for (e.g., "Coal - Lignite")
 * @return {Promise<string>} A promise that resolves to a string containing the available units
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
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + STATIONARY_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}