import { Client } from "../Client";
import { GET, USAGE_API } from "../Constants";
import { UsageResponse } from "../interfaces/response/UsageResponse";
import { makeApiRequest } from "../request";

/**
 * Retrieves current billing period or historical usage data for the user by making a GET request to the API endpoint.
 *
 * @export
 * @param {boolean} history - Flag to retrieve current billing or historical usage data.
 * @return {Promise<UsageResponse>} A promise that resolves to a UsageResponse containing the organization's usage data
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const usage = await getUsage();
 */
export async function getUsage(history : boolean = false): Promise<UsageResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + USAGE_API;

  return makeApiRequest<UsageResponse>({
    method: GET,
    url,
    params : { history }
  });
}