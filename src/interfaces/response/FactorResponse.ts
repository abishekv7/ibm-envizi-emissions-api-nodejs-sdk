/**
 * Interface representing the response from the retrieve factor API
 */
export interface FactorResponse {
  /** Unique transaction identifier */
  transactionId: string;
  
  /** Total CO2 equivalent emissions (optional - not present in all responses)*/
  totalCO2e?: number;
  
  /** CO2 emissions value (optional - not present in all responses) */
  CO2?: number;
  
  /** CH4 (Methane) emissions value (optional - not present in all responses) */
  CH4?: number;
  
  /** N2O (Nitrous Oxide) emissions value (optional - not present in all responses) */
  N2O?: number;

 /** Biogenic CO2 emissions value (optional - not present in all responses) */
 bioCO2?: number;

 /** Indirect CO2 equivalent emissions value (optional - not present in all responses) */
 indirectCO2e?: number;

 /** Hydrofluorocarbon emissions value (optional - not present in all responses) */
 HFC?: number;

 /** Perfluorocarbon emissions value (optional - not present in all responses) */
 PFC?: number;

 /** Sulfur hexafluoride emissions value (optional - not present in all responses) */
 SF6?: number;

 /** Nitrogen trifluoride emissions value (optional - not present in all responses) */
 NF3?: number;

  
  /** Unit of measurement for emissions */
  unit?: string;
  
  /** Description of the emission factors (optional)*/
  description?: string;
  
  /** Factor set identifier (e.g., "IPCC", "IGES") */
  factorSet: string;
  
  /** Source reference for the emission factors (optional)*/
  source?: string;
  
  /** Type of activity (e.g., "Gas/Diesel Oil", "Electricity") */
  activityType: string;
  
  /** Array of supported activity units */
  activityUnit: string[];
  
  /** Name of the emission factor */
  name?: string;
  
  /** Publication start date in ISO format (optional)*/
  publishedFrom?: string;
  
  /** Publication end date in ISO format (optional) */
  publishedTo?: string;

  /** Effective start date in ISO format (optional) */
  effectiveFrom?: string;

  /** Effective end date in ISO format (optional) */
  effectiveTo?: string;

  
  /** Geographic region (e.g., "Earth", "India") */
  region: string;
  
  /** Unique factor identifier */
  factorId: number;

  /** activity based or spend based */
  methodology: string;

  /** scopes data belongs to */
	scope : string[];
}
