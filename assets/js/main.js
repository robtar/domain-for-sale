// DETECT & APPLY
let currentLang;

function detectLang() {
  const saved = localStorage.getItem('procomputer_lang');
  if (saved && translations[saved]) return saved;
  // navigator.languages is an ordered array of all preferred languages
  for (const l of (navigator.languages || [navigator.language])) {
    const code = l.slice(0, 2).toLowerCase();
    if (translations[code]) return code;
  }
  return 'sk'; // fallback
}

function applyLang(lang) {
  const t = translations[lang];
  document.documentElement.lang = t.html_lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });

  document.querySelectorAll('select option[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  currentLang = lang;
}

function setLang(lang) {
  localStorage.setItem('procomputer_lang', lang);
  applyLang(lang);
}

applyLang(detectLang());

// FORM LOGIC
const textarea = document.getElementById('fmessage');
const lineNums  = document.getElementById('lineNums');
textarea.addEventListener('input', () => {
  const lines = textarea.value.split('\n').length;
  lineNums.innerHTML = Array.from({length: Math.max(5, lines)}, (_, i) => i+1).join('<br/>');
});

const form   = document.getElementById('contactForm');
const status = document.getElementById('statusMsg');

document.getElementById('fmessage').addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter')
    document.getElementById('contactForm').dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  status.className = 'status';
  status.textContent = '';

  const t       = translations[currentLang];
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.className = 'status error';
    status.textContent = t.err_required;
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.className = 'status error';
    status.textContent = t.err_email;
    return;
  }

  const btn = form.querySelector('.submit-btn');
  btn.textContent = t.sending;
  btn.disabled = true;

  // ── Nahraďte skutočným handlerom (Formspree, EmailJS…) ──
  await new Promise(r => setTimeout(r, 1200));
  // ─────────────────────────────────────────────────────────

  status.className = 'status success';
  status.textContent = t.success_msg;
  form.reset();
  lineNums.innerHTML = '1<br/>2<br/>3<br/>4<br/>5';
  btn.textContent = t.form_submit;
  btn.disabled = false;
});
