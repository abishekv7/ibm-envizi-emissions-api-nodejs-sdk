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

export default SearchPayload;
