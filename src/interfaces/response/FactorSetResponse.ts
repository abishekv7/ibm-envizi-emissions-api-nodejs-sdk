/**
 * Interface for individual factor set within the response
 */
export interface FactorSet {
  /** Unique identifier for the factor set (required) */
  id: number;
  
  /** Name of the factor set (required) */
  name: string;
  
  /** License type for the factor set (required, e.g., "Public") */
  license: string;
  
  /** Number of factors in this set (required) */
  factorCount: number;
  
  /** Source URL for the factor set data */
  sourceUrl?: string;
  
  /** Detailed description of the factor set */
  description?: string;
  
  /** Short description of the factor set */
  descriptionShort?: string;
  
  /** Array of emission factor types included in this set */
  types?: string[];
  
  /** Array of regions/countries covered by this factor set */
  regions?: string[];
  
  /** Array of version years available for this factor set */
  versions?: string[];
  
  /** Provider/publisher of the factor set */
  provider?: string;
  
  /** Optional citation information for the factor set */
  citation?: string;
}

/**
 * Interface for Factor Set API response
 */
export interface FactorSetResponse {
  /** Transaction ID for the API request */
  transactionId: string;
  
  /** Array of factor sets returned in the response */
  factorSets: FactorSet[];
}

