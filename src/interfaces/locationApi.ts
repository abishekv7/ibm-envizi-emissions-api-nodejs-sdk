export interface Location {
    country: string;
    stateProvince?: string;
    powerGrid?: string;
}

export interface Time {
    date: string
}

export interface LocationActivity {
    energyConsumed: number;
    commodity?: string;
    unit?: string; 
}

export interface LocationRequest {
    location : Location;
    time?: Time;
    activity: LocationActivity;
    includeDetails: boolean;
}