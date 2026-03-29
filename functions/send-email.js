export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, email, phone = '', budget = '', message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400 });
    }

    const body = {
      from: 'Domain For Sale <hello@' + (env.SITE_HOSTNAME || 'procomputer.sk') + '>',
      to: ['info@procomputer.sk'],
      subject: `Nová otázka o doménu ${env.SITE_HOSTNAME || 'procomputer.sk'}`,
      text: `Mená: ${name}\nEmail: ${email}\nTel: ${phone}\nPonuka: ${budget}\nSpráva:\n${message}`,
      html: `<p><strong>Mená:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Tel.:</strong> ${phone}</p><p><strong>Ponuka:</strong> ${budget}</p><p><strong>Správa:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    const resendApiKey = env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'missing_api_key' }), { status: 500 });
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const err = await r.text();
      return new Response(JSON.stringify({ error: 'resend_failed', details: err }), { status: r.status });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error('send-email function error', error);
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 });
  }
}