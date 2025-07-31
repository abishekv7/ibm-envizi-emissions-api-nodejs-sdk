import axios from 'axios';
import { ClientConfig } from './interfaces/Config'
import { findExpireTime } from './utils';
import { API_DOMAIN, TOKEN_GENERATION_API} from './Constants';

export class Client {
  private static instance: Client | null = null;

  private token: string;
  private apiKey: string;
  private clientId?: string;
  private tenantId?: string;
  private orgId?: string;
  private expiresAt: number;
  private legacy: boolean;
  private domain: string;
  private tokenDomain: string;

  private constructor(token: string, config: ClientConfig) {
        const {apiKey, clientId , tenantId, orgId, legacy=false, host , tokenHost} = config;
    this.token = token;
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.orgId = orgId;
    this.legacy = legacy;
    const exp  = findExpireTime(token);
    this.expiresAt = exp;
    this.domain= host ?? API_DOMAIN;
    this.tokenDomain = tokenHost ?? TOKEN_GENERATION_API;

  }

  public static async getClient(config: ClientConfig): Promise<void> {
    if (config.host && !config.tokenHost) {
    throw new Error(
      'If custom "host" is provided, "tokenHost" must also be provided.'
    );
  }
    const token = await Client.requestToken(config);
    Client.instance = new Client(token, config);
  }

  public getDomain(): string {
    return this.domain;
  }

  public static getInstance(): Client {
    if (!Client.instance) {
      throw new Error('Client is not initialized. Call Client.getClient() first.');
    }
    return Client.instance;
  }

  public async refreshToken(): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    if (this.expiresAt - now < 60) {
      console.log('[SDK] Refreshing token...');
      const token = await Client.requestToken({ apiKey: this.apiKey, clientId: this.clientId , tokenHost: this.tokenDomain,});
      this.token = token;
      this.expiresAt = findExpireTime(token);
    }
  }

  public getAuthHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.token}` };
  }

  private static async requestToken(config: ClientConfig): Promise<string> {
    const tokenUrl = config.tokenHost ?? TOKEN_GENERATION_API;
    const res = await axios.post<{ access_token: string }>(
      tokenUrl,
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



