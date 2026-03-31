import { Client } from "../Client";
import { TYPE_RECOMMENDER_API_PATH, POST } from "../Constants";
import { SearchRequest } from "../interfaces/Api";
import { TypeRecommenderResponse } from "../interfaces/response/TypeRecommenderResponse";
import { makeApiRequest } from "../request";

/**
 * Search for activity types using semantic search with location, time, and license context. Supports pagination.
 *
 * @export
 * @param {SearchRequest} payload - The search request data to be sent to the API
 * @return {Promise<TypeResponse>} A promise that resolves to the activity types returned by the API
 * @throws {Error} May throw an error if the API request fails
 *
 * @example
 * const result = await search({
    "location": {
      "country": "usa"
    },
    "activity": {
      "search": "electricity"
    }
  });

 * @example
 * const result = await search({
    "location": {
      "country": "usa",
      "stateProvince": "california"
    },
    "time": {
      "date": "2025-06-10"
    },
    "activity": {
      "search": "electricity"
    },
    "pagination": {
      "page": 1,
      "size": 10
    }
  });
 
 * @example
 * const result = await search({
    "location": {
      "country": "usa",
      "powerGrid": "WECC"
    },
    "activity": {
      "search": "renewable energy"
    }
  });
 */
export async function search(
  payload: SearchRequest
): Promise<TypeRecommenderResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + TYPE_RECOMMENDER_API_PATH;

  return makeApiRequest<TypeRecommenderResponse>({
    method: POST,
    url,
    data: payload,
  });
}