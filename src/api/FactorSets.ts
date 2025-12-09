import { Client } from "../Client";
import { FACTOR_SET_API_PATH, GET } from "../Constants";
import { FactorSetResponse } from "../interfaces/response/FactorSetResponse";
import { makeApiRequest } from "../request";

/**
 * Retrieves factor sets by making a GET request to the factor set API endpoint.
 * 
 * @export
 * @return {Promise<FactorSetResponse>} A promise that resolves to the  FactorSetResponse returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const factorSets = await get();
 */
export async function get(
): Promise<FactorSetResponse> {
const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_SET_API_PATH;

  return makeApiRequest<FactorSetResponse>({
    method: GET,
    url
  });
}