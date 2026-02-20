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

Endpoint-Specific Metadata APIs
================================

Each calculation endpoint provides its own metadata methods to discover available types, geographical areas, and units.

getTypes
--------

.. js:autofunction:: Factor.getTypes

.. js:autofunction:: Calculation.getTypes

.. js:autofunction:: Location.getTypes

.. js:autofunction:: Mobile.getTypes

.. js:autofunction:: Stationary.getTypes

.. js:autofunction:: TransportationAndDistribution.getTypes

.. js:autofunction:: Fugitive.getTypes

.. js:autofunction:: RealEstate.getTypes

.. js:autofunction:: EconomicActivity.getTypes

getArea
-------

.. js:autofunction:: Factor.getArea

.. js:autofunction:: Factor.getSearchArea

.. js:autofunction:: Calculation.getArea

.. js:autofunction:: Location.getArea

.. js:autofunction:: Mobile.getArea

.. js:autofunction:: Stationary.getArea

.. js:autofunction:: TransportationAndDistribution.getArea

.. js:autofunction:: Fugitive.getArea

.. js:autofunction:: RealEstate.getArea

.. js:autofunction:: EconomicActivity.getArea

getUnits
--------

.. js:autofunction:: Factor.getUnits

.. js:autofunction:: Calculation.getUnits

.. js:autofunction:: Location.getUnits

.. js:autofunction:: Mobile.getUnits

.. js:autofunction:: Stationary.getUnits

.. js:autofunction:: TransportationAndDistribution.getUnits

.. js:autofunction:: Fugitive.getUnits

.. js:autofunction:: RealEstate.getUnits

.. js:autofunction:: EconomicActivity.getUnits


Global Metadata API
====================

The global Metadata API provides a unified way to query metadata for any endpoint. This is useful when you need to dynamically discover metadata across different endpoints without calling endpoint-specific methods.

**Supported endpoints**: ``calculation``, ``location``, ``stationary``, ``mobile``, ``fugitive``, ``factor``, ``search``, ``transportation-and-distribution``, ``economic-activity``, ``real-estate``

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
