import axios from "axios";
import { ClientConfig } from "./interfaces/Config";
import { findExpireTime } from "./utils";
import { API_DOMAIN, TOKEN_GENERATION_API } from "./Constants";

export class Client {
  private static instance: Client | null = null;

  private token: string;
  private apiKey: string;
  private clientId: string;
  private orgId: string;
  private expiresAt: number;
  private readonly domain: string;
  private readonly tokenDomain: string;

  private constructor(token: string, config: ClientConfig) {
    const { apiKey, clientId, orgId, host, authUrl } = config;
    this.token = token;
    this.apiKey = apiKey;
    this.clientId = clientId;
    this.orgId = orgId;
    const exp = findExpireTime(token);
    this.expiresAt = exp;
    this.domain = host ?? API_DOMAIN;
    this.tokenDomain = authUrl ?? TOKEN_GENERATION_API;
  }

  public static async getClient(config: ClientConfig): Promise<void> {
    if (config.host && !config.authUrl) {
      throw new Error(
        'If custom "host" is provided, "authUrl" must also be provided.'
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
      throw new Error(
        "Client is not initialized. Call Client.getClient() first."
      );
    }
    return Client.instance;
  }

  public async refreshToken(): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    if (this.expiresAt - now < 60) {
      console.log("[SDK] Refreshing token...");
      const token = await Client.requestToken({
        apiKey: this.apiKey,
        clientId: this.clientId,
        orgId: this.orgId,
        authUrl: this.tokenDomain,
      });
      this.token = token;
      this.expiresAt = findExpireTime(token);
    }
  }

  public getAuthHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.token}` };
  }
  public getClientId(): string{
    return this.clientId;
  }


  private static async requestToken(config: ClientConfig): Promise<string> {
    const tokenUrl = config.authUrl ?? TOKEN_GENERATION_API;
    const res = await axios.get(tokenUrl, {
      headers: {
        "X-Api-Key": config.apiKey,
        "X-IBM-Client-Id": `saascore-${config.clientId}`,
        accept: "application/json",
      },
      params: {
        orgId: config.orgId
      },
    });

    if (!res.data)
      throw new Error('Token response is empty');
    return res.data;
  }
}
