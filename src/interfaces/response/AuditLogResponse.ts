/**
 * Response interface for audit log configuration.
 * Contains settings for logging requests and responses.
 * 
 * @interface AuditLogResponse
 */
export interface AuditLogResponse {
  /**
   * Whether to log API requests.
   * When true, all incoming requests will be logged.
   */
  logRequest: boolean;
  
  /**
   * Whether to log API responses.
   * When true, all outgoing responses will be logged.
   */
  logResponse: boolean;
}

/**
 * Request interface for updating audit log configuration.
 * Used to configure which parts of API interactions should be logged.
 * 
 * @interface AuditLogRequest
 */
export interface AuditLogRequest {



  /**
   * Unique identifier for the audit log configuration.
   */
  id: number;

  /**
   * Unique identifier for the associated organization.
   */
  orgId: string;

  /**
   * Whether to log API requests.
   * When true, all incoming requests will be logged.
   */
  logRequest: boolean;
  
  /**
   * Whether to log API responses.
   * When true, all outgoing responses will be logged.
   */
  logResponse: boolean;

  message: string;
}