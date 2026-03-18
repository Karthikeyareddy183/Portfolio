"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { personalInfo, roles, SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import { useEffect, useState } from "react";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Hero() {
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id={SECTION_IDS.home}
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse delay-700" />
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container-custom section-padding relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-4"
                    >
                        Hi, I&apos;m
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
                    >
                        <span className="text-gradient">{personalInfo.name}</span>
                    </motion.h1>

                    {/* Rotating roles */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-16 md:h-20 mb-8 relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={currentRole}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-4xl font-heading font-semibold text-gradient-purple absolute inset-0 flex items-start justify-center"
                            >
                                {roles[currentRole]}
                            </motion.h2>
                        </AnimatePresence>
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        Building LLM-powered systems, multi-agent RAG pipelines, and real-time voice AI applications.
                        Specialized in end-to-end AI system design with sub-200ms latency backends.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-12"
                    >
                        <a
                            href={`#${SECTION_IDS.contact}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(SECTION_IDS.contact);
                            }}
                            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            Get In Touch
                        </a>
                        <a
                            href="/resume.pdf"
                            download
                            className="px-8 py-3 glass dark:glass-dark rounded-lg font-medium hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 cursor-pointer"
                        >
                            Download Resume
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex justify-center"
                    >
                        <SocialLinks size="sm" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={() => scrollToSection(SECTION_IDS.about)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                aria-label="Scroll to next section"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400"
                >
                    <span className="text-sm">Scroll Down</span>
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.button>
        </section>
    );
}
