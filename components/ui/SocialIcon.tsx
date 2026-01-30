import { Github, Linkedin, Mail } from "lucide-react";

interface SocialIconProps {
    name: string;
    className?: string;
}

export default function SocialIcon({ name, className = "w-5 h-5" }: SocialIconProps) {
    switch (name) {
        case "github":
            return <Github className={className} />;
        case "linkedin":
            return <Linkedin className={className} />;
        case "mail":
            return <Mail className={className} />;
        default:
            return null;
    }
}
