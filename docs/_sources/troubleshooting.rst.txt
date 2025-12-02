Troubleshooting Guide
=====================

Overview
--------

This document lists all SDK-specific errors that can occur when using the Emissions API Node.js SDK. These errors are related to SDK initialization and client management.

----

SDK Initialization Errors
--------------------------

Configuration Errors
~~~~~~~~~~~~~~~~~~~~

These errors occur when ``Client.getClient()`` is called with invalid or missing configuration parameters.

1. Missing Auth URL with Custom Host
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error Message:**

.. code-block:: text

   Error: If custom "host" is provided, "authUrl" must also be provided.

**Cause:** Custom host URL provided without corresponding authentication URL

**Solution:** Provide both ``host`` and ``authUrl`` parameters together

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     host: 'https://api.ibm.com',
     clientId: 'client123',
     orgId: 'org456'
     // Missing authUrl parameter
   });

----

2. Missing Client ID with Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error Message:**

.. code-block:: text

   Error: If token is provided directly, "clientId" must also be provided.

**Cause:** Pre-existing token provided without client ID

**Solution:** Provide ``clientId`` parameter when using a token

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     token: 'your-jwt-token'
     // Missing clientId parameter
   });

----

3. Missing Parameters with API Key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error Message:**

.. code-block:: text

   Error: If apiKey is provided , "clientId" and "OrgId" must also be provided.

**Cause:** API key authentication requires both client ID and organization ID

**Solution:** Provide ``apiKey``, ``clientId``, and ``orgId`` parameters together

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   // Missing orgId
   await Client.getClient({
     apiKey: 'your-api-key',
     clientId: 'client123'
     // Missing orgId parameter
   });

   // Or missing clientId
   await Client.getClient({
     apiKey: 'your-api-key',
     orgId: 'org456'
     // Missing clientId parameter
   });

----

Authentication Errors (HTTP 401)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These errors occur when authentication credentials are invalid or expired.

4. Invalid API Key
^^^^^^^^^^^^^^^^^^

**Error Response:**

.. code-block:: json

   {
     "httpCode": "401",
     "httpMessage": "Unauthorized",
     "moreInformation": "Cannot pass the security checks that are required by the target API or operation, Enable debug headers for more details."
   }

**Cause:** API key is invalid, expired, or revoked

**Solution:** Verify API key from IBM Cloud console and ensure it has proper permissions

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     apiKey: 'invalid_api_key_12345',
     clientId: 'client123',
     orgId: 'org456',
     host: 'https://api.ibm.com',
     authUrl: 'https://api.ibm.com/auth-url'
   });

----

5. Invalid Organization ID
^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error Response:**

.. code-block:: json

   {
     "httpCode": "401",
     "httpMessage": "Unauthorized",
     "moreInformation": "Cannot pass the security checks that are required by the target API or operation, Enable debug headers for more details."
   }

**Cause:** Organization ID doesn't match account or user lacks access

**Solution:** Verify organization ID from IBM Cloud account settings

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     apiKey: 'your-valid-api-key',
     clientId: 'client123',
     orgId: 'invalid-org-id-12345',
     host: 'https://api.ibm.com',
     authUrl: 'https://api.ibm.com/auth-url'
   });

----

6. Invalid Client ID
^^^^^^^^^^^^^^^^^^^^^

**Error Response:**

.. code-block:: json

   {
     "httpCode": "401",
     "httpMessage": "Unauthorized",
     "moreInformation": "Invalid client id or secret."
   }

**Cause:** Client ID is invalid or doesn't match credentials

**Solution:** Verify client ID from IBM Cloud credentials

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     apiKey: 'your-valid-api-key',
     clientId: 'invalid-client-id-12345',
     orgId: 'org456',
     host: 'https://api.ibm.com',
     authUrl: 'https://api.ibm.com/auth-url'
   });

----

7. Empty Token Response
^^^^^^^^^^^^^^^^^^^^^^^^

**Error Message:**

.. code-block:: text

   Error: Token response is empty

**Cause:** Authentication server returned an empty or null token in the response body

**Solution:**

- Verify the ``authUrl`` is correct and points to a valid authentication endpoint
- Ensure the authentication service is responding correctly
- Check that the API key, client ID, and org ID combination is valid
- Verify the authentication endpoint is returning a token in the response
- Contact support if the authentication service is not responding properly

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     apiKey: 'your-api-key',
     clientId: 'client123',
     orgId: 'org456',
     host: 'https://api.ibm.com/',
     authUrl: 'https://valid-url-but-returns-empty-token.example.com/token'
     // Valid URL but returns empty token in response
   });

**Note:** If the authUrl is completely invalid or unreachable (e.g., wrong domain), you'll get a network error (ENOTFOUND) instead of this error. This error specifically occurs when the authentication endpoint responds but returns an empty token.

----

8. Missing Expiry Field in Token
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Error Message:**

.. code-block:: text

   Error: exp field is missing in the token

**Cause:** The provided JWT token does not contain the required ``exp`` (expiry) field

**Solution:**

- Ensure the token is a valid JWT with an expiry field
- Regenerate the token if it's malformed
- Verify the token was generated correctly by the authentication service

**Sample Function Call That Causes This Error:**

.. code-block:: typescript

   await Client.getClient({
     token: 'malformed-jwt-token-without-exp-field',
     clientId: 'client123'
   });

