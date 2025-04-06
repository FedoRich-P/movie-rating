import {memo, useCallback, useMemo, useState} from 'react';
import {FilmType} from '@/types/types';
import {CloseIcon} from '@/components/ui/CloseIcon';
import {RatingModal} from '@/components/RatingModal/RatingModal';
import {RatingBadge} from '@/components/ui/RatingBadge';
import {formatFilmDate} from "@/utils/formatFilmDate";
import {useAppDispatch, useAppSelector} from "@app/hooks";
import {addFilmRating, removeFilm} from "@/features/films/filmsSlice";

export const FilmCard = memo(({title, date, id, rating}: FilmType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const userRating = useAppSelector(state =>
        state.films.films.find(film => film.id === id)?.userRating ?? null
    );

    const handleDelete = useCallback(() => dispatch(removeFilm(id)), [dispatch, id]);

    const handleSetUserRating = useCallback((newRating: number) => {
        dispatch(addFilmRating({id, userRating: newRating}));
    }, [dispatch, id]);

    const toggleModal = useCallback(() => setIsModalOpen(prev => !prev), []);

    const formattedDate = useMemo(() => formatFilmDate(new Date(date)), [date]);

    return (
        <li className="relative mb-4 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-5 shadow-md last:mb-0 hover:border-gray-600 hover:bg-gray-700/80">
            <button onClick={handleDelete}
                    className="absolute right-3 top-3 z-10 rounded-full bg-red-500/20 p-1.5 text-red-400 hover:bg-red-500/30"
                    aria-label="Delete film">
                <CloseIcon/>
            </button>

            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <span className="text-sm text-gray-400">
                        {formattedDate}
                    </span>
                </div>

                <div className="mt-auto flex justify-end gap-2 items-center">
                    <span className="text-white">IMDb :</span>
                    <RatingBadge value={rating} icon="⭐" color="yellow"/>

                    {userRating !== null && (
                        <>
                            <span className="text-white">Your rating:</span>
                            <RatingBadge value={userRating} icon="👤" color="blue"/>
                        </>
                    )}

                    <button onClick={toggleModal}
                            className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                    >
                        {userRating !== null ? 'Изменить оценку' : 'Оценить'}
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <RatingModal title={title}
                             initialRating={userRating}
                             onRate={handleSetUserRating}
                             onClose={toggleModal}
                />
            )}
        </li>
    );
});

FilmCard.displayName = 'FilmCard';