interface TechBadgeProps {
    name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
    return (
        <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 dark:text-primary-300 rounded-full border border-primary-500/20">
            {name}
        </span>
    );
}
