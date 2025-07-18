import { Activity, Location , Time } from "./common";



export interface MobileRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails: boolean;
} 