// === Custom cursor (désactivé sur mobile) ===
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

if (window.matchMedia("(hover: hover)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animCursor() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animCursor);
    }
    animCursor();

    // Hover effect sur éléments interactifs
    document.querySelectorAll('a, button, .skill-card, .project-card, .stat, .theme-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px'; 
            cursor.style.height = '20px';
            ring.style.width = '55px'; 
            ring.style.height = '55px'; 
            ring.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px'; 
            cursor.style.height = '12px';
            ring.style.width = '36px'; 
            ring.style.height = '36px'; 
            ring.style.opacity = '0.5';
        });
    });
}

// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Charger le thème sauvegardé ou selon la préférence système
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
}

// === Hamburger Menu ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
let mobileMenu = null;

// Création du menu mobile
function createMobileMenu() {
    if (mobileMenu) return;
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#">Accueil</a>
        <a href="#about">À propos</a>
        <a href="#skills">Compétences</a>
        <a href="#projects">Projets</a>
        <a href="#contact">Contact</a>
    `;
    document.body.appendChild(mobileMenu);
}

hamburger.addEventListener('click', () => {
    createMobileMenu();
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.style.display = isActive ? 'flex' : 'none';
});

// Fermer le menu en cliquant sur un lien
document.addEventListener('click', (e) => {
    if (mobileMenu && e.target.tagName === 'A' && mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.style.display = 'none';
    }
});

// === Garde tes autres fonctionnalités (scroll reveal, active nav, form, typed, etc.) ===
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// Active nav link (inchangé)
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  desktopNavLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// Form submit (inchangé)
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.textContent = '✓ Message envoyé !';
  btn.style.background = 'transparent';
  btn.style.color = 'var(--accent)';
  btn.style.outline = '1.5px solid var(--accent)';
  setTimeout(() => {
    btn.textContent = 'Envoyer le message';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.outline = '';
    e.target.reset();
  }, 3000);
}

// Typed effect (inchangé)
const tag = document.querySelector('.hero-tag');
const txt = '// étudiant en informatique';
tag.textContent = '';
setTimeout(() => {
  let i = 0;
  const type = () => {
    if (i < txt.length) {
      tag.textContent += txt[i++];
      setTimeout(type, 45);
    }
  };
  type();
}, 400);