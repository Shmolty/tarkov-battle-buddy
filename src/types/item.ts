export type Item = {
    id: string;
    name: string;
    description: string;
    inspectImageLink: string;
    image512pxLink: string;
    types: string[];
    avg24hPrice: number;
    low24hPrice: number;
    high24hPrice: number;
};

export type SearchItemsData = {
    items: Item[];
};

export type SearchItemsVars = {
    name: string;
    limit: number;
    offset: number;
};