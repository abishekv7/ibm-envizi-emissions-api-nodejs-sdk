export function generateMockjwt(expiryInSecsFromNow : number): string {
    const header = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'JWT'})).toString('base64url');
    const payload = Buffer.from(JSON.stringify({exp: Math.floor(Date.now()/1000) + expiryInSecsFromNow})).toString('base64url');
    return `${header}.${payload}.signature`;
}