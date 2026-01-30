import FadeIn from "../animations/FadeIn";
import { experiences } from "@/lib/constants";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function Experience() {
    return (
        <section id="experience" className="section-padding bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
                        Building production-ready systems and AI-driven applications
                    </p>
                </FadeIn>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />

                        {experiences.map((exp, index) => (
                            <FadeIn key={index} delay={0.2 * (index + 1)}>
                                <div className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-auto md:right-0 w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transform -translate-x-1/2 z-10"
                                        style={index % 2 === 0 ? { right: '-8px', left: 'auto' } : { left: '-8px', right: 'auto' }}
                                    />

                                    <div className="ml-16 md:ml-0">
                                        <div className="glass dark:glass-dark rounded-xl p-6 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 group">
                                            {/* Header */}
                                            <div className="mb-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-100 group-hover:text-gradient transition-all">
                                                        {exp.role}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4" />
                                                        <span className="font-semibold">{exp.company}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{exp.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <ul className="space-y-2 mb-4">
                                                {exp.description.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                                        <span className="text-primary-500 mt-1.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 dark:text-primary-300 rounded-full border border-primary-500/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
