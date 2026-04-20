import { gql } from '@apollo/client';

export const SEARCH_AMMO_BY_CALIBER = gql`
  query SearchAmmoByCaliber($caliber: String!, $limit: Int!, $offset: Int!) {
    ammo(caliber: $caliber, limit: $limit, offset: $offset) {
      caliber
      item {
        name
      }
      damage
      penetrationPower
      recoilModifier
    }
  }
`;