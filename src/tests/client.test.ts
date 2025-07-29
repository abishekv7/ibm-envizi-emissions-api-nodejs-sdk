import { Client } from "../Client";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TOKEN_GENERATION_API } from "../Constants";

const mock = new MockAdapter(axios);

describe("Client initialization and Header Authorization", () => {
  const base64Header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");
  const base64Payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 600 })
  ).toString("base64url");
  const mockToken = `${base64Header}.${base64Payload}.Signature`;

  const config = { apiKey: " somerandomkey", clientId: "emptyclient" };
  beforeEach(() => {
    mock.reset();
    mock.onPost(TOKEN_GENERATION_API).reply(200, { access_token: mockToken });
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
    expect(() => Client.getInstance()).toThrow("Client is not initialized. Call Client.getClient() first.");
  });
});
