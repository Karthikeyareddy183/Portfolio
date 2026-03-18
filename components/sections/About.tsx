import FadeIn from "../animations/FadeIn";
import { personalInfo, achievements, languages, SECTION_IDS } from "@/lib/constants";
import { Bot, Database, Cloud, BrainCircuit } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const highlights = [
    {
        icon: "brain",
        title: "LLM Systems",
        description: "Multi-agent RAG pipelines, prompt engineering, and fine-tuning transformers",
    },
    {
        icon: "bot",
        title: "Agentic AI",
        description: "Orchestrating AI agents with CrewAI, LangChain, and LangGraph",
    },
    {
        icon: "database",
        title: "AI Backend",
        description: "Async FastAPI backends with sub-200ms latency and vector search",
    },
    {
        icon: "cloud",
        title: "MLOps & Cloud",
        description: "Docker, CI/CD, model deployment on Azure and GCP",
    },
];

const iconMap: Record<string, React.ReactNode> = {
    brain: <BrainCircuit className="w-6 h-6" />,
    bot: <Bot className="w-6 h-6" />,
    database: <Database className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
};

export default function About() {
    return (
        <section id={SECTION_IDS.about} className="section-padding bg-white dark:bg-slate-900">
            <div className="container-custom">
                <SectionHeader
                    title="About"
                    highlight="Me"
                    subtitle="Specialized in building production AI systems that solve real-world problems"
                />

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Bio */}
                    <FadeIn delay={0.2}>
                        <div className="space-y-6">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                {personalInfo.bio}
                            </p>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                Currently at <span className="text-primary-600 dark:text-primary-400 font-semibold">Craftech 360</span> as a Jr. Backend Developer,
                                leading backend development for Cheeko AI — building scalable Python services and RESTful APIs supporting 100+ active users.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {languages.map((lang, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm glass dark:glass-dark rounded-full"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Highlights Grid */}
                    <FadeIn delay={0.4}>
                        <div className="grid grid-cols-2 gap-4">
                            {highlights.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-6 glass dark:glass-dark rounded-xl hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="text-primary-600 dark:text-primary-400 mb-3 group-hover:scale-110 transition-transform">
                                        {iconMap[item.icon]}
                                    </div>
                                    <h3 className="font-heading font-semibold mb-2 text-slate-900 dark:text-slate-100">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Achievements */}
                <FadeIn delay={0.6}>
                    <div className="glass dark:glass-dark rounded-2xl p-8">
                        <h3 className="text-2xl font-heading font-bold mb-6 text-center">
                            Leadership & <span className="text-gradient">Achievements</span>
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-all"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mt-2 flex-shrink-0" />
                                    <p className="text-slate-700 dark:text-slate-300">{achievement}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
