"use client";

import FadeIn from "../animations/FadeIn";
import { projects } from "@/lib/constants";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
    return (
        <section id="projects" className="section-padding bg-white dark:bg-slate-900">
            <div className="container-custom">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
                        AI-powered applications and production-ready systems
                    </p>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <FadeIn key={index} delay={0.2 * (index + 1)}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="glass dark:glass-dark rounded-xl p-6 h-full flex flex-col hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 group"
                            >
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-100 group-hover:text-gradient transition-all">
                                            {project.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg transition-all"
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
                                                    className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg transition-all"
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
                                </div>

                                {/* Description */}
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {project.description}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-2 mb-4 flex-grow">
                                    {project.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <span className="text-primary-500 mt-0.5">✓</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 dark:text-primary-300 rounded-full border border-primary-500/20"
                                        >
                                            {tech}
                                        </span>
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
