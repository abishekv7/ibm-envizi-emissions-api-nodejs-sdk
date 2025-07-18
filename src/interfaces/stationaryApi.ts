import { Activity, Location , Time } from "./common";



export interface StationaryRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails: boolean;
} 