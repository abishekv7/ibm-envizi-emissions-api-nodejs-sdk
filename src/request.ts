import axios, { AxiosRequestConfig } from "axios";
import { RequestConfig } from "./interfaces/Config";
import { Client } from "./Client";
import { CLIENT_SOURCE_HEADER } from "./Constants";

/**
 * Makes an API request with standardized headers and token refresh.
 * 
 * @export
 * @template T The expected response data type
 * @param {RequestConfig} config - The request configuration including method, URL, data, params, and optional headers
 * @return {Promise<T>} A promise that resolves to the response data of type T
 * @throws {Error} May throw an error if the API request fails or token refresh fails
 * 
 * @example
 * interface UserData {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 * 
 * const userData = await makeApiRequest<UserData>({
 *   method: 'GET',
 *   url: 'https://api.example.com/users/123',
 *   headers: { 'X-Custom-Header': 'value' }
 * });
 * console.log(userData.name); // Typed access to the response data
 */

export async function makeApiRequest<T>(config: RequestConfig): Promise<T> {
  const client = Client.getInstance();
  await client.refreshToken();

  const axiosConfig: AxiosRequestConfig = {
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params,
    headers: {
      ...client.getAuthHeader(),
      ...config.headers,
      'Content-Type': 'application/json',
      'X-IBM-Client-Id': `ghgemissions-${client.getClientId()}`,
      [CLIENT_SOURCE_HEADER]: client.getClientSource()
    },
  };

  const response = await axios.request<T>(axiosConfig);
  return response.data;
}
