import { Resend } from 'resend';
import type { APIRoute } from 'astro';

// On récupère la clé depuis les variables d'environnement
// import.meta.env fonctionne pour Astro (Vite)
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const nom = data.get("nom");
  const email = data.get("email");
  const sujet = data.get("sujet") || "Sans sujet"; 
  const message = data.get("message");

  // Petite sécurité supplémentaire : vérifier que la clé existe
  if (!import.meta.env.RESEND_API_KEY) {
    console.error("ERREUR : La variable RESEND_API_KEY n'est pas définie.");
    return new Response("Erreur de configuration serveur", { status: 500 });
  }

  try {
    await resend.emails.send({
      from: "L'Héritage de Gisèle <onboarding@resend.dev>",
      to: 'lheritagedegisele@gmail.com',
      subject: `Nouveau message : ${sujet}`,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
    });

    return redirect('/thanks/');
  } catch (error) {
    console.error("Erreur Resend :", error);
    return new Response("Erreur lors de l'envoi", { status: 500 });
  }
};