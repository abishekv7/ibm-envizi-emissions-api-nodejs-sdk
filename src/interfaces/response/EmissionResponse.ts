/**
 * Interface representing the emission calculation response
 */
export interface EmissionResponse {
  /** Unique transaction identifier (required) */
  transactionId: string;
  
  /** Total CO2 equivalent emissions (required) */
  totalCO2e: number;
  
  /** CO2 emissions value (optional) */
  CO2?: number;
  
  /** CH4 (Methane) emissions value (optional) */
  CH4?: number;
  
  /** N2O (Nitrous Oxide) emissions value (optional) */
  N2O?: number;
  
  /** Biogenic CO2 emissions value (optional) */
  bioCO2?: number;
  
  /** Indirect CO2 equivalent emissions value (optional) */
  indirectCO2e?: number;
  
  /** Hydrofluorocarbon emissions value (optional) */
  HFC?: number;
  
  /** Perfluorocarbon emissions value (optional) */
  PFC?: number;
  
  /** Sulfur hexafluoride emissions value (optional) */
  SF6?: number;
  
  /** Nitrogen trifluoride emissions value (optional) */
  NF3?: number;

   /** Unit of measurement for emissions (required) */
  unit: string;
  
  /** Description of the emission calculation (required) */
  description: string;
}

