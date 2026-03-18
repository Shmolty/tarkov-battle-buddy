import { gql } from '@apollo/client';

export const SEARCH_ITEMS_BY_NAME = gql`
  query SearchItemsByName($name: String!, $limit: Int!, $offset: Int!) {
    items(name: $name, limit: $limit, offset: $offset) {
      id
      name
      description
      inspectImageLink
      image512pxLink
      types
      avg24hPrice
      low24hPrice
      high24hPrice
    }
  }
`;