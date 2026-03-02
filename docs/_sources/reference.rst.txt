=========
Reference
=========


.. js:autoclass:: Client
   :members: 

.. js:autofunction:: request.makeApiRequest

.. js:autofunction:: utils.findExpiryTime

API
===

.. js:autofunction:: Factor.retrieveFactor

.. js:autofunction:: Fugitive.calculate

.. js:autofunction:: Calculation.calculate

.. js:autofunction:: Location.calculate

.. js:autofunction:: Mobile.calculate

.. js:autofunction:: Stationary.calculate

.. js:autofunction:: TransportationAndDistribution.calculate

.. js:autofunction:: RealEstate.calculate

.. js:autofunction:: EconomicActivity.calculate


Global Metadata API
====================

The global Metadata API provides a unified way to query metadata across different endpoints without calling endpoint-specific methods.

- **getTypes/postTypes** and **getArea/postArea**: Accept an optional ``endpoint`` parameter to query metadata for specific endpoints
- **getUnits/postUnits**: Accept an optional ``type`` parameter to query units for specific emission types

**Supported endpoints** (for getTypes/postTypes and getArea/postArea): ``calculation``, ``location``, ``stationary``, ``mobile``, ``fugitive``, ``factor``, ``search``, ``transportation-and-distribution``, ``economic-activity``, ``real-estate``

getTypes
--------

.. js:autofunction:: Metadata.getTypes

.. js:autofunction:: Metadata.postTypes

getArea
-------

.. js:autofunction:: Metadata.getArea

.. js:autofunction:: Metadata.postArea

getUnits
--------

.. js:autofunction:: Metadata.getUnits

.. js:autofunction:: Metadata.postUnits


Usage API
===========

.. js:autofunction:: Usage.getUsage

Interfaces
==========

.. js:autoclass:: Api.LocationRequestWithoutFactorId

.. js:autoclass:: Api.LocationRequestWithFactorId

.. js:autoclass:: Api.CommonRequestWithoutFactorId

.. js:autoclass:: Api.CommonRequestWithFactorId

.. js:autoclass:: Api.GenericCalculationRequestWithoutFactorId

.. js:autoclass:: Api.GenericCalculationRequestWithFactorId

.. js:autoclass:: Api.FactorRequestWithoutFactorId

.. js:autoclass:: Api.FactorRequestWithFactorId

.. js:autoclass:: Api.SearchRequest

.. js:autoclass:: common.Location

.. js:autoclass:: common.Time

.. js:autoclass:: common.Activity

.. js:autoclass:: common.ActivityWithFactorId

.. js:autoclass:: common.CombinedUnitsActivity

.. js:autoclass:: common.CombinedUnitsActivityWithFactorId

.. js:autoclass:: common.FactorActivity

.. js:autoclass:: common.FactorActivityWithFactorId

.. js:autoclass:: common.SearchActivity

.. js:autoclass:: common.Pagination

.. js:autoclass:: Config.RequestConfig

.. js:autoclass:: Config.ClientConfig
