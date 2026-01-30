import { Experience, Project, SkillCategory, Education, Certification, SocialLink } from "@/types";

export const personalInfo = {
    name: "M Karthikeya Reddy",
    title: "AI/ML Engineer & Backend Developer",
    email: "karthikeyareddy183@gmail.com",
    phone: "+91 8296080183",
    location: "Bengaluru, India",
    bio: "Junior Backend Developer with hands-on experience building scalable backend services and RESTful APIs using Python. Strong foundation in data structures, system design fundamentals, and asynchronous processing, with experience in Docker, CI/CD pipelines, and cloud deployment on Microsoft Azure. Proven ability to deliver reliable, production-ready backend systems supporting AI-driven applications.",
};

export const socialLinks: SocialLink[] = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/m-karthikeya-reddy-955b08246",
        icon: "linkedin",
    },
    {
        name: "GitHub",
        url: "https://github.com/Karthikeyareddy183",
        icon: "github",
    },
    {
        name: "Email",
        url: `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`,
        icon: "mail",
    },
];

export const experiences: Experience[] = [
    {
        company: "Craftech 360",
        role: "Jr Backend Developer",
        duration: "Oct 2024 – Present",
        location: "Bangalore",
        description: [
            "Own backend development for Cheeko AI, building and maintaining scalable Python-based services and RESTful APIs",
            "Designed and maintained CI/CD pipelines using Docker and GitHub Actions, reducing deployment time by ~50%",
            "Managed application hosting and deployments across staging and production, supporting backend services for 1,000+ active users",
            "Debugged and resolved production issues, reducing recurring API failures by ~30% through log analysis and code fixes",
            "Collaborated with cross-functional teams to integrate backend services with AI workflows and real-time processing pipelines",
            "Followed software development life cycle (SDLC) practices, participated in code reviews, and incorporated feedback to improve code quality",
        ],
        technologies: ["Python", "FastAPI", "Docker", "GitHub Actions", "Azure", "REST APIs"],
    },
    {
        company: "Craftech 360",
        role: "AI Engineer Intern",
        duration: "Apr 2024 – Sep 2024",
        location: "Bangalore",
        description: [
            "Contributed to backend development for Cheeko AI, supporting API development, prompt engineering, and function calling workflows",
            "Fine-tuned TTS models, improving voice quality by 25% using transfer learning techniques",
            "Built automated n8n workflows and Python modules for real-time AI processing pipelines",
            "Implemented LLM guardrails and safety mechanisms for child-appropriate content filtering",
            "Applied secure coding practices and input validation to protect backend services and user data in production environments",
        ],
        technologies: ["Python", "TensorFlow", "n8n", "LLMs", "FastAPI", "Prompt Engineering"],
    },
];

export const projects: Project[] = [
    {
        title: "Conversational Voice AI Agent with LiveKit",
        date: "Jun 2024",
        description: "Built production-ready voice AI system using LiveKit framework with real-time audio processing capabilities",
        technologies: ["LiveKit", "Groq Whisper", "Meta Llama 3", "ElevenLabs", "Python"],
        github: "https://github.com/Karthikeyareddy183/conversational_AI_Agent",
        highlights: [
            "Integrated Groq Whisper for Speech-to-Text",
            "Used Meta Llama 3 for natural language processing",
            "Implemented ElevenLabs for Text-to-Speech",
            "Voice activity detection algorithms and noise reduction",
        ],
    },
    {
        title: "Telegram Conversational AI Bot",
        date: "May 2024",
        description: "Developed no-code conversational agent using n8n automation platform with multi-modal AI capabilities",
        technologies: ["n8n", "Telegram API", "NLP", "Python"],
        github: "https://github.com/Karthikeyareddy183/Voice-Text-Telegram-Agent-using-n8n",
        highlights: [
            "End-to-end pipeline processing voice messages and text inputs",
            "Achieved 95% user satisfaction rate",
            "Natural conversation flow and context retention",
        ],
    },
    {
        title: "Medical AI Chatbot with RAG",
        date: "Apr 2024",
        description: "Built Retrieval-Augmented Generation chatbot using OpenRouter API and Pinecone vector database",
        technologies: ["OpenRouter", "Pinecone", "RAG", "Python", "Google Drive API"],
        github: "https://github.com/Karthikeyareddy183/Medical-AI-Chatbot-RAG",
        highlights: [
            "Automated document ingestion from Google Drive",
            "Intelligent chunking and embedding strategies",
            "Medical domain-specific guardrails for accurate health information",
        ],
    },
    {
        title: "BERT Named Entity Recognition System",
        date: "Feb-Mar 2024",
        description: "Fine-tuned BERT transformer model on CoNLL-2003 dataset achieving 94% F1-score for NER tasks",
        technologies: ["BERT", "Transformers", "Flask", "Docker", "PyTorch"],
        github: "https://github.com/Karthikeyareddy183/BERT-based-Named-Entity-Recognition-API",
        highlights: [
            "Achieved 94% F1-score on CoNLL-2003 dataset",
            "Deployed as REST API using Flask",
            "Containerized with Docker for consistent deployment",
        ],
    },
];

