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

/* ---------- Services ---------- */
export const grcServices = [
  {
    title: "Cybersecurity Consultancy",
    text: "Security strategy, architecture review, roadmap planning, and executive advisory for teams building mature defense programs.",
  },
  {
    title: "Penetration Testing",
    text: "Controlled testing for web apps, networks, cloud assets, and exposed services with clear findings, risk ratings, and remediation guidance.",
  },
  {
    title: "Security Training",
    text: "Practical awareness and technical training for employees, IT teams, analysts, and leaders responsible for cyber risk.",
  },
  {
    title: "GRC Services",
    text: "Governance, risk, compliance, ISO 27001 readiness, policy development, audit preparation, and continuous assurance programs.",
  },
  {
    title: "Managed Detection & Response",
    text: "24/7 monitoring, alert triage, threat hunting, and guided incident response across endpoints, networks, cloud, and logs.",
  },
  {
    title: "Security Assessment & Hardening",
    text: "Baseline reviews, vulnerability assessment, configuration hardening, and prioritized remediation plans for critical infrastructure.",
  },
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

/* ---------- Partners ---------- */
export const partners = [
  { name: "", logo: "/logos/sky.jpg" },
  { name: "", logo: "/logos/TBN.png" },
  { name: "", logo: "/logos/asian.png" },
  { name: "", logo: "/logos/halges.png" },
  { name: "", logo: "/logos/IW.png" },
  { name: "", logo: "/logos/legacy.png" },
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
    a: "Absolutely. Our services align your security posture with regulatory and industry frameworks like ISO 27001 through a structured, continuously-assured program.",
  },
  {
    q: "What's the difference between SIEM, EDR, and IDS/IPS?",
    a: "EDR protects endpoints, IDS/IPS watches network traffic, and the SIEM correlates signals from both — plus cloud and apps — into one picture. On our platform they share a single data fabric, so detection, investigation, and response stay in sync instead of living in separate tools.",
  },
  {
    q: "Do you offer 24/7 managed detection and response?",
    a: "Yes. Our SOC and AI engines monitor your environment around the clock, triaging alerts and guiding containment so real threats are handled fast — day or night — while the noise is filtered out.",
  },
  {
    q: "How is the platform priced?",
    a: "Pricing is tailored to your environment, data volume, and the engines you need. We start with a short discovery call and map the right mix of SIEM, EDR, IDS/IPS, and GRC — there are no public per-seat tiers because security needs vary widely.",
  },

];

