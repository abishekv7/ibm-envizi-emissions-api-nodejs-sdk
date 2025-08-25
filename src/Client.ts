import axios from "axios";
import { ClientConfig } from "./interfaces/Config";
import { findExpiryTime } from "./utils";
import { API_DOMAIN, TOKEN_GENERATION_API, CLIENT_SOURCE_EXCEL, CLIENT_SOURCE_SDK } from "./Constants";

export class Client {
  private static instance: Client | null = null;

  private token: string;
  private readonly apiKey: string;
  private readonly clientId: string;
  private readonly orgId: string;
  private expiresAt: number;
  private readonly domain: string;
  private readonly tokenDomain: string;
  private readonly isUserProvidedToken: boolean;
  private readonly clientSource: string;

  private constructor(
    token: string,
    config: ClientConfig,
    isUserProvidedToken = false
  ) {
    const { apiKey="", clientId, orgId="", host, authUrl, isExcelAddIn=false } = config;
    this.token = token;
    this.clientId = clientId;
    if (isUserProvidedToken) {
      this.apiKey = "";
      this.orgId = "";
    } else {
      this.apiKey = apiKey;
      this.orgId = orgId;
    }

    const exp = findExpiryTime(token);
    this.expiresAt = exp;
    this.domain = host ?? API_DOMAIN;
    this.tokenDomain = authUrl ?? TOKEN_GENERATION_API;
    this.isUserProvidedToken = isUserProvidedToken;
    this.clientSource = isExcelAddIn === true ? CLIENT_SOURCE_EXCEL : CLIENT_SOURCE_SDK;
  }

  public static async getClient(config: ClientConfig): Promise<void> {
    if (config.host && !config.authUrl) {
      throw new Error(
        'If custom "host" is provided, "authUrl" must also be provided.'
      );
    }
    if (config.token && !config.clientId) {
      throw new Error(
        'If token is provided directly, "clientId" must also be provided.'
      );
    }
    if(config.apiKey && (!config.orgId || !config.clientId)){
      throw new Error(
        'If apiKey is provided , "clientId" and "OrgId" must also be provided.'
      );
    }
    let token: string;
    let isUserProvidedToken = false;

    if (config.token && config.clientId) {
      token = config.token;
      isUserProvidedToken = true;
    } else token = await Client.requestToken(config);
    Client.instance = new Client(token, config,isUserProvidedToken);
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
    if (!this.isUserProvidedToken) {
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
        this.expiresAt = findExpiryTime(token);
      }
    }
  }

  public getAuthHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.token}` };
  }
  
  public getClientId(): string {
    return this.clientId;
  }

  public getClientSource() : string {
    return this.clientSource;
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
      }
    });

    if (!res.data) throw new Error("Token response is empty");
    return String(res.data).trim();
  }
}