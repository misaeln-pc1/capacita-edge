const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const FALLBACK_URL = 'https://capacita.cl';

function normalizeUrl(value, fallback = FALLBACK_URL) {
  if (!value || typeof value !== 'string') return fallback;
  try {
    const url = new URL(value);
    return url.toString();
  } catch {
    return fallback;
  }
}

export async function onRequestPost(context) {
  const formData = await context.request.formData();

  // 1) Honeypot
  const hp = (formData.get('hp_field') || '').toString().trim();
  if (hp) {
    return new Response('Forbidden', { status: 403 });
  }

  // 2) Token Turnstile
  const token = (formData.get('cf-turnstile-response') || '').toString().trim();
  if (!token) {
    return Response.json(
      { ok: false, error: 'missing_turnstile_token' },
      { status: 400 }
    );
  }

  // 3) Validación server-side obligatoria
  const ip = context.request.headers.get('CF-Connecting-IP') || '';
  const verifyBody = new URLSearchParams();
  verifyBody.set('secret', context.env.TURNSTILE_SECRET);
  verifyBody.set('response', token);
  if (ip) verifyBody.set('remoteip', ip);

  const verifyResp = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    body: verifyBody
  });

  const verifyJson = await verifyResp.json();

  if (!verifyJson.success) {
    return Response.json(
      {
        ok: false,
        error: 'turnstile_failed',
        details: verifyJson['error-codes'] || []
      },
      { status: 403 }
    );
  }

  // 4) Normalizar URLs antes de enviar a Zoho
  const website = normalizeUrl(formData.get('Website'));
  const referente = normalizeUrl(formData.get('Website1'));

  formData.set('Website', website);
  formData.set('Website1', referente);
  formData.set('zf_referrer_name', referente);
  formData.set('zf_redirect_url', website);

  // 5) Eliminar campos internos
  formData.delete('cf-turnstile-response');
  formData.delete('hp_field');

  // 6) Relay a Zoho
  const zohoResp = await fetch(context.env.ZOHO_LEAD_FORM_URL, {
    method: 'POST',
    body: formData
  });

  if (!zohoResp.ok) {
    const errText = await zohoResp.text();
    return Response.json(
      {
        ok: false,
        error: 'zoho_submit_failed',
        status: zohoResp.status,
        body: errText.slice(0, 500)
      },
      { status: 502 }
    );
  }

  // 7) Redirect final
  const returnUrl = new URL(website);
  returnUrl.searchParams.set('lead', 'ok');
  returnUrl.hash = 'registro';

  return Response.redirect(returnUrl.toString(), 303);
}
