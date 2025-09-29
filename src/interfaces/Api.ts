import { Activity, Location , Time, CombinedUnitsActivity, FactorActivity, SearchActivity, Pagination, FactorActivityWithFactorId, CombinedUnitsActivityWithFactorId, ActivityWithFactorId } from "./common";

/**
 * Represents activity data associated with a location, with simplified requirements.
 * Derived from the Activity type but makes the 'type' and 'unit' properties optional
 * while keeping the 'value' property required.
 * 
 * @typedef {Object} LocationActivity
 * @property {any} value - The required activity value (e.g., quantity, amount, or measurement)
 * @property {string} [type] - Optional activity type identifier
 * @property {string} [unit] - Optional unit of measurement for the activity value
 * 
 * @example
 * // Minimal valid LocationActivity with only required properties
 * const minimalActivity: LocationActivity = {
 *   value: 100
 * };
 * 
 * // Complete LocationActivity with all properties
 * const fullActivity: LocationActivity = {
 *   value: 100,
 *   type: 'electricity',
 *   unit: 'kWh'
 * };
 */
type LocationActivity = Partial<Pick<Activity, 'type' | 'unit'>> & Pick<Activity, 'value'>;

/**
 * Represents activity data associated with a location that includes a specific factor ID.
 * Extends the Activity concept by requiring a factorId while making only the value property
 * required and the unit property optional.
 * 
 * @typedef {Object} LocationActivityWithFactorId
 * @property {number} factorId - The unique identifier for the emission factor to be used
 * @property {any} value - The required activity value (e.g., quantity, amount, or measurement)
 * @property {string} [unit] - Optional unit of measurement for the activity value
 * 
 * @example
 * // Minimal valid LocationActivityWithFactorId with only required properties
 * const minimalActivity: LocationActivityWithFactorId = {
 *   factorId: 12345,
 *   value: 100
 * };
 * 
 * // Complete LocationActivityWithFactorId with all properties
 * const fullActivity: LocationActivityWithFactorId = {
 *   factorId: 12345,
 *   value: 100,
 *   unit: 'kWh'
 * };
 */
type LocationActivityWithFactorId = {
  factorId: number;
} & Partial<Pick<Activity, 'unit'>> & Pick<Activity, 'value'>;

/**
 * Request parameters for location-based calculations without specifying a factor ID.
 * Used for calculating emissions or other metrics based on location data.
 * 
 * @interface LocationRequestWithoutFactorId
 */
export interface LocationRequestWithoutFactorId {
    /**
     * The geographical location information.
     * Contains coordinates and possibly other location-specific data.
     */
    location : Location;
    /**
     * Optional time(YYYY-MM-DD)information for the location data.
     * Can be used to specify when the activity occurred.
     */
    time?: Time;
    /**
     * The activity associated with this location.
     * Defines what type of action or event occurred at the location.
     */
    activity: LocationActivity;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
} 

/**
 * Request parameters for location-based calculations with a specific factor ID.
 * Used when the emission factor is already known and doesn't need to be determined by location.
 * 
 * @interface LocationRequestWithFactorId
 */
export interface LocationRequestWithFactorId {
    /**
     * The activity associated with this location, including the specific factor ID to use.
     */
    activity: LocationActivityWithFactorId;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
} 

/**
 * Common request parameters for calculations without specifying a factor ID.
 * Used for general-purpose calculations based on location, time, and activity data.
 * 
 * @interface CommonRequestWithoutFactorId
 */
export interface CommonRequestWithoutFactorId {
    /**
     * The geographical location information.
     * Contains coordinates and possibly other location-specific data.
     */
    location : Location;
    /**
     * Optional time information for the activity data.
     * Can be used to specify when the activity occurred.
     */
    time?: Time;
    /**
     * The activity data for the calculation.
     * Contains complete activity information including type, value, and unit.
     */
    activity: Activity;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
} 

/**
 * Common request parameters for calculations with a specific factor ID.
 * Used when the emission factor is already known and doesn't need to be determined by location.
 * 
 * @interface CommonRequestWithFactorId
 */
export interface CommonRequestWithFactorId {
    /**
     * The activity data for the calculation, including the specific factor ID to use.
     */
    activity: ActivityWithFactorId;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
} 

