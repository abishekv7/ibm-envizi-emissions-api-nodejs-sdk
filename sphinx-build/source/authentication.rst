==============
Authentication
==============

Overview
--------

The IBM Envizi - Emissions API Node.js SDK uses OAuth 2.0 Bearer Tokens for authentication. This page explains the authentication process, options, and security best practices in detail.

Authentication Methods
----------------------

The SDK provides two authentication methods:

API Key Authentication (Recommended)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This method automatically handles token generation and refreshing:

.. code-block:: javascript

    import { Client } from 'emissions-api-sdk';
    
    await Client.getClient({
      apiKey: process.env.ENVIZI_API_KEY,
      clientId: process.env.ENVIZI_CLIENT_ID,
      orgId: process.env.ENVIZI_ORG_ID
    });

**Required parameters:**
    - ``apiKey``: Your API key for authentication
    - ``clientId``: Your client identifier
    - ``orgId``: Your organization identifier

Token retrieval
^^^^^^^^^^^^^^^
When you call ``Client.getClient()`` with ``apiKey``:

- **Method**: ``GET`` to the token endpoint (default: ``https://api.ibm.com/saascore/run/authentication-retrieve/api-key``)
- **Headers**:
  - ``X-Api-Key: <apiKey>``
  - ``X-IBM-Client-Id: saascore-<clientId>``
  - ``Accept: application/json``
- **Query param**: ``orgId=<orgId>``
- **Response**: a bearer token (string) which the SDK trims, caches, and uses for API calls.

Pre-generated Token Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For scenarios where token generation is handled externally:

.. code-block:: javascript

    import { Client } from 'emissions-api-sdk';
    
    await Client.getClient({
      token: process.env.JWT_TOKEN,
      clientId: process.env.ENVIZI_CLIENT_ID
    });

**Required parameters:**
    - ``token``: A pre-generated authentication token
    - ``clientId``: Your client identifier

Token lifetime & refresh
^^^^^^^^^^^^^^^^^^^^^^^^
- The SDK decodes the JWT’s ``exp`` and stores it.
- In user-provided token mode, no refresh occurs; re-initialize with a fresh token when needed.

Authentication Flow
-------------------

The authentication process follows these steps:

1. **Initialization**:
    - User provides authentication credentials
    - Client validates the credentials format

2. **Token Generation** (API Key method):
    - Client sends API key to authentication service
    - Authentication service validates credentials
    - Authentication service returns a token with expiration time
    - Client stores the token securely

3. **Token Validation**:
    - Before each API request, token validity is checked
    - If valid, the token is included in the request
    - If expired or near expiration, token is refreshed

4. **Token Refreshing**:
    - Client detects when token is approaching expiration
    - Client automatically requests a new token
    - New token replaces the old one for future requests

Authentication Headers
----------------------

The SDK automatically includes the necessary headers for authentication:

For token generation:
    - ``X-Api-Key``: Your API key
    - ``X-IBM-Client-Id``: saascore-{your-client-id}

For API requests:
    - ``Authorization``: Bearer {token}
    - ``X-IBM-Client-Id``: ghgemissions-{your-client-id}
    - ``X-Client-Source``: node-sdk

Architecture Diagram
--------------------

::

    +-----------------+          +-------------------------+
    | Your application|          |   Token Service (GET)   |
    |  (init once)    |          |  authUrl / default URL  |
    +--------+--------+          +-----------+-------------+
             |                                ^
             | getClient({apiKey, clientId,   |  (managed mode only:
             | orgId, [authUrl], [host]})     |   X-Api-Key, saascore-Client-Id,
             v                                |   orgId => returns JWT)
    +--------+--------------------------------+-------------+
    |                   Client (singleton)                  |
    |  - token, exp, domain, clientId                       |
    |  - refresh before expiry (managed mode)               |
    +--------+--------------------------------+-------------+
             |                                ^
             | makeApiRequest(...)            |
             v                                |
    +--------+--------------------------------+-------------+
    |                 Request layer (axios)                 |
    |  Adds headers:                                        |
    |   - Authorization: Bearer <token>                     |
    |   - X-IBM-Client-Id: ghgemissions-<clientId>          |
    |   - X-Client-Source: excel | node-sdk                 |
    +--------+--------------------------------+-------------+
             |
             v
    +--------+--------------------------------+-------------+
    |               Emissions API (host/domain)             |
    +-------------------------------------------------------+


Security Best Practices
-----------------------

1. **Use environment variables** for credentials:

   .. code-block:: javascript

       await Client.getClient({
         apiKey: process.env.ENVIZI_API_KEY,
         clientId: process.env.ENVIZI_CLIENT_ID,
         orgId: process.env.ENVIZI_ORG_ID
       });

2. **Never hardcode** credentials in your application code
3. **Implement proper access controls** for API keys
4. **Use secure environment variables** for production deployments
5. **Implement least privilege** principles for API access


For more information about the Client that manages authentication, see the :doc:`client` page.

