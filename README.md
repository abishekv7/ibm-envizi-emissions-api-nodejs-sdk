# IBM Envizi - Emissions API Node.js SDK

[IBM Envizi - Emissions API](https://www.ibm.com/products/envizi/emissions-api) (Emissions API) is a managed factor database and calculation engine for embedding greenhouse gas (GHG) emissions calculations into operational decision making.

The `emissions-api-sdk` is a Node.js SDK for using Emissions API in your projects.

## Sign up for the Preview

To get started with the Emissions API follow these steps:

- Sign up for the preview waitlist [IBMid sign up](https://www.ibm.com/account/reg/us-en/signup?formid=urx-53999) page.
- You will be sent an invite email to join to create an account.
- Read the [Introduction](https://developer.ibm.com/apis/catalog/ghgemissions--ibm-envizi-emissions-api/Introduction) page to get an overview of the Emissions API.

## Installation

```bash
npm install emissions-api-sdk
# or
yarn install emissions-api-sdk
```

## Quick Start

```javascript
import { Client, LocationEmission } from 'emissions-api-sdk';

// Initialize client
await Client.getClient({
  apiKey: process.env.ENVIZI_API_KEY,
  clientId: process.env.ENVIZI_CLIENT_ID,
  orgId: process.env.ENVIZI_ORG_ID
});

// Calculate emissions
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
```

## Metadata APIs

The SDK provides two types of Metadata APIs:

### 1. Endpoint-Specific Metadata APIs

Each calculation endpoint has its own metadata methods to discover available types, areas, and units:

```javascript
import { Location, Stationary, Mobile } from 'emissions-api-sdk';

// Get types for a specific endpoint
const locationTypes = await Location.getTypes();
const stationaryTypes = await Stationary.getTypes();

// Get supported areas for a specific endpoint
const locationAreas = await Location.getArea();
const mobileAreas = await Mobile.getArea();

// Get valid units for a specific type
const locationUnits = await Location.getUnits("electricity");
const stationaryUnits = await Stationary.getUnits("Jet Kerosene");
```

### 2. Global Metadata APIs

The global Metadata API provides a unified way to query metadata for any endpoint:

```javascript
import { Metadata } from 'emissions-api-sdk';

// Get types for any endpoint (defaults to 'calculation')
const allTypes = await Metadata.getTypes();
const locationTypes = await Metadata.getTypes('location');
const stationaryTypes = await Metadata.postTypes('stationary');

// Get areas for any endpoint
const allAreas = await Metadata.getArea();
const mobileAreas = await Metadata.getArea('mobile');
const fugitiveAreas = await Metadata.postArea('fugitive');

// Get units for any endpoint and type
const allUnits = await Metadata.getUnits(); // All units
const locationUnits = await Metadata.getUnits('location'); // Units for location endpoint
const typeUnits = await Metadata.getUnits(undefined, 'Natural Gas'); // Units for specific type
const specificUnits = await Metadata.getUnits('stationary', 'Jet Kerosene'); // Units for endpoint + type
```

**Supported endpoints**: `calculation`, `location`, `stationary`, `mobile`, `fugitive`, `factor`, `search`, `transportation-and-distribution`, `economic-activity`, `real-estate`

### Get Organization Usage
```javascript
import { Usage } from 'emissions-api-sdk';

// Retrieves current billing period or historical usage data for the Organization
// History Flag to retrieve current billing or historical usage data.
const usage = await Usage.getUsage(true);
```

## Authentication

The SDK supports two authentication methods:

### API Key (Recommended)

```javascript
await Client.getClient({
  apiKey: process.env.ENVIZI_API_KEY,
  clientId: process.env.ENVIZI_CLIENT_ID,
  orgId: process.env.ENVIZI_ORG_ID
});
```

### Pre-generated Token

```javascript
await Client.getClient({
  token: process.env.JWT_TOKEN,
  clientId: process.env.ENVIZI_CLIENT_ID
});
```

## Documentation

For detailed [documentation](https://ibm.github.io/ibm-envizi-emissions-api-nodejs-sdk/), see:

- [Getting Started](https://ibm.github.io/ibm-envizi-emissions-api-nodejs-sdk/getting_started.html)
- [Authentication](https://ibm.github.io/ibm-envizi-emissions-api-nodejs-sdk/authentication.html)
- [Client Configuration](https://ibm.github.io/ibm-envizi-emissions-api-nodejs-sdk/client.html)
- [API Reference](https://ibm.github.io/ibm-envizi-emissions-api-nodejs-sdk/reference.html)

Other resources:

- [APIHub](https://developer.ibm.com/apis/catalog/ghgemissions--ibm-envizi-emissions-api/api/API--ghgemissions--authentication) - API documentation (OpenAPI)
- [Tutorials & Sample Applications](https://ibm.github.io/ibm-envizi-emissions-api/)
- [IBM Envizi for Excel](https://ibm.github.io/ibm-envizi-emissions-api-excel-addin) - Emissions API Excel Add-in.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
