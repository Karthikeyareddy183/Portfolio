"use client";

import FadeIn from "../animations/FadeIn";
import { personalInfo, socialLinks, education, certifications } from "@/lib/constants";
import { Mail, MapPin, Phone, Download, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-white dark:bg-slate-900">
            <div className="container-custom">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        Get In <span className="text-gradient">Touch</span>
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
                        Let&apos;s build something amazing together
                    </p>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-heading font-bold mb-6">
                                    Contact <span className="text-gradient">Information</span>
                                </h3>
                                <div className="space-y-4">
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                                    >
                                        <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                                            <p className="font-medium text-slate-900 dark:text-slate-100">{personalInfo.email}</p>
                                        </div>
                                    </a>

                                    <a
                                        href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                                        className="flex items-center gap-4 p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                                    >
                                        <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                                            <p className="font-medium text-slate-900 dark:text-slate-100">{personalInfo.phone}</p>
                                        </div>
                                    </a>

                                    <div className="flex items-center gap-4 p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                                        <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg group-hover:scale-110 transition-transform">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                                            <p className="font-medium text-slate-900 dark:text-slate-100">{personalInfo.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-xl font-heading font-bold mb-4">Connect With Me</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-4 glass dark:glass-dark rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
                                            aria-label={link.name}
                                        >
                                            <SocialIcon name={link.icon} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Resume Download */}
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <Download className="w-5 h-5" />
                                Download Resume
                            </a>
                        </div>
                    </FadeIn>

                    {/* Education & Certifications */}
                    <FadeIn delay={0.4}>
                        <div className="space-y-8">
                            {/* Education */}
                            <div>
                                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6 text-primary-500" />
                                    <span className="text-gradient">Education</span>
                                </h3>
                                <div className="space-y-4">
                                    {education.map((edu, index) => (
                                        <div key={index} className="p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-200">
                                            <h4 className="font-heading font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-sm text-primary-600 dark:text-primary-400 mb-1">
                                                {edu.institution}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                                <span>{edu.duration}</span>
                                                {edu.grade && <span className="font-medium">{edu.grade}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-accent-500" />
                                    <span className="text-gradient-purple">Certifications</span>
                                </h3>
                                <div className="space-y-4">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-200">
                                            <h4 className="font-heading font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                                {cert.name}
                                            </h4>
                                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                                                <span>{cert.issuer}</span>
                                                <span>{cert.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Footer */}
                <FadeIn delay={0.6}>
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with ❤️
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
