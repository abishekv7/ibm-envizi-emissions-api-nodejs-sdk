import { makeApiRequest } from "../request";
import { AUDIT_LOG_API_PATH, GET, PUT } from "../Constants";
import { AuditLogRequest, AuditLogResponse } from "../interfaces/response/AuditLogResponse";
import { Client } from "../Client";

/**
 * Retrieves the current audit log configuration.
 * The Audit Log API allows organizations to control whether API requests and responses should be audited/logged.
 * If your organization doesn't need requests and responses to be stored for audit purposes, you can disable logging to reduce storage overhead.
 *
 * @export
 * @return {Promise<AuditLogResponse>} Current audit log configuration
 *
 * @example
 * const config = await getConfig();
 * // Output: { logRequest: true, logResponse: false }
 */
export async function getConfig(): Promise<AuditLogResponse> {
  const client = Client.getInstance();
  const url = client.getDomain() + AUDIT_LOG_API_PATH;

  return makeApiRequest<AuditLogResponse>({
    method: GET,
    url,
  });
}

/**
 * Updates the audit log configuration.
 * The Audit Log API allows organizations to control whether API requests and responses should be audited/logged.
 * If your organization doesn't need requests and responses to be stored for audit purposes, you can disable logging to reduce storage overhead.
 *
 *
 * @export
 * @param {AuditLogRequest} payload - Audit log configuration
 * @return {Promise<AuditLogResponse>} Updated configuration
 *
 * @example
 * const result = await update({ logRequest: false, logResponse: false });
 */
export async function update(
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