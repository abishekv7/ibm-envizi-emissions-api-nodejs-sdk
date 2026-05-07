import { SearchRequest } from "../../src/interfaces/Api";

const SearchPayload: SearchRequest = {
  location: {
   "country": "usa"
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    "search": "electricity"
  },
  pagination:{
    "page": 10,
    "size": 1
  }
};

// Search payload with unit parameter
export const SearchPayloadWithUnit: SearchRequest = {
  location: {
    "country": "usa"
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    "search": "electricity",
    "unit": "kWh"
  }
};

// Search payload with scope parameter
export const SearchPayloadWithScope: SearchRequest = {
  location: {
    "country": "usa"
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    "search": "natural gas",
    "scope": "1"
  }
};

// Search payload with both unit and scope parameters
export const SearchPayloadWithBoth: SearchRequest = {
  location: {
    "country": "usa",
    "stateProvince": "california"
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    "search": "electricity",
    "unit": "MWh",
    "scope": "2"
  },
  pagination:{
    "page": 1,
    "size": 10
  }
};

export default SearchPayload;
