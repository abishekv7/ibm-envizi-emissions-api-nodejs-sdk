/**
 * Interface representing the GHG Metrics Usage Response
 */

export interface UsageResponse {
    /** Organization ID for the API request */
    orgId ?: string;
    entitlement ?: Entitlement[]
}


export interface Entitlement {
    startDate ?: string;
    endDate ?: string;
    totalApiCalls ?: number;
}