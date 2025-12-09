import { FactorResponse } from './FactorResponse';

/**
 * Pagination parameters for search requests
 */
export interface Pagination {
  /** Page number */
  page: number;
  
  /** Page size */
  size: number;
}

/**
 * Request body structure for pagination links
 */
export interface PaginationBody {
  /** Pagination parameters */
  pagination?: Pagination;
}

/**
 * Link object for pagination in search results
 */
export interface SearchLink {
  /** Relationship type (e.g., "next", "prev") */
  rel: string;
  
  /** URL for the link */
  href: string;
  
  /** Content type */
  type: string;
  
  /** HTTP method */
  method: string;
  
  /** Request body for pagination */
  body?: PaginationBody;
}

/**
 * Interface representing the response from the search factor API
 */
export interface SearchResponse {
  /** Array of factor results */
  factors: FactorResponse[];
  
  /** Pagination links (optional) */
  links?: SearchLink[];
}

