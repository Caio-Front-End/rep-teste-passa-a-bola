// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Missing 'message' in body" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    const systemPrompt =
      'Você é uma IA especialista na história do futebol feminino. Responda de forma amigável e informativa.';

    // Payload corrigido com 'contents' e 'role'
    const payload = {
      contents: [
        {
          role: 'system',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
    };

    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: errText || r.statusText });
    }

    const data = await r.json();

    // Extrai a resposta do bot
    const botText = data?.contents?.[1]?.parts?.[0]?.text ?? null;
    if (!botText) {
      return res.status(500).json({ error: 'Invalid response from Gemini' });
    }

    return res.status(200).json({ text: botText });
  } catch (err) {
    console.error('Error /api/chat:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}
