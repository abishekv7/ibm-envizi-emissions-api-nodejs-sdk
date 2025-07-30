import { CommonRequest } from '../../src/interfaces/Api';

const commonPayload: CommonRequest = {
  location: {
    country: 'usa',
    stateProvince: 'new york',
  },
  time: {
    date: '2025-06-10',
  },
  activity: {
    value: 10,
    unit: 'unit',
    type: 'type',
  },
  includeDetails: false,
};

export default commonPayload;
