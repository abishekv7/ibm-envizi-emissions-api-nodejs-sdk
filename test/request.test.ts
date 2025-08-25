import axios, { Method } from "axios";
import { makeApiRequest } from "../src/request";
import { Client } from "../src/Client";
import { RequestConfig } from "../src/interfaces/Config";
import { get } from "http";
import { CLIENT_SOURCE_HEADER } from "../src/Constants";

jest.mock("axios");

describe("makeApiRequest", () => {
  const mockRefreshToken = jest.fn();
  const mockGetAuthHeader = jest.fn();
  const mockGetClientId = jest.fn();
  const mockGetClientSource = jest.fn();
  const mockAxiosRequest = axios.request as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockClient = {
      refreshToken: mockRefreshToken,
      getAuthHeader: mockGetAuthHeader,
      getClientId: mockGetClientId,
      getClientSource : mockGetClientSource
    };

    mockGetAuthHeader.mockReturnValue({ Authorization: "Bearer mock-token" });
    mockGetClientId.mockReturnValue("mock-client-id");
    mockGetClientSource.mockReturnValue("excel");

    jest.spyOn(Client, "getInstance").mockReturnValue(mockClient as any);
  });

  it("should make a successful API call with full config", async () => {
    const expectedResponse = { data: { success: true } };
    mockAxiosRequest.mockResolvedValue(expectedResponse);

    const config: RequestConfig = {
      method: "POST" as Method,
      url: "/test-route",
      data: { key: "value" },
      params: { id: 1 },
      headers: { custom: "header" },
    };

    const result = await makeApiRequest<typeof expectedResponse.data>(config);

    expect(mockRefreshToken).toHaveBeenCalled();
    expect(mockGetAuthHeader).toHaveBeenCalled();
    expect(mockGetClientId).toHaveBeenCalled();
    expect(mockGetClientSource).toHaveBeenCalled(); 

    expect(mockAxiosRequest).toHaveBeenCalledWith({
      method: "POST",
      url: "/test-route",
      data: { key: "value" },
      params: { id: 1 },
      headers: {
        Authorization: "Bearer mock-token",
        custom: "header",
        "Content-Type": "application/json",
        "X-IBM-Client-Id": "ghgemissions-mock-client-id",
        [CLIENT_SOURCE_HEADER]: "excel"
      },
    });

    expect(result).toEqual(expectedResponse.data);
  });

  it("should make a request with minimal config", async () => {
    const expectedResponse = { data: { message: "ok" } };
    mockAxiosRequest.mockResolvedValue(expectedResponse);

    const config: RequestConfig = {
      method: "GET" as Method,
      url: "/test-route",
    };

    const result = await makeApiRequest<typeof expectedResponse.data>(config);

    expect(mockAxiosRequest).toHaveBeenCalledWith({
      method: "GET",
      url: "/test-route",
      data: undefined,
      params: undefined,
      headers: {
        Authorization: "Bearer mock-token",
        "Content-Type": "application/json",
        "X-IBM-Client-Id": "ghgemissions-mock-client-id",
        [CLIENT_SOURCE_HEADER]: "excel"
      },
    });

    expect(result).toEqual(expectedResponse.data);
  });

  it("should throw an error if axios request fails", async () => {
    const error = new Error("Network failure");
    mockAxiosRequest.mockRejectedValue(error);

    const config: RequestConfig = {
      method: "GET" as Method,
      url: "/fail",
    };

    await expect(makeApiRequest(config)).rejects.toThrow("Network failure");

    expect(mockRefreshToken).toHaveBeenCalled();
    expect(mockAxiosRequest).toHaveBeenCalled();
  });
});
