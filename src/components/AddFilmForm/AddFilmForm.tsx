import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {FilmType} from '@/types/types';
import {v4 as uuidv4} from 'uuid';

type AddFilmFormProps = {
    onSubmit: (film: FilmType) => void;
};

export const AddFilmForm = ({onSubmit}: AddFilmFormProps) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<Omit<FilmType, 'id' | 'userRating'>>();

    const handleFormSubmit = (data: Omit<FilmType, 'id' | 'userRating'>) => {
        onSubmit({
            ...data,
            id: `film-${uuidv4()}`,
            userRating: 0
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                </label>
                <input
                    {...register('title', {required: 'Title is required'})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Rating (IMDb)
                </label>
                <input type="number"
                       step="0.1"
                       min="0"
                       max="10"
                       {...register('rating', {
                           required: 'Rating is required',
                           min: {value: 0, message: 'Min 0'},
                           max: {value: 10, message: 'Max 10'}
                       })}
                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                {errors.rating && (
                    <p className="mt-1 text-sm text-red-400">{errors.rating.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Release Date
                </label>
                <input type="date"
                       {...register('date', {required: 'Date is required'})}
                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
                {errors.date && (
                    <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
                )}
            </div>

            <button type="submit"
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md">
                Add Film
            </button>
        </form>
    );
};