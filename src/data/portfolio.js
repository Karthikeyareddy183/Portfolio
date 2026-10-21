/**
 * portfolio.js — content for the portfolio home page (#/), taken from the
 * resume. Projects reference system ids in projects.js, so each card reuses
 * that system's accent, icon, signature graphic and repository link.
 *
 * The phone number on the resume is deliberately not published here.
 */

export const PORTFOLIO = {
  email: 'karthikeyareddy183@gmail.com',
  headline: 'Python Backend Engineer',
  focus: 'FastAPI · REST APIs · AI-Assisted Development',
  tagline:
    'I build, debug and maintain production Python backends for AI-powered products, and I write the tests that prove they work.',

  about: [
    'I\'m a Python backend engineer in Bengaluru with 1.5 years of experience developing, debugging and maintaining production backend services for AI-powered products.',
    'At Cravv I built the Python backend for a real-time voice assistant as async services, then tracked down its performance bottlenecks with component-level profiling and structured logging, keeping end-to-end latency at about two seconds. Before that, at Craftech 360, I built REST APIs and Docker + GitHub Actions CI/CD pipelines that cut deployment time by 50% for services used by 100+ active users.',
    'I use AI tools like Claude Code and Codex every day, and I treat what they write like any other pull request: I review it, test it and verify it before it ships. My side projects follow the same habit, from a retry layer that refuses to repeat unsafe writes to a RAG system that cites the exact page behind every answer.',
  ],

  stats: [
    { value: '1.5 yrs', label: 'production Python backend' },
    { value: '100+', label: 'active users served' },
    { value: '50%', label: 'faster deployments (CI/CD)' },
    { value: '~2 s', label: 'end-to-end voice latency' },
  ],

  experience: [
    {
      company: 'Cravv',
      role: 'AI Engineer',
      period: 'May 2026 – Present',
      points: [
        'Built the Python backend for a real-time voice assistant (wake word, VAD, STT, LLM, TTS) as async services, reaching ~2 s average end-to-end response latency.',
        'Trained and integrated a custom wake-word model (OpenWakeWord) with 90% recall at ≤ 0.5 false positives per hour in noisy kitchen environments.',
        'Investigated and resolved performance bottlenecks in asynchronous Python services using component-level profiling and structured logging, improving response consistency at about 2 s average end-to-end latency.',
      ],
      tags: ['Python', 'asyncio', 'Profiling', 'Structured logging', 'OpenWakeWord', 'STT / TTS'],
    },
    {
      company: 'Craftech 360',
      role: 'Jr. Backend Developer',
      period: 'Oct 2025 – May 2026',
      points: [
        'Developed and deployed production conversational AI agents for Cheeko AI with Python and LiveKit Agents, enabling real-time, multi-turn voice interactions.',
        'Implemented prompt engineering, session-based conversation memory, function calling and multi-agent handoffs to keep context and run specialised workflows.',
        'Built REST APIs and CI/CD pipelines with Docker and GitHub Actions, cutting deployment time by 50% for services used by 100+ active users.',
      ],
      tags: ['Python', 'LiveKit Agents', 'Function calling', 'Multi-agent handoffs', 'Docker', 'GitHub Actions'],
    },
    {
      company: 'Craftech 360',
      role: 'AI Engineer Intern',
      period: 'Apr 2025 – Sep 2025',
      points: [
        'Contributed to the backend behind Cheeko AI: API development, prompt engineering and LLM function-calling pipelines.',
        'Fine-tuned text-to-speech models with transfer learning, improving voice quality by 25%.',
        'Built automated AI orchestration workflows with Python modules and the n8n automation platform.',
      ],
      tags: ['TTS fine-tuning', 'Transfer learning', 'Prompt engineering', 'n8n'],
    },
  ],

  // Order = order on the page. `id` matches a system in projects.js.
  projects: [
    {
      id: 'doc-agent',
      name: 'DocMind: Agentic RAG',
      oneLiner: 'Ask questions about your documents and get answers where every claim links to the exact page.',
      points: [
        'LangGraph agent with 97.9% answer accuracy and 97.7% correct page citations, declining 100% of unanswerable questions on a 47-question benchmark.',
        'Cut ingestion of a 588-page PDF from about 30 minutes to 22 seconds with Docling OCR, background embedding and a Postgres job queue.',
        'Tuned hybrid search (vector + keyword) by benchmarking 5 embedding models and 3 rerankers, and added a fact-check step before every answer.',
      ],
      metric: { value: '97.7%', label: 'correct source page cited' },
      tags: ['LangGraph', 'pgvector', 'FastAPI', 'Docling', 'Next.js', 'MCP'],
    },
    {
      id: 'voice-agent',
      name: 'TurnLab: Reliability Layer for Voice AI Agents',
      oneLiner: 'A monitoring layer for LiveKit voice agents that retries what is safe and blocks what is not.',
      points: [
        'Auto-retries safe tool failures and blocks retries on unsafe writes (bookings, refunds), preventing duplicate charges during live calls.',
        'Real-time FastAPI + React dashboard: per-call latency split by LLM vs. TTS, interruptions, retries and crashes, with reports in about a second.',
        'OpenTelemetry export to Langfuse and Grafana, speech-to-text WER scoring and regression tests, backed by 68 tests in GitHub Actions CI.',
      ],
      metric: { value: '0', label: 'unsafe writes retried' },
      tags: ['LiveKit Agents', 'Deepgram', 'Groq', 'FastAPI', 'React', 'OpenTelemetry'],
    },
    {
      id: 'bert-ner',
      name: 'BERT Named Entity Recognition',
      oneLiner: 'A fine-tuned BERT model served as a secure, tested API with a live highlighting demo.',
      points: [
        'Fine-tuned BERT on CoNLL-2003 to 94.8% F1 (94.7% precision, 94.9% recall) across 4 entity types.',
        'Deployed as a secure Flask REST API with authentication, input validation and thread-safe inference.',
        'Containerised with Docker, covered by unit and real-model integration tests, plus a Streamlit demo.',
      ],
      metric: { value: '94.8%', label: 'F1 on CoNLL-2003' },
      tags: ['PyTorch', 'Transformers', 'Flask', 'Streamlit', 'Docker', 'pytest'],
    },
    {
      id: 'openclaw-agents',
      name: 'OpenClaw Personal Agent Fleet',
      oneLiner: 'A self-hosted orchestrator agent that hands work to specialist agents I use every day.',
      points: [
        'Hub-and-spoke design: a main agent on Telegram delegates job searches and research questions to specialist sub-agents with their own workspaces and memory.',
        'A daily AI-news briefing where a script does all the I/O and a tool-less agent only ranks, with validation and a disclosed fallback if the model misbehaves.',
        'Sized for an 8 GB laptop with concurrency caps, a loopback-only gateway and per-bot channel bindings.',
      ],
      metric: { value: '6', label: 'agents, one orchestrator' },
      tags: ['OpenClaw', 'Multi-agent', 'Gemini Flash-Lite', 'Telegram', 'PowerShell'],
    },
  ],

  skills: [
    // Same groups and order as "Areas of Expertise" on the resume.
    { group: 'Python & backend', items: ['Python (asyncio, type hints, OOP)', 'FastAPI', 'Flask', 'REST API design', 'Webhooks', 'API authentication', 'Error handling & retries'] },
    { group: 'Databases', items: ['PostgreSQL', 'SQL', 'Supabase', 'Vector databases (Pinecone, ChromaDB)'] },
    { group: 'Testing & debugging', items: ['pytest', 'Unit & integration testing', 'Regression testing', 'Debugging & root-cause analysis', 'Logging', 'Code review'] },
    { group: 'AI-assisted development', items: ['Claude Code', 'Codex'] },
    { group: 'Other languages', items: ['JavaScript', 'Node.js'] },
    { group: 'DevOps & monitoring', items: ['Git', 'Docker', 'GitHub Actions', 'CI/CD', 'Kubernetes', 'AWS', 'Azure', 'OpenTelemetry', 'Grafana', 'Langfuse'] },
    { group: 'AI / LLM', items: ['LLM APIs', 'Function / tool calling', 'RAG', 'LangChain', 'LangGraph', 'LiveKit Agents', 'STT', 'TTS', 'PyTorch', 'Transformers'] },
  ],

  education: {
    degree: 'B.E. Artificial Intelligence & Machine Learning',
    school: 'MVJ College of Engineering, Bangalore',
    period: '2021 – 2025',
    note: 'GPA 7.96 / 10',
  },
};
