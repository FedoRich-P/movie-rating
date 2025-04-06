import {useAppSelector} from "@app/hooks";
import {selectFilms} from "@/features/films/filmsSlice";
import {FilmCard} from "@components/FilmCard/FilmCart";

export const FilmsList = () => {

    const films = useAppSelector(selectFilms)

    return (
        <ul className="w-full mx-auto">
            {films.map((film) => (
                <FilmCard key={film.id} {...film} />
            ))}
        </ul>
    );
};