**Note:** This error occurs when using token-based authentication with a JWT that doesn't include the standard ``exp`` (expiration time) claim.

----

Client Instance Errors
-----------------------

Client Not Initialized
~~~~~~~~~~~~~~~~~~~~~~

**Error Message:**

.. code-block:: text

   Error: Client is not initialized. Call Client.getClient() first.

**Cause:** Attempting to use ``Client.getInstance()`` or API methods before calling ``Client.getClient()``

**Solution:** Always call ``Client.getClient()`` before using any SDK methods

**When This Occurs:**

- Calling ``Client.getInstance()`` before initialization
- Calling any API method (Stationary.calculate(), Mobile.calculate(), etc.) before initialization
- Application restart without re-initializing the client

**Sample Function Calls That Cause This Error:**

.. code-block:: typescript

   // Error 1: Calling getInstance() before initialization
   const client = Client.getInstance(); // Throws error

   // Error 2: Calling API methods before initialization
   await Stationary.calculate({
     time: { date: "2025-01-04" },
     location: { country: "usa" },
     activity: { type: "Coal - Lignite", unit: "KJ", value: 3 }
   }); // Throws error

   // Error 3: Calling any other API method
   await Mobile.calculate({...}); // Throws error
   await Fugitive.calculate({...}); // Throws error
   await Location.getUnits("steam"); // Throws error

----

Token Management
----------------

Automatic Token Refresh
~~~~~~~~~~~~~~~~~~~~~~~

The SDK automatically refreshes authentication tokens when they are about to expire (within 60 seconds). Token refresh failures will cause subsequent API calls to fail with 401 errors.

**Note:** Token refresh only occurs for tokens generated by the SDK, not for user-provided tokens.

----

Error Summary Table
-------------------

.. list-table::
   :header-rows: 1
   :widths: 20 40 10 30

   * - Error Type
     - Error Message
     - HTTP Code
     - Solution
   * - Configuration
     - ``If custom "host" is provided, "authUrl" must also be provided.``
     - N/A
     - Provide both host and authUrl
   * - Configuration
     - ``If token is provided directly, "clientId" must also be provided.``
     - N/A
     - Provide clientId with token
   * - Configuration
     - ``If apiKey is provided , "clientId" and "OrgId" must also be provided.``
     - N/A
     - Provide all three parameters
   * - Authentication
     - ``Cannot pass the security checks...``
     - 401
     - Verify API key and org ID
   * - Authentication
     - ``Invalid client id or secret``
     - 401
     - Verify client ID
   * - Authentication
     - ``Token response is empty``
     - N/A
     - Check network and authUrl
   * - Token
     - ``exp field is missing in the token``
     - N/A
     - Use valid JWT with exp field
   * - Instance
     - ``Client is not initialized. Call Client.getClient() first.``
     - N/A
     - Call getClient() first

----

Required Configuration Parameters
----------------------------------

When calling ``Client.getClient()``, the following parameters are required based on authentication method:

API Key Authentication (Recommended)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- ``apiKey`` - Your IBM Cloud API key
- ``clientId`` - Your client ID
- ``orgId`` - Your organization ID
- ``host`` - API host URL
- ``authUrl`` - Authentication URL

Token Authentication
~~~~~~~~~~~~~~~~~~~~

- ``token`` - Pre-existing JWT token
- ``clientId`` - Your client ID

----

Initialization Checklist
-------------------------

Before using the SDK, ensure:

- [ ] All required configuration parameters are provided
- [ ] Credentials are valid and not expired
- [ ] Correct environment URLs are used
- [ ] ``Client.getClient()`` is called before any API methods
- [ ] Error handling is implemented for initialization failures
- [ ] Credentials are stored securely (environment variables recommended)

----

Common Scenarios
----------------

Scenario 1: Application Startup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Issue:** SDK must be initialized when application starts

**Solution:** Call ``Client.getClient()`` in application initialization code before using any API methods

Scenario 2: Invalid Credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Issue:** 401 Unauthorized errors during initialization

**Solution:** Verify all credentials (API key, client ID, org ID) from IBM Cloud console

Scenario 3: Missing Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Issue:** Configuration error thrown before API call

**Solution:** Ensure all required parameters are provided based on authentication method

Scenario 4: Client Not Initialized
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Issue:** Error when calling API methods

**Solution:** Verify ``Client.getClient()`` was called successfully before using API methods

----

Troubleshooting Steps
----------------------

1. **Verify Configuration**

   - Check all required parameters are provided
   - Ensure no parameters are empty or null
   - Verify host and authUrl match your environment

2. **Verify Credentials**

   - Confirm API key is valid and not expired
   - Check organization ID matches your IBM Cloud account
   - Verify client ID is correct

3. **Check Initialization**

   - Ensure ``Client.getClient()`` is called before API methods
   - Verify initialization completed without errors
   - Check for any error messages during initialization

4. **Network and Service**

   - Verify network connectivity
   - Check authentication service availability
   - Ensure firewall allows connections to IBM Cloud

----

Support
-------

For issues not covered in this guide:

1. Verify SDK version is up to date
2. Check IBM Cloud service status
3. Review error messages and HTTP status codes
4. Contact IBM Support with:

   - Error message and stack trace
   - SDK version
   - Environment details
   - Steps to reproduce (excluding sensitive credentials)

----

**Last Updated:** 2025-11-24

**SDK Version:** 1.0.1

**Coverage:** SDK initialization, client instance, and authentication errors
