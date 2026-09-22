'use strict';
// =========================================
// CUSTOMIZE: CONTACT & PROJECT INFORMATION
// Use full https:// URLs. Leave unknown links empty.
// =========================================
const CONTACT = {
  email: '', // e.g. hello@your-domain.com
  github: '', // e.g. https://github.com/your-username
  linkedin: '' // e.g. https://www.linkedin.com/in/your-username/
};
const PROJECTS = {
  pata: {
    title: "Wavek's Crispy Pata",
    type: 'FULL-STACK WEB APPLICATION',
    description: 'An ordering and restaurant management project that brings product selection, checkout, order tracking, and administration into one experience. The focus is on making the customer journey clear while keeping orders and inventory organized.',
    technologies: 'HTML, CSS, JavaScript, C#, ASP.NET Core',
    role: 'Full-stack development',
    focus: 'Ordering, inventory, and administration',
    status: 'Project in development · interface concept shown',
    github: '', live: '', screenshot: ''
  },
  survival: {
    title: 'Wilderness Survival',
    type: '2D SURVIVAL GAME',
    description: 'A top-down survival game built with Godot and C#. Explore the wilderness, gather resources, and develop a sustainable camp. The project explores connected gameplay systems such as hunger, thirst, temperature, and the passing of time.',
    technologies: 'Godot, C#',
    role: 'Game development',
    focus: 'Exploration and environmental survival systems',
    status: 'Project in development · title concept shown',
    github: '', live: '', screenshot: ''
  },
  gym: {
    title: 'Gym Management System',
    type: 'ADMINISTRATION INTERFACE',
    description: 'An administration interface concept for managing gym members and transactions. The project explores how clear hierarchy and practical workflows can make everyday operations easier to understand.',
    technologies: 'HTML, CSS, JavaScript, UI design',
    role: 'Interface design and frontend development',
    focus: 'Membership and transaction workflows',
    status: 'Interface concept · sample data in preview',
    github: '', live: '', screenshot: ''
  }
};
// =========================================
// NAVIGATION & MOBILE MENU
// =========================================
const header = document.querySelector('.header');
const navigation = document.querySelector('#navigation');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = [...navigation.querySelectorAll('a')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let menuOpen = false;
function syncScrollLock() {
  document.body.classList.toggle('locked', menuOpen || !!document.querySelector('dialog[open]'));
}
function setMenu(open, restoreFocus = false) {
  menuOpen = open;
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
  syncScrollLock();
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(!menuOpen));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (menuOpen && event.key === 'Escape') setMenu(false, true);
  if (menuOpen && event.key === 'Tab') {
    const controls = [...navLinks, menuButton];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.addEventListener('click', event => {
  if (menuOpen && !header.contains(event.target)) setMenu(false);
});
matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
// =========================================
// REVEALS & SCROLL EFFECTS
// A single scheduled frame per scroll; no perpetual loop.
// =========================================
const revealTargets = document.querySelectorAll('.reveal, .timeline-entry');
if ('IntersectionObserver' in window) {
  if (!reducedMotion.matches) document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealTargets.forEach(element => revealObserver.observe(element));
}
const sections = [...document.querySelectorAll('main section[id]')];
const timeline = document.querySelector('.timeline');
const portrait = document.querySelector('.portrait');
const hero = document.querySelector('.hero');
let framePending = false;
function updateScroll() {
  framePending = false;
  header.classList.toggle('scrolled', window.scrollY > 35);
  const marker = window.innerHeight * 0.38;
  let active = sections[0].id;
  sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) active = section.id; });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) active = 'contact';
  navLinks.forEach(link => {
    const selected = link.hash === '#' + active;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const rect = timeline.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, (window.innerHeight * .7 - rect.top) / rect.height));
  timeline.style.setProperty('--timeline-progress', reducedMotion.matches ? 1 : progress);
  if (!reducedMotion.matches && innerWidth > 767 && window.scrollY < hero.offsetHeight) {
    portrait.style.setProperty('--portrait-y', Math.min(window.scrollY * .07, 35) + 'px');
  }
}
function scheduleScroll() {
  if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); }
}
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll, { passive: true });
updateScroll();
// =========================================
// PROJECT MODAL — native dialog handles focus containment
// =========================================
const projectModal = document.querySelector('#project-modal');
function safeURL(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
function appendProjectLink(container, label, value) {
  const url = safeURL(value);
  const element = document.createElement(url ? 'a' : 'span');
  element.textContent = url ? label + ' ↗' : label + ' — coming soon';
  element.className = url ? 'text-link' : 'unavailable';
  if (url) { element.href = url; element.target = '_blank'; element.rel = 'noopener noreferrer'; }
  container.append(element);
}
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.open;
    const project = PROJECTS[key];
    document.querySelector('#modal-title').textContent = project.title;
    document.querySelector('#modal-eyebrow').textContent = project.type;
    document.querySelector('#modal-description').textContent = project.description;
    const preview = document.querySelector('#modal-preview');
    preview.replaceChildren();
    if (project.screenshot) {
      const image = document.createElement('img');
      image.src = project.screenshot;
      image.alt = project.title + ' project screenshot';
      preview.append(image);
      preview.removeAttribute('aria-hidden');
    } else {
      const source = document.querySelector(`[data-project="${key}"] .project-preview`);
      const concept = document.createElement('div');
      concept.className = source.className;
      concept.innerHTML = source.innerHTML;
      preview.append(concept);
      preview.setAttribute('aria-hidden', 'true');
    }
    const facts = document.querySelector('#modal-facts');
    facts.replaceChildren();
    [['Technology', project.technologies], ['Role', project.role], ['Focus', project.focus], ['Status', project.status]].forEach(([label, value]) => {
      const div = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = label; dd.textContent = value; div.append(dt, dd); facts.append(div);
    });
    const links = document.querySelector('#modal-links');
    links.replaceChildren();
    appendProjectLink(links, 'GitHub', project.github);
    appendProjectLink(links, 'Live project', project.live);
    projectModal.showModal();
    projectModal.scrollTop = 0;
    syncScrollLock();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', syncScrollLock);
});
// =========================================
// CONTACT — missing details are honest placeholders
// =========================================
const contactDialog = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button => {
  button.addEventListener('click', () => {
    const kind = button.dataset.contact;
    const value = CONTACT[kind].trim();
    if (kind === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      window.location.href = 'mailto:' + encodeURIComponent(value); return;
    }
    if (kind !== 'email' && safeURL(value)) {
      window.open(safeURL(value), '_blank', 'noopener,noreferrer'); return;
    }
    const names = { email: 'Email address', github: 'GitHub profile', linkedin: 'LinkedIn profile' };
    document.querySelector('#contact-message').textContent = names[kind] + ' coming soon. Contact details have not been added to this portfolio yet.';
    contactDialog.showModal(); syncScrollLock();
  });
});
// =========================================
// CURSOR & MAGNETIC FEEDBACK
// Native cursor stays available for familiar interactions.
// =========================================
const cursor = document.querySelector('.cursor');
let pointerFrame = null, pointerX = 0, pointerY = 0;
document.addEventListener('pointermove', event => {
  if (!finePointer.matches || reducedMotion.matches || innerWidth < 768) return;
  pointerX = event.clientX; pointerY = event.clientY;
  cursor.classList.add('visible');
  if (pointerFrame !== null) return;
  pointerFrame = requestAnimationFrame(() => {
    cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    pointerFrame = null;
  });
}, { passive: true });
document.addEventListener('pointerover', event => {
  const project = event.target.closest('.project-preview');
  const interactive = event.target.closest('a, button');
  cursor.classList.toggle('view', !!project);
  cursor.classList.toggle('hover', !!interactive && !project);
  cursor.querySelector('span').textContent = project ? 'VIEW' : '';
});
document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('visible'));
window.addEventListener('blur', () => cursor.classList.remove('visible'));
document.querySelectorAll('.magnetic').forEach(element => {
  element.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .08;
    const y = (event.clientY - rect.top - rect.height / 2) * .1;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
  element.addEventListener('pointerleave', () => element.style.transform = '');
});
hero.addEventListener('pointermove', event => {
  if (finePointer.matches && !reducedMotion.matches && innerWidth > 767) {
    portrait.style.setProperty('--portrait-x', ((event.clientX / innerWidth - .5) * 12) + 'px');
  }
}, { passive: true });
hero.addEventListener('pointerleave', () => portrait.style.setProperty('--portrait-x', '0px'));
const motionButton = document.querySelector('.motion-toggle');
motionButton.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    document.documentElement.classList.remove('js-motion');
    cursor.classList.remove('visible');
    portrait.style.removeProperty('--portrait-x');
    portrait.style.removeProperty('--portrait-y');
  }
  scheduleScroll();
});
