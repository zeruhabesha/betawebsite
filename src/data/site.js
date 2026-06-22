import { img } from "./media.js";

/* ---------- Company / contact ---------- */
export const company = {
  name: "Beta Tech Hub",
  tagline: "Your Trusted Shield in the Digital Era",
  founded: 2023,
  email: "info@betatechhub.com",
  phone: "+251 90 952 3769",
  phoneHref: "+251909523769",
  site: "https://www.betatechhub.com",
  address:
    "Garamuleta Luxury Apartment, Wollo Sefer, Bole, Addis Ababa, Ethiopia",
};

/* ---------- Social links (edit hrefs to your real profiles) ---------- */
export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/betatechhub", icon: "linkedin" },
  { label: "X", href: "https://x.com/betatechhub", icon: "x" },
  { label: "GitHub", href: "https://github.com/betatechhub", icon: "github" },
];

/* ---------- Hero stats ---------- */
export const stats = [
  { num: 2023, label: "Founded" },
  { num: 3, suffix: "+", label: "Integrated Engines" },
  { num: 24, suffix: "/7", label: "Threat Monitoring" },
  { num: 100, suffix: "%", label: "Centralized Visibility" },
];

/* ---------- Impact metrics (Home band) ---------- */
export const impact = [
  { num: 12, suffix: "M+", label: "Security events analyzed daily" },
  { num: 15, suffix: " min", label: "Median time to detect" },
  { num: 40, suffix: "%", label: "Faster incident response" },
  { num: 50, suffix: "+", label: "Organizations protected" },
];

/* ---------- About: detect / investigate / respond / comply ---------- */
export const pillars = [
  { icon: "🛡️", title: "Detect", text: "Spot known and unknown threats with ML-driven analytics." },
  { icon: "🔎", title: "Investigate", text: "Deep forensic visibility across your entire estate." },
  { icon: "⚡", title: "Respond", text: "Automated containment to stop breaches at the source." },
  { icon: "📊", title: "Comply", text: "Turn regulatory pressure into a strategic advantage." },
];

/* ---------- Platform features ---------- */
export const platformFeatures = [
  { icon: "🌐", title: "End-to-end protection", text: "Unified visibility across endpoints, networks, cloud infrastructure, and applications." },
  { icon: "🧠", title: "ML-based detection", text: "Behavior analytics and telemetry detect both known and unknown threats in real time." },
  { icon: "📈", title: "Built for scale", text: "Multi-tenancy, RBAC, and automated deployment for enterprises and MSSPs." },
  { icon: "⚡", title: "Faster response", text: "Detect, investigate, and respond faster with centralized, continuous protection." },
];

/* ---------- Products ---------- */
export const products = [
  {
    id: "edr",
    name: "Advanced EDR",
    image: img.edr,
    tagline: "Endpoint security from a reactive necessity into a proactive advantage.",
    intro:
      "Traditional antivirus is no longer sufficient. Advanced EDR empowers teams with deep endpoint visibility and rapid threat response — investigating and containing attacks with speed and precision through behavioral analysis and machine learning.",
    chips: ["Behavioral Analysis", "Digital Forensics", "Automated Response", "Patch Management"],
    features: [
      { h: "ML-Based Threat Detection", p: "Identifies behavioral anomalies and emerging attack patterns." },
      { h: "Multi-Tenancy & RBAC", p: "Secure endpoint monitoring across multiple environments." },
      { h: "Automated Deployment", p: "Simplifies large-scale agent deployment and management." },
      { h: "Update & Patch Management", p: "Continuous updates maintain endpoint stability." },
      { h: "Threat Detection & Monitoring", p: "Continuously analyzes endpoint telemetry for incidents." },
      { h: "Visibility & Forensics", p: "Deep telemetry for investigation and forensic analysis." },
    ],
  },
  {
    id: "ids",
    name: "Advanced IDS/IPS",
    image: img.ids,
    tagline: "A highly intelligent, automated gatekeeper for your network.",
    intro:
      "Combining the strengths of Suricata and Zeek, our IDS/IPS delivers full network visibility, real-time threat detection, and smart traffic analysis across on-premise, cloud, and hybrid environments — defending against known exploits and zero-day anomalies.",
    chips: ["Suricata + Zeek", "Real-Time Prevention", "Protocol Analysis", "Network Forensics"],
    features: [
      { h: "Real-Time Detection & Prevention", p: "Monitors traffic to detect and block malicious activity instantly." },
      { h: "Deep Protocol Analysis", p: "Detailed visibility into network behavior." },
      { h: "ML-Based Detection", p: "Catches patterns traditional signatures miss." },
      { h: "Multi-Tenancy & RBAC", p: "Secure monitoring across environments or customers." },
      { h: "Network Forensics", p: "Enables deep investigation of network incidents." },
      { h: "Automated Infrastructure", p: "Simplifies deployment and scaling of sensors." },
    ],
  },
  {
    id: "siem",
    name: "Next-Gen SIEM",
    image: img.siem,
    tagline: "The central nervous system of your Security Operations Center.",
    intro:
      "Integrating with Wazuh, our Next-Gen SIEM delivers advanced threat detection, centralized monitoring, and automated response across endpoints, cloud, and containerized infrastructure — combining log analytics, ML detection, and UEBA to identify attacks in real time.",
    chips: ["Wazuh Integration", "UEBA", "Case Management", "Agentic AI"],
    features: [
      { h: "Threat Detection & Monitoring", p: "Analyzes logs and telemetry to detect incidents." },
      { h: "ML-Based Detection", p: "Improves accuracy and uncovers unseen threats." },
      { h: "UEBA", p: "Detects compromised accounts and insider threats." },
      { h: "Multi-Tenancy & RBAC", p: "Built for enterprises and MSSPs." },
      { h: "Incident Response", p: "Rapid response with case management and ticketing." },
      { h: "Agentic AI", p: "An AI chatbot simplifies interaction with the system." },
    ],
  },
];

