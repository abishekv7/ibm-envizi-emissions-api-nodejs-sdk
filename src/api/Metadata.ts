import { Client } from "../Client";
import { GET, METADATA_AREA_ENDPOINT, METADATA_TYPES_ENDPOINT, METADATA_UNITS_ENDPOINT, POST } from "../Constants";
import { AreaResponse } from "../interfaces/response/AreaResponse";
import { TypeResponse } from "../interfaces/response/TypeResponse";
import { UnitResponse } from "../interfaces/response/UnitResponse";
import { makeApiRequest } from "../request";

/**
 * Retrieves available emission source types for a specific endpoint using GET request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve types for. Defaults to 'calculation' if not provided.
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get types for calculation endpoint (default)
 * const types = await getTypes();
 *
 * // Get types for a specific endpoint
 * const locationTypes = await getTypes('location');
 */
export async function getTypes(
  endpoint?: string
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_TYPES_ENDPOINT;

  return makeApiRequest<TypeResponse>({
    method: GET,
    url,
    params: endpoint ? { endpoint } : undefined,
  });
}

/**
 * Retrieves available emission source types for a specific endpoint using POST request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve types for. Defaults to 'calculation' if not provided.
 * @return {Promise<TypeResponse>} A promise that resolves to a TypeResponse containing the available types
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get types for calculation endpoint (default)
 * const types = await postTypes();
 *
 * // Get types for a specific endpoint
 * const stationaryTypes = await postTypes('stationary');
 */
export async function postTypes(
  endpoint?: string
): Promise<TypeResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_TYPES_ENDPOINT;

  return makeApiRequest<TypeResponse>({
    method: POST,
    url,
    data: endpoint ? { endpoint } : {},
  });
}

/**
 * Retrieves available geographic locations for a specific endpoint using GET request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve locations for. Defaults to 'calculation' if not provided.
 * @return {Promise<AreaResponse>} A promise that resolves to an AreaResponse containing the available locations
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get areas for calculation endpoint (default)
 * const areas = await getArea();
 *
 * // Get areas for a specific endpoint
 * const mobileAreas = await getArea('mobile');
 */
export async function getArea(
  endpoint?: string
): Promise<AreaResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_AREA_ENDPOINT;

  return makeApiRequest<AreaResponse>({
    method: GET,
    url,
    params: endpoint ? { endpoint } : undefined,
  });
}

/**
 * Retrieves available geographic locations for a specific endpoint using POST request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve locations for. Defaults to 'calculation' if not provided.
 * @return {Promise<AreaResponse>} A promise that resolves to an AreaResponse containing the available locations
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get areas for calculation endpoint (default)
 * const areas = await postArea();
 *
 * // Get areas for a specific endpoint
 * const fugitiveAreas = await postArea('fugitive');
 */
export async function postArea(
  endpoint?: string
): Promise<AreaResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_AREA_ENDPOINT;

  return makeApiRequest<AreaResponse>({
    method: POST,
    url,
    data: endpoint ? { endpoint } : {},
  });
}

/**
 * Retrieves available measurement units for a specific type and endpoint using GET request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve units for. Defaults to 'calculation' if not provided.
 * @param {string} [type] - The emission source type to retrieve units for. If not provided, returns the full UOM table.
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get all units for calculation endpoint (default)
 * const allUnits = await getUnits();
 *
 * // Get units for a specific type
 * const naturalGasUnits = await getUnits(undefined, 'Natural Gas');
 *
 * // Get units for a specific endpoint and type
 * const locationElectricityUnits = await getUnits('location', 'electricity');
 */
export async function getUnits(
  endpoint?: string,
  type?: string
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_UNITS_ENDPOINT;

  const params: Record<string, string> = {};
  if (endpoint) params.endpoint = endpoint;
  if (type) params.type = type;

  return makeApiRequest<UnitResponse>({
    method: GET,
    url,
    params: Object.keys(params).length > 0 ? params : undefined,
  });
}

/**
 * Retrieves available measurement units for a specific type and endpoint using POST request.
 *
 * @export
 * @param {string} [endpoint] - The endpoint name to retrieve units for. Defaults to 'calculation' if not provided.
 * @param {string} [type] - The emission source type to retrieve units for. If not provided, returns the full UOM table.
 * @return {Promise<UnitResponse>} A promise that resolves to a UnitResponse containing the available units
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * // Get all units for calculation endpoint (default)
 * const allUnits = await postUnits();
 *
 * // Get units for a specific type
 * const jetKeroseneUnits = await postUnits(undefined, 'Jet Kerosene');
 *
 * // Get units for a specific endpoint and type
 * const stationaryNaturalGasUnits = await postUnits('stationary', 'Natural Gas');
 */
export async function postUnits(
  endpoint?: string,
  type?: string
): Promise<UnitResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + METADATA_UNITS_ENDPOINT;

  const data: Record<string, string> = {};
  if (endpoint) data.endpoint = endpoint;
  if (type) data.type = type;

  return makeApiRequest<UnitResponse>({
    method: POST,
    url,
    data,
  });
}