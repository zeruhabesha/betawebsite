import { company } from "./site.js";

/* ============================================================
   Built-in assistant knowledge base.
   Intent matching is keyword-scored (see Chatbot.jsx). Answers are
   intentionally concise and link to the relevant page. Swap getReply()
   for a real LLM/API call later without touching the UI.
   ============================================================ */

export const greeting = {
  text:
    "👋 Hi, I'm Beta — the Beta Tech Hub assistant. Ask me about our platform, products, GRC services, pricing, or how to get started.",
  chips: ["What do you offer?", "Pricing", "GRC & compliance", "Talk to an expert"],
};

export const fallback = {
  text:
    "I didn't quite catch that. I can help with our products (SIEM, EDR, IDS/IPS), the platform, GRC & compliance, pricing, deployment, and getting in touch — or I can connect you with our team.",
  chips: ["What do you offer?", "Pricing", "Talk to an expert"],
};

export const intents = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings", "howdy"],
    answer: "Hello! 👋 How can I help you secure your organization today?",
    chips: ["What do you offer?", "Pricing", "GRC & compliance"],
  },
  {
    id: "products",
    keywords: ["product", "products", "engine", "engines", "solution", "solutions", "offer", "offering", "catalog", "what do you do", "services"],
    answer:
      "We run three engines on one unified platform: Next-Gen SIEM (centralized detection & response), Advanced EDR (endpoint protection), and Advanced IDS/IPS (network threat detection) — all sharing a single data fabric.",
    link: { to: "/products", label: "Explore products" },
    chips: ["Tell me about SIEM", "Pricing", "How does it work?"],
  },
  {
    id: "siem",
    keywords: ["siem", "log", "logs", "correlation", "ueba", "case management", "wazuh"],
    answer:
      "Our Next-Gen SIEM (built on Wazuh) centralizes detection and response across endpoints, cloud, and containers — combining log analytics, ML detection, UEBA, and case management to catch attacks in real time.",
    link: { to: "/products", label: "See Next-Gen SIEM" },
    chips: ["Advanced EDR", "Advanced IDS/IPS", "Talk to an expert"],
  },
  {
    id: "edr",
    keywords: ["edr", "endpoint", "endpoints", "antivirus", "device", "devices", "laptop", "forensics"],
    answer:
      "Advanced EDR gives deep endpoint visibility with ML-based behavioral detection and automated containment — investigating and stopping attacks with speed and precision, well beyond traditional antivirus.",
    link: { to: "/products", label: "See Advanced EDR" },
    chips: ["Next-Gen SIEM", "Advanced IDS/IPS", "Pricing"],
  },
  {
    id: "ids",
    keywords: ["ids", "ips", "network", "traffic", "suricata", "zeek", "intrusion", "packet"],
    answer:
      "Advanced IDS/IPS (powered by Suricata + Zeek) delivers full network visibility, real-time threat detection and prevention, and deep protocol analysis across on-prem, cloud, and hybrid environments.",
    link: { to: "/products", label: "See Advanced IDS/IPS" },
    chips: ["Next-Gen SIEM", "Deployment options", "Talk to an expert"],
  },
  {
    id: "platform",
    keywords: ["platform", "how does it work", "how it works", "unified", "data fabric", "capabilities", "overview"],
    answer:
      "One platform, three engines, a single data fabric — so detection, investigation, and response stay in sync instead of living in disconnected tools. ML detection and agentic AI surface and triage what matters.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What do you defend against?", "Deployment options", "Pricing"],
  },
  {
    id: "grc",
    keywords: ["grc", "compliance", "governance", "risk", "iso", "iso 27001", "audit", "regulation", "regulatory", "framework", "soc 2", "gdpr", "hipaa", "pci"],
    answer:
      "Our GRC services turn compliance into a strategic advantage — aligning your security posture with frameworks like ISO 27001, SOC 2, NIST, GDPR, PCI DSS, and HIPAA through a structured, continuously-assured program.",
    link: { to: "/grc", label: "Explore GRC services" },
    chips: ["Pricing", "Talk to an expert", "What frameworks?"],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "quote", "plan", "plans", "how much", "budget", "tier", "subscription"],
    answer:
      "Pricing is tailored to your environment, data volume, and the engines you need — there are no fixed per-seat tiers. We start with a short discovery call and map the right mix of SIEM, EDR, IDS/IPS, and GRC.",
    link: { to: "/contact", label: "Get a quote" },
    chips: ["Book a consultation", "What do you offer?", "GRC & compliance"],
  },
  {
    id: "contact",
    keywords: ["contact", "talk", "expert", "demo", "consultation", "call", "reach", "email", "phone", "get started", "book", "sales", "human"],
    answer: `Happy to connect you. Reach our team at ${company.email} or ${company.phone}, or send a message and we'll map the right solution for your environment.`,
    link: { to: "/contact", label: "Contact us" },
    chips: ["Pricing", "What do you offer?"],
  },
  {
    id: "deployment",
    keywords: ["deploy", "deployment", "cloud", "on-prem", "on prem", "on-premise", "hybrid", "mssp", "multi-tenant", "multi tenant", "rbac", "scale", "install"],
    answer:
      "Deploy on-premise, in the cloud, or hybrid — your choice of footprint, same unified protection. Multi-tenancy, RBAC, and automated deployment make it ideal for enterprises and MSSPs, with most environments live in days.",
    link: { to: "/platform", label: "See deployment options" },
    chips: ["Pricing", "How does it work?", "Talk to an expert"],
  },
  {
    id: "threats",
    keywords: ["threat", "threats", "ransomware", "phishing", "malware", "zero-day", "zero day", "ddos", "insider", "attack", "attacks", "protect against", "supply chain", "bec"],
    answer:
      "We defend against ransomware, phishing & BEC, insider threats, zero-day exploits, DDoS and network abuse, and supply-chain attacks — combining ML/behavioral detection with 24/7 monitoring and automated response.",
    link: { to: "/platform", label: "What we defend against" },
    chips: ["How does it work?", "Talk to an expert", "Pricing"],
  },
  {
    id: "soc",
    keywords: ["soc", "monitoring", "24/7", "24 7", "mdr", "managed", "detection and response", "threat hunting", "analyst", "around the clock"],
    answer:
      "Our SOC and AI engines monitor your environment around the clock — triaging alerts and guiding containment so real threats are handled fast, day or night, while the noise is filtered out.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What do you defend against?", "Pricing", "Talk to an expert"],
  },
  {
    id: "integrations",
    keywords: ["integration", "integrations", "integrate", "technology", "technologies", "open source", "open standards", "stack", "elk", "opensearch", "docker", "mitre"],
    answer:
      "We build on proven open standards — Wazuh, Suricata, Zeek, the ELK/OpenSearch stack, the MITRE ATT&CK framework, Docker, and more — so you're never locked into a black box.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What do you offer?", "Talk to an expert"],
  },
  {
    id: "about",
    keywords: ["about", "company", "who are you", "who is", "where", "location", "founded", "team", "addis", "ethiopia"],
    answer: `${company.name} is a premier cybersecurity firm founded in ${company.founded}, based in Addis Ababa, Ethiopia — delivering AI-powered security and GRC to organizations of every size.`,
    link: { to: "/about", label: "About us" },
    chips: ["What do you offer?", "Talk to an expert"],
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate", "cheers", "great", "awesome", "perfect"],
    answer: "You're welcome! 🙌 Anything else I can help you with?",
    chips: ["Pricing", "Talk to an expert", "What do you offer?"],
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "later", "that's all", "thats all", "no thanks"],
    answer: "Thanks for stopping by! Stay secure — and reach out anytime you're ready. 🛡️",
    chips: ["Talk to an expert"],
  },
];

/* Keyword-scored intent match. Longer keywords carry more weight so a
   specific topic (e.g. "EDR") beats a generic one (e.g. "products"). */
export function getReply(query) {
  const q = ` ${query.toLowerCase().replace(/[^a-z0-9\s/-]/g, " ")} `;
  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(` ${kw} `) || q.includes(`${kw}`)) {
        score += kw.length > 4 ? 2.2 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore > 0 ? best : fallback;
}
