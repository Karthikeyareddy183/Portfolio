import { Experience, Project, SkillCategory, Education, Certification, SocialLink } from "@/types";

export const SECTION_IDS = {
    home: "home",
    about: "about",
    experience: "experience",
    projects: "projects",
    skills: "skills",
    contact: "contact",
} as const;

export const roles = [
    "Applied AI Engineer",
    "AI Backend Engineer",
    "LLM Systems Builder",
    "RAG Pipeline Architect",
];

export const personalInfo = {
    name: "M Karthikeya Reddy",
    title: "Applied AI Engineer | AI Backend Engineer | Python",
    email: "karthikeyareddy183@gmail.com",
    phone: "+91 8296080183",
    location: "Bengaluru, India",
    bio: "Applied AI Engineer with 1+ year of production experience building LLM-powered systems, multi-agent RAG pipelines, and real-time voice AI applications serving 100+ active users. Specialized in end-to-end AI system design from fine-tuning transformer models (94% F1) to deploying async FastAPI backends with sub-200ms latency. Proficient in Python, LangChain, CrewAI, and modern vector search infrastructure (ChromaDB, Pinecone) on Azure and GCP.",
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
        role: "Jr. Backend Developer",
        duration: "Oct 2025 – Present",
        location: "Bangalore",
        description: [
            "Lead backend development for Cheeko AI, building scalable Python services and RESTful APIs supporting AI-driven applications",
            "Designed and implemented CI/CD pipelines using Docker and GitHub Actions, reducing deployment time by 50% and improving release reliability",
            "Managed staging and production infrastructure supporting backend services for 100+ active users",
            "Diagnosed and resolved production API failures through log analysis and debugging, reducing recurring errors by 30%",
        ],
        technologies: ["Python", "FastAPI", "Docker", "GitHub Actions", "Azure", "REST APIs"],
    },
    {
        company: "Craftech 360",
        role: "AI Engineer Intern",
        duration: "Apr 2025 – Sep 2025",
        location: "Bangalore",
        description: [
            "Contributed to backend systems powering Cheeko AI, supporting API development, prompt engineering, and function-calling pipelines",
            "Fine-tuned Text-to-Speech models using transfer learning techniques, improving voice quality by 25%",
            "Built automated AI orchestration workflows using Python modules and the n8n automation platform",
            "Implemented LLM guardrails and safety filters to ensure child-safe conversational AI responses",
        ],
        technologies: ["Python", "TensorFlow", "n8n", "LLMs", "FastAPI", "Prompt Engineering"],
    },
];

export const projects: Project[] = [
    {
        title: "Intelligent Document Analysis Agent",
        date: "Feb 2026 – Present",
        description: "Production-ready Multi-Agent RAG System orchestrating 3 specialized AI agents via CrewAI, reducing manual document review time by ~70%",
        technologies: ["CrewAI", "RAG", "OpenCV", "Tesseract", "ChromaDB", "FastAPI", "Docker"],
        github: "https://github.com/Karthikeyareddy183",
        highlights: [
            "Orchestrating 3 specialized AI agents via CrewAI for intelligent Q&A across 10,000+ page corpora",
            "Computer Vision + OCR pipeline using OpenCV & Tesseract achieving 92%+ table/chart detection accuracy",
            "HuggingFace embeddings with ChromaDB for sub-200ms semantic vector search",
            "FastAPI async backend with Streamlit UI, supporting GPT-4o / Claude with 99.9% uptime",
        ],
    },
    {
        title: "Conversational Voice AI Agent with LiveKit",
        date: "Jun 2025",
        description: "Production-ready voice AI system using LiveKit with <500ms end-to-end voice response latency, supporting real-time audio streaming",
        technologies: ["LiveKit", "Groq Whisper", "Meta Llama 3", "ElevenLabs", "Python"],
        github: "https://github.com/Karthikeyareddy183/conversational_AI_Agent",
        highlights: [
            "Integrated 3-model AI pipeline — Groq Whisper (STT), Meta Llama 3 (NLP), ElevenLabs (TTS)",
            "Achieved 95%+ transcription accuracy on diverse accents and audio conditions",
            "Voice Activity Detection (VAD) with noise reduction, reducing false triggers by ~80%",
        ],
    },
    {
        title: "BERT Named Entity Recognition (NER) System",
        date: "Mar 2025",
        description: "Fine-tuned BERT-base transformer on CoNLL-2003 benchmark achieving 94% F1-score across 4 entity classes",
        technologies: ["BERT", "Transformers", "Flask", "Docker", "PyTorch"],
        github: "https://github.com/Karthikeyareddy183/BERT-based-Named-Entity-Recognition-API",
        highlights: [
            "94% F1-score on CoNLL-2003, outperforming baselines by 3–5 F1 points",
            "Flask REST API with batch inference at <100ms average response time",
            "Containerized with Docker, reducing environment setup time by ~90%",
        ],
    },
];

export const skillCategories: SkillCategory[] = [
    {
        category: "Programming",
        skills: [
            { name: "Python", level: 95 },
            { name: "JavaScript", level: 75 },
            { name: "SQL", level: 80 },
        ],
    },
    {
        category: "AI / Machine Learning",
        skills: [
            { name: "PyTorch", level: 85 },
            { name: "TensorFlow", level: 85 },
            { name: "Scikit-learn", level: 80 },
            { name: "Transformers", level: 85 },
            { name: "BERT", level: 85 },
            { name: "LLMs", level: 90 },
            { name: "Prompt Engineering", level: 90 },
            { name: "Fine-tuning", level: 85 },
        ],
    },
    {
        category: "AI Systems",
        skills: [
            { name: "Agentic AI", level: 90 },
            { name: "LLM Orchestration", level: 85 },
            { name: "RAG", level: 90 },
            { name: "Vector Search", level: 85 },
            { name: "Embeddings", level: 85 },
            { name: "Conversational AI", level: 85 },
        ],
    },
    {
        category: "Backend Development",
        skills: [
            { name: "FastAPI", level: 90 },
            { name: "Flask", level: 85 },
            { name: "REST APIs", level: 90 },
            { name: "API Design", level: 85 },
            { name: "Redis", level: 75 },
        ],
    },
    {
        category: "AI Tools & Frameworks",
        skills: [
            { name: "LangChain", level: 85 },
            { name: "LangGraph", level: 80 },
            { name: "CrewAI", level: 85 },
            { name: "Hugging Face", level: 85 },
            { name: "Ollama", level: 80 },
            { name: "Groq", level: 80 },
            { name: "n8n", level: 85 },
        ],
    },
    {
        category: "MLOps & Infrastructure",
        skills: [
            { name: "Docker", level: 85 },
            { name: "CI/CD Pipelines", level: 80 },
            { name: "Model Deployment", level: 80 },
            { name: "GitHub Actions", level: 80 },
        ],
    },
    {
        category: "Cloud & Databases",
        skills: [
            { name: "Microsoft Azure", level: 75 },
            { name: "GCP", level: 70 },
            { name: "Supabase", level: 75 },
            { name: "Pinecone", level: 80 },
            { name: "Vector Databases", level: 85 },
        ],
    },
];

export const education: Education[] = [
    {
        degree: "B.E. Artificial Intelligence & Machine Learning",
        institution: "MVJ College of Engineering, Bangalore",
        location: "Bangalore",
        duration: "2021 – 2025",
        grade: "GPA: 7.96 / 10",
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
