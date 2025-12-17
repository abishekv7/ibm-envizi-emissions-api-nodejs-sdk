/**
 * Interface for unit object
 */
export interface Unit {
  /** Unit symbol */
  unit: string;
  /** Unit name */
  unitName: string;
}

/**
 * Interface for /units metadata API
 */
export interface UnitResponse {
  /** Array of Unit objects */
  units: Unit[];
}