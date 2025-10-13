======
Client
======

Overview
--------

The Client is the central component of the IBM Envizi - Emissions API Node.js SDK. It handles authentication, maintains connections to the API, and provides a unified interface for all API operations.

.. code-block:: none

   +----------------------+
   | Application          |<-----------+
   +----------------------+            |
            |                          |
            v                          |
   +----------------------+            |
   | Client               |<-----------+
   +----------------------+            |
            |                          |
            v                          |
   +----------------------+     +----------------------+
   | Authentication       |---->| API Module Requests  |
   +----------------------+     +----------------------+

Client Initialization
---------------------

The Client is designed as a singleton to ensure consistent authentication across your application. Initialize it once at application startup:

1. Managed token (SDK fetches & refreshes)

.. code-block:: javascript

    import { Client } from 'emissions-api-sdk';
    
    await Client.getClient({
      apiKey:   process.env.ENVIZI_API_KEY,
      clientId: process.env.ENVIZI_CLIENT_ID,
      orgId:    process.env.ENVIZI_ORG_ID
    });

2. User-provided token (SDK will **not** refresh it)

.. code-block:: javascript

    import { Client } from "emissions-api-sdk";

    await Client.getClient({
      clientId: process.env.ENVIZI_CLIENT_ID,
      token:    process.env.TOKEN
    });

Configuration Options
---------------------

The Client accepts the following configuration parameters:

.. list-table::
   :header-rows: 1
   :widths: 20 15 65

   * - Parameter
     - Required
     - Description
   * - apiKey
     - Yes*
     - API key for authentication (required unless using token)
   * - clientId
     - Yes
     - Client ID for API access
   * - orgId
     - Yes*
     - Organization ID (required with apiKey)
   * - token
     - Yes*
     - Pre-generated token (required if not using apiKey)
   * - host
     - No
     - Custom API endpoint (defaults to production)
   * - authUrl
     - No
     - Custom authentication endpoint (defaults to production)

.. note::
    Either ``apiKey+orgId`` OR ``token`` is required

Client Responsibilities
-----------------------

The Client handles several key responsibilities:

1. **Singleton Management**: Ensures only one Client instance exists
2. **Configuration Validation**: Verifies required parameters
3. **Token Generation**: Obtains tokens from the authentication service
4. **Token Refreshing**: Automatically refreshes tokens before expiration
5. **Request Authentication**: Adds proper headers to all API requests

Error Handling
--------------

Handle authentication errors gracefully:

.. code-block:: javascript

    try {
      await Client.getClient({
        apiKey: process.env.ENVIZI_API_KEY,
        clientId: process.env.ENVIZI_CLIENT_ID,
        orgId: process.env.ENVIZI_ORG_ID
      });
    } catch (error) {
      console.error("Authentication error:", error.message);
      // Implement appropriate error handling
      if (error.response) {
        // Handle specific HTTP error responses
        console.error("Status:", error.response.status);
        console.error("Details:", error.response.data);
      }
    }


Best Practices
--------------

For optimal Client usage:

1. **Initialize once** at application startup
2. **Store credentials securely** using environment variables
3. **Implement proper error handling** for authentication failures
4. **Let the SDK handle** token refreshing automatically
5. **Reuse the Client instance** across your application

Authentication Integration
--------------------------

The Client works closely with the Authentication module to manage tokens. For detailed information about the authentication process, supported methods, and security best practices, see the :doc:`authentication` page.
