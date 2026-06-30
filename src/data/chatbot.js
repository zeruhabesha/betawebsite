import { company } from "./site.js";

/* ============================================================
   Built-in assistant knowledge base.
   Intent matching is keyword-scored (see Chatbot.jsx). Answers are
   intentionally concise and link to the relevant page. Swap getReply()
   for a real LLM/API call later without touching the UI.
   ============================================================ */

export const greeting = {
  text:
    "👋 Hi, I'm Beta — the Beta Tech Hub assistant. Ask me about our platform, products, services, GRC, pricing, or how to get started.",
  chips: ["What do you offer?", "Pricing", "GRC & compliance", "Talk to an expert"],
};

export const fallback = {
  text:
    "I didn't quite catch that. I can help with our products (SIEM, EDR, IDS/IPS), the platform, services, GRC & compliance, pricing, deployment, and getting in touch — or I can connect you with our team.",
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
    link: { to: "/grc", label: "Explore services" },
    chips: ["Penetration testing", "Training", "Pricing"],
  },
  {
    id: "siem",
    keywords: ["siem", "log", "logs", "correlation", "ueba", "case management", "wazuh", "what is siem", "siem mean", "siem stand"],
    answer:
      "SIEM stands for Security Information and Event Management — it collects and correlates logs and telemetry from across your estate to surface attacks a single tool would miss. Our Next-Gen SIEM (built on Wazuh) adds ML detection, UEBA (user & entity behavior analytics that flags abnormal accounts), and case management for real-time response.",
    link: { to: "/products", label: "See Next-Gen SIEM" },
    chips: ["Advanced EDR", "Advanced IDS/IPS", "Talk to an expert"],
  },
  {
    id: "edr",
    keywords: ["edr", "endpoint", "endpoints", "antivirus", "device", "devices", "laptop", "forensics", "what is edr", "edr mean", "edr stand"],
    answer:
      "EDR stands for Endpoint Detection and Response. Where traditional antivirus only blocks known signatures, EDR continuously watches how endpoints behave to detect, investigate, and automatically contain novel attacks. Our Advanced EDR is ML-driven with deep forensics for fast, precise response.",
    link: { to: "/products", label: "See Advanced EDR" },
    chips: ["Next-Gen SIEM", "Advanced IDS/IPS", "Pricing"],
  },
  {
    id: "ids",
    keywords: ["ids", "ips", "network", "traffic", "suricata", "zeek", "intrusion", "packet", "what is ids", "ids mean", "ids stand"],
    answer:
      "IDS/IPS stands for Intrusion Detection / Prevention System — it inspects network traffic to spot malicious activity (IDS) and actively block it inline (IPS). Our Advanced IDS/IPS pairs Suricata + Zeek signatures with deep protocol and behavioral analysis across on-prem, cloud, and hybrid networks.",
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
    keywords: ["grc", "compliance", "governance", "risk", "iso", "iso 27001", "audit", "regulation", "regulatory", "framework", "frameworks", "soc 2", "gdpr", "hipaa", "pci", "what is grc", "grc mean", "grc stand"],
    answer:
      "GRC stands for Governance, Risk & Compliance — the discipline of aligning security with business goals (governance), identifying and managing what could go wrong (risk), and meeting legal & industry obligations like ISO 27001, SOC 2, NIST, GDPR, PCI DSS, and HIPAA (compliance). We run it as a structured, continuously-assured program — not a one-off audit — so it becomes a competitive advantage.",
    link: { to: "/grc", label: "Explore services" },
    chips: ["What is ISO 27001?", "Pricing", "Talk to an expert"],
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
    keywords: ["soc", "monitoring", "24/7", "24 7", "mdr", "managed", "detection and response", "threat hunting", "analyst", "around the clock", "what is soc", "what is mdr", "security operations"],
    answer:
      "A SOC (Security Operations Center) is the people and tooling that monitor and respond to threats around the clock. Ours pairs human analysts with AI engines for 24/7 detection, triage, and guided containment — effectively Managed Detection & Response (MDR), so real threats are handled fast while the noise is filtered out.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What do you defend against?", "Pricing", "Talk to an expert"],
  },
  {
    id: "integrations",
    keywords: ["integration", "integrations", "integrate", "technology", "technologies", "open source", "open standards", "stack", "elk", "opensearch", "docker"],
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
    id: "iso27001",
    keywords: ["iso 27001", "27001", "what is iso", "iso mean", "iso certification", "isms"],
    answer:
      "ISO 27001 is the international standard for an Information Security Management System (ISMS) — a documented, risk-based framework of policies and controls for protecting information. Certification proves to customers and regulators that security is managed systematically. Our GRC program guides you from gap assessment to certification and continuous assurance.",
    link: { to: "/grc", label: "Explore services" },
    chips: ["What is GRC?", "What frameworks?", "Talk to an expert"],
  },
  {
    id: "mitre",
    keywords: ["mitre", "att ck", "attack framework", "mitre framework", "tactics techniques", "kill chain"],
    answer:
      "MITRE ATT&CK is a free, globally-used knowledge base of the real tactics and techniques attackers use across the kill chain. We map our detections to ATT&CK so you can see exactly which adversary behaviors are covered and where your gaps are — turning alerts into context.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What do you defend against?", "Threat intelligence", "Talk to an expert"],
  },
  {
    id: "zero-trust",
    keywords: ["zero trust", "zero-trust", "zerotrust", "least privilege", "never trust"],
    answer:
      "Zero trust is a model that never assumes trust by default — every user, device, and request is continuously verified, with least-privilege access, rather than trusting anything just because it's 'inside' the network. Our unified visibility, RBAC, and behavioral detection give you the telemetry and controls a zero-trust approach depends on.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What is UEBA?", "Deployment options", "Talk to an expert"],
  },
  {
    id: "data-breach",
    keywords: ["data breach", "breach", "breached", "leak", "leaked", "exfiltration", "stolen data", "incident"],
    answer:
      "A data breach is unauthorized access to — or theft of — sensitive data, often after an attacker dwells in a network undetected. The whole point of our platform is to shrink that dwell time: detect intrusions early and contain them automatically before they become a breach, then respond fast if one occurs.",
    link: { to: "/platform", label: "What we defend against" },
    chips: ["What is ransomware?", "How does it work?", "Talk to an expert"],
  },
  {
    id: "threat-intel",
    keywords: ["threat intelligence", "threat intel", "intelligence", "ioc", "indicators", "ttps", "threat feed"],
    answer:
      "Threat intelligence is curated knowledge about attackers — their tactics, techniques, infrastructure, and indicators of compromise (IOCs). We feed it into detection so you catch known campaigns quickly, and combine it with ML/behavioral analytics to catch the zero-days that intel hasn't seen yet.",
    link: { to: "/platform", label: "See the platform" },
    chips: ["What is MITRE ATT&CK?", "What do you defend against?", "Talk to an expert"],
  },
  {
    id: "vulnerability",
    keywords: ["vulnerability", "vulnerabilities", "cve", "patch", "patching", "exposure", "weakness", "exploit"],
    answer:
      "A vulnerability is a weakness — a misconfiguration, unpatched flaw, or exposure — that an attacker can exploit. Our platform surfaces risky activity around those weaknesses and provides patch/update visibility, while our GRC program helps you prioritize and remediate the ones that matter most to your risk.",
    link: { to: "/grc", label: "Explore services" },
    chips: ["What is a data breach?", "Pricing", "Talk to an expert"],
  },
  {
    id: "difference",
    keywords: ["difference", "differ", "between", "versus", "vs", "compare", "comparison", "which one"],
    answer:
      "Good question. EDR protects endpoints, IDS/IPS watches the network, and SIEM correlates the signals from both — plus cloud and apps — into one picture. On our platform all three share a single data fabric, so detection, investigation, and response stay in sync instead of living in separate, disconnected tools.",
    link: { to: "/products", label: "Explore products" },
    chips: ["What is SIEM?", "What is EDR?", "How does it work?"],
  },
  {
    id: "why",
    keywords: ["why", "why do i need", "why cybersecurity", "do i need", "benefit", "benefits", "value", "worth it", "matter"],
    answer:
      "Because attacks now move faster than manual defenses, and a single incident can mean downtime, regulatory fines, and lost customer trust. We give organizations of every size enterprise-grade, AI-powered protection — detection, response, and compliance — without enterprise complexity or cost.",
    link: { to: "/about", label: "Why Beta Tech Hub" },
    chips: ["What do you offer?", "Pricing", "Talk to an expert"],
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
