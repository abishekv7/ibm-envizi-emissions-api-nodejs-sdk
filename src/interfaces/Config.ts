import { Method } from "axios";

export interface RequestConfig {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export interface ClientConfig {
    apiKey: string;
    clientId?: string;
    tenantId?: string;
    orgId?: string;
    legacy?: boolean;
}