/* ---------- GRC ---------- */
export const grcServices = [
  { title: "Governance Services", text: "Establish foundational cybersecurity and information governance structures aligned with leadership vision." },
  { title: "Risk Management", text: "Identify, assess, and manage cybersecurity risks that impact operations and information assets." },
  { title: "Compliance & Assurance", text: "Meet regulatory and industry requirements with structured, continuously-adhered programs." },
  { title: "Integrated GRC Platform", text: "Consolidate governance, risk, and compliance into a single technological ecosystem." },
  { title: "Training & Capacity", text: "Up-skill internal teams — from CISO leadership to ISO 27001 implementation." },
  { title: "Continuous Assurance", text: "Ongoing monitoring that sustains cybersecurity maturity over time." },
];

export const grcSteps = [
  "Discovery & Alignment",
  "Assessment & Gap Identification",
  "Design & Planning",
  "Implementation & Enablement",
  "Monitoring & Continuous Assurance",
];

export const sectors = ["Public", "Finance", "Defense", "Telecom", "Critical Infrastructure"];

/* ---------- Why choose us (differentiators) ---------- */
export const differentiators = [
  { icon: "🤖", title: "AI at the core", text: "Autonomous ML engines and agentic AI triage threats faster than any human team alone." },
  { icon: "🧩", title: "One unified platform", text: "SIEM, EDR, and IDS/IPS share a single data fabric — no swivel-chair between tools." },
  { icon: "🏢", title: "Built for MSSPs", text: "Multi-tenancy and RBAC let you secure many environments from one console." },
  { icon: "🌍", title: "Local expertise, global standards", text: "Addis-based team delivering ISO 27001-grade programs across sectors." },
];

/* ---------- Technology integrations ---------- */
export const integrations = [
  { name: "Wazuh", logo: "/logos/wazuh.svg" },
  { name: "Suricata", logo: "/logos/suricata.svg" },
  { name: "Zeek", logo: "/logos/zeek.svg" },
  { name: "ELK Stack", logo: "/logos/elk.svg" },
  { name: "MITRE ATT&CK", logo: "/logos/mitre.svg" },
  { name: "ISO 27001", logo: "/logos/iso27001.svg" },
  { name: "OpenSearch", logo: "/logos/opensearch.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
];

/* ---------- Testimonials ---------- */
export const testimonials = [
  {
    quote:
      "Beta Tech Hub gave us visibility we never had before. We now catch incidents in minutes, not days.",
    name: "Head of IT Security",
    role: "Financial Services",
  },
  {
    quote:
      "Their phased GRC approach turned a daunting ISO 27001 effort into a clear, manageable roadmap.",
    name: "Chief Information Officer",
    role: "Public Sector",
  },
  {
    quote:
      "The unified platform replaced three disconnected tools. Our SOC finally works as one.",
    name: "SOC Manager",
    role: "Telecom",
  },
];

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: "How quickly can you deploy?",
    a: "Our automated deployment tooling lets most environments onboard agents and sensors within days, not weeks — across on-premise, cloud, and hybrid setups.",
  },
  {
    q: "Do you support multi-tenant / MSSP setups?",
    a: "Yes. Multi-tenancy and role-based access control are built in, so you can securely manage many customers or business units from a single console.",
  },
  {
    q: "Which technologies do you integrate with?",
    a: "We build on proven open standards — Wazuh, Suricata, Zeek, the ELK/OpenSearch stack, and the MITRE ATT&CK framework, among others.",
  },
  {
    q: "Can you help us meet compliance requirements?",
    a: "Absolutely. Our GRC services align your security posture with regulatory and industry frameworks like ISO 27001 through a structured, continuously-assured program.",
  },
];

