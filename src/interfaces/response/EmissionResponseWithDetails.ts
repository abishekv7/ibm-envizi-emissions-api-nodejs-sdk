import { EmissionResponse } from './EmissionResponse';

/**
 * Interface for factor set details
 */
export interface FactorSetDetails {
  /** Name of the factor set */
  name?: string;
  
  /** Description of the factor set */
  description?: string;
  
  /** Provider of the factor set */
  provider?: string;
  
  /** Source URL for the factor set */
  sourceUrl?: string;
  
  /** Citation information for the factor set */
  citation?: string;
}

/**
 * Interface for factor details
 */
export interface FactorDetails {
  /** Name of the factor */
  name?: string;
  
  /** Description of the factor */
  description?: string;
  
  /** Total CO2 equivalent emissions */
  totalCO2e?: number;
  
  /** CO2 emissions value */
  CO2?: number;
  
  /** CH4 (Methane) emissions value */
  CH4?: number;
  
  /** N2O (Nitrous Oxide) emissions value */
  N2O?: number;
  
  /** Biogenic CO2 emissions value */
  bioCO2?: number;
  
  /** Indirect CO2 equivalent emissions value */
  indirectCO2e?: number;
  
  /** Hydrofluorocarbon emissions value */
  HFC?: number;
  
  /** Perfluorocarbon emissions value */
  PFC?: number;
  
  /** Sulfur hexafluoride emissions value */
  SF6?: number;
  
  /** Nitrogen trifluoride emissions value */
  NF3?: number;
  
  /** Energy consumption in megawatt-hours */
  'energy(MWh)'?: number;
  
  /** Input unit of measurement */
  inputUnit?: string;
  
  /** Unit of measurement for emissions */
  unit?: string;
  
  /** Conversion ratio */
  conversionRatio?: string;
  
  /** Type of activity */
  activityType?: string;
  
  /** Activity subtype */
  activitySubtype?: string;
  
  /** Unique factor identifier */
  factorId?: number;
  
  /** Methodology (activity based or spend based) */
  methodology?: string;
  
  /** Scopes data belongs to */
  scopes?: string[];
  
  /** Area name */
  areaName?: string;
  
  /** Area type */
  areaType?: string;
  
  /** Publication start date */
  publishedFrom?: string;
  
  /** Publication end date */
  publishedTo?: string;
  
  /** Source of the factor */
  source?: string;
}

/**
 * Interface for include details
 */
export interface IncludeDetails {
  /** Factor set details */
  factorSet?: FactorSetDetails;
  
  /** Factor details */
  factor?: FactorDetails;
}


export interface EmissionResponseWithDetails extends EmissionResponse {
  /** Detailed emission data */
  details?: IncludeDetails;
}

