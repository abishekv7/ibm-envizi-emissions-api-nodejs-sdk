/**
 * Extracts the expiration time from a JWT token and give the token expiry time.
 * 
 * @export
 * @param {string} token - The JWT token to extract the expiration time from
 * @return {any} The expiration time value from the token's payload
 * @throws {Error} Throws an error if the exp field is missing in the token
 * 
 * @example
 * const jwtToken = 'your-token';
 * const expiryTime = findExpiryTime(jwtToken);
 * console.log(new Date(expiryTime * 1000).toISOString()); // Convert to date if it's a Unix timestamp
 */
export function findExpiryTime(token: string): any {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  if (!decoded.exp) throw new Error('exp field is missing in the token');
  return decoded.exp;
}