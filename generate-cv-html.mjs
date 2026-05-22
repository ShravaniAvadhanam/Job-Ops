
import fs from 'fs';
import path from 'path';

const templatePath = 'templates/cv-template.html';
const template = fs.readFileSync(templatePath, 'utf-8');

const candidate = {
  NAME: 'Shravani Avadhanam',
  PHONE: '+91-9490216020',
  EMAIL: 'shravani.avadhanam@gmail.com',
  LINKEDIN_URL: 'https://www.linkedin.com/in/shravani-avadhanam/',
  LINKEDIN_DISPLAY: 'linkedin.com/in/shravani-avadhanam',
  PORTFOLIO_URL: 'https://heyshravani.framer.website/',
  PORTFOLIO_DISPLAY: 'heyshravani.framer.website',
  LOCATION: 'Bengaluru, India'
};

const commonSections = {
  SECTION_SUMMARY: 'Professional Summary',
  SECTION_COMPETENCIES: 'Core Competencies',
  SECTION_EXPERIENCE: 'Work Experience',
  SECTION_PROJECTS: 'Selected Projects',
  SECTION_EDUCATION: 'Education',
  SECTION_CERTIFICATIONS: 'Certifications',
  SECTION_SKILLS: 'Technical Skills',
  EDUCATION: `<div class='edu-item'><div class='edu-header'><div class='edu-title'><span class='edu-org'>Ramaiah Institute of Technology</span></div><div class='edu-year'>2018 -- 2022</div></div><div class='edu-desc'>B.E., Electrical & Electronics Engineering</div></div>`,
  CERTIFICATIONS: `<div class='cert-item'><div class='cert-title'>Google UX Design Specialization</div><div class='cert-org'>Coursera</div><div class='cert-year'>2024</div></div>`,
  SKILLS: `<div class='skills-grid'><div class='skill-item'><span class='skill-category'>Design:</span> Figma, Framer, Miro, Design Systems, Design Tokens, Prototyping</div><div class='skill-item'><span class='skill-category'>AI Tools:</span> Cursor, Claude Code, Lovable, v0, Prompt Engineering</div><div class='skill-item'><span class='skill-category'>Development:</span> HTML, CSS, React, Supabase, Vercel</div></div>`
};

function generateCV(companySlug, tailoredData) {
  let html = template;
  const data = { ...candidate, ...commonSections, ...tailoredData, LANG: 'en', PAGE_WIDTH: '800px' };

  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    html = html.split(placeholder).join(value);
  }

  const outputPath = `output/cv-${companySlug}.html`;
  fs.writeFileSync(outputPath, html);
  console.log(`Generated ${outputPath}`);
}

// 1. Krutrim
generateCV('krutrim', {
  SUMMARY_TEXT: "Product Designer with a Software Engineering foundation, specializing in **multimodal AI interfaces** and **Indic-language workflows**. Expert in bridging the gap between design and AI engineering using tools like **Cursor**, **Lovable**, and **Claude Code**.",
  COMPETENCIES: "<span class='competency-tag'>Multimodal UX</span> <span class='competency-tag'>Indic-Language Design</span> <span class='competency-tag'>AI-Native Workflows</span> <span class='competency-tag'>Enterprise SaaS</span> <span class='competency-tag'>Dashboard Design</span> <span class='competency-tag'>Human-AI Interaction</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">CGI</div><div class="job-period">May 2024 -- Present</div></div>
  <div class="job-role">Software Engineer -- UX & Product Design</div>
  <ul>
    <li>Designing <strong>multimodal AI interfaces</strong> and dashboard-heavy workflows for enterprise systems.</li>
    <li>Translating complex requirements into <strong>interaction structures</strong> and high-fidelity prototypes.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Recipe Gen <span class="project-badge">AI Build</span></div><div class="project-desc">AI-powered interaction patterns for content generation.</div></div>`
});

// 2. Neysa
generateCV('neysa', {
  SUMMARY_TEXT: "Product Designer and former Software Engineer specialized in **agentic infrastructure** and **complex enterprise SaaS**. Expert at designing high-density dashboards and orchestration workflows for AI-native platforms.",
  COMPETENCIES: "<span class='competency-tag'>Agentic UX</span> <span class='competency-tag'>Infrastructure Design</span> <span class='competency-tag'>Enterprise SaaS</span> <span class='competency-tag'>Dashboard Design</span> <span class='competency-tag'>AI-Native Workflows</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">CGI</div><div class="job-period">May 2024 -- Present</div></div>
  <div class="job-role">Software Engineer -- UX & Product Design</div>
  <ul>
    <li>Designing **complex infrastructure dashboards** and form-heavy workflows for cloud services.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Prompt Library App <span class="project-badge">Technical Design</span></div><div class="project-desc">Structured workflow application to organize LLM prompts.</div></div>`
});

