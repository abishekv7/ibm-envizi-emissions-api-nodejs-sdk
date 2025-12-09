import { makeApiRequest } from "../request";
import { GET, MOBILE_API_AREA, MOBILE_API_PATH, MOBILE_API_TYPES, MOBILE_API_UNITS, POST } from "../Constants";
import { CommonRequest } from "../interfaces/Api";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { Client } from "../Client";


/**
 * Performs Scope 1 mobile emissions related calculations by making a POST request to the mobile API endpoint.
 *
 * @export
 * @param {CommonRequest} payload - The request data to be sent to the mobile API
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
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
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}


/**
 * Retrieves available mobile emission calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available mobile emission types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get all available mobile emission types
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_TYPES;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the mobile emissions API.
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
  const url = client.getDomain() + MOBILE_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific mobile emission type.
 *
 * @export
 * @param {string} type - The mobile emission type to get units for (e.g., "Diesel Fuel")
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
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
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + MOBILE_API_UNITS;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params : { type }
  });
}