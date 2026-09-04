/* ==========================================================================
   PROJECTS
   Edit the PROJECTS array to add, remove, or replace work. Each entry
   renders as one row in #work. Set `placeholder: true` for an entry that
   isn't real yet (no links, dashed visual, "Coming soon" status).
   ========================================================================== */

const PROJECTS = [
  {
    number: '01',
    name: 'AjazEdits',
    description:
      'Personal brand website for video-editing services — work showcase, services, testimonials, and a contact section.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://ajazedits.vercel.app/',
    githubUrl: '#', // TODO: add the repo link
    image:assets/ajazedits.jpg, // TODO: e.g. 'assets/ajazedits.png'
    placeholder: false,
  },
  {
    number: '02',
    name: 'Mr.SelfDecode',
    description:
      'A multi-page content and brand website for a self-improvement platform, with course, YouTube, and community pages.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://mrselfdecode.vercel.app/',
    githubUrl: '#', // TODO: add the repo link
    image: null, // TODO: e.g. 'assets/mrselfdecode.png'
    placeholder: false,
  },
  {
    number: '03',
    name: 'PULSE',
    description:
      'A gamified productivity PWA — XP and leveling, streak tracking, and daily/weekly reports with a canvas-based report card export.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://taskpulse2181.vercel.app/',
    githubUrl: '#', // TODO: add the repo link
    image: null, // TODO: e.g. 'assets/taskpulse.png'
    placeholder: false,
  },
  {
    number: '04',
    name: 'AEGIS',
    description:
      'A personal AI assistant with a chat interface, customizable personalization settings, and locally stored conversation history.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://aegis-alpha-ten.vercel.app/',
    githubUrl: '#', // TODO: add the repo link
    image: null, // TODO: e.g. 'assets/aegis.png'
    placeholder: false,
  },
];

function renderProject(project) {
  const article = document.createElement('article');
  article.className = 'project' + (project.placeholder ? ' project--placeholder' : '');

  const techList = project.tech.length
    ? `<ul class="project__tech">${project.tech.map((t) => `<li>${t}</li>`).join('')}</ul>`
    : '';

  const links = project.placeholder
    ? `<span class="project__status">Coming soon</span>`
    : `<div class="project__links">
        ${project.demoUrl ? `<a class="project__link" href="${project.demoUrl}" target="_blank" rel="noopener">Live demo <span aria-hidden="true">→</span></a>` : ''}
        ${project.githubUrl ? `<a class="project__link" href="${project.githubUrl}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">→</span></a>` : ''}
      </div>`;

  // If `image` is set, show the real screenshot. Otherwise fall back to
  // the grid-pattern + wordmark placeholder — never a broken <img>.
  const visual = project.image
    ? `<img src="${project.image}" alt="${project.name} preview" loading="lazy" />`
    : `<div class="project__visual-pattern"></div>
       <div class="project__visual-mark">${project.placeholder ? '\u2014' : project.name}</div>`;

  article.innerHTML = `
    <div class="project__info">
      <span class="project__number text-numeral">${project.number}</span>
      <h3 class="project__name">${project.name}</h3>
      <p class="project__description">${project.description}</p>
      ${techList}
      ${links}
    </div>
    <div class="project__visual" role="img" aria-label="${project.name} preview">
      ${visual}
    </div>
  `;

  return article;
}

export function initProjects() {
  const list = document.getElementById('workList');
  if (!list) return;
  PROJECTS.forEach((project) => list.appendChild(renderProject(project)));
}
