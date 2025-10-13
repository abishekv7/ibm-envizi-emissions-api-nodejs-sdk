===============
Getting Started
===============

Prerequisites
-------------

Before using the SDK, ensure you have:

- **Node.js** installed
- Active internet connection
- Sign up for the preview waitlist `IBMid sign up <https://www.ibm.com/account/reg/us-en/signup?formid=urx-53659>`_ page.
- API credentials (``apiKey``, ``tenantId``, ``orgId``), are available on the Emissions API `Overview Page <https://www-dev.supply-chain.ibm.com/envizi/emissions-api-home/overview?cuiURL=%2Femissions-api-home%2Foverview>`_ after sign up


Installation
------------

You can install the SDK using `npm <https://www.npmjs.com/package/emissions-api-sdk>`_ or `yarn <https://yarnpkg.com/package?q=emissions-api-sdk&name=emissions-api-sdk>`_:

Using npm:

.. code-block:: bash

  npm install emissions-api-sdk


Using yarn:

.. code-block:: bash

  yarn install emissions-api-sdk


Basic Import
~~~~~~~~~~~~

After installation, you can import the SDK in your project:

.. code-block:: javascript

  // Import the entire SDK
  const enviziSDK = require('emissions-api-sdk');
  
  // Or using ES modules
  import { Client, LocationEmission } from 'emissions-api-sdk';


Authentication
--------------

Initialize the client with your API credentials:

The SDK provides two authentication methods:

- Using an **API key** with following required Headers:
    - ``X-Api-Key``: Your API key
    - ``X-IBM-Client-Id``: saascore-{your-client-id}
    - ``accept``: application/json

- Using a **Pre-generated token**
    - Token Generation Endpoint: https://api.ibm.com/saascore/run/authentication-retrieve/api-key

Using API Key (Recommended)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';
  
  async function initialize() {
    try {
      await Client.getClient({
        apiKey: "your-api-key",
        clientId: "your-client-id",
        orgId: "your-org-id"
      });
      console.log("Client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize client:", error);
    }
  }
  
  initialize();

Using Pre-generated Token
~~~~~~~~~~~~~~~~~~~~~~~~~

If you already have a token, you can use it directly:

.. code-block:: javascript

  import { Client } from 'emissions-api-sdk';

  async function initialize() {
    try {
      await Client.getClient({
        token: "your-pre-generated-token",
        clientId: "your-client-id"
      });
      console.log("Client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize client:", error);
    }
  }
  
  initialize();  

First API Call
--------------

After initializing the client, you can make your first API call. Here's an example of calculating location-based emissions:

.. code-block:: javascript

  import { Client, LocationEmission } from 'emissions-api-sdk';
  
  async function calculateEmissions() {
    try {
      // Initialize client
      await Client.getClient({
        apiKey: "your-api-key",
        clientId: "your-client-id",
        orgId: "your-org-id"
      });
  
      // Make API call
      const result = await LocationEmission.calculate({
        "location": {
          "country": "USA",
          "stateProvince": "california"
        },
        "activity": {
          "type": "electricity",
          "value": 1,
          "unit": "kWh"
        }
      });
      
      console.log("Emission calculation result:", result);
    } catch (error) {
      console.error("Error calculating emissions:", error);
    }
  }
  
  calculateEmissions();

Example Response
----------------

The API returns emission calculation results in JSON format. Here's an example response:

.. code-block:: json

    {
      "transactionId": "95a7efe7-02ae-47a3-a7fd-831bfca7cecd",
      "totalCO2e": 0.20750174,
      "CO2": 0.20681091,
      "CH4": 0.00033022,
      "N2O": 0.00036061,
      "indirectCO2e": 0.01115131,
      "unit": "kgCO2e",
      "description": "The electricity emissions factor used to calculate this result was obtained from the  year 2022 Managed - eGRID & US Climate Leaders factor set for the area United States and the region California."
    }
