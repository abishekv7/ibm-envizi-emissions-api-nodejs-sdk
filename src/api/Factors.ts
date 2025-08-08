import { Client } from "../Client";
import { FACTOR_API_PATH, FACTOR_SET_API_PATH, GET, POST } from "../Constants";
import { FactorRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

export async function retrieveFactor(
  payload: FactorRequest,
  useProxy: boolean = false
): Promise<string> {
  const client = Client.getInstance();
  const url = useProxy
    ? FACTOR_API_PATH
    : client.getDomain() + FACTOR_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}

export async function getFactorById(
    id: String,
    useProxy: boolean = false
  ): Promise<string> {
  const client = Client.getInstance();
  const path =`/${id}`;
  const url = useProxy
    ? FACTOR_API_PATH + path
    : client.getDomain() + FACTOR_API_PATH + path;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

export async function getFactorSets(
  useProxy: boolean = false
): Promise<string> {
const client = Client.getInstance();
  const url = useProxy
    ? FACTOR_SET_API_PATH
    : client.getDomain() + FACTOR_SET_API_PATH;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}
