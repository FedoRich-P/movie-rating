import {useEffect, useState} from 'react';

type RatingModalProps = {
    title: string;
    initialRating: number | null;
    onRate: (rating: number) => void;
    onClose: () => void;
};

export const RatingModal = ({title, initialRating, onRate, onClose}: RatingModalProps) => {
    const [selectedRating, setSelectedRating] = useState(initialRating);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleRate = () => {
        if (selectedRating) {
            onRate(selectedRating);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
             onClick={onClose}>
            <div className="rounded-xl bg-gray-800 p-6 shadow-lg"
                 onClick={e => e.stopPropagation()}>
                <h3 className="mb-4 text-lg font-bold text-white">
                    Ваша оценка для "{title}"
                </h3>

                <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button key={num}
                                onClick={() => setSelectedRating(num)}
                                className={`rounded-full p-2 text-white transition-colors ${
                                    selectedRating === num
                                        ? 'bg-blue-600 ring-2 ring-blue-400'
                                        : 'bg-gray-700 hover:bg-gray-600'}`}>
                            {num}
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose}
                            className="rounded px-4 py-2 text-sm text-gray-400 hover:text-white">
                        Отмена
                    </button>
                    <button onClick={handleRate}
                            disabled={!selectedRating}
                            className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
                        Подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};