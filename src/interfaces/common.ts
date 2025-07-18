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