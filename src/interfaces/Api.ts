import { Activity, Location , Time, CombinedUnitsActivity, FactorActivity, SearchActivity, Pagination, FactorActivityWithFactorId, CombinedUnitsActivityWithFactorId, ActivityWithFactorId } from "./common";


type LocationActivity = Partial<Pick<Activity, 'type' | 'unit'>> & Pick<Activity, 'value'>;
type LocationActivityWithFactorId = {
  factorId: number;
} & Partial<Pick<Activity, 'unit'>> & Pick<Activity, 'value'>;

export interface LocationRequestWithoutFactorId {
    location : Location;
    time?: Time;
    activity: LocationActivity;
    includeDetails?: boolean;
} 

export interface LocationRequestWithFactorId {
    activity: LocationActivityWithFactorId;
    includeDetails?: boolean;
} 

export interface CommonRequestWithoutFactorId {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails?: boolean;
} 

export interface CommonRequestWithFactorId {
    activity: ActivityWithFactorId;
    includeDetails?: boolean;
} 

export interface GenericCalculationRequestWithoutFactorId {
    location : Location;
    time?: Time;
    activity: CombinedUnitsActivity;
    includeDetails?: boolean;
}

export interface GenericCalculationRequestWithFactorId {
    activity: CombinedUnitsActivityWithFactorId;
    includeDetails?: boolean;
}

export interface FactorRequestWithoutFactorId {
    location : Location;
    time?: Time;
    activity: FactorActivity;
}

export interface FactorRequestWithFactorId {
    activity: FactorActivityWithFactorId;
}


export interface SearchRequest {
    location : Location;
    time?: Time;
    activity: SearchActivity;
    pagination?: Pagination
} 



export type FactorRequest = FactorRequestWithoutFactorId | FactorRequestWithFactorId;
export type GenericCalculationRequest = GenericCalculationRequestWithoutFactorId | GenericCalculationRequestWithFactorId;
export type CommonRequest = CommonRequestWithoutFactorId | CommonRequestWithFactorId;
export type LocationRequest = LocationRequestWithoutFactorId | LocationRequestWithFactorId;