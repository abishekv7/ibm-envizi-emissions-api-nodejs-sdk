=================
Economic Activity
=================

Overview
========

The Economic Activity API enables Scope 3 spend-based emission calculations. This API helps calculate greenhouse gas emissions associated with economic activities and purchases across various sectors, using monetary spend as the primary input metric.

Key Features
------------

* Calculate emissions based on monetary spend
* Support for diverse economic sectors and industries
* Multiple currency support
* Geographical region-specific emission factors
* Detailed emission breakdowns with optional details
* Access to emission factors and metadata

Use Cases
---------

* **Supply Chain Emissions** – Calculate emissions from purchased goods and services
* **Scope 3 Reporting** – Track indirect emissions from business spending
* **Procurement Analysis** – Assess carbon impact of purchasing decisions
* **Financial Carbon Footprint** – Link financial data to environmental impact
* **Vendor Assessment** – Evaluate supplier emissions based on spend

API Functions
=============

calculate
---------

.. js:autofunction:: EconomicActivity.calculate

Performs Scope 3 spend-based emission calculations.

**Parameters:**

* ``payload`` (CommonRequest) - The request data containing:
  
  * ``time`` - Date information for the calculation
  * ``location`` - Country/region information
  * ``activity`` - Economic activity details (type, value, unit)
  * ``includeDetails`` (optional) - Whether to include detailed emission breakdown

**Returns:**

* ``Promise<EmissionResponse | EmissionResponseWithDetails>`` - Emission calculation results

**Example:**

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   const request = {
     time: {
       date: "2025-01-04"
     },
     location: {
       country: "usa"
     },
     activity: {
       type: "accommodation",
       value: 1500.12,
       unit: "usd"
     },
     includeDetails: false
   };

   const result = await EconomicActivity.calculate(request);
   console.log(`Total emissions: ${result.co2e} kg CO2e`);

**Response Example:**

.. code-block:: json

   {
     "co2e": 125.75,
     "co2e_unit": "kg",
     "co2e_calculation_origin": "ar5"
   }

**With Details:**

.. code-block:: javascript

   const requestWithDetails = {
     time: {
       date: "2025-01-04"
     },
     location: {
       country: "usa"
     },
     activity: {
       type: "accommodation",
       value: 1500.12,
       unit: "usd"
     },
     includeDetails: true
   };

   const detailedResult = await EconomicActivity.calculate(requestWithDetails);

**Detailed Response Example:**

.. code-block:: json

   {
     "co2e": 125.75,
     "co2e_unit": "kg",
     "co2e_calculation_origin": "ar5",
     "emission_factor": {
       "factor_id": "eco-accommodation-usa-2025",
       "co2e_per_unit": 0.0838,
       "unit": "usd"
     },
     "activity_data": {
       "type": "accommodation",
       "value": 1500.12,
       "unit": "usd"
     }
   }

getTypes
--------

.. js:autofunction:: EconomicActivity.getTypes

Retrieves all available economic activity emission calculation types.

**Returns:**

* ``Promise<TypeResponse>`` - List of supported economic activity types

**Example:**

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   const types = await EconomicActivity.getTypes();
   console.log('Available economic activity types:', types.types);

**Response Example:**

.. code-block:: json

   {
     "types": [
       "accommodation",
       "advertising",
       "agriculture",
       "construction",
       "consulting",
       "education",
       "financial_services",
       "food_services",
       "healthcare",
       "information_technology",
       "manufacturing",
       "professional_services",
       "retail",
       "telecommunications",
       "transportation",
       "utilities",
       "waste_management"
     ]
   }

getArea
-------

.. js:autofunction:: EconomicActivity.getArea

Retrieves information about geographical areas supported by the economic activity emissions API.

**Returns:**

* ``Promise<AreaResponse>`` - List of supported geographical areas

**Example:**

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   const areas = await EconomicActivity.getArea();
   console.log('Supported countries:', areas.countries);

**Response Example:**

.. code-block:: json

   {
     "countries": ["usa", "gbr", "deu", "fra", "jpn", "chn", "ind"],
     "regions": ["north_america", "europe", "asia", "oceania"]
   }

getUnits
--------

.. js:autofunction:: EconomicActivity.getUnits

Retrieves available units (currencies) for a specific economic activity emission type.

**Parameters:**

* ``type`` (string) - The economic activity emission type to get units for

**Returns:**

* ``Promise<UnitResponse>`` - List of available units for the specified type

**Example:**

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   const units = await EconomicActivity.getUnits("accommodation");
   console.log('Available currencies:', units.units);

**Response Example:**

.. code-block:: json

   {
     "units": ["usd", "eur", "gbp", "jpy", "cny", "inr", "aud", "cad"]
   }

Common Economic Activity Types
==============================

Services
--------

* **accommodation** - Hotels, lodging, and hospitality services
* **advertising** - Marketing and advertising services
* **consulting** - Business consulting and advisory services
* **education** - Educational services and training
* **financial_services** - Banking, insurance, and financial services
* **food_services** - Restaurants, catering, and food service
* **healthcare** - Medical and healthcare services
* **professional_services** - Legal, accounting, and professional services

Technology & Communications
---------------------------

* **information_technology** - IT services, software, and hardware
* **telecommunications** - Phone, internet, and communication services

Industry & Infrastructure
-------------------------

