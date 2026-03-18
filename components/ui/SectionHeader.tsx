import FadeIn from "@/components/animations/FadeIn";

interface SectionHeaderProps {
    title: string;
    highlight: string;
    subtitle: string;
}

export default function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
    return (
        <FadeIn>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                {title} <span className="text-gradient">{highlight}</span>
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </FadeIn>
    );
}
