export const prerender = false; //

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Extraction des données du formulaire
    const data = await request.formData();
    const nom = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const selection = data.get('selection_details');
	const telephone = data.get('telephone') || 'Non renseigné';

    // 2. Appel à l'API Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // IMPORTANT : Bien ajouter "Bearer " avant la clé
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "L'Héritage de Gisèle <onboarding@resend.dev>",
        to: ['lheritagedegisele@gmail.com'],
        subject: `Nouvelle demande de devis de ${nom}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h1 style="color: #5D3FD3;">Nouvelle demande de devis</h1>
            <p><strong>Client :</strong> ${nom} (<a href="mailto:${email}">${email}</a>)</p>
			<p><strong>Téléphone :</strong> ${telephone}</p>
            <p><strong>Message :</strong><br />${message || "Pas de message laissé."}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3>Articles sélectionnés :</h3>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
               <pre style="white-space: pre-wrap;">${selection}</pre>
            </div>
            <p style="font-size: 0.8em; color: #888; margin-top: 20px;">
              Envoyé depuis le site L'Héritage de Gisèle
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