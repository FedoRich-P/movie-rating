import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilmType, SortOption, SortType} from "@/types/types";
import {filmsDB} from "@/data";

type FilmsState = {
    films: FilmType[];
    sort: SortOption;
};

const initialState: FilmsState = {
    films: filmsDB,
    sort: {
        type: 'rating',
        direction: 'desc',
    },
};

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        addFilm: (state, action: PayloadAction<FilmType>) => {
            state.films.unshift(action.payload)
        },
        removeFilm: (state, action: PayloadAction<string>) => {
            const index = state.films.findIndex(film => film.id === action.payload)
            if (index !== -1) state.films.splice(index, 1)
        },
        addFilmRating: (state, action: PayloadAction<{ id: string, userRating: number | null }>) => {
            const index = state.films.findIndex(film => film.id === action.payload.id)
            if (index !== -1) state.films[index].userRating = action.payload.userRating
        },
        toggleSort: (state, action: PayloadAction<SortType>) => {
            if (state.sort.type === action.payload) {
                state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                state.sort = {
                    type: action.payload,
                    direction: 'asc',
                };
            }

            state.films.sort((a, b) => {
                const order = state.sort.direction === 'asc' ? 1 : -1;

                switch (state.sort.type) {
                    case 'title':
                        return a.title.localeCompare(b.title) * order;
                    case 'date':
                        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
                    case 'rating':
                        return (a.rating - b.rating) * order;
                    case 'userRating':
                        return ((a.userRating ?? 0) - (b.userRating ?? 0)) * order;
                    default:
                        return 0;
                }
            });
        },
    },
    selectors: {
        selectFilms: state => state.films,
        selectSort: state => state.sort,
    }
})

export const {addFilm, removeFilm, addFilmRating, toggleSort} = filmsSlice.actions
export const {selectFilms, selectSort} = filmsSlice.selectors
export const filmsReducer = filmsSlice.reducer