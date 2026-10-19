export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nom = data.get('name') || data.get('nom');
    const email = data.get('email');
    const produit = data.get('produit') || 'Création générale';
    const note = data.get('note') || '5';
    const message = data.get('message');

    // Appel à l'API Resend pour envoyer l'avis
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "L'Héritage de Gisèle <onboarding@resend.dev>",
        to: ['lheritagedegisele@gmail.com'],
        subject: `⭐ [Nouvel Avis] - ${produit} (${note}/5)`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h1 style="color: #7b4b94;">⭐ Nouvel avis client reçu</h1>
            <p><strong>Client :</strong> ${nom} (<a href="mailto:${email}">${email}</a>)</p>
            <p><strong>Produit concerné :</strong> ${produit}</p>
            <p><strong>Note attribuée :</strong> ${note} / 5</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Avis / Témoignage :</strong><br />${message || "Pas de commentaire."}</p>
            <p style="font-size: 0.8em; color: #888; margin-top: 20px;">
              Envoyé depuis le livre d'or de L'Héritage de Gisèle
            </p>
          </div>
        `
      })
    });

    const result = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ message: "Succès !" }), { status: 200 });
    } else {
      console.error("Erreur Resend:", result);
      return new Response(JSON.stringify({ message: "Erreur API", details: result }), { status: 500 });
    }

  } catch (error) {
    console.error("Erreur Serveur:", error);
    return new Response(JSON.stringify({ message: "Erreur interne" }), { status: 500 });
  }
};