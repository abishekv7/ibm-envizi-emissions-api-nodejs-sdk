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
 *Controls whether the organization's API requests and responses are stored for auditing.
 * Organizations can disable this if they don't need their API calls to be audited.
 *
 * @export
 * @param {AuditLogRequest} payload - Audit log configuration
 * @return {Promise<AuditLogResponse>} Updated configuration
 *
 * @example
 * const result = await update({ logRequest: false, logResponse: false });
 */
export async function updateAuditConfig(
  payload: AuditLogRequest
): Promise<AuditLogResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_LOG_API_PATH;

  return makeApiRequest<AuditLogResponse>({
    method: PUT,
    url,
    data: payload,
  });
}