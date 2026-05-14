import axios from "axios";
import { makeApiRequest } from "../request";
import { AUDIT_LOG_API_PATH, GET, PUT } from "../Constants";
import { AuditLogRequest, AuditLogResponse } from "../interfaces/response/AuditLogResponse";
import { Client } from "../Client";

/**
 * Retrieves the audit log configuration for the organization.
 *
 * Controls whether the organization's API requests and responses are stored for auditing.
 * Organizations can disable this if they don't need their API calls to be audited.
 *
 * @export
 * @return {Promise<AuditLogResponse>} Current audit log configuration
 *
 * @example
 * const config = await getConfig();
 * // Output: { logRequest: true, logResponse: false }
 */
export async function getAuditConfig(): Promise<AuditLogResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_LOG_API_PATH;

  return makeApiRequest<AuditLogResponse>({
    method: GET,
    url,
  });
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
    // Handle 409 Conflict - configuration is already set to the requested values
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      // Return the response data which includes the current configuration and message
      return error.response.data as AuditLogResponse;
    }
    // Re-throw any other errors
    throw error;
  }
}