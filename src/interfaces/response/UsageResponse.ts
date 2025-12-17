/**
 * Interface representing the GHG Metrics Usage Response
 */

export interface UsageResponse {
    /** Organization ID for the API request */
    orgId ?: string;

    /** Array of entitlement belonging to the Org */
    entitlement ?: Entitlement[]
}


export interface Entitlement {
    /** Organization's billing start date*/
    startDate ?: string;

    /** Organization's billing end date */
    endDate ?: string;

    /** Total api calls made by the Organization in the billing cycle */
    totalApiCalls ?: number;
}