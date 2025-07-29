import { Activity, Location , Time } from "./common";



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

