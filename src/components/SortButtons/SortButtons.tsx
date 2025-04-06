import {SortType} from "@/types/types";
import {ChevronUpIcon, ChevronDownIcon} from "@heroicons/react/24/solid";

type SortOption = {
    type: SortType;
    direction: 'asc' | 'desc';
};

type SortButtonsProps = {
    currentSort: SortOption;
    onSortChange: (type: SortType) => void;
};

const sortButtons: { type: SortType; label: string }[] = [
    {type: 'title', label: 'Title'},
    {type: 'date', label: 'Date'},
    {type: 'rating', label: 'Rating'},
    {type: 'userRating', label: 'Your Rating'},
];

export const SortButtons = ({currentSort, onSortChange}: SortButtonsProps) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Sort by:</h3>
            <div className="flex gap-2 flex-wrap">
                {sortButtons.map((button) => {
                    const isActive = currentSort.type === button.type;
                    const Icon = isActive
                        ? currentSort.direction === 'asc'
                            ? ChevronUpIcon
                            : ChevronDownIcon
                        : ChevronUpIcon; // Или ChevronDownIcon - по умолчанию

                    return (
                        <button key={button.type}
                                onClick={() => onSortChange(button.type)}
                                className={`
                                py-2 px-4 rounded-md text-sm flex items-center gap-2
                                transition-colors duration-200
                                ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }
                            `}
                        >
                            {button.label}
                            <Icon className={`h-4 w-4 ${
                                !isActive ? 'opacity-30' : ''
                            }`}/>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};