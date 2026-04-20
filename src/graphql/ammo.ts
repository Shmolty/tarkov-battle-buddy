import { gql } from '@apollo/client';

export const SEARCH_ALL_AMMO = gql`
  query SearchAllAmmo {
    ammo {
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