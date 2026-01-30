export type Item = {
    id: string;
    name: string;
    inspectImageLink: string;
    types: string[];
    avg24hPrice: number;
};

export type SearchItemsData = {
    items: Item[];
};

export type SearchItemsVars = {
    name: string;
    limit: number;
    offset: number;
};