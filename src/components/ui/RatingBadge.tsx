import { cn } from '@/lib/utils';

type RatingBadgeProps = {
    value: number;
    icon: string;
    color: 'yellow' | 'blue';
    className?: string;
};

export const RatingBadge = ({ value, icon, color, className }: RatingBadgeProps) => (
    <div className={cn(
        "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold",
        color === 'yellow' ? 'bg-yellow-500/90 text-gray-900' : 'bg-blue-500/90 text-white',
        className
    )}>
        <span>{icon}</span>
        <span>{value}</span>
    </div>
);