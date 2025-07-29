import axios, {Method} from "axios";
import { makeApiRequest } from "../request";
import { Client } from "../Client";
import { RequestConfig } from "../interfaces/Config";

jest.mock('axios');

describe('makeApiRequest', () => {
    const mockRefreshToken = jest.fn();
  const mockGetAuthHeader = jest.fn();
  const mockAxiosRequest = axios.request as jest.Mock;

  beforeEach(() => {
    mockRefreshToken.mockReset();
    mockAxiosRequest.mockReset();
    mockGetAuthHeader.mockReset();

    const mockClient = {
        refreshToken: mockRefreshToken,
        getAuthHeader: mockGetAuthHeader,
    };

    jest.spyOn(Client, "getInstance").mockReturnValue(mockClient as any);
    mockGetAuthHeader.mockReturnValue({Authorization: "Bearer mock-token"});
});
it("should make success API call with full config)", async () => {
    const expectedResponse = {data: {success: true}};
    mockAxiosRequest.mockResolvedValue(expectedResponse);
    const config: RequestConfig = {
        method: "POST" as Method,
        url: "/test-route",
        data: {key: "value"},
        params: {id: 1},
        headers: { custom: "header" },
    };
    const result = await makeApiRequest<typeof expectedResponse.data>(config);
    
    expect(mockRefreshToken).toHaveBeenCalled();
    expect(mockGetAuthHeader).toHaveBeenCalled();
    expect(mockAxiosRequest).toHaveBeenCalledWith({
    method:"POST",
    url: "/test-route",
    data:{key: "value"},
    params:{id: 1},
    headers:{
        Authorization: "Bearer mock-token",
        custom: "header",
        "Content-Type": "application/json"
    },
});
expect(result).toEqual(expectedResponse.data);
});

it("should make a request with min config also", async () => { 
    const expectedResponse = {data: {message: "ok"}};
    mockAxiosRequest.mockResolvedValue(expectedResponse);
    const config: RequestConfig = {
        method: "GET" as Method,
        url: "/test-route",
    };
    const result = await makeApiRequest<typeof expectedResponse.data>(config);
    expect(mockAxiosRequest).toHaveBeenCalledWith({
        method:"GET",
        url: "/test-route",
        data: undefined,
        params: undefined,
         headers: {
        Authorization: "Bearer mock-token",
        "Content-Type": "application/json",
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
