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
      reply_to: email,
      subject: `[Dopyt] ${env.SITE_HOSTNAME || 'procomputer.sk'}`,
      text: `Dobrý deň,\n\nbol odoslaný nový dopyt cez formulár na webe.\n\nMená: ${name}\nEmail: ${email}\nTel: ${phone}\nPonuka: ${budget}\n\nSpráva:\n${message}\n\n---\nTento e-mail bol vygenerovaný automaticky.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Nový dopyt z webu</h2>
        <p>Cez kontaktný formulár na webe prišla nová správa:</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefón:</strong> ${phone}</p>
        <p><strong>Ponuka:</strong> ${budget}</p>
        <p><strong>Správa:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br/>')}
        </div>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <small style="color: #777;">Tento e-mail bol odoslaný automaticky z tvojej aplikácie na Cloudflare.</small>
        </div>
    `
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