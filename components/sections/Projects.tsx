"use client";

import FadeIn from "../animations/FadeIn";
import { projects, SECTION_IDS } from "@/lib/constants";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TechBadge from "@/components/ui/TechBadge";

export default function Projects() {
    return (
        <section id={SECTION_IDS.projects} className="section-padding bg-white dark:bg-slate-900">
            <div className="container-custom">
                <SectionHeader
                    title="Featured"
                    highlight="Projects"
                    subtitle="AI-powered applications and production-ready systems"
                />

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <FadeIn key={index} delay={0.2 * (index + 1)}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="glass dark:glass-dark rounded-xl p-6 h-full flex flex-col hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 group cursor-pointer"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-100 group-hover:text-gradient transition-all">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg transition-all cursor-pointer"
                                                aria-label="View on GitHub"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg transition-all cursor-pointer"
                                                aria-label="View demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{project.date}</span>
                                </div>

                                {/* Description */}
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {project.description}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-2 mb-4 flex-grow">
                                    {project.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <span className="text-primary-500 mt-0.5">&#10003;</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.map((tech, i) => (
                                        <TechBadge key={i} name={tech} />
                                    ))}
                                </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
