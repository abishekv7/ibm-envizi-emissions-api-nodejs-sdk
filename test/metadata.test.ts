import * as MetadataApi from "../src/api/Metadata";
import { Client } from "../src/Client";
import {
    METADATA_AREA_ENDPOINT,
    METADATA_TYPES_ENDPOINT,
    METADATA_UNITS_ENDPOINT,
} from "../src/Constants";
import * as requestModule from "../src/request";

type MetadataTestCase = {
  name: string;
  func: (arg?: string) => Promise<any>;
  path: string;
  endpoint?: string;
  type?: string;
  queryParams?: Record<string, string>;
  requestBody?: Record<string, string>;
  method: "GET" | "POST";
};

const mockResp = "mock-success-response";

const testCases: MetadataTestCase[] = [
  // GET Types Tests
  {
    name: "Metadata API - getTypes (default)",
    func: MetadataApi.getTypes,
    path: METADATA_TYPES_ENDPOINT,
    method: "GET",
  },
  {
    name: "Metadata API - getTypes with endpoint",
    func: MetadataApi.getTypes,
    path: METADATA_TYPES_ENDPOINT,
    endpoint: "location",
    queryParams: { endpoint: "location" },
    method: "GET",
  },
  {
    name: "Metadata API - getTypes with stationary endpoint",
    func: MetadataApi.getTypes,
    path: METADATA_TYPES_ENDPOINT,
    endpoint: "stationary",
    queryParams: { endpoint: "stationary" },
    method: "GET",
  },
  // POST Types Tests
  {
    name: "Metadata API - postTypes (default)",
    func: MetadataApi.postTypes,
    path: METADATA_TYPES_ENDPOINT,
    requestBody: {},
    method: "POST",
  },
  {
    name: "Metadata API - postTypes with endpoint",
    func: MetadataApi.postTypes,
    path: METADATA_TYPES_ENDPOINT,
    endpoint: "mobile",
    requestBody: { endpoint: "mobile" },
    method: "POST",
  },
  {
    name: "Metadata API - postTypes with fugitive endpoint",
    func: MetadataApi.postTypes,
    path: METADATA_TYPES_ENDPOINT,
    endpoint: "fugitive",
    requestBody: { endpoint: "fugitive" },
    method: "POST",
  },
  // GET Area Tests
  {
    name: "Metadata API - getArea (default)",
    func: MetadataApi.getArea,
    path: METADATA_AREA_ENDPOINT,
    method: "GET",
  },
  {
    name: "Metadata API - getArea with endpoint",
    func: MetadataApi.getArea,
    path: METADATA_AREA_ENDPOINT,
    endpoint: "calculation",
    queryParams: { endpoint: "calculation" },
    method: "GET",
  },
  {
    name: "Metadata API - getArea with transportation endpoint",
    func: MetadataApi.getArea,
    path: METADATA_AREA_ENDPOINT,
    endpoint: "transportation-and-distribution",
    queryParams: { endpoint: "transportation-and-distribution" },
    method: "GET",
  },
  // POST Area Tests
  {
    name: "Metadata API - postArea (default)",
    func: MetadataApi.postArea,
    path: METADATA_AREA_ENDPOINT,
    requestBody: {},
    method: "POST",
  },
  {
    name: "Metadata API - postArea with endpoint",
    func: MetadataApi.postArea,
    path: METADATA_AREA_ENDPOINT,
    endpoint: "real-estate",
    requestBody: { endpoint: "real-estate" },
    method: "POST",
  },
  {
    name: "Metadata API - postArea with economic-activity endpoint",
    func: MetadataApi.postArea,
    path: METADATA_AREA_ENDPOINT,
    endpoint: "economic-activity",
    requestBody: { endpoint: "economic-activity" },
    method: "POST",
  },
  // GET Units Tests
  {
    name: "Metadata API - getUnits (default)",
    func: MetadataApi.getUnits,
    path: METADATA_UNITS_ENDPOINT,
    method: "GET",
  },
  {
    name: "Metadata API - getUnits with type",
    func: MetadataApi.getUnits,
    path: METADATA_UNITS_ENDPOINT,
    type: "Natural Gas",
    queryParams: { type: "Natural Gas" },
    method: "GET",
  },
  {
    name: "Metadata API - getUnits with type with subtype",
    func: MetadataApi.getUnits,
    path: METADATA_UNITS_ENDPOINT,
    type: "Natural Gas - Scope 3:AAA",
    queryParams: { type: "Natural Gas - Scope 3:AAA" },
    method: "GET",
  },
  // POST Units Tests
  {
    name: "Metadata API - postUnits (default)",
    func: MetadataApi.postUnits,
    path: METADATA_UNITS_ENDPOINT,
    requestBody: {},
    method: "POST",
  },
  {
    name: "Metadata API - postUnits with type",
    func: MetadataApi.postUnits,
    path: METADATA_UNITS_ENDPOINT,
    type: "electricity",
    requestBody: { type: "electricity" },
    method: "POST",
  },
  {
    name: "Metadata API - postUnits with complex type",
    func: MetadataApi.postUnits,
    path: METADATA_UNITS_ENDPOINT,
    type: "Business Travel - Cars:Diesel - Small",
    requestBody: { type: "Business Travel - Cars:Diesel - Small" },
    method: "POST",
  },
];

describe("Metadata API Tests", () => {
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
    ({ func, path, endpoint, type, queryParams, requestBody, method }) => {
      it("Should call makeApiRequest with correct parameters", async () => {
        // For units tests, pass type; for types/area tests, pass endpoint
        const result = await func(endpoint ?? type);

        const clientDomain = Client.getInstance().getDomain();
        const expectedUrl = `${clientDomain}${path}`;

        const expectedRequest: any = {
          method,
          url: expectedUrl,
        };

        if (method === "POST") {
          expectedRequest.data = requestBody;
        } else if (method === "GET" && queryParams) {
          expectedRequest.params = queryParams;
        }

        expect(spy).toHaveBeenCalledWith(expectedRequest);
        expect(result).toBe(mockResp);
      });
    }
  );
});