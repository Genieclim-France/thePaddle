export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': import.meta.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: body.email, name: body.name },
      to: [{ email: 'a.janiak@genieclimfrance.fr', name: 'The Padel' }],
      subject: `Contact The Padel : ${body.demand}`,
      htmlContent: `
        <div style="background:#f6f8fa;padding:40px 0;">
          <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,138,239,0.08);padding:32px 28px;font-family:'Raleway',Arial,sans-serif;">
            <h2 style="color:#008AEF;font-size:24px;margin-bottom:16px;font-weight:800;letter-spacing:1px;">Nouvelle demande de contact</h2>
            <table style="width:100%;font-size:16px;color:#222;margin-bottom:24px;">
              <tr><td style="font-weight:600;padding:8px 0;width:140px;">Nom/Prénom :</td><td>${body.name}</td></tr>
              <tr><td style="font-weight:600;padding:8px 0;">Email :</td><td>${body.email}</td></tr>
              <tr><td style="font-weight:600;padding:8px 0;">Téléphone :</td><td>${body.phone}</td></tr>
              <tr><td style="font-weight:600;padding:8px 0;">Demande :</td><td>${body.demand}</td></tr>
              <tr><td style="font-weight:600;padding:8px 0;vertical-align:top;">Précisions :</td><td>${body.details.replace(/\n/g, '<br>')}</td></tr>
            </table>
            <div style="text-align:center;margin-top:32px;">
              <img src="https://thepadel.fr/src/assets/logo-color.svg" alt="The Padel" style="height:48px;margin-bottom:8px;"/>
              <div style="color:#008AEF;font-weight:700;font-size:18px;">The Padel</div>
              <div style="color:#888;font-size:14px;">Contact reçu depuis le site web</div>
            </div>
          </div>
        </div>
      `,
    }),
  });

  if (res.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    const error = await res.json();
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
};