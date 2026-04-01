/**
 * Interface for type recommender API 
 */
export interface TypeRecommenderResponse {
  /** Array of string*/
  types: ActivityRequest[];
}

export interface ActivityRequest {
    activityType: string;

    /** Array of string*/
    activityUnit: string[];

    activityDescription: string;

    confidence: number;
}