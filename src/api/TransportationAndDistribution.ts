import { Client } from "../Client";
import { TRANSPORTATION_AND_DISTRIBUTION_API_PATH, POST, TRANSPORTATION_AND_DISTRIBUTION_API_TYPES, GET, TRANSPORTATION_AND_DISTRIBUTION_API_AREA, TRANSPORTATION_AND_DISTRIBUTION_API_UNITS } from "../Constants";
import { CalculationRequest } from "../interfaces/Api";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { EmissionResponse } from "../interfaces/response/EmissionResponse";
import { EmissionResponseWithDetails } from "../interfaces/response/EmissionResponseWithDetails";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { makeApiRequest } from "../request";

/**
 * Performs Scope 3 transportation and distribution emission calculations by making a POST request to the transportation and distribution API endpoint.
 *
 * @export
 * @param {CalculationRequest} payload - The calculation request data for transportation and distribution operations
 * @return {Promise<EmissionResponse | EmissionResponseWithDetails>} A promise that resolves to the emission calculation result. Returns EmissionResponseWithDetails if includeDetails is true, otherwise EmissionResponse
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
): Promise<EmissionResponse | EmissionResponseWithDetails> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_PATH;

  return makeApiRequest<EmissionResponse | EmissionResponseWithDetails>({
    method: POST,
    url,
    data: payload,
  });
}


/**
 * Retrieves available transportation and distribution calculation types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available transportation and distribution calculation types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_TYPES;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the transportation and distribution API.
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
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific transportation and distribution calculation type.
 *
 * @export
 * @param {string} type - The transportation and distribution calculation type to get units for (e.g., "Freight - Cargo Ship")
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
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
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + TRANSPORTATION_AND_DISTRIBUTION_API_UNITS;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params : { type }
  });
}