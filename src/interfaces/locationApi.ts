import { Activity, Location , Time } from "./common";


export interface LocationRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails: boolean;
} 