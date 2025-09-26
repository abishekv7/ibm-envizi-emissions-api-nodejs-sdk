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

/**
 * Initializes and returns a Client instance with the provided configuration.
 * 
 * @static
 * @param {ClientConfig} config - The client configuration object
 * @return {Promise<void>} A promise that resolves when the client is initialized
 * @throws {Error} Throws an error if:
 *  - custom "host" is provided without "authUrl"
 *  - token is provided without "clientId"
 *  - apiKey is provided without "clientId" or "orgId"
 * 
 * @example
 * // Initialize with authentication URL
 * await Client.getClient({
 *   host: 'https://api.example.com',
 *   authUrl: 'https://auth.example.com',
 *   clientId: 'client123',
 *   orgId: 'org456'
 * });
 * 
 * // Initialize with existing token
 * await Client.getClient({
 *   token: 'existing-jwt-token',
 *   clientId: 'client123'
 * });
 * 
 * // Initialize with API key
 * await Client.getClient({
 *   apiKey: 'your-api-key',
 *   clientId: 'client123',
 *   orgId: 'org456'
 * });
 */

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

  /**
   * Returns the domain URL configured for the client.
   * 
   * @return {string} The domain URL string
   * 
   * @example
   * const client = Client.getInstance();
   * const apiDomain = client.getDomain();
   * console.log(apiDomain); // e.g., 'https://api.example.com'
   */
  public getDomain(): string {
    return this.domain;
  }

  /**
   * Returns the singleton instance of the Client.
   * 
   * @static
   * @return {Client} The singleton Client instance
   * @throws {Error} Throws an error if the Client has not been initialized with getClient()
   * 
   * @example
   * // First initialize the client
   * await Client.getClient({
   *   clientId: 'client123',
   *   orgId: 'org456'
   * });
   * 
   * // Then get the instance
   * const client = Client.getInstance();
   * // Use the client...
   */
  public static getInstance(): Client {
    if (!Client.instance) {
      throw new Error(
        "Client is not initialized. Call Client.getClient() first."
      );
    }
    return Client.instance;
  }

  /**
   * Refreshes the authentication token if it's about to expire.
   * Only refreshes if the token was not provided by the user and is expiring within 60 seconds.
   * 
   * @return {Promise<void>} A promise that resolves when the token refresh is complete
   * 
   * @example
   * const client = Client.getInstance();
   * // Ensure token is fresh before making API requests
   * await client.refreshToken();
   * // Proceed with API requests...
   */
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

  /**
   * Returns the authorization header object with the Bearer token.
   * 
   * @return {Record<string, string>} An object containing the Authorization header with the Bearer token
   * 
   * @example
   * const client = Client.getInstance();
   * const headers = {
   *   'Content-Type': 'application/json',
   *   ...client.getAuthHeader()
   * };
   * // headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer token...' }
   */
  public getAuthHeader(): Record<string, string> {
    return { Authorization: `Bearer ${this.token}` };
  }
  
  /**
   * Returns the client ID configured for this client instance.
   * 
   * @return {string} The client ID string
   * 
   * @example
   * const client = Client.getInstance();
   * const clientId = client.getClientId();
   * console.log(clientId); // e.g., 'client123'
   */
  public getClientId(): string {
    return this.clientId;
  }

  /**
   * Returns the client source identifier for this client instance.
   * 
   * @return {string} The client source string
   * 
   * @example
   * const client = Client.getInstance();
   * const source = client.getClientSource();
   * console.log(source); // e.g., 'web', 'mobile', 'sdk'
   */
  public getClientSource() : string {
    return this.clientSource;
  }

  /**
   * Requests an authentication token from the token generation API.
   * 
   * @private
   * @static
   * @param {ClientConfig} config - The client configuration containing authentication details
   * @return {Promise<string>} A promise that resolves to the authentication token string
   * @throws {Error} Throws an error if the token response is empty
   * 
   * @example
   * // Internal usage within the Client class
   * const token = await Client.requestToken({
   *   apiKey: 'your-api-key',
   *   clientId: 'client123',
   *   orgId: 'org456',
   *   authUrl: 'https://custom-auth.example.com/token'
   * });
   */
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