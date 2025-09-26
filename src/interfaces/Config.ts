import { Method } from "axios";

/**
 * Configuration for making HTTP requests.
 * @interface RequestConfig
 */
export interface RequestConfig {
  /**
   * The HTTP method to use for the request (GET, POST, PUT, DELETE, etc.).
   */
  method: Method;
  
  /**
   * The URL to which the request will be sent.
   */
  url: string;
  
  /**
   * Optional request body data to be sent with the request.
   */
  data?: any;
  
  /**
   * Optional URL query parameters to be appended to the request URL.
   */
  params?: any;
  
  /**
   * Optional HTTP headers to be included with the request.
   */
  headers?: Record<string, string>;
}

/**
 * Configuration for initializing a client instance.
 * @interface ClientConfig
 */
export interface ClientConfig {
  /**
   * Optional API key used for authentication.
   */
  apiKey?: string;
  
  /**
   * Unique identifier for the client application.
   * This is required for all client instances.
   */
  clientId: string;
  
  /**
   * Optional organization identifier.
   */
  orgId?: string;
  
  /**
   * Optional host URL for API requests.
   * If not provided, a default host will be used.
   */
  host?: string;
  
  /**
   * Optional authentication URL.
   * If not provided, a default authentication endpoint will be used.
   */
  authUrl?: string;
  
  /**
   * Optional authentication token.
   * If provided, it will be used instead of requesting a new token.
   */
  token?: string;
  
  /**
   * Optional flag indicating whether the client is running as an Excel Add-In.
   * This may affect certain behaviors like authentication flows.
   */
  isExcelAddIn?: boolean;
}
