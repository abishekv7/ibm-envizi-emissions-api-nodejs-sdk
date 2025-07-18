import { API_DOMAIN, GENERIC_CALCULATION_API_PATH } from "../Constants";
import { GenericCalculationRequest } from "../interfaces/genericCalculationApi";
import { makeApiRequest } from "../request";

export async function calculate(
  payload: GenericCalculationRequest,
  useProxy: boolean = false
): Promise<string> {
  
 const url = useProxy
     ? GENERIC_CALCULATION_API_PATH
     : API_DOMAIN + GENERIC_CALCULATION_API_PATH;

  return makeApiRequest<string>({
    method: 'POST',
    url,
    data: payload,
  });
}
