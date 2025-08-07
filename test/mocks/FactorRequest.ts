import { FactorRequest } from "../../src/interfaces/Api";

const FactorPayload: FactorRequest = {
  location: {
   "country": "GBR"
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    "type":"electricity",
    "unit": "kwh"
  },
};

export default FactorPayload;
