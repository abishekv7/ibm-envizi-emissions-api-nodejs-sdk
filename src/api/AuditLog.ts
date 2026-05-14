import axios from "axios";
import { makeApiRequest } from "../request";
import { AUDIT_LOG_API_PATH, GET, PUT } from "../Constants";
import { AuditLogRequest, AuditLogResponse } from "../interfaces/response/AuditLogResponse";
import { Client } from "../Client";

/**
 * Handles common error responses for audit log API calls.
 *
 * @param {unknown} error - The error to handle
 * @param {boolean} handle409 - Whether to handle 409 Conflict status (returns data instead of throwing)
 * @return {AuditLogResponse | never} Returns response data for 409, otherwise throws error
 */
function handleAuditLogError(error: unknown, handle409: boolean = false): AuditLogResponse | never {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    const responseData = error.response.data;
    
    // Handle 409 Conflict - configuration is already set to the requested values
    if (status === 409 && handle409) {
      return responseData as AuditLogResponse;
    }
    
    // Handle 400 Bad Request - invalid payload
    if (status === 400) {
      throw new Error(responseData?.message);
    }
    
    // Handle 403 Forbidden - insufficient permissions
    if (status === 403) {
      throw new Error(responseData?.message);
    }
  }
  
  // Re-throw any other errors
  throw error;
}

/**
 * Retrieves the audit log configuration for the organization.
 *
 * Controls whether the organization's API requests and responses are stored for auditing.
 * Organizations can disable this if they don't need their API calls to be audited.
 *
 * @export
 * @return {Promise<AuditLogResponse>} Current audit log configuration
 * @throws {Error} Throws error for 403 (Forbidden) or other failures
 *
 * @example
 * const config = await getConfig();
 * // Output: { logRequest: true, logResponse: false }
 */
export async function getAuditConfig(): Promise<AuditLogResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_LOG_API_PATH;

  try {
    return await makeApiRequest<AuditLogResponse>({
      method: GET,
      url,
    });
  } catch (error) {
    return handleAuditLogError(error);
  }
}

/**
 * Updates the audit log configuration for the organization.
 *
 * Controls whether the organization's API requests and responses are stored for auditing.
 * Organizations can disable this if they don't need their API calls to be audited.
 *
 * Note: If the configuration is already set to the requested values, the API will return
 * a 409 Conflict status with a message indicating no change was made. This is handled
 * gracefully and the current configuration is returned.
 *
 * @export
 * @param {AuditLogRequest} payload - Audit log configuration
 * @return {Promise<AuditLogResponse>} Updated configuration or current configuration if no change
 * @throws {Error} Throws error for 400 (Bad Request), 403 (Forbidden), or other failures
 *
 * @example
 * const result = await update({ logRequest: false, logResponse: false });
 * // If already set to these values:
 * // { logRequest: false, logResponse: false, message: "No change in audit log configuration" }
 */
export async function updateAuditConfig(
  payload: AuditLogRequest
): Promise<AuditLogResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_LOG_API_PATH;

  try {
    return await makeApiRequest<AuditLogResponse>({
      method: PUT,
      url,
      data: payload,
    });
  } catch (error) {
    return handleAuditLogError(error, true);
  }
}