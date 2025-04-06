import {FilmsList} from "@components/FilmsList/FilmsList";
import {useState} from "react";
import {FilmType, SortOption} from "@/types/types";
import {Sidebar} from "@components/Sidebar/Sidebar";
import {useAppDispatch} from "@app/hooks";
import {addFilm} from "@/features/films/filmsSlice";

function App() {
    const [films, setFilms] = useState<FilmType[]>([]);
    const [activeSort, setActiveSort] = useState<SortOption>('title-asc');

    const dispatch = useAppDispatch();

    const handleAddFilm = (film: FilmType) => {
        // setFilms(prev => [...prev, {...film, userRating: null}]);
        dispatch(addFilm(film))
    };

    console.log(films);

    const handleSort = (option: SortOption) => {
        setActiveSort(option);
    };
    return (
        <div className="grid grid-cols-[30%_1fr] max-w-[1400px] mx-auto h-screen gap-8">
            <Sidebar onAddFilm={handleAddFilm}
                     onSort={handleSort}
                     activeSort={activeSort}/>
            <FilmsList/>
        </div>
    )
}

export default App
