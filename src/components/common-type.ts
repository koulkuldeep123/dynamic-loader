export type DashboardProps = {
    favorites: Item[];
};

export type ListProps = {
    favorites: Item[];
    toggleFavorite: (item:Item)=>void;
};

export type Item = {
    id: number;
    title: string;
    url: string;
};