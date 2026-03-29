// DETECT & APPLY
let currentLang;

function detectLang() {
  const saved = localStorage.getItem('domain_lang');
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

function isValidDomain(domain) {
  // Simple validation for DNS labels + TLD. Allows subdomains as well.
  const domainRegex = /^(?=.{1,253}$)(?!-)([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i;
  return domainRegex.test(domain);
}

function getCurrentDomain() {
  const host = window.location.hostname.trim().toLowerCase();
  if (!host || host === 'localhost' || host === '127.0.0.1' || host === '::1') {
    return 'procomputer.sk';
  }
  return isValidDomain(host) ? host : 'procomputer.sk';
}

function applyCurrentDomain() {
  const domain = getCurrentDomain();

  document.querySelectorAll('.domain-dyn').forEach(el => {
    el.textContent = domain;
  });

  const domainJson = document.getElementById('domainJson');
  if (domainJson) domainJson.textContent = `"${domain}"`;

  const tDomain = document.getElementById('tDomain');
  if (tDomain) {
    const parts = domain.split('.');
    if (parts.length >= 2) {
      const tld = parts.pop();
      const name = parts.join('.');
      tDomain.innerHTML = `${name}<span style="color:var(--muted)">.${tld}</span>`;
    } else {
      tDomain.textContent = domain;
    }
  }

  // Dynamické nastavenie title
  document.title = `${domain} — DOMAIN FOR SALE`;
}

applyCurrentDomain();

function setLang(lang) {
  localStorage.setItem('domain_lang', lang);
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

  try {
    const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]').value;
    const resp = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone: form.phone.value.trim(), budget: form.budget.value, message, 'cf-turnstile-response': turnstileResponse }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || 'Email sending failed');
    }

    status.className = 'status success';
    status.textContent = t.success_msg;
    form.reset();
    lineNums.innerHTML = '1<br/>2<br/>3<br/>4<br/>5';
  } catch (error) {
    status.className = 'status error';
    status.textContent = t.err_send || 'Chyba pri odosielaní správy. Skúste to neskôr.';
    console.error('send-email error', error);
  } finally {
    btn.textContent = t.form_submit;
    btn.disabled = false;
  }
});