/**
 * Request parameters for generic calculations without specifying a factor ID.
 * Used for calculations that may involve multiple units or complex activity data.
 * 
 * @interface GenericCalculationRequestWithoutFactorId
 */
export interface GenericCalculationRequestWithoutFactorId {
    /**
     * The geographical location information.
     * Contains coordinates and possibly other location-specific data.
     */
    location : Location;
    /**
     * Optional time information for the activity data.
     * Can be used to specify when the activity occurred.
     */
    time?: Time;
    /**
     * The combined units activity data for the calculation.
     * Supports complex activities with multiple units or components.
     */
    activity: CombinedUnitsActivity;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
}

/**
 * Request parameters for generic calculations with a specific factor ID.
 * Used for complex calculations where the emission factor is already known.
 * 
 * @interface GenericCalculationRequestWithFactorId
 */
export interface GenericCalculationRequestWithFactorId {
    /**
     * The combined units activity data for the calculation, including the specific factor ID to use.
     * Supports complex activities with multiple units or components.
     */
    activity: CombinedUnitsActivityWithFactorId;
    /**
     * Whether to include additional details in the response.
     * When true, the API will return more comprehensive information.
     * @default false
     */
    includeDetails?: boolean;
}

/**
 * Request parameters for retrieving factor information without specifying a factor ID.
 * Used to look up appropriate emission factors based on location, time, and activity type.
 * 
 * @interface FactorRequestWithoutFactorId
 */
export interface FactorRequestWithoutFactorId {
    /**
     * The geographical location information.
     * Used to determine which factors are applicable for the region.
     */
    location : Location;
    /**
     * Optional time information for the factor lookup.
     * Can be used to find factors applicable at a specific point in time.
     */
    time?: Time;
    /**
     * The activity information used to determine which factors to retrieve.
     * Typically includes the activity type and possibly unit information.
     */
    activity: FactorActivity;
}

/**
 * Request parameters for retrieving specific factor information by ID.
 * Used when the exact factor to retrieve is already known.
 * 
 * @interface FactorRequestWithFactorId
 */
export interface FactorRequestWithFactorId {
    /**
     * The activity information including the specific factor ID to retrieve.
     */
    activity: FactorActivityWithFactorId;
}

/**
 * Request parameters for searching factors or activities.
 * Used to find relevant factors or activities based on location, time, and search criteria.
 * 
 * @interface SearchRequest
 */
export interface SearchRequest {
    /**
     * The geographical location information to scope the search.
     * Used to find factors or activities relevant to a specific region.
     */
    location : Location;
    /**
     * Optional time information to scope the search.
     * Can be used to find factors or activities relevant at a specific point in time.
     */
    time?: Time;
    /**
     * The search criteria and parameters.
     * Contains information about what to search for and any filters to apply.
     */
    activity: SearchActivity;
    /**
     * Optional pagination parameters for the search results.
     * Used to limit the number of results and implement paging.
     */
    pagination?: Pagination
} 

/**
 * Union type representing either a factor request with or without a specific factor ID.
 * Allows the API to handle both types of requests with a single parameter type.
 * 
 * @typedef {FactorRequestWithoutFactorId | FactorRequestWithFactorId} FactorRequest
 */
export type FactorRequest = FactorRequestWithoutFactorId | FactorRequestWithFactorId;

/**
 * Union type representing either a generic calculation request with or without a specific factor ID.
 * Allows the API to handle both types of calculation requests with a single parameter type.
 * 
 * @typedef {GenericCalculationRequestWithoutFactorId | GenericCalculationRequestWithFactorId} CalculationRequest
 */
export type CalculationRequest = GenericCalculationRequestWithoutFactorId | GenericCalculationRequestWithFactorId;

/**
 * Union type representing either a common request with or without a specific factor ID.
 * Allows the API to handle both types of common requests with a single parameter type.
 * 
 * @typedef {CommonRequestWithoutFactorId | CommonRequestWithFactorId} CommonRequest
 */
export type CommonRequest = CommonRequestWithoutFactorId | CommonRequestWithFactorId;

/**
 * Union type representing either a location request with or without a specific factor ID.
 * Allows the API to handle both types of location requests with a single parameter type.
 * 
 * @typedef {LocationRequestWithoutFactorId | LocationRequestWithFactorId} LocationRequest
 */
export type LocationRequest = LocationRequestWithoutFactorId | LocationRequestWithFactorId;