/* ---------- Team (About page) ---------- */
const portrait = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&h=800&q=80`;
export const team = [
  {
    name: "Selam Bekele",
    role: "Founder & CEO",
    bio: "Sets the vision for accessible, enterprise-grade security across Africa and beyond.",
    img: portrait("1573496359142-b8d87734a5a2"),
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Daniel Tesfaye",
    role: "Chief Technology Officer",
    bio: "Architects the unified data fabric behind our SIEM, EDR, and IDS/IPS engines.",
    img: portrait("1500648767791-00dcc994a43e"),
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Hana Girma",
    role: "Head of Security Operations",
    bio: "Leads the 24/7 SOC — turning telemetry into fast, confident incident response.",
    img: portrait("1438761681033-6461ffad8d80"),
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Yonas Alemu",
    role: "Lead Security Engineer",
    bio: "Builds the ML detection pipelines that catch what signatures miss.",
    img: portrait("1507003211169-0a1dd7228f2d"),
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Marta Haile",
    role: "GRC Lead",
    bio: "Guides clients from discovery to ISO 27001 certification and continuous assurance.",
    img: portrait("1487412720507-e7ab37603c6f"),
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
];

/* ---------- What we stand for (About) ---------- */
export const values = [
  { icon: "🎯", title: "Outcomes over noise", text: "We measure success by threats stopped and audits passed — not dashboards lit up." },
  { icon: "🤝", title: "Partnership", text: "We act as an extension of your team, transferring knowledge at every step." },
  { icon: "🔬", title: "Engineering rigor", text: "Open standards, reproducible deployments, and detections we can defend." },
  { icon: "🛡️", title: "Trust by default", text: "Security and privacy are built into everything we ship — never bolted on." },
];

/* ---------- How we get you protected (Home process) ---------- */
export const homeProcess = [
  { n: "01", title: "Assess", text: "We map your environment, assets, and risk to find the gaps that matter most." },
  { n: "02", title: "Deploy", text: "Automated rollout of agents and sensors across on-prem, cloud, and hybrid — in days." },
  { n: "03", title: "Monitor", text: "Our SOC and AI engines watch every layer around the clock, correlating telemetry in real time." },
  { n: "04", title: "Respond", text: "Guided, automated containment stops incidents at the source and keeps you compliant." },
];

/* ---------- Flexible deployment (Platform) ---------- */
export const deployments = [
  { icon: "🏢", title: "On-premise", text: "Keep data inside your perimeter with full-control, self-hosted deployments." },
  { icon: "☁️", title: "Cloud", text: "Elastic, managed protection that scales with your cloud workloads." },
  { icon: "🔀", title: "Hybrid", text: "One pane of glass across on-prem and multi-cloud — no blind spots." },
];

/* ---------- Compliance frameworks (GRC) ---------- */
export const frameworks = [
  "ISO 27001", "SOC 2", "NIST CSF", "GDPR", "PCI DSS", "HIPAA", "ISO 22301", "CIS Controls",
];

/* ---------- What happens next (Contact) ---------- */
export const contactSteps = [
  { n: "01", title: "Discovery call", text: "A 30-minute conversation to understand your environment and priorities." },
  { n: "02", title: "Tailored proposal", text: "We map the right mix of SIEM, EDR, IDS/IPS, and GRC to your needs." },
  { n: "03", title: "Onboarding", text: "Automated deployment gets you protected and visible within days." },
];

/* ---------- Navigation ---------- */
export const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/platform", label: "Platform" },
  { to: "/products", label: "Products" },
  { to: "/grc", label: "GRC Services" },
];
