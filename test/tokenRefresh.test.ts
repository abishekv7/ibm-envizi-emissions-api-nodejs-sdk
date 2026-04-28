import { Client } from "../src/Client";
import * as utils from "../src/utils";
import mockAxios from "axios";
import MockAdapter from "axios-mock-adapter";
import { generateMockjwt } from "./testUtils";
import { TOKEN_GENERATION_API, PAT_TOKEN_EXCHANGE_API } from "../src/Constants";

const mock = new MockAdapter(mockAxios);
describe("Token refreshing", () => {
  const config = { apiKey: "abc", clientId: "234", orgId:"123" };
  beforeEach(() => {
    jest.clearAllMocks();
    mock.reset();
  });

  it("should not refresh if token is still valid", async () => {
    const freshToken = generateMockjwt(600);
    mock.onGet(TOKEN_GENERATION_API).reply(200, { freshToken });

    jest
      .spyOn(utils, "findExpiryTime")
      .mockReturnValue(Math.floor(Date.now() / 1000) + 600);

    await Client.getClient(config);
    const instance = Client.getInstance();

    const spy = jest.spyOn(Client as any, "requestToken");

    await instance.refreshToken();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should not refresh if token is still valid", async () => {
    const shortLiveToken = generateMockjwt(1);
    const refreshToken = generateMockjwt(600);
    mock
      .onGet(TOKEN_GENERATION_API)
      .reply(200, { refreshToken });

    jest
      .spyOn(utils, "findExpiryTime")
      .mockReturnValue(Math.floor(Date.now() / 1000) + 1);

    await Client.getClient(config);
    const instance = Client.getInstance();

    const spy = jest.spyOn(Client as any, "requestToken");

    await instance.refreshToken();
    expect(spy).not.toHaveBeenCalledTimes(1);
  });

  it("should refresh PAT token when it is about to expire", async () => {
    const shortLiveToken = generateMockjwt(1);
    const refreshedToken = generateMockjwt(600);
    
    mock
      .onPost(PAT_TOKEN_EXCHANGE_API)
      .replyOnce(200, shortLiveToken)
      .onPost(PAT_TOKEN_EXCHANGE_API)
      .replyOnce(200, refreshedToken);

    jest
      .spyOn(utils, "findExpiryTime")
      .mockReturnValueOnce(Math.floor(Date.now() / 1000) + 1)
      .mockReturnValueOnce(Math.floor(Date.now() / 1000) + 600);

    await Client.getClient({
      patToken: "test-pat-token",
      clientId: "test-client-id",
    });
    const instance = Client.getInstance();

    const spy = jest.spyOn(Client as any, "requestTokenFromPAT");

    await instance.refreshToken();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      patToken: "test-pat-token",
      clientId: "test-client-id",
      authUrl: PAT_TOKEN_EXCHANGE_API,
    });
  });

  it("should not refresh PAT token if it is still valid", async () => {
    const freshToken = generateMockjwt(600);
    mock.onPost(PAT_TOKEN_EXCHANGE_API).reply(200, freshToken);

    const spy = jest.spyOn(Client as any, "requestTokenFromPAT");

    jest
      .spyOn(utils, "findExpiryTime")
      .mockReturnValue(Math.floor(Date.now() / 1000) + 600);

    await Client.getClient({
      patToken: "test-pat-token",
      clientId: "test-client-id",
    });
    const instance = Client.getInstance();

    spy.mockClear(); // Clear the initial call from getClient

    await instance.refreshToken();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should refresh PAT token with custom authUrl", async () => {
    const shortLiveToken = generateMockjwt(1);
    const refreshedToken = generateMockjwt(600);
    const customAuthUrl = "https://custom-auth.example.com/exchange";
    
    mock
      .onPost(customAuthUrl)
      .replyOnce(200, shortLiveToken)
      .onPost(customAuthUrl)
      .replyOnce(200, refreshedToken);

    const spy = jest.spyOn(Client as any, "requestTokenFromPAT");

    jest
      .spyOn(utils, "findExpiryTime")
      .mockReturnValueOnce(Math.floor(Date.now() / 1000) + 1)
      .mockReturnValueOnce(Math.floor(Date.now() / 1000) + 600);

    await Client.getClient({
      patToken: "test-pat-token",
      clientId: "test-client-id",
      authUrl: customAuthUrl,
    });
    const instance = Client.getInstance();

    spy.mockClear(); // Clear the initial call from getClient

    await instance.refreshToken();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      patToken: "test-pat-token",
      clientId: "test-client-id",
      authUrl: customAuthUrl,
    });
  });
});
