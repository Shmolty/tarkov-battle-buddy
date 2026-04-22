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

export type ScatterDataPoint = {
    x: number;
    y: number;
    label: string;
    recoilModifier: number;
};