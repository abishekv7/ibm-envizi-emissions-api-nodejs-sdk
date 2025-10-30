import { Client } from "../Client";
import { TRANSPORTATION_AND_DISTRIBUTION_API_PATH, POST, TRANSPORTATION_AND_DISTRIBUTION_API_TYPES, GET, TRANSPORTATION_AND_DISTRIBUTION_API_AREA, TRANSPORTATION_AND_DISTRIBUTION_API_UNITS } from "../Constants";
import { CalculationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

/**
 * Performs Scope 2 transportation and distribution emission calculations by making a POST request to the transportation and distribution API endpoint.
 * 
 * @export
 * @param {CalculationRequest} payload - The calculation request data for transportation and distribution operations
 * @return {Promise<string>} A promise that resolves to the calculation result string returned by the API
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
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}


/**
 * Retrieves available transportation and distribution calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available transportation and distribution calculation types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the transportation and distribution API.
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
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific transportation and distribution calculation type.
 *
 * @export
 * @param {string} type - The transportation and distribution calculation type to get units for (e.g., "Freight - Cargo Ship")
 * @return {Promise<string>} A promise that resolves to a string containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "Business Travel - Cars:Diesel - Small" transportation and distribution type without subtype
 * const units = await getUnits("Business Travel - Cars:Diesel - Small");
 * 
 * // Get units for the "Business Travel - Cars" transportation and distribution type with subtype
 * const units = await getUnits("Business Travel - Cars");
 */
export async function getUnits(
  type : string
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}