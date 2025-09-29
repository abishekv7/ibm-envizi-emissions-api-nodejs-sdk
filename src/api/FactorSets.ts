import { Client } from "../Client";
import { FACTOR_SET_API_PATH, GET } from "../Constants";
import { makeApiRequest } from "../request";

/**
 * Retrieves factor sets by making a GET request to the factor set API endpoint.
 * 
 * @export
 * @return {Promise<string>} A promise that resolves to the factor sets string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const factorSets = await get();
 */
export async function get(
): Promise<string> {
const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_SET_API_PATH;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}