import { Client } from "../src/Client";
import * as utils from "../src/utils";
import mockAxios from "axios";
import MockAdapter from "axios-mock-adapter";
import { generateMockjwt } from "./testUtils";
import { TOKEN_GENERATION_API } from "../src/Constants";

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
});