/* ---------- Team (About page) ---------- */
const portrait = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&h=800&q=80`;
export const team = [
  {
    name: "Seid Oumer",
    role: "Founder",
    bio: "Seid Umer is the founder of beta tech hub, known for his innovative leadership. He built the company from the ground up, making it a leader in the market",
    img: "/teams/seid.png",
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Girma Moges",
    role: "Co-Founder",
    bio: "Girma Moges, Co-founder of BETA TECH HUB, is recognized for his visionary leadership. He established the company from scratch, transforming it into a prominent player in the industry",
    img: "/teams/girma.png",
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Anteneh Wondafrash",
    role: "Co-Founder",
    bio: "Anteneh Wondafrash, Co-founder of BETA TECH HUB, is celebrated for his forward-thinking leadership. He developed the company from its inception, establishing it as a key leader in the industry",
    img: "/teams/anteneh.png",
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Selamawit Zemene",
    role: "president",
    bio: "Selamawit Zemene leads our tech innovations, bringing over 15 years of experience in AI, IoT, and blockchain to drive forward-thinking solutions.",
    img: "/teams/selam.png",
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
  {
    name: "Michael Yimer",
    role: "CTO",
    bio: "Michael ensures robust security for our clients, leveraging his decade-long expertise in cybersecurity to protect against evolving threats and vulnerabilities",
    img: "/teams/micky.png",
    linkedin: "https://www.linkedin.com/company/betatechhub",
  },
];

export const advisers = [
  {
    name: "Akash Bhavsar",
    role: "Global Adviser",
    // bio: "Former CISO with 20+ years guiding international cybersecurity strategy and compliance.",
    img: "/teams/akash.png",
    // linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Jean Maurice",
    role: "Global Adviser",
    // bio: "Expert in cross-border data privacy and risk management frameworks.",
    img: "/teams/jean.png",
    // linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Nelson Korish",
    role: "Global Adviser",
    // bio: "Specialist in cyber-threat intelligence and AI-driven defense mechanisms.",
    img: "/teams/nilson.png",
    // linkedin: "https://www.linkedin.com/",
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

/* ---------- Threat coverage (Platform) ---------- */
export const threats = [
  { icon: "🔒", title: "Ransomware", text: "Detect and contain encryption attacks before they spread across your estate." },
  { icon: "🎣", title: "Phishing & BEC", text: "Stop credential theft and business-email compromise at the identity layer." },
  { icon: "🕵️", title: "Insider threats", text: "UEBA flags compromised accounts and malicious insiders by behavior, not rules." },
  { icon: "💥", title: "Zero-day exploits", text: "ML and anomaly detection catch novel attacks that signatures have never seen." },
  { icon: "🌊", title: "DDoS & network abuse", text: "Real-time traffic analysis isolates volumetric and protocol attacks fast." },
  { icon: "🔗", title: "Supply-chain attacks", text: "Continuous monitoring of third-party and dependency risk across your software." },
];

/* ---------- Plans / pricing (Products) ---------- */
export const plans = [
  {
    name: "Essential",
    blurb: "Core protection for growing teams.",
    price: "Custom",
    featured: false,
    cta: "Get a quote",
    features: ["Next-Gen SIEM", "Advanced EDR", "24/7 alerting", "Email & chat support", "Monthly reporting"],
  },
  {
    name: "Professional",
    blurb: "Full-stack defense with managed response.",
    price: "Custom",
    featured: true,
    cta: "Talk to sales",
    features: ["Everything in Essential", "Advanced IDS/IPS", "Managed detection & response", "UEBA & threat hunting", "Dedicated analyst", "Quarterly reviews"],
  },
  {
    name: "Enterprise",
    blurb: "Multi-tenant scale for MSSPs and large orgs.",
    price: "Custom",
    featured: false,
    cta: "Contact us",
    features: ["Everything in Professional", "Multi-tenancy & RBAC", "GRC & compliance program", "Custom integrations", "SLA-backed response", "Named success team"],
  },
];

/* ---------- Company milestones (About) ---------- */
export const milestones = [
  { year: "2023", title: "Founded in Addis Ababa", text: "Beta Tech Hub launches with a mission to make enterprise-grade security accessible." },
  { year: "2024", title: "One unified platform", text: "SIEM, EDR, and IDS/IPS converge onto a single shared data fabric." },
  { year: "2025", title: "Agentic AI", text: "AI-assisted triage and automated response roll out across the platform." },
  { year: "2026", title: "Scaling across sectors", text: "Protecting organizations across finance, public, telecom, and critical infrastructure." },
];

/* ---------- Solutions (expanding panels) ---------- */
export const solutions = [
  { title: "Next-Gen SIEM", text: "Centralized detection and response across your whole estate.", img: img.siem1, to: "/products" },
  { title: "Advanced EDR", text: "Deep endpoint visibility with automated containment.", img: img.edr1, to: "/products" },
  { title: "Advanced IDS/IPS", text: "Real-time network threat detection and prevention.", img: img.ids1, to: "/products" },
  { title: "Services", text: "Consulting, testing, training, GRC, and managed security support.", img: img.grcCompliance, to: "/grc" },
];

/* ---------- Coverage meters (animated bars) ---------- */
export const coverage = [
  { label: "Threat detection coverage", pct: 98 },
  { label: "Automated response", pct: 92 },
  { label: "Compliance readiness", pct: 95 },
  { label: "Mean-time-to-detect reduction", pct: 88 },
];

/* ---------- Comparison (us vs. traditional) ---------- */
export const comparison = [
  { feature: "Unified SIEM, EDR & IDS/IPS", us: true, them: false },
  { feature: "ML & behavioral detection", us: true, them: false },
  { feature: "Automated, guided response", us: true, them: false },
  { feature: "Multi-tenancy & RBAC for MSSPs", us: true, them: false },
  { feature: "Built-in GRC & compliance program", us: true, them: false },
  { feature: "Signature-based alerts", us: true, them: true },
];

/* ---------- Insights / resources (Home) ---------- */
export const insights = [
  { tag: "Threat Intel", title: "How AI is reshaping the modern SOC", read: "5 min read", img: img.siem2, to: "/platform" },
  { tag: "Compliance", title: "A practical roadmap to ISO 27001", read: "7 min read", img: img.grcCompliance2, to: "/grc" },
  { tag: "Best Practices", title: "Stopping ransomware before it spreads", read: "4 min read", img: img.edr2, to: "/products" },
];

/* ---------- Navigation ---------- */
export const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/platform", label: "Platform" },
  { to: "/products", label: "Products" },
  { to: "/grc", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/admin", label: "Admin" },
];
