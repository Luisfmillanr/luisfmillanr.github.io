/* ============================================================
   app.js — JavaScript mínimo para el sitio
   ============================================================ */


/* ============================================================
   1. MENÚ HAMBURGUESA (móvil)
   ============================================================ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
    });
  });
}


/* ============================================================
   2. MODO OSCURO / CLARO — tres estados posibles

   El problema que resuelve esta lógica:
   Si el sistema operativo está en oscuro, la media query CSS
   aplica el tema oscuro automáticamente. Si el usuario quiere
   cambiar a claro manualmente, no basta con quitar "dark" —
   la media query seguiría ganando. Necesitamos "light" como
   clase explícita que tenga más peso que la media query.

   Estados:
   - Sin clase:      el sistema decide (media query)
   - body.dark:      forzar oscuro (anula sistema claro)
   - body.light:     forzar claro  (anula sistema oscuro)

   localStorage guarda la preferencia entre visitas.
   ============================================================ */

const themeToggle = document.getElementById('theme-toggle');
const body        = document.body;

function applyDark() {
  body.classList.add('dark');
  body.classList.remove('light');
  localStorage.setItem('theme', 'dark');
}

function applyLight() {
  body.classList.add('light');
  body.classList.remove('dark');
  localStorage.setItem('theme', 'light');
}

function isDark() {
  if (body.classList.contains('dark'))  return true;
  if (body.classList.contains('light')) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark')  applyDark();
else if (savedTheme === 'light') applyLight();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (isDark()) applyLight();
    else          applyDark();
  });
}