import * as requestModule from "../src/request";
import * as locationApi from "../src/api/Location";
import * as fugitiveApi from "../src/api/Fugitive";
import * as mobileApi from "../src/api/Mobile";
import * as stationaryApi from "../src/api/Stationary";
import * as GenericCalculation from "../src/api/Calculation";
import * as TransportationDistributionApi from "../src/api/TransportationAndDistribution";
import * as Factors from "../src/api/Factor";
import * as FactorSets from "../src/api/FactorSets";

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
  LOCATION_TYPES,
  FUGITIVE_API_TYPES,
  MOBILE_API_TYPES,
  STATIONARY_API_TYPES,
  CALCULATION_TYPES,
  FACTOR_API_TYPES,
  TRANSPORTATION_AND_DISTRIBUTION_API_TYPES,
  LOCATION_API_AREA,
  FUGITIVE_API_AREA,
  MOBILE_API_AREA,
  STATIONARY_API_AREA,
  GENERAL_API_AREA,
  FACTOR_API_AREA,
  TRANSPORTATION_AND_DISTRIBUTION_API_AREA,
  LOCATION_API_UNITS,
  SEARCH_API_AREA,
  FUGITIVE_API_UNITS,
  MOBILE_API_UNITS,
  STATIONARY_API_UNITS,
  GENERAL_API_UNITS,
  FACTOR_API_UNITS,
  TRANSPORTATION_AND_DISTRIBUTION_API_UNITS,
} from "../src/Constants";
import locationPayload from "./mocks/LocationRequest";
import commonpayload from "./mocks/CommonRequest";
import { Client } from "../src/Client";
import GenericCalculationPayload from "./mocks/GenericCalculationRequest";
import FactorPayload from "./mocks/FactorRequest";
import SearchPayload from "./mocks/SearchRequest";

type ApiTestCase = {
  name: string;
  func: (payload?: any) => Promise<any>;
  path: string;
  payload?: any;
  pathParams?: string | string[];
  queryParams?: Record<string, string>;
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
    func: FactorSets.get,
    path: FACTOR_SET_API_PATH,
    method: "GET",
  },
  {
    name: "Search API",
    func: Factors.search,
    path: SEARCH_API_PATH,
    payload: SearchPayload,
    method: "POST",
  },
  {
    name: "Location API - getTypes",
    func: locationApi.getTypes,
    path: LOCATION_TYPES,
    method: "GET",
  },
  {
    name: "Fugitive API - getTypes",
    func: fugitiveApi.getTypes,
    path: FUGITIVE_API_TYPES,
    method: "GET",
  },
  {
    name: "Mobile API - getTypes",
    func: mobileApi.getTypes,
    path: MOBILE_API_TYPES,
    method: "GET",
  },
  {
    name: "Stationary API - getTypes",
    func: stationaryApi.getTypes,
    path: STATIONARY_API_TYPES,
    method: "GET",
  },
  {
    name: "GenericCalculation API - getTypes",
    func: GenericCalculation.getTypes,
    path: CALCULATION_TYPES,
    method: "GET",
  },
  {
    name: "Factor API - getTypes",
    func: Factors.getTypes,
    path: FACTOR_API_TYPES,
    method: "GET",
  },
  {
    name: "Transportation and Distribution API - getTypes",
    func: TransportationDistributionApi.getTypes,
    path: TRANSPORTATION_AND_DISTRIBUTION_API_TYPES,
    method: "GET",
  },
  {
    name: "Location API - getArea",
    func: locationApi.getArea,
    path: LOCATION_API_AREA,
    method: "GET",
  },
  {
    name: "Fugitive API - getArea",
    func: fugitiveApi.getArea,
    path: FUGITIVE_API_AREA,
    method: "GET",
  },
  {
    name: "Mobile API - getArea",
    func: mobileApi.getArea,
    path: MOBILE_API_AREA,
    method: "GET",
  },
  {
    name: "Stationary API - getArea",
    func: stationaryApi.getArea,
    path: STATIONARY_API_AREA,
    method: "GET",
  },
  {
    name: "GenericCalculation API - getArea",
    func: GenericCalculation.getArea,
    path: GENERAL_API_AREA,
    method: "GET",
  },
  {
    name: "Factor API - getArea",
    func: Factors.getArea,
    path: FACTOR_API_AREA,
    method: "GET",
  },
  {
    name: "Factor SEARCH API - getArea",
    func: Factors.getSearchArea,
    path: SEARCH_API_AREA,
    method: "GET",
  },
  {
    name: "Transportation and Distribution API - getArea",
    func: TransportationDistributionApi.getArea,
    path: TRANSPORTATION_AND_DISTRIBUTION_API_AREA,
    method: "GET",
  },
  {
    name: "Location API - getUnits",
    func: locationApi.getUnits,
    path: LOCATION_API_UNITS,
    queryParams: { type: "electricity" },
    method: "GET",
  },
  {
    name: "Fugitive API - getUnits",
    func: fugitiveApi.getUnits,
    path: FUGITIVE_API_UNITS,
    queryParams: { type: "Natural Gas - Scope 3:AAA" },
    method: "GET",
  },
  {
    name: "Mobile API - getUnits",
    func: mobileApi.getUnits,
    path: MOBILE_API_UNITS,
    queryParams: { type: "Cars:B20:(NE)" },
    method: "GET",
  },
  {
    name: "Stationary API - getUnits",
    func: stationaryApi.getUnits,
    path: STATIONARY_API_UNITS,
    queryParams: { type: "Jet Kerosene" },
    method: "GET",
  },
  {
    name: "GenericCalculation API - getUnits",
    func: GenericCalculation.getUnits,
    path: GENERAL_API_UNITS,
    queryParams: { type: "Natural Gas - Scope 3:AAA" },
    method: "GET",
  },
  {
    name: "Factor API - getUnits",
    func: Factors.getUnits,
    path: FACTOR_API_UNITS,
    queryParams: { type: "HFC-263fb" },
    method: "GET",
  },
  {
    name: "Transportation and Distribution API - getUnits",
    func: TransportationDistributionApi.getUnits,
    path: TRANSPORTATION_AND_DISTRIBUTION_API_UNITS,
    queryParams: { type: "Business Travel - Cars:Diesel - Small" },
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
  describe.each(testCases)(
    "$name",
    ({ func, path, payload, pathParams, queryParams, method }) => {
      it("Should call makeApiRequest with API url", async () => {
        let result;
        if (method === "POST") {
          result = await func(payload);
        } else {
          // For GET requests with queryParams, pass the type value
          if (queryParams) {
            result = await func(queryParams.type);
          } else if (pathParams !== undefined) {
            result = await func(pathParams);
          } else {
            result = await func();
          }
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
        if (method === "GET" && queryParams) expectedRequest.params = queryParams;
        expect(spy).toHaveBeenCalledWith(expectedRequest);
        expect(result).toBe(mockResp);
      });
    }
  );
});
