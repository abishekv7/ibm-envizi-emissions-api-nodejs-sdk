import { Client } from "../Client";
import { FACTOR_API_PATH, FACTOR_SET_API_PATH, GET, POST, SEARCH_API_PATH } from "../Constants";
import { FactorRequest, SearchRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function retrieveFactor(
  payload: FactorRequest
): Promise<string> {
  const client = Client.getInstance();
  const url =  client.getDomain() + FACTOR_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}

export async function getFactorSets(
): Promise<string> {
const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_SET_API_PATH;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

export async function Search(
  payload: SearchRequest
): Promise<string> {
  const client = Client.getInstance();
  const url = client.getDomain() + SEARCH_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}
