export function findExpiryTime(token: string): any {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  if (!decoded.exp) throw new Error('exp field is missing in the token');
  return decoded.exp;
}