/**
 * Represents a geographical location.
 * @interface Location
 */
export interface Location {
  /**
   * The country of the location.
   */
  country: string;
  
  /**
   * Optional state or province within the country.
   */
  stateProvince?: string;
  
  /**
   * Optional power grid identifier for the location.
   */
  powerGrid?: string;
}

/**
 * Represents a point in time with date information.
 * @interface Time
 */
export interface Time {
  /**
   * The date in string format.
   */
  date: string
}

/**
 * Represents an activity with type, value, and unit of measurement.
 * @interface Activity
 */
export interface Activity {
  /**
   * The type or category of the activity.
   */
  type: string;
  
  /**
   * The numerical value of the activity.
   */
  value: number;
  
  /**
   * The unit of measurement for the activity value.
   */
  unit: string; 
}

/**
 * Represents an activity identified by a factor ID instead of a type.
 * @interface ActivityWithFactorId
 */
export interface ActivityWithFactorId {
  /**
   * The unique identifier for the activity factor.
   */
  factorId: number;
  
  /**
   * The numerical value of the activity.
   */
  value: number;
  
  /**
   * The unit of measurement for the activity value.
   */
  unit: string; 
}

/**
 * Represents an activity that can have single or multiple values and units.
 * @interface CombinedUnitsActivity
 */
export interface CombinedUnitsActivity {
  /**
   * The type or category of the activity.
   */
  type: string;
  
  /**
   * The numerical value(s) of the activity. Can be a single number or an array of numbers.
   */
  value: number | number[];
  
  /**
   * The unit(s) of measurement for the activity value(s). Can be a single string or an array of strings.
   */
  unit: string | string[]; 
}

/**
 * Represents an activity with factor ID that can have single or multiple values and units.
 * @interface CombinedUnitsActivityWithFactorId
 */
export interface CombinedUnitsActivityWithFactorId {
  /**
   * The unique identifier for the activity factor.
   */
  factorId: number;
  
  /**
   * The numerical value(s) of the activity. Can be a single number or an array of numbers.
   */
  value: number | number[];
  
  /**
   * The unit(s) of measurement for the activity value(s). Can be a single string or an array of strings.
   */
  unit: string | string[]; 
}

/**
 * Represents a factor activity with a type and optional unit.
 * @interface FactorActivity
 */
export interface FactorActivity {
  /**
   * The type or category of the factor activity.
   */
  type: string;
  
  /**
   * Optional unit of measurement for the factor activity.
   */
  unit?: string; 
}

/**
 * Represents a factor activity identified by a factor ID instead of a type.
 * @interface FactorActivityWithFactorId
 */
export interface FactorActivityWithFactorId {
  /**
   * The unique identifier for the factor activity.
   */
  factorId: number;
  
  /**
   * Optional unit of measurement for the factor activity.
   */
  unit?: string; 
}

/**
 * Represents a search query for activities.
 * @interface SearchActivity
 */
export interface SearchActivity {
  /**
   * The search query string.
   */
  search: string;
}

/**
 * Represents pagination parameters for paginated results.
 * @interface Pagination
 */
export interface Pagination {
  /**
   * The page number (1-based).
   */
  page: number;
  
  /**
   * The number of items per page.
   */
  size: number
}
