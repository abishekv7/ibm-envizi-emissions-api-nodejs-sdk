import * as requestModule from "../request";
import * as locationApi from "../api/LocationEmission";
import * as fugitiveApi from "../api/FugitiveEmission";
import * as mobileApi from "../api/MobileEmission";
import * as stationaryApi from "../api/StationaryEmission";

import {
  LOCATION_API_PATH,
  FUGITIVE_API_PATH,
  STATIONARY_API_PATH,
  MOBILE_API_PATH,
  API_DOMAIN,
} from "../Constants";
import locationPayload from "../mocks/LocationRequest";
import commonpayload from "../mocks/CommonRequest";

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
  beforeEach(() => {
    jest.clearAllMocks();
    spy = jest
      .spyOn(requestModule, "makeApiRequest")
      .mockResolvedValue(mockResp);
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
      expect(spy).toHaveBeenCalledWith({
        method: "POST",
        url: API_DOMAIN + path,
        data: payload,
      });
      expect(result).toBe(mockResp);
    });
  });
});
