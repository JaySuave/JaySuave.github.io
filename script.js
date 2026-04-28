const getDOM = selector => () => {
  return document.querySelector(selector);
};

const roles = Array.isArray(main.role) ? main.role.join(' / ') : main.role;

// Values DOM nodes
const dom = {
  main: {
    name: getDOM('#main #name'),
    img: getDOM('#main #img'),
    role: getDOM('#main #role'),
    connects: getDOM('#main #connects'),
    links: getDOM('#main #links')
  },
  about: {
    text: getDOM('#about-text'),
    page: getDOM('#about-page-text'),
    timeline: getDOM('#about-timeline')
  },
  contacts: {
    list: getDOM('#contacts-list')
  },
  projects: {
    featured: getDOM('#projects-list'),
    all: getDOM('#all-projects-list')
  }
};

function assignDOM(dom, value, options) {
  if (!dom) {
    return;
  }

  if (options && options.isImg) {
    dom.src = value;
    dom.alt = `${main.name} portrait`;
    return;
  }

  dom.innerHTML = value;
}

const connectsDOM = main.connects
  .map(
    ({ name, iconName, iconSvg, iconImg, link }) =>
      `<a href="${link}" target="_blank" rel="noreferrer" title="${name}" aria-label="${name}">${
        iconImg
          ? `<img src="${iconImg}" alt="" class="social-icon-img">`
          : iconSvg || `<ion-icon name="${iconName}"></ion-icon>`
      }</a>`
  )
  .join('\n');

// Internal Links
const getLinks = links =>
  links
    .map(({ name, link }) => `<a href="${link}" class="hero-link">${name}</a>`)
    .map((link, index, links) => index === links.length - 1 ? link: `${link} - `)
    .join('\n');

const getProjectLinks = project => {
  const links = [];

  if (project.live) {
    links.push(`<a href="${project.live}" target="_blank" rel="noreferrer">Live</a>`);
  }

  if (project.repo) {
    links.push(`<a href="${project.repo}" target="_blank" rel="noreferrer">Code</a>`);
  }

  return links.join(' - ');
};

const getContacts = contacts =>
  contacts
    .map(({ label, value, link }) => {
      const isMail = link.startsWith('mailto:');

      return `
        <a href="${link}" ${isMail ? 'target="_top"' : 'target="_blank" rel="noreferrer"'} class="contact-item">
          <span class="contact-label">${label}</span>
          <span class="contact-value">${value}</span>
        </a>
      `
    })
    .join('\n');

const getAboutPage = sections =>
  sections
    .map(
      paragraph => `
        <p class="text-lg leading-relaxed about-paragraph">${paragraph}</p>
      `
    )
    .join('\n');

const getTimelineGroups = groups =>
  groups
    .map(
      group => `
        <section class="timeline-group">
          <div class="timeline-group-label">${group.title}</div>
          <div class="timeline-list">
            ${group.items
              .map(
                item => `
                  <article class="timeline-item${item.current ? ' timeline-item-current' : ''}">
                    <div class="timeline-period">${item.period}</div>
                    <div class="timeline-card">
                      <p class="timeline-meta">
                        <span>${item.organization}</span>
                        ${
                          item.organizationLinks && item.organizationLinks.length
                            ? `
                              <span class="timeline-meta-links">
                                ${item.organizationLinks
                                  .map(
                                    ({ name, iconName, link }) =>
                                      `<a href="${link}" target="_blank" rel="noreferrer" aria-label="${name}" title="${name}"><ion-icon name="${iconName}"></ion-icon></a>`
                                  )
                                  .join('')}
                              </span>
                            `
                            : ''
                        }
                      </p>
                      <h3 class="timeline-title">${item.title}</h3>
                      <p class="timeline-description">${item.description}</p>
                      ${
                        item.points && item.points.length
                          ? `
                            <ul class="timeline-points">
                              ${item.points.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                          `
                          : ''
                      }
                    </div>
                  </article>
                `
              )
              .join('\n')}
          </div>
        </section>
      `
    )
    .join('\n');

const getProjects = projects =>
  projects
    .map(
      ({ name, description, stack = [], live, repo }) => `
        <article class="project-card">
          <h3 class="text-3xl">${name}</h3>
          <p class="text-base my-4">${description}</p>
          <div class="project-tech my-4">
            ${stack.map(item => `<span>${item}</span>`).join('')}
          </div>
          <div class="project-links text-sm">
            ${getProjectLinks({ live, repo })}
          </div>
        </article>
      `
    )
    .join('\n');

const mainName = dom.main.name();
const mainImg = dom.main.img();
const mainRole = dom.main.role();
const mainConnects = dom.main.connects();
const mainLinks = dom.main.links();
const allProjectsList = dom.projects.all();
const aboutPage = dom.about.page();

if (allProjectsList) {
  document.title = `${main.name} | Projects`;
} else if (aboutPage) {
  document.title = `${main.name} | About`;
} else {
  document.title = `${main.name} | ${roles}`;
}

if (mainName) {
  assignDOM(mainName, main.name);
}

if (mainImg) {
  assignDOM(mainImg, main.img, { isImg: true });
}

if (mainRole) {
  assignDOM(mainRole, roles);
}

if (mainConnects) {
  assignDOM(mainConnects, connectsDOM);
}

if (mainLinks) {
  assignDOM(mainLinks, getLinks(main.links));
}

assignDOM(dom.about.text(), main.aboutShort || '');
assignDOM(dom.about.page(), getAboutPage(main.aboutLong || []));
assignDOM(dom.about.timeline(), getTimelineGroups(main.timelineSections || []));
assignDOM(dom.contacts.list(), getContacts(main.contacts || []));
assignDOM(dom.projects.featured(), getProjects((main.projects || []).slice(0, 3)));
assignDOM(allProjectsList, getProjects(main.projects || []));
