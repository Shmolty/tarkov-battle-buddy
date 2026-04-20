import type { Item } from './item';

export type Ammo = {
    item: Item;
    caliber: string;
    damage: number;
    penetrationPower: number;
    recoilModifier: number;
};

export type SearchAmmoData = {
    ammo: Ammo[];
};

export type SearchAmmoVars = {
    item: Item;
    limit: number;
    offset: number;
};