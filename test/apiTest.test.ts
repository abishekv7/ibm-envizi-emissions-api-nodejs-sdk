import * as requestModule from "../src/request";
import * as locationApi from "../src/api/LocationEmission";
import * as fugitiveApi from "../src/api/FugitiveEmission";
import * as mobileApi from "../src/api/MobileEmission";
import * as stationaryApi from "../src/api/StationaryEmission";
import * as GenericCalculation from "../src/api/GenericCalculation";
import * as Factors from "../src/api/Factors";

import {
  LOCATION_API_PATH,
  FUGITIVE_API_PATH,
  STATIONARY_API_PATH,
  MOBILE_API_PATH,
  GENERIC_CALCULATION_API_PATH,
  FACTOR_API_PATH,
} from "../src/Constants";
import locationPayload from "./mocks/LocationRequest";
import commonpayload from "./mocks/CommonRequest";
import { Client } from "../src/Client";
import GenericCalculationPayload from "./mocks/GenericCalculationRequest";
import FactorPayload from "./mocks/FactorRequest";

type ApiTestCase = {
  name: string;
  func: (payload: any, useProxy?: boolean) => Promise<string>;
  path: string;
  payload: any;
  method: "GET" | "POST";
};

const mockResp = "mock-success-response";

const testCases: ApiTestCase[] = [
  {
    name: "Location API",
    func: locationApi.calculate,
    path: LOCATION_API_PATH,
    payload: locationPayload,
    method: "POST",
  },
  {
    name: "Fugitive API",
    func: fugitiveApi.calculate,
    path: FUGITIVE_API_PATH,
    payload: commonpayload,
    method: "POST",
  },
  {
    name: "Mobile API",
    func: mobileApi.calculate,
    path: MOBILE_API_PATH,
    payload: commonpayload,
    method: "POST",
  },
  {
    name: "Stationary API",
    func: stationaryApi.calculate,
    path: STATIONARY_API_PATH,
    payload: commonpayload,
    method: "POST",
  },
  {
    name: "GenericCalculation API",
    func: GenericCalculation.calculate,
    path: GENERIC_CALCULATION_API_PATH,
    payload: GenericCalculationPayload,
    method: "POST",
  },
  {
    name: "Factor API",
    func: Factors.retrieveFactor,
    path: FACTOR_API_PATH,
    payload: FactorPayload,
    method: "POST",
  },
  {
    name: "FactorID API",
    func: Factors.getFactorById,
    path: FACTOR_API_PATH,
    payload: "factor-id-123",
    method: "GET",
  },
];

describe("API Test calculate functions", () => {
  let spy: jest.SpyInstance;
  let tokenSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    tokenSpy = jest
      .spyOn(Client as any, "requestToken")
      .mockResolvedValue(
        "eyJpzGciOiJIUzI1NlIsInR5cCI6IkplVCJ9." +
          Buffer.from(
            JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })
          ).toString("base64") +
          ".signature"
      );

    Client.getClient({
      apiKey: "mock-api-key",
      clientId: "mock-client-id",
      orgId: "mock-org-id",
    });
    spy = jest
      .spyOn(requestModule, "makeApiRequest")
      .mockResolvedValue(mockResp);
  });
  afterEach(() => {
    tokenSpy.mockRestore();
    spy.mockRestore();
  });
  describe.each(testCases)("$name", ({ func, path, payload, method }) => {
    it("should call makeApiRequest with url", async () => {
      const result = await func(payload, true);
      const expectedUrl = method === "GET" ? `${path}/${payload}` : path;
      const expectedRequest: any = {
        method,
        url: expectedUrl,
      };
      if (method === "POST") expectedRequest.data = payload;
      expect(spy).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBe(mockResp);
    });
    it("Should call makeApiRequest with full API url", async () => {
      const result = await func(payload, false);
      const clientDomain = Client.getInstance().getDomain();
      const expectedUrl =
        method === "GET"
          ? `${clientDomain}${path}/${payload}`
          : `${clientDomain}${path}`;

      const expectedRequest: any = {
        method,
        url: expectedUrl,
      };
      if (method === "POST") expectedRequest.data = payload;
      expect(spy).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBe(mockResp);
    });
  });
});
