import {FilmsList} from "@components/FilmsList/FilmsList";
import {FilmType} from "@/types/types";
import {Sidebar} from "@components/Sidebar/Sidebar";
import {useAppDispatch} from "@app/hooks";
import {addFilm} from "@/features/films/filmsSlice";

function App() {
    const dispatch = useAppDispatch();

    const handleAddFilm = (film: FilmType) => {
        dispatch(addFilm(film))
    };

    return (
        <div className="grid grid-cols-[30%_1fr] max-w-[1400px] mx-auto h-screen gap-8">
            <Sidebar onAddFilm={handleAddFilm}/>
            <FilmsList/>
        </div>
    )
}

export default App
