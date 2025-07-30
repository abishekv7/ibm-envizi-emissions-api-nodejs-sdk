import { LocationRequest } from '../../src/interfaces/Api';

const locationPayload: LocationRequest = {
  location: {
    country: 'usa',
    stateProvince: 'new york',
  },
  time: {
    date: '2025-06-10',
  },
  activity: {
    value: 100,       // Required
    type: 'electricity', // Optional
    unit: 'kWh',         // Optional
  },
  includeDetails: true,
};

export default locationPayload;