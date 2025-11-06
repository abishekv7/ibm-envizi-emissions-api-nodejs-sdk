import { Client } from "../Client";
import { GENERIC_CALCULATION_API_PATH,CALCULATION_TYPES, POST, GET, GENERAL_API_AREA, GENERAL_API_UNITS } from "../Constants";
import { CalculationRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";


/**
 * Performs emission calculations by making a POST request to the generic calculation API endpoint.
 * 
 * @export
 * @param {CalculationRequest} payload - The calculation request data to be sent to the API
 * @return {Promise<string>} A promise that resolves to the calculation result string returned by the API
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
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + GENERIC_CALCULATION_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}


/**
 * Retrieves available calculation types by making a GET request to the calculation types API endpoint.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the available calculation types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + CALCULATION_TYPES;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the calculation API.
 *
 * @export
 * @return {Promise<string>} A promise that resolves to a string containing the supported geographical areas
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const areas = await getArea();
 */
export async function getArea(): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + GENERAL_API_AREA;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific calculation type.
 *
 * @export
 * @param {string} type - The calculation type to get units for
 * @return {Promise<string>} A promise that resolves to a string containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "Natural Gas - Scope 3:AAA" emission calculation type with subtype
 * const units = await getUnits("Natural Gas - Scope 3:AAA");

 * // Get units for the "HFC-263fb" emission calculation type without subtype
 * const units = await getUnits("HFC-263fb");
 */
export async function getUnits(
  type: string
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + GENERAL_API_UNITS;

  return makeApiRequest<string>({
    method: GET,
    url,
    params : { type }
  });
}