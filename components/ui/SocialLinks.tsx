"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/constants";
import SocialIcon from "@/components/ui/SocialIcon";

interface SocialLinksProps {
    size?: "sm" | "md";
}

export default function SocialLinks({ size = "sm" }: SocialLinksProps) {
    const padding = size === "sm" ? "p-3" : "p-4";

    return (
        <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
                <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${padding} glass dark:glass-dark rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 cursor-pointer`}
                    aria-label={link.name}
                >
                    <SocialIcon name={link.icon} />
                </motion.a>
            ))}
        </div>
    );
}
