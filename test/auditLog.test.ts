import axios from 'axios';
import { getAuditConfig, updateAuditConfig } from '../src/api/AuditLog';
import { Client } from '../src/Client';
import * as request from '../src/request';

jest.mock('../src/request');
jest.mock('../src/Client');

describe('AuditLog - Error Handling', () => {
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockClient = {
      getDomain: jest.fn().mockReturnValue('https://dev.api.ibm.com/ghgemissions/test/'),
      refreshToken: jest.fn().mockResolvedValue(undefined),
      getAuthHeader: jest.fn().mockReturnValue({ Authorization: 'Bearer mock-token' }),
      getClientId: jest.fn().mockReturnValue('test-client-id'),
      getClientSource: jest.fn().mockReturnValue('node-sdk'),
    } as any;

    (Client.getInstance as jest.Mock).mockReturnValue(mockClient);
  });

  it('should handle 409 Conflict gracefully when configuration is unchanged', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 409,
        statusText: 'Conflict',
        data: {
          logRequest: true,
          logResponse: false,
          message: 'No change in audit log configuration'
        },
        headers: {},
        config: {}
      }
    };

    // Mock makeApiRequest to throw a 409 error
    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);

    const payload = { logRequest: true, logResponse: false };
    const result = await updateAuditConfig(payload);

    expect(result).toEqual({
      logRequest: true,
      logResponse: false,
      message: 'No change in audit log configuration'
    });
  });

  it('should throw error for non-409 status codes', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'Server error' },
        headers: {},
        config: {}
      }
    };

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);

    const payload = { logRequest: true, logResponse: false };
    
    await expect(updateAuditConfig(payload)).rejects.toEqual(mockError);
  });

  it('should return updated configuration on successful update', async () => {
    const mockResponse = {
      logRequest: false,
      logResponse: true,
      message: 'Audit log configuration updated successfully'
    };

    (request.makeApiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const payload = { logRequest: false, logResponse: true };
    const result = await updateAuditConfig(payload);

    expect(result).toEqual(mockResponse);
  });

  it('should throw error for non-Axios errors', async () => {
    const mockError = new Error('Network error');

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);

    const payload = { logRequest: true, logResponse: false };
    
    await expect(updateAuditConfig(payload)).rejects.toThrow('Network error');
  });

  it('should handle 400 Bad Request with error message from API', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 400,
        statusText: 'Bad Request',
        data: {
          message: 'Invalid payload: logRequest must be a boolean'
        },
        headers: {},
        config: {}
      }
    };

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);

    const payload = { logRequest: true, logResponse: false };
    
    await expect(updateAuditConfig(payload)).rejects.toThrow('Invalid payload: logRequest must be a boolean');
  });

  it('should handle 403 Forbidden with error message from API', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 403,
        statusText: 'Forbidden',
        data: {
          message: 'User not authorized to make the request. Please contact the organisation administrator.'
        },
        headers: {},
        config: {}
      }
    };

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);

    const payload = { logRequest: true, logResponse: false };
    
    await expect(updateAuditConfig(payload)).rejects.toThrow('User not authorized to make the request. Please contact the organisation administrator.');
  });
});

describe('AuditLog - getAuditConfig Error Handling', () => {
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockClient = {
      getDomain: jest.fn().mockReturnValue('https://dev.api.ibm.com/ghgemissions/test/'),
      refreshToken: jest.fn().mockResolvedValue(undefined),
      getAuthHeader: jest.fn().mockReturnValue({ Authorization: 'Bearer mock-token' }),
      getClientId: jest.fn().mockReturnValue('test-client-id'),
      getClientSource: jest.fn().mockReturnValue('node-sdk'),
    } as any;

    (Client.getInstance as jest.Mock).mockReturnValue(mockClient);
  });

  it('should return audit config on successful request', async () => {
    const mockResponse = {
      logRequest: true,
      logResponse: false,
      message: 'Current audit log configuration'
    };

    (request.makeApiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getAuditConfig();

    expect(result).toEqual(mockResponse);
  });

  it('should handle 403 Forbidden with error message from API', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 403,
        statusText: 'Forbidden',
        data: {
          message: 'User not authorized to make the request. Please contact the organisation administrator.'
        },
        headers: {},
        config: {}
      }
    };

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);
    
    await expect(getAuditConfig()).rejects.toThrow('User not authorized to make the request. Please contact the organisation administrator.');
  });

  it('should throw error for other status codes', async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'Server error' },
        headers: {},
        config: {}
      }
    };

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);
    
    await expect(getAuditConfig()).rejects.toEqual(mockError);
  });

  it('should throw error for non-Axios errors', async () => {
    const mockError = new Error('Network error');

    (request.makeApiRequest as jest.Mock).mockRejectedValue(mockError);
    
    await expect(getAuditConfig()).rejects.toThrow('Network error');
  });
});

// Made with Bob
