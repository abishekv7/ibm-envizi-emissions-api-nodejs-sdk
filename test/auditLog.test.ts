import axios from 'axios';
import { updateAuditConfig } from '../src/api/AuditLog';
import { Client } from '../src/Client';
import * as request from '../src/request';

jest.mock('../src/request');
jest.mock('../src/Client');

describe('AuditLog - 409 Conflict Handling', () => {
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
      id: 1,
      orgId: 'd5af744e-d716-4283-98d0-3dafe702a658',
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
});

// Made with Bob
