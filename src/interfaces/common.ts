export interface Location {
    country: string;
    stateProvince?: string;
    powerGrid?: string;
}

export interface Time {
    date: string
}

export interface Activity {
    type: string;
    value: number;
    unit: string; 
}

export interface ActivityWithFactorId {
    factorId : number,
    value: number;
    unit: string; 
}

export interface CombinedUnitsActivity {
    type: string;
    value: number | number[];
    unit: string | string[]; 
}

export interface CombinedUnitsActivityWithFactorId {
    factorId: number;
    value: number | number[];
    unit: string | string[]; 
}

export interface FactorActivity {
    type: string;
    unit?: string; 
}

export interface FactorActivityWithFactorId {
    factorId: number;
    unit?: string; 
}
export interface SearchActivity {
    search: string;
}
export interface Pagination {
    page: number;
    size: number

}