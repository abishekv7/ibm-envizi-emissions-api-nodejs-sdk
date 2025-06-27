import axios, { AxiosRequestConfig } from "axios";
import { RequestConfig } from "./interfaces/Config";
import { Client } from "./Client";

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
    },
  };

  const response = await axios.request<T>(axiosConfig);
  return response.data;
}