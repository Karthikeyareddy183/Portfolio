"use client";

import FadeIn from "../animations/FadeIn";
import { personalInfo, socialLinks, education, certifications, SECTION_IDS } from "@/lib/constants";
import { Mail, MapPin, Phone, Download, GraduationCap, Award } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SocialLinks from "@/components/ui/SocialLinks";
import type { LucideIcon } from "lucide-react";

const emailLink = socialLinks.find((l) => l.icon === "mail");

const contactItems: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
    {
        icon: Mail,
        label: "Email",
        value: personalInfo.email,
        href: emailLink?.url,
    },
    {
        icon: Phone,
        label: "Phone",
        value: personalInfo.phone,
        href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    },
    {
        icon: MapPin,
        label: "Location",
        value: personalInfo.location,
    },
];

export default function Contact() {
    return (
        <section id={SECTION_IDS.contact} className="section-padding bg-white dark:bg-slate-900">
            <div className="container-custom">
                <SectionHeader
                    title="Get In"
                    highlight="Touch"
                    subtitle="Let's build something amazing together"
                />

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-heading font-bold mb-6">
                                    Contact <span className="text-gradient">Information</span>
                                </h3>
                                <div className="space-y-4">
                                    {contactItems.map((item) => {
                                        const Icon = item.icon;
                                        const content = (
                                            <div className="flex items-center gap-4 p-4 glass dark:glass-dark rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all group cursor-pointer">
                                                <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg group-hover:scale-110 transition-transform">
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
                                                    <p className="font-medium text-slate-900 dark:text-slate-100">{item.value}</p>
                                                </div>
                                            </div>
                                        );

                                        if (item.href) {
                                            return (
                                                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                                                    {content}
                                                </a>
                                            );
                                        }
                                        return <div key={item.label}>{content}</div>;
                                    })}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-xl font-heading font-bold mb-4">Connect With Me</h3>
                                <SocialLinks size="md" />
                            </div>

                            {/* Resume Download */}
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
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
                            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with &#10084;&#65039;
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
