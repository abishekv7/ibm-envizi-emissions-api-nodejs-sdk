import { Activity, Location , Time } from "./common";



export interface FugitiveRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails?: boolean;
} 