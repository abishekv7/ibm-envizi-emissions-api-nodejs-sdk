import * as requestModule from "../src/request";
import * as locationApi from "../src/api/LocationEmission";
import * as fugitiveApi from "../src/api/FugitiveEmission";
import * as mobileApi from "../src/api/MobileEmission";
import * as stationaryApi from "../src/api/StationaryEmission";

import {
  LOCATION_API_PATH,
  FUGITIVE_API_PATH,
  STATIONARY_API_PATH,
  MOBILE_API_PATH,
} from "../src/Constants";
import locationPayload from "./mocks/LocationRequest";
import commonpayload from "./mocks/CommonRequest";
import { Client } from "../src/Client";

type ApiTestCase = {
  name: string;
  func: (payload: any, useProxy?: boolean) => Promise<string>;
  path: string;
  payload: any;
};

const mockResp = "mock-success-response";

const testCases: ApiTestCase[] = [
  {
    name: "Location API",
    func: locationApi.calculate,
    path: LOCATION_API_PATH,
    payload: locationPayload,
  },
  {
    name: "Fugitive API",
    func: fugitiveApi.calculate,
    path: FUGITIVE_API_PATH,
    payload: commonpayload,
  },
  {
    name: "Mobile API",
    func: mobileApi.calculate,
    path: MOBILE_API_PATH,
    payload: commonpayload,
  },
  {
    name: "Stationary API",
    func: stationaryApi.calculate,
    path: STATIONARY_API_PATH,
    payload: commonpayload,
  },
];

describe("API Test calculate functions", () => {
  let spy: jest.SpyInstance;
  let tokenSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    tokenSpy= jest.spyOn(Client as any, "requestToken").mockResolvedValue("eyJpzGciOiJIUzI1NlIsInR5cCI6IkplVCJ9." +
        Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64") +
        ".signature");
    

    Client.getClient({
      apiKey: "mock-api-key",
      clientId: "mock-client-id",
      useStaging: true,
    });
    spy = jest
      .spyOn(requestModule, "makeApiRequest")
      .mockResolvedValue(mockResp);
  });
  afterEach(() => {
    tokenSpy.mockRestore();
    spy.mockRestore();
  });
  describe.each(testCases)("$name", ({ func, path, payload }) => {
    it("should call makeApiRequest with url", async () => {
      const result = await func(payload, true);

      expect(spy).toHaveBeenCalledWith({
        method: "POST",
        url: path,
        data: payload,
      });
      expect(result).toBe(mockResp);
    });
    it("Should call makeApiRequest with full API url", async () => {
      const result = await func(payload, false);
      const clientDomain = Client.getInstance().getDomain();
      expect(spy).toHaveBeenCalledWith({
        method: "POST",
        url: clientDomain + path,
        data: payload,
      });
      expect(result).toBe(mockResp);
    });
  });
});
