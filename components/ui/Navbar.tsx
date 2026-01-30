"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const updateScrollState = useCallback(() => {
        setIsScrolled(window.scrollY > 50);

        const sections = navItems.map((item) => item.href.substring(1));
        const current = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
        });
        if (current) {
            setActiveSection(current);
        }
    }, []);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollState();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [updateScrollState]);

    const scrollToSection = useCallback((href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMobileMenuOpen(false);
        }
    }, []);

    return (
        <nav
            className={cn(
                "fixed z-[100] transition-all duration-300",
                isScrolled
                    ? "top-4 left-4 right-4 glass dark:glass-dark shadow-lg backdrop-blur-xl rounded-2xl"
                    : "top-0 left-0 right-0 bg-white/5 dark:bg-slate-900/5 backdrop-blur-sm"
            )}
        >
            <div className="container-custom px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#home");
                        }}
                        className="text-2xl font-heading font-bold text-gradient cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        KR
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer",
                                    activeSection === item.href.substring(1)
                                        ? "text-primary-600 dark:text-primary-400 font-semibold"
                                        : "text-slate-700 dark:text-slate-300"
                                )}
                            >
                                {item.name}
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg glass hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 glass dark:glass-dark rounded-lg p-4">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer py-2",
                                            activeSection === item.href.substring(1)
                                                ? "text-primary-600 dark:text-primary-400 font-semibold"
                                                : "text-slate-700 dark:text-slate-300"
                                        )}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
