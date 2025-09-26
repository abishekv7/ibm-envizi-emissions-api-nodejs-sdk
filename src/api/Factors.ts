import { Client } from "../Client";
import { FACTOR_API_PATH, FACTOR_SET_API_PATH, GET, POST, SEARCH_API_PATH } from "../Constants";
import { FactorRequest, SearchRequest } from "../interfaces/Api";
import { makeApiRequest } from "../request";

/**
 * Retrieves a factor details by making a POST request to the factor API endpoint.
 * 
 * @export
 * @param {FactorRequest} payload - The factor request data to be sent to the API
 * @return {Promise<string>} A promise that resolves to the factor string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const factorRequest = {
	
	"activity": {
		 "factorId": 12345
	}
  };
  
  or

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
): Promise<string> {
  const client = Client.getInstance();
  const url =  client.getDomain() + FACTOR_API_PATH;

  return makeApiRequest<string>({
    method: POST,
    url,
    data: payload,
  });
}

/**
 * Retrieves factor sets by making a GET request to the factor set API endpoint.
 * 
 * @export
 * @return {Promise<string>} A promise that resolves to the factor sets string returned by the API
 * @throws {Error} May throw an error if the API request fails
 * 
 * @example
 * const factorSets = await getFactorSets();
 */
export async function getFactorSets(
): Promise<string> {
const client = Client.getInstance();
  const url = client.getDomain() + FACTOR_SET_API_PATH;

  return makeApiRequest<string>({
    method: GET,
    url
  });
}

/**
 * Performs a search operation by making a POST request to the search API endpoint.
 * 
 * @export
 * @param {SearchRequest} payload - The search request data to be sent to the API
 * @return {Promise<string>} A promise that resolves to the search results string returned by the API
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
 * const results = await Search(searchRequest);
 */
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
