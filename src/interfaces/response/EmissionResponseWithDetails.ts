import { EmissionResponse } from './EmissionResponse';

/**
 * Interface for unit information in emission details
 */
export interface UnitInfo {
  /** Unit name */
  name: string;
  
  /** Unit description (optional) */
  description?: string;
}

/**
 * Interface for area information
 */
export interface AreaInfo {
  /** Internal name of the area */
  internalName: string;
  
  /** Standard name of the area */
  standardName: string;

  alpha3?: string;
}

/**
 * Interface for area type information
 */
export interface AreaType {
  /** Type name (e.g., "Planet", "State") */
  name: string;
}

/**
 * Interface for factor data type categories
 */
export interface FactorDataTypeCategory {
  /** Category name */
  name: string;
}

/**
 * Interface for factor set information
 */
export interface FactorSetInfo {
  /** Factor set type */
  type: string;
  
  /** Description of the factor set */
  description?: string;
  
  /** Provider of the factor set */
  provider?: string;
  
  /** Source URL for the factor set */
  sourceUrl?: string;

  factorSource?: string;
}
export interface FactorSelectionDefault {
    actorDataType?: string;
    areaName?: string;
    factorSetName?: string;
}
/**
 * Interface for factor data type code
 */
export interface FactorDataTypeCode {
  /** Unit of measure */
  unitOfMeasure: string;
  
  /** Activity type */
  type: string;
  
  /** Activity subtype */
  subtype: string;
  
  /** Unique factor identifier */
  factorId: number;
}

/**
 * Interface for factor set version information
 */
export interface FactorSetVersion {
  /** Publication start date */
  publishedFrom?: string;
  
  /** Publication end date (optional) */
  publishedTo?: string;
  
  /** Source of the factor */
  factorSource: string;
}

/**
 * Interface for factor value
 */
export interface FactorValue {
  /** Unit information */
  unit: {
    /** Unit name */
    name: string;
  };
  
  /** Factor value */
  value: number;
}

/**
 * Interface for factor metadata
 */
export interface FactorMetaData {
  /** Metadata key */
  key: string;
  
  /** Metadata value */
  value: string;
}

/**
 * Interface for unit conversion information
 */
export interface UnitConversion {
  /** Input unit */
  inputUnit: string;
  
  /** Unit from database */
  unitFromDb: string;
  
  /** Conversion ratio */
  conversionRatio: string;
}

/**
 * Interface for detailed emission data
 */
export interface EmissionData {
  /** Array of unit information */
  unit: UnitInfo[];
  
  /** Array of area information */
  area: AreaInfo[];
  
  /** Array of area types */
  areaType: AreaType[];
  
  /** Array of factor data type categories */
  factorDataTypeCategories: FactorDataTypeCategory[];

  factorSelectionDefault? :FactorSelectionDefault[];
  
  /** Array of factor set information */
  factorSet: FactorSetInfo[];
  
  /** Array of factor data type codes */
  factorDataTypeCode: FactorDataTypeCode[];
  
  /** Array of factor set versions */
  factorSetVersion: FactorSetVersion[];
  
  /** Array of factor values */
  factorValue: FactorValue[];
  
  /** Array of factor metadata */
  factorMetaData: FactorMetaData[];
  
  /** Array of unit conversions */
  unitConversion: UnitConversion[];
}

/**
 * Interface representing the emission calculation response with detailed information
 */
export interface EmissionResponseWithDetails {
  /** Emission calculation result */
  result: EmissionResponse;
  
  /** Detailed emission data */
  data: EmissionData;
}

