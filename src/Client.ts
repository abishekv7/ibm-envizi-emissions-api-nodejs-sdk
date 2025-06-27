import axios from 'axios';
import { ClientConfig } from './interfaces/Config'
import { findExpireTime } from './utils';

export class Client {
  private static instance: Client | null = null;

  private token: string;
  private apiKey: string;
  private clientId?: string;
  private tenantId?: string;
  private orgId?: string;
  private expiresAt: number;
  private legacy: boolean;

  private constructor(token: string, config: ClientConfig) {
        const {apiKey, clientId , tenantId, orgId, legacy=false} = config;
    this.token = token;
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.orgId = orgId;
    this.legacy = legacy;
    const exp  = findExpireTime(token);
    this.expiresAt = exp;
  }

  public static async init(config: ClientConfig): Promise<void> {
    const token = await Client.requestToken(config);
    Client.instance = new Client(token, config);
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      throw new Error('Client is not initialized. Call Client.init() first.');
    }
    return Client.instance;
  }

  public async refreshToken(): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    if (this.expiresAt - now < 60) {
      console.log('[SDK] Refreshing token...');
      const token = await Client.requestToken({ apiKey: this.apiKey, clientId: this.clientId });
      this.token = token;
      this.expiresAt = findExpireTime(token);
    }
  }

  public getAuthHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.token}` };
  }

  private static async requestToken(config: ClientConfig): Promise<string> {
    const res = await axios.post<{ access_token: string }>(
      'https://stg.auth-b2b-twc.ibm.com/Auth/GetBearerForClient',
      {
        apiKey: config.apiKey,
        clientId: config.clientId,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!res.data?.access_token) throw new Error('Token response missing "access_token" field');
    return res.data.access_token;
  }
}
