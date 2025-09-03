import * as requestModule from "../src/request";
import * as locationApi from "../src/api/LocationEmission";
import * as fugitiveApi from "../src/api/FugitiveEmission";
import * as mobileApi from "../src/api/MobileEmission";
import * as stationaryApi from "../src/api/StationaryEmission";
import * as GenericCalculation from "../src/api/GenericCalculation";
import * as TransportationDistributionApi from "../src/api/TransportationDistributionEmission";
import * as Factors from "../src/api/Factors";

import {
  LOCATION_API_PATH,
  FUGITIVE_API_PATH,
  STATIONARY_API_PATH,
  MOBILE_API_PATH,
  GENERIC_CALCULATION_API_PATH,
  TRANSPORTATION_AND_DISTRIBUTION_API_PATH,
  FACTOR_API_PATH,
  FACTOR_SET_API_PATH,
  SEARCH_API_PATH,
} from "../src/Constants";
import locationPayload from "./mocks/LocationRequest";
import commonpayload from "./mocks/CommonRequest";
import { Client } from "../src/Client";
import GenericCalculationPayload from "./mocks/GenericCalculationRequest";
import FactorPayload from "./mocks/FactorRequest";
import SearchPayload from "./mocks/SearchRequest";

type ApiTestCase = {
  name: string;
  func: (payload?: any) => Promise<string>;
  path: string;
  payload?: any;
  pathParams?: string | string[];
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
    name: "Transportation and Distribution API",
    func: TransportationDistributionApi.calculate,
    path: TRANSPORTATION_AND_DISTRIBUTION_API_PATH,
    payload: GenericCalculationPayload,
    method: "POST",
  },
  {
    name: "FactorSet API",
    func: Factors.getFactorSets,
    path: FACTOR_SET_API_PATH,
    method: "GET",
  },
  {
    name: "Search API",
    func: Factors.Search,
    path: SEARCH_API_PATH,
    payload: SearchPayload,
    method: "POST",
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
  describe.each(testCases)(
    "$name",
    ({ func, path, payload, pathParams, method }) => {
      it("Should call makeApiRequest with API url", async () => {
        let result;
        if (method === "POST") {
          result = await func(payload);
        } else {
          result =
            pathParams !== undefined
              ? await func(pathParams)
              : await func();
        }
        const clientDomain = Client.getInstance().getDomain();

        let UrlWithParams = `${clientDomain}${path}`;
        if (method === "GET" && pathParams) {
          UrlWithParams = `${clientDomain}${path}/${
            Array.isArray(pathParams) ? pathParams.join("/") : pathParams
          }`;
        }

        const expectedUrl =
          method === "GET" ? UrlWithParams : `${clientDomain}${path}`;

        const expectedRequest: any = {
          method,
          url: expectedUrl,
        };
        if (method === "POST") expectedRequest.data = payload;
        expect(spy).toHaveBeenCalledWith(expectedRequest);
        expect(result).toBe(mockResp);
      });
    }
  );
});
