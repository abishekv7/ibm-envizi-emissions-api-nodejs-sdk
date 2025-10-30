import { Client } from "../Client";
import { GET, LOCATION_API_AREA, LOCATION_API_PATH, LOCATION_API_UNITS, LOCATION_TYPES, POST } from "../Constants";
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


/**
 * Retrieves available location-based calculation types by making a GET request to the location types API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available location-based calculation types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * 
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + LOCATION_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the location-based calculation API.
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
  const url = client.getDomain() + LOCATION_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific location-based calculation type.
 *
 * @export
 * @param {string} type - The location-based calculation type to get units for (e.g., "electricity")
 * @return {Promise<string>} A promise that resolves to a string containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "electricity" location type
 * const units = await getUnits("electricity");
 */
export async function getUnits(
  type : string
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + LOCATION_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}