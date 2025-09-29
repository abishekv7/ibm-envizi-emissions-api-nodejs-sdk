import { CalculationRequest } from "../../src/interfaces/Api";

const GenericCalculationPayload: CalculationRequest = {
  location: {
    country: "usa",
  },
  time: {
    date: "2025-06-10",
  },
  activity: {
    type: "electricity:default factor",
    value: 0.1,
    unit: "kwh",
    
  },
  includeDetails: true,
};

export default GenericCalculationPayload;
