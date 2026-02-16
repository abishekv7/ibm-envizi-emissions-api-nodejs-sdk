===========
Real Estate
===========

Overview
========

The Real Estate API enables Scope 3 emission calculations for real estate activities. This API helps calculate greenhouse gas emissions associated with commercial and residential real estate operations, including various property types such as industrial warehouses, office buildings, and retail spaces.

Key Features
------------

* Calculate emissions for different real estate property types
* Support for multiple geographical regions
* Flexible unit conversions (m², ft², etc.)
* Detailed emission breakdowns with optional details
* Access to emission factors and metadata

Use Cases
---------

* **Property Portfolio Analysis** – Calculate total emissions across multiple properties
* **Sustainability Reporting** – Track and report real estate carbon footprint
* **Building Performance** – Compare emissions across different property types
* **Compliance** – Meet regulatory requirements for real estate emissions reporting

API Functions
=============

calculate
---------

.. js:autofunction:: RealEstate.calculate

Performs Scope 3 real estate emission calculations.

**Parameters:**

* ``payload`` (CommonRequest) - The request data containing:
  
  * ``time`` - Date information for the calculation
  * ``location`` - Country/region information
  * ``activity`` - Real estate activity details (type, value, unit)
  * ``includeDetails`` (optional) - Whether to include detailed emission breakdown

**Returns:**

* ``Promise<EmissionResponse | EmissionResponseWithDetails>`` - Emission calculation results

**Example:**

.. code-block:: javascript

   import * as RealEstate from 'emissions-api-sdk/api/RealEstate';

   const request = {
     time: {
       date: "2025-01-04"
     },
     location: {
       country: "usa"
     },
     activity: {
       type: "Commercial Real Estate:Industrial distribution warehouse",
       value: 17000.123,
       unit: "m2"
     },
     includeDetails: false
   };

   const result = await RealEstate.calculate(request);
   console.log(`Total emissions: ${result.co2e} kg CO2e`);

**Response Example:**

.. code-block:: json

   {
     "co2e": 2550.5,
     "co2e_unit": "kg",
     "co2e_calculation_origin": "ar5"
   }

getTypes
--------

.. js:autofunction:: RealEstate.getTypes

Retrieves all available real estate emission calculation types.

**Returns:**

* ``Promise<TypeResponse>`` - List of supported real estate types

**Example:**

.. code-block:: javascript

   import * as RealEstate from 'emissions-api-sdk/api/RealEstate';

   const types = await RealEstate.getTypes();
   console.log('Available real estate types:', types.types);

**Response Example:**

.. code-block:: json

   {
     "types": [
       "Commercial Real Estate:Industrial distribution warehouse",
       "Commercial Real Estate:Office",
       "Commercial Real Estate:Retail",
       "Residential Real Estate:Apartment",
       "Residential Real Estate:Single-family home"
     ]
   }

getArea
-------

.. js:autofunction:: RealEstate.getArea

Retrieves information about geographical areas supported by the real estate emissions API.

**Returns:**

* ``Promise<AreaResponse>`` - List of supported geographical areas

**Example:**

.. code-block:: javascript

   import * as RealEstate from 'emissions-api-sdk/api/RealEstate';

   const areas = await RealEstate.getArea();
   console.log('Supported countries:', areas.countries);

**Response Example:**

.. code-block:: json

   {
     "countries": ["usa", "gbr", "deu", "fra", "jpn"],
     "regions": ["north_america", "europe", "asia"]
   }

getUnits
--------

.. js:autofunction:: RealEstate.getUnits

Retrieves available units for a specific real estate emission type.

**Parameters:**

* ``type`` (string) - The real estate emission type to get units for

**Returns:**

* ``Promise<UnitResponse>`` - List of available units for the specified type

**Example:**

.. code-block:: javascript

   import * as RealEstate from 'emissions-api-sdk/api/RealEstate';

   const units = await RealEstate.getUnits(
     "Commercial Real Estate:Industrial distribution warehouse"
   );
   console.log('Available units:', units.units);

**Response Example:**

.. code-block:: json

   {
     "units": ["m2", "ft2", "sqm", "sqft"]
   }

Common Real Estate Types
========================

Commercial Real Estate
----------------------

* **Industrial distribution warehouse** - Warehouses and distribution centers
* **Office** - Office buildings and corporate spaces
* **Retail** - Shopping centers and retail stores
* **Hotel** - Hotels and hospitality properties
* **Healthcare** - Hospitals and medical facilities

Residential Real Estate
-----------------------

* **Apartment** - Multi-family residential buildings
* **Single-family home** - Detached residential houses
* **Condominium** - Individually owned units in multi-unit buildings

Best Practices
==============

1. **Use Accurate Area Measurements**
   
   Ensure property area measurements are accurate and use consistent units across calculations.

2. **Select Appropriate Property Types**
   
   Choose the most specific property type that matches your real estate asset.

3. **Regional Considerations**
   
   Use location-specific data when available for more accurate emissions calculations.

4. **Include Details for Analysis**
   
   Set ``includeDetails: true`` when you need breakdown of emission sources.

5. **Batch Processing**
   
   For portfolio analysis, process multiple properties efficiently using async operations.

Error Handling
==============

.. code-block:: javascript

   import * as RealEstate from 'emissions-api-sdk/api/RealEstate';

   try {
     const result = await RealEstate.calculate(request);
     console.log('Calculation successful:', result);
   } catch (error) {
     if (error.response) {
       // API returned an error response
       console.error('API Error:', error.response.data);
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

* **Invalid Type** - The specified real estate type is not supported
* **Invalid Unit** - The unit is not valid for the specified type
* **Invalid Country** - The country code is not recognized
* **Missing Required Fields** - Required fields in the request are missing

See Also
========

* :doc:`getting_started` - Getting started with the SDK
* :doc:`reference` - Complete API reference
* :doc:`economic_activity` - Economic Activity API documentation
* :doc:`troubleshooting` - Troubleshooting guide