# IBM Envizi - Emissions API Node.js SDK

IBM Envizi - Emissions API (Emissions API) is a managed factor database and calculation engine for embedding greenhouse gas (GHG) emissions calculations into operational decision making.

The `emissions-api-sdk` is a Node.js SDK for using Emissions API in your projects.

## Sign up for the Preview

To get started with the Emissions API follow these steps:

- Sign up for the preview waitlist [IBMid sign up](https://www.ibm.com/account/reg/us-en/signup?formid=urx-53659) page.
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

The SDK provides Metadata APIs to discover available emission types, geographical areas, and units:

### Get Available Types

```javascript
import { LocationEmission } from 'emissions-api-sdk';

// Get all available Location emission types
const types = await LocationEmission.getTypes();
```

### Get Supported Areas

```javascript
import { LocationEmission } from 'emissions-api-sdk';

// Get supported geographical areas
const areas = await LocationEmission.getArea();
```

### Get Valid Units

```javascript
import { LocationEmission } from 'emissions-api-sdk';

// Get valid units for a specific emission type
const units = await LocationEmission.getUnits("electricity");
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