// 3. Thesys
generateCV('thesys', {
  SUMMARY_TEXT: "Product Designer focused on **Generative UI** and **adaptive UX patterns**. Leveraging a Software Engineering background to build interfaces that evolve with user intent.",
  COMPETENCIES: "<span class='competency-tag'>Generative UI</span> <span class='competency-tag'>Adaptive UX</span> <span class='competency-tag'>AI-Native Workflows</span> <span class='competency-tag'>Interaction Design</span> <span class='competency-tag'>Rapid Prototyping</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">CGI</div><div class="job-period">May 2024 -- Present</div></div>
  <div class="job-role">Software Engineer -- UX & Product Design</div>
  <ul>
    <li>Leading the design of **interactive dashboards** and generative components.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Recipe Gen <span class="project-badge">Adaptive UX</span></div><div class="project-desc">AI-powered application exploring generative interaction patterns.</div></div>`
});

// 4. NeuralGarage
generateCV('neuralgarage', {
  SUMMARY_TEXT: "Product Designer with a Software Engineering background, specializing in **generative media UX** and **visual AI workflows**. experienced in building tools that bridge creative intent and technical execution.",
  COMPETENCIES: "<span class='competency-tag'>Generative Media UX</span> <span class='competency-tag'>Visual AI Workflows</span> <span class='competency-tag'>Interaction Design</span> <span class='competency-tag'>AI-Native Prototyping</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">Mango Giraffe (AI B2B SaaS)</div><div class="job-period">Jul 2025 -- Oct 2025</div></div>
  <div class="job-role">Product Design Intern -- AI Workflows</div>
  <ul>
    <li>Designed <strong>preview-first AI workflows</strong> for visual content generation.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Recipe Gen <span class="project-badge">AI Build</span></div><div class="project-desc">AI-powered interaction patterns for content generation.</div></div>`
});

// 5. OnFinance AI
generateCV('onfinance', {
  SUMMARY_TEXT: "Product Designer and former Software Engineer specialized in **Vertical AI for Fintech**. Expert in designing **compliance-ready dashboards** and complex financial workflows.",
  COMPETENCIES: "<span class='competency-tag'>Fintech UX</span> <span class='competency-tag'>Dashboard Design</span> <span class='competency-tag'>Compliance Workflows</span> <span class='competency-tag'>AI Agents</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">CGI</div><div class="job-period">May 2024 -- Present</div></div>
  <div class="job-role">Software Engineer -- UX & Product Design</div>
  <ul>
    <li>Designing <strong>enterprise financial dashboards</strong> and compliance workflows.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Prompt Library App <span class="project-badge">Product Thinking</span></div><div class="project-desc">Organizing and operationalizing prompts for financial AI agents.</div></div>`
});

// 6. Kuberns
generateCV('kuberns', {
  SUMMARY_TEXT: "Product Designer with a Software Engineering foundation, focused on **agentic DevOps** and **one-click deployment UX**.",
  COMPETENCIES: "<span class='competency-tag'>Agentic DevOps UX</span> <span class='competency-tag'>Infrastructure Design</span> <span class='competency-tag'>AI-Native Workflows</span> <span class='competency-tag'>Developer Tools</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">CGI</div><div class="job-period">May 2024 -- Present</div></div>
  <div class="job-role">Software Engineer -- UX & Product Design</div>
  <ul>
    <li>Designing **automated deployment dashboards** and CI/CD workflows.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Prompt Library App <span class="project-badge">AI Tooling</span></div><div class="project-desc">Organizing prompts within a structured DevOps workflow.</div></div>`
});

// 7. Bolna AI
generateCV('bolna', {
  SUMMARY_TEXT: "Product Designer and former Software Engineer specialized in **Voice AI orchestration** and **multilingual Indian workflows**.",
  COMPETENCIES: "<span class='competency-tag'>Voice AI UX</span> <span class='competency-tag'>Conversational Design</span> <span class='competency-tag'>Multilingual Workflows</span> <span class='competency-tag'>Onboarding Design</span>",
  EXPERIENCE: `
<div class="job">
  <div class="job-header"><div class="job-company">SkillGig (Design Systems & LMS)</div><div class="job-period">Jan 2025 -- Jun 2025</div></div>
  <div class="job-role">UI/UX Intern -- Onboarding & Learning Flows</div>
  <ul>
    <li>Designed <strong>multi-step onboarding</strong> and structured learning journeys.</li>
  </ul>
</div>`,
  PROJECTS: `<div class="project"><div class="project-title">Recipe Gen <span class="project-badge">AI UX</span></div><div class="project-desc">AI-powered application focused on workflow-based interaction.</div></div>`
});
