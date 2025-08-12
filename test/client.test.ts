import { Client } from "../src/Client";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TOKEN_GENERATION_API } from "../src/Constants";
import { ClientConfig } from "../src/interfaces/Config";

const mock = new MockAdapter(axios);

describe("Client initialization and Header Authorization", () => {
  const base64Header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");
  const base64Payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 600 })
  ).toString("base64url");
  const mockToken = `${base64Header}.${base64Payload}.Signature`;

  const config = {
    apiKey: " somerandomkey",
    clientId: "emptyclient",
    orgId: "OrgId",
  };
  beforeEach(() => {
    mock.reset();
    mock.onGet(TOKEN_GENERATION_API).reply(200, mockToken);
  });

  it("should initialize client and return auth header", async () => {
    await Client.getClient(config);
    const instance = Client.getInstance();
    expect(instance.getAuthHeader()).toEqual({
      Authorization: `Bearer ${mockToken}`,
    });
  });

  it("Should throw if getInstance called before initiating client", () => {
    Client["instance"] = null;
    expect(() => Client.getInstance()).toThrow(
      "Client is not initialized. Call Client.getClient() first."
    );
  });

  it("Should throw validation error for missing dependent config", async () => {
    await expect(
      Client.getClient({ host: "custom-host", clientId: "clientId" })
    ).rejects.toThrow(
      'If custom "host" is provided, "authUrl" must also be provided.'
    );
    await expect(
      Client.getClient({ token: "custom token" } as unknown as ClientConfig)
    ).rejects.toThrow(
      'If token is provided directly, "clientId" must also be provided.'
    );
    await expect(
      Client.getClient({ apiKey: "abc" } as unknown as ClientConfig)
    ).rejects.toThrow(
      'If apiKey is provided , "clientId" and "OrgId" must also be provided.'
    );
  });
  it("should not call refresh token if userProvidedToken is set and set token to userProvided", async () => {
    const base64Header = Buffer.from(
      JSON.stringify({ alg: "HS256", typ: "JWT" })
    ).toString("base64url");
    const base64Payload = Buffer.from(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 600 })
    ).toString("base64url");
    const mockToken = `${base64Header}.${base64Payload}.Signature`;

    const userToken = mockToken;
    const spy = jest.spyOn(Client as any, "requestToken");
    await Client.getClient({
      token: userToken,
      clientId: "sample id",
    } as any);
    const instance = Client.getInstance();
    await instance.refreshToken();
    expect(instance.getAuthHeader()).toEqual({
      Authorization: `Bearer ${userToken}`,
    });
    expect(spy).not.toHaveBeenCalled();
  });
});
