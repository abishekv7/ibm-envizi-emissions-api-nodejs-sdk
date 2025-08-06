import { Client } from "../src/Client";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TOKEN_GENERATION_API } from "../src/Constants";

const mock = new MockAdapter(axios);

describe("Client initialization and Header Authorization", () => {
  const base64Header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");
  const base64Payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 600 })
  ).toString("base64url");
  const mockToken = `${base64Header}.${base64Payload}.Signature`;

  const config = { apiKey: " somerandomkey", clientId: "emptyclient" , orgId: "OrgId"};
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
});
