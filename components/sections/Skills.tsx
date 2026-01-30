import FadeIn from "../animations/FadeIn";
import { skillCategories } from "@/lib/constants";

export default function Skills() {
    return (
        <section id="skills" className="section-padding bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        Skills & <span className="text-gradient">Technologies</span>
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
                        Expertise across the full stack of AI/ML and backend development
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <FadeIn key={categoryIndex} delay={0.1 * (categoryIndex + 1)}>
                            <div className="glass dark:glass-dark rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200">
                                <h3 className="text-lg font-heading font-bold mb-4 text-gradient">
                                    {category.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 dark:text-primary-300 border border-primary-500/20 hover:border-primary-500/40 hover:from-primary-500/20 hover:to-accent-500/20 transition-all duration-200"
                                        >
                                            {skill.name}
                                        </span>
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
