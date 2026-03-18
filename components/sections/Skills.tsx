import FadeIn from "../animations/FadeIn";
import { skillCategories, SECTION_IDS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Skills() {
    return (
        <section id={SECTION_IDS.skills} className="section-padding bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
                <SectionHeader
                    title="Skills &"
                    highlight="Technologies"
                    subtitle="Expertise across AI/ML systems, backend engineering, and cloud infrastructure"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <FadeIn key={categoryIndex} delay={0.1 * (categoryIndex + 1)}>
                            <div className="glass dark:glass-dark rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200">
                                <h3 className="text-lg font-heading font-bold mb-5 text-gradient">
                                    {category.category}
                                </h3>
                                <div className="space-y-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-xs text-slate-500 dark:text-slate-500">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${skill.level}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
