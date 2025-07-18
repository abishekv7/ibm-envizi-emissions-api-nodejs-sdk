import { Activity, Location , Time } from "./common";

export interface GenericCalculationRequest {
    location : Location;
    time?: Time;
    activity: Activity;
    includeDetails?: boolean;
} 