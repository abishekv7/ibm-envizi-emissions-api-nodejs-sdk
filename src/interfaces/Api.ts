import { Activity, Location , Time, CombinedUnitsActivity, FactorActivity, SearchActivity, Pagination } from "./common";



type LocationActivity = Partial<Pick<Activity, 'type' | 'unit'>> & Pick<Activity, 'value'>;

export interface LocationRequest {
    location : Location;
    time?: Time;
    activity: LocationActivity;
    includeDetails?: boolean;
} 

export interface CommonRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails?: boolean;
} 

export interface GenericCalculationRequest {
    location : Location;
    time?: Time;
    activity: CombinedUnitsActivity;
    includeDetails?: boolean;
}
export interface FactorRequest {
    location : Location;
    time?: Time;
    activity: FactorActivity;
    factorSet? : String;
    factorVersion? : String;
}

export interface SearchRequest {
    location : Location;
    time?: Time;
    activity: SearchActivity;
    pagination?: Pagination
} 