* **agriculture** - Agricultural products and services
* **construction** - Building and construction services
* **manufacturing** - Manufacturing and production
* **utilities** - Electricity, water, and utility services
* **waste_management** - Waste collection and disposal services

Retail & Transportation
-----------------------

* **retail** - Retail purchases and goods
* **transportation** - Transportation and logistics services

Best Practices
==============

1. **Use Accurate Spend Data**
   
   Ensure monetary values are accurate and in the correct currency for precise calculations.

2. **Select Appropriate Activity Types**
   
   Choose the most specific economic activity type that matches your spending category.

3. **Currency Consistency**
   
   Use consistent currency units across calculations or convert appropriately.

4. **Regional Factors**
   
   Use location-specific data when available for more accurate emissions calculations.

5. **Temporal Accuracy**
   
   Use the correct date for calculations as emission factors may vary over time.

6. **Batch Processing**
   
   For large datasets, process multiple transactions efficiently using async operations.

Advanced Usage
==============

Calculating Total Spend Emissions
----------------------------------

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   async function calculateTotalSpendEmissions(transactions) {
     const calculations = transactions.map(transaction => 
       EconomicActivity.calculate({
         time: { date: transaction.date },
         location: { country: transaction.country },
         activity: {
           type: transaction.activityType,
           value: transaction.amount,
           unit: transaction.currency
         },
         includeDetails: false
       })
     );

     const results = await Promise.all(calculations);
     const totalEmissions = results.reduce((sum, result) => sum + result.co2e, 0);
     
     return {
       totalEmissions,
       unit: results[0].co2e_unit,
       transactionCount: transactions.length
     };
   }

   // Example usage
   const transactions = [
     { date: "2025-01-04", country: "usa", activityType: "accommodation", amount: 1500, currency: "usd" },
     { date: "2025-01-05", country: "usa", activityType: "food_services", amount: 250, currency: "usd" },
     { date: "2025-01-06", country: "usa", activityType: "transportation", amount: 800, currency: "usd" }
   ];

   const summary = await calculateTotalSpendEmissions(transactions);
   console.log(`Total emissions: ${summary.totalEmissions} ${summary.unit}`);

Category-Based Analysis
-----------------------

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   async function analyzeSpendByCategory(spendData) {
     const categoryEmissions = {};

     for (const [category, items] of Object.entries(spendData)) {
       const emissions = await Promise.all(
         items.map(item => EconomicActivity.calculate({
           time: { date: item.date },
           location: { country: item.country },
           activity: {
             type: category,
             value: item.amount,
             unit: item.currency
           }
         }))
       );

       categoryEmissions[category] = {
         totalEmissions: emissions.reduce((sum, e) => sum + e.co2e, 0),
         transactionCount: items.length,
         averageEmissions: emissions.reduce((sum, e) => sum + e.co2e, 0) / items.length
       };
     }

     return categoryEmissions;
   }

Error Handling
==============

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   try {
     const result = await EconomicActivity.calculate(request);
     console.log('Calculation successful:', result);
   } catch (error) {
     if (error.response) {
       // API returned an error response
       console.error('API Error:', error.response.data);
       
       // Handle specific error codes
       if (error.response.status === 400) {
         console.error('Invalid request parameters');
       } else if (error.response.status === 404) {
         console.error('Activity type or location not found');
       }
     } else if (error.request) {
       // Request was made but no response received
       console.error('Network Error:', error.message);
     } else {
       // Something else happened
       console.error('Error:', error.message);
     }
   }

Common Errors
-------------

* **Invalid Activity Type** - The specified economic activity type is not supported
* **Invalid Currency** - The currency unit is not valid for the specified type
* **Invalid Country** - The country code is not recognized
* **Missing Required Fields** - Required fields in the request are missing
* **Invalid Date Format** - The date format is incorrect (use YYYY-MM-DD)
* **Unsupported Region** - Emission factors not available for the specified region

Integration Examples
====================

Expense Management Integration
-------------------------------

.. code-block:: javascript

   import * as EconomicActivity from 'emissions-api-sdk/api/EconomicActivity';

   async function processExpenseReport(expenses) {
     const results = [];

     for (const expense of expenses) {
       try {
         const emission = await EconomicActivity.calculate({
           time: { date: expense.date },
           location: { country: expense.country },
           activity: {
             type: mapExpenseCategoryToActivityType(expense.category),
             value: expense.amount,
             unit: expense.currency
           },
           includeDetails: true
         });

         results.push({
           expenseId: expense.id,
           category: expense.category,
           amount: expense.amount,
           emissions: emission.co2e,
           emissionUnit: emission.co2e_unit
         });
       } catch (error) {
         console.error(`Failed to calculate emissions for expense ${expense.id}:`, error);
       }
     }

     return results;
   }

   function mapExpenseCategoryToActivityType(category) {
     const mapping = {
       'Hotel': 'accommodation',
       'Meals': 'food_services',
       'Travel': 'transportation',
       'IT Services': 'information_technology',
       'Consulting': 'consulting'
     };
     return mapping[category] || 'professional_services';
   }

See Also
========

* :doc:`getting_started` - Getting started with the SDK
* :doc:`reference` - Complete API reference
* :doc:`real_estate` - Real Estate API documentation
* :doc:`troubleshooting` - Troubleshooting guide