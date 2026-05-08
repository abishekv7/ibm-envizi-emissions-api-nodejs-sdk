# IBM Envizi - Emissions API Node.js SDK

[IBM Envizi - Emissions API](https://www.ibm.com/products/envizi/emissions-api) (Emissions API) is a managed factor database and calculation engine for embedding greenhouse gas (GHG) emissions calculations into operational decision making.

The `emissions-api-sdk` is a Node.js SDK for using Emissions API in your projects.

## Sign up

To get started with the Emissions API follow these steps:

- Sign up at the [IBMid sign up](https://www.ibm.com/account/reg/us-en/signup?formid=urx-54311) page.
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
  patToken: process.env.ENVIZI_PAT_TOKEN,
  clientId: process.env.ENVIZI_CLIENT_ID
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

The Metadata API provides a unified way to query metadata for any endpoint:

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

// Get units for any type
const allUnits = await Metadata.getUnits(); // All units
const typeUnits = await Metadata.getUnits('Natural Gas'); // Units for specific type
```

**Supported endpoints**: `calculation`, `location`, `stationary`, `mobile`, `fugitive`, `factor`, `search`, `transportation-and-distribution`, `economic-activity`, `real-estate`


## Type Recommender API

Search for activity types using semantic search with optional unit and scope filtering:

```javascript
import { TypeRecommender } from 'emissions-api-sdk';

// Basic search with natural language
const types = await TypeRecommender.search({
  "location": {
    "country": "usa"
  },
  "activity": {
    "search": "employee travelled by electric vehicle"
  }
});

// Search with unit filter
const typesWithUnit = await TypeRecommender.search({
  "location": {
    "country": "usa"
  },
  "activity": {
    "search": "office consumed electricity",
    "unit": "kWh"
  }
});

// Search with scope filter
const typesWithScope = await TypeRecommender.search({
  "location": {
    "country": "usa"
  },
  "activity": {
    "search": "heating with natural gas",
    "scope": "1"
  }
});

// Search with pagination and filters
const typesWithAll = await TypeRecommender.search({
  "location": {
    "country": "usa",
    "stateProvince": "california"
  },
  "time": {
    "date": "2025-06-10"
  },
  "activity": {
    "search": "purchased electricity for data center",
    "unit": "MWh",
    "scope": "2"
  },
  "pagination": {
    "page": 1,
    "size": 10
  }
});
```

## Factor Search API

Search for emission factors with optional unit and scope filtering:

```javascript
import { Factor } from 'emissions-api-sdk';

// Basic search with natural language
const results = await Factor.search({
  "time": {
    "date": "2020-06-10"
  },
  "activity": {
    "search": "employee business travel by air"
  },
  "location": {
    "country": "USA"
  }
});

// Search with unit filter
const resultsWithUnit = await Factor.search({
  "activity": {
    "search": "office electricity consumption",
    "unit": "kWh"
  },
  "location": {
    "country": "USA"
  }
});

// Search with scope filter
const resultsWithScope = await Factor.search({
  "activity": {
    "search": "facility heating with natural gas",
    "scope": "1"
  },
  "location": {
    "country": "USA"
  }
});

// Search with both unit and scope
const resultsWithBoth = await Factor.search({
  "activity": {
    "search": "purchased electricity for manufacturing",
    "unit": "MWh",
    "scope": "2"
  },
  "location": {
    "country": "USA",
    "stateProvince": "california"
  }
});
```

### Get Organization Usage
```javascript
import { Usage } from 'emissions-api-sdk';

// Retrieves current billing period or historical usage data for the Organization
// History Flag to retrieve current billing or historical usage data.
const usage = await Usage.getUsage(true);
```

## Authentication

The SDK supports three authentication methods:



### Personal Access Token (PAT) (Recommended)

```javascript
await Client.getClient({
  patToken: process.env.ENVIZI_PAT_TOKEN,
  clientId: process.env.ENVIZI_CLIENT_ID
});
```

**Note:** When using PAT token, do not provide `orgId`.

### API Key 

```javascript
await Client.getClient({
  apiKey: process.env.ENVIZI_API_KEY,
  clientId: process.env.ENVIZI_CLIENT_ID,
  orgId: process.env.ENVIZI_ORG_ID
});
```

### Pre-generated JWT Token

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
