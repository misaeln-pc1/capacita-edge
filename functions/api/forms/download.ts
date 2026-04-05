export interface Env {
  TURNSTILE_SECRET: string;
  ZOHO_DOWNLOAD_FORM_URL: string;
}

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const FALLBACK_URL = 'https://capacita.cl';

function normalizeUrl(value: FormDataEntryValue | null, fallback: string) {
  const raw = String(value ?? '').trim();
  try {
    return new URL(raw).toString();
  } catch {
    return fallback;
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formData = await context.request.formData();

  const hp = String(formData.get('hp_field') ?? '').trim();
  if (hp !== '') {
    return new Response('Forbidden', { status: 403 });
  }

  const token = String(formData.get('cf-turnstile-response') ?? '').trim();
  if (!token) {
    return new Response('Missing Turnstile token', { status: 400 });
  }

  const verifyBody = new URLSearchParams();
  verifyBody.set('secret', context.env.TURNSTILE_SECRET);
  verifyBody.set('response', token);

  const ip = context.request.headers.get('CF-Connecting-IP');
  if (ip) {
    verifyBody.set('remoteip', ip);
  }

  const verifyResp = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    body: verifyBody
  });

  const verifyJson = await verifyResp.json<any>();

  if (!verifyJson?.success) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'turnstile_failed',
        details: verifyJson?.['error-codes'] ?? []
      }),
      {
        status: 403,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  formData.set('zf_referrer_name', normalizeUrl(formData.get('zf_referrer_name'), FALLBACK_URL));
  formData.set('zf_redirect_url', normalizeUrl(formData.get('zf_redirect_url'), FALLBACK_URL));

  formData.delete('cf-turnstile-response');
  formData.delete('hp_field');

  const zohoResp = await fetch(context.env.ZOHO_DOWNLOAD_FORM_URL, {
    method: 'POST',
    body: formData
  });

  if (!zohoResp.ok) {
    const errText = await zohoResp.text();
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'zoho_submit_failed',
        status: zohoResp.status,
        body: errText.slice(0, 500)
      }),
      {
        status: 502,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  const returnUrl = normalizeUrl(formData.get('zf_referrer_name'), FALLBACK_URL);
  const redirectUrl = new URL(returnUrl);
  redirectUrl.searchParams.set('download', 'ok');
  redirectUrl.hash = 'programa';

  return Response.redirect(redirectUrl.toString(), 303);
};