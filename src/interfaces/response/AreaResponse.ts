/**
 * Interface representing a location with geographical and power grid information
 */
export interface Location {
  /** ISO 3166-1 alpha-3 country code */
  alpha3: string;
  
  /** Full country name */
  countryName: string;
  
  /** List of state or province names (optional) */
  stateProvinces?: string[];
  
  /** List of power grid identifiers (optional) */
  powerGrids?: string[];
}

/**
 * Interface representing the response from the area/location API
 */
export interface AreaResponse {
  /** Array of location objects */
  locations: Location[];
}