export const skillCategories: SkillCategory[] = [
    {
        category: "Programming Languages",
        skills: [
            { name: "Python", level: 90 },
            { name: "SQL", level: 80 },
            { name: "JavaScript", level: 75 },
        ],
    },
    {
        category: "Machine Learning & AI",
        skills: [
            { name: "TensorFlow", level: 85 },
            { name: "PyTorch", level: 85 },
            { name: "Scikit-learn", level: 80 },
            { name: "Transformers", level: 85 },
            { name: "LLMs & GenAI", level: 90 },
            { name: "NLP", level: 85 },
        ],
    },
    {
        category: "Backend & APIs",
        skills: [
            { name: "FastAPI", level: 90 },
            { name: "Flask", level: 85 },
            { name: "REST APIs", level: 90 },
            { name: "Docker", level: 85 },
        ],
    },
    {
        category: "Cloud & DevOps",
        skills: [
            { name: "Microsoft Azure", level: 75 },
            { name: "CI/CD", level: 80 },
            { name: "GitHub Actions", level: 80 },
        ],
    },
    {
        category: "Databases & Tools",
        skills: [
            { name: "Supabase", level: 75 },
            { name: "Pinecone", level: 80 },
            { name: "Vector Databases", level: 80 },
            { name: "Git", level: 85 },
        ],
    },
    {
        category: "AI Tools & Frameworks",
        skills: [
            { name: "Hugging Face", level: 85 },
            { name: "LangChain", level: 80 },
            { name: "n8n", level: 85 },
            { name: "Ollama", level: 75 },
            { name: "Groq", level: 80 },
        ],
    },
];

export const education: Education[] = [
    {
        degree: "B.E - Artificial Intelligence & Machine Learning",
        institution: "MVJ College of Engineering",
        location: "Bangalore",
        duration: "Nov 2021 - June 2025",
        grade: "7.96/10.0",
    },
    {
        degree: "Pre-University - Physics, Chemistry, Mathematics, Biology",
        institution: "Narayana PU College",
        location: "Ballari",
        duration: "Mar 2018 - Mar 2020",
        grade: "83%",
    },
    {
        degree: "Class X",
        institution: "Gurukul Concept School",
        location: "Ballari",
        duration: "May 2017 - May 2018",
        grade: "70%",
    },
];

export const certifications: Certification[] = [
    {
        name: "Machine Learning A-Z: Hands-On Python & R In Data Science",
        issuer: "Udemy",
        date: "Aug 2024",
    },
    {
        name: "Complete Python Developer Bootcamp",
        issuer: "Udemy",
        date: "Feb 2024",
    },
];

export const achievements = [
    "Technical Lead — Computer Science Department — VerTechX Techfest — MVJ College",
    "Team Captain — Basketball Team — MVJ College — Led team to inter-college championship",
];

export const languages = [
    "English (Fluent)",
    "Telugu (Native)",
    "Kannada (Conversational)",
    "Hindi (Conversational)",
];
