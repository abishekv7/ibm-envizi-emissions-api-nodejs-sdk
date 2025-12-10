import { Client } from "../Client";
import { FACTOR_API_AREA, FACTOR_API_PATH, FACTOR_API_TYPES, FACTOR_API_UNITS, GET, POST, SEARCH_API_AREA, SEARCH_API_PATH } from "../Constants";
import { FactorRequest, SearchRequest } from "../interfaces/Api";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { FactorResponse } from "../interfaces/response/FactorResponse";
import { SearchResponse } from "../interfaces/response/SearchResponse";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { makeApiRequest } from "../request";

/**
 * Retrieves a factor details by making a POST request to the factor API endpoint.
 * 
 * @export
 * @param {FactorRequest} payload - The factor request data to be sent to the API
 * @return {Promise<FactorResponse>} A promise that resolves to the FactorResponse returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const factorRequest = {
    "activity": {
      "factorId": 12345
    }
  };
  
  OR

  const factorRequest = {
    "time" : {
      "date": "2025-01-04"
    },
    "location": {
      "country": "usa",
      "stateProvince": "new york"
    },
    "activity": {
      "type":"natural gas"
    },
    "includeDetails": true
  };
 * const factor = await retrieveFactor(factorRequest);
 */

export async function retrieveFactor(
  payload: FactorRequest
): Promise<FactorResponse> {
  const client = Client.getInstance();
  const url =  client.getDomain() + FACTOR_API_PATH;

  return makeApiRequest<FactorResponse>({
    method: POST,
    url,
    data: payload,
  });
}


/**
 * Performs a search operation by making a POST request to the search API endpoint.
 *
 * @export
 * @param {SearchRequest} payload - The search request data to be sent to the API
 * @return {Promise<SearchResponse>} A promise that resolves to the search results returned by the API
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const searchRequest = {
    "time":{
      "date": "2020-06-10"
    },
    "activity": {
      "search" : "travel"},
    "location": {
      "country": "USA"
    }
  };
 * const results = await search(searchRequest);
 */
export async function search(
  payload: SearchRequest
): Promise<SearchResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + SEARCH_API_PATH;

  return makeApiRequest<SearchResponse>({
    method: POST,
    url,
    data: payload,
  });
}

/**
 * Retrieves available emission factor types by making a GET request to the API endpoint.
 *
 * @export
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available emission factor types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const types = await getTypes();
 */
export async function getTypes(
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_API_TYPES;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the factor search API.
 *
 * @export
 * @return {Promise<AreaResponse>} A promise that resolves to an AreaResponse containing the supported geographical areas
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const areas = await getSearchArea();
 */
export async function getSearchArea(
): Promise<AreaResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + SEARCH_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves information about geographical areas supported by the factor API.
 *
 * @export
 * @return {Promise<AreaResponse>} A promise that resolves to an AreaResponse containing the supported geographical areas
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const areas = await getArea();
 */
export async function getArea(): Promise<AreaResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_API_AREA;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url
  });
}

/**
 * Retrieves available units for a specific emission factor type.
 *
 * @export
 * @param {string} type - The emission factor type to get units for (e.g., "Natural Gas - Scope 3:AAA")
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get units for the "Natural Gas - Scope 3:AAA" emission factor type with subtype
 * const units = await getUnits("Natural Gas - Scope 3:AAA");

 * // Get units for the "HFC-263fb" emission factor type without subtype
 * const units = await getUnits("HFC-263fb");
 */
export async function getUnits(
  type : string
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_API_UNITS;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params : { type }
  });
}