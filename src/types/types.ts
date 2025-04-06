export type  FilmType = {
    title: string;
    id: string;
    rating: number;
    userRating: number | null;
    date: string;
}

export const SORT_OPTIONS = {
    userRating: 'своя оценка',
    rating: 'популярности',
    date: 'по дате',
    title: 'алфавиту'
} as const;

export type SortType = keyof typeof SORT_OPTIONS;
export type SortDirection = 'asc' | 'desc';

export type SortOption = {
    type: SortType;
    direction: SortDirection;
};