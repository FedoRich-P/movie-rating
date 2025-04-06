import {FilmType} from '@/types/types';
import {SortButtons} from "@components/SortButtons/SortButtons";
import {AddFilmForm} from "@components/AddFilmForm/AddFilmForm";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {selectSort, toggleSort} from "@/features/films/filmsSlice";

type SidebarProps = {
    onAddFilm: (film: FilmType) => void;
};

export const Sidebar = ({ onAddFilm }: SidebarProps) => {
    const dispatch = useAppDispatch();
    const currentSort = useAppSelector(selectSort);

    console.log('Current sort:', currentSort);
    return (
        <div className="p-6 bg-gray-800 border-r border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Film Manager</h2>
            <SortButtons
                currentSort={currentSort}
                onSortChange={(type) => dispatch(toggleSort(type))}
            />
            <div className="mb-6 p-3 border-2 border-gray-300 rounded-[10px]">
                <h3 className="text-lg font-semibold text-white mb-3">Add New Film</h3>
                <AddFilmForm onSubmit={onAddFilm} />
            </div>
        </div>
    );
};
