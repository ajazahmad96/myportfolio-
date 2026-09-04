/* ==========================================================================
   PROJECTS
   Edit the PROJECTS array to add, remove, or replace work. Each entry
   renders as one row in #work. Set `placeholder: true` for an entry that
   isn't real yet (no links, dashed visual, "Coming soon" status).
   ========================================================================== */

const PROJECTS = [
  {
    number: '01',
    name: 'PULSE',
    description:
      'A gamified productivity PWA — XP and leveling, streak tracking, and daily/weekly reports with a canvas-based report card export.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#',
    placeholder: false,
  },
  {
    number: '02',
    name: 'Next project',
    description: 'In progress — details go here once it\u2019s ready to show.',
    tech: [],
    demoUrl: null,
    githubUrl: null,
    placeholder: true,
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
        ${project.demoUrl ? `<a class="project__link" href="${project.demoUrl}">Live demo <span aria-hidden="true">→</span></a>` : ''}
        ${project.githubUrl ? `<a class="project__link" href="${project.githubUrl}">GitHub <span aria-hidden="true">→</span></a>` : ''}
      </div>`;

  article.innerHTML = `
    <div class="project__info">
      <span class="project__number text-numeral">${project.number}</span>
      <h3 class="project__name">${project.name}</h3>
      <p class="project__description">${project.description}</p>
      ${techList}
      ${links}
    </div>
    <div class="project__visual" role="img" aria-label="${project.name} preview">
      <div class="project__visual-pattern"></div>
      <div class="project__visual-mark">${project.placeholder ? '\u2014' : project.name}</div>
    </div>
  `;

  return article;
}

export function initProjects() {
  const list = document.getElementById('workList');
  if (!list) return;
  PROJECTS.forEach((project) => list.appendChild(renderProject(project)));
}

