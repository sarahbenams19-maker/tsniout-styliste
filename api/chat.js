export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.8, 
          maxOutputTokens: 1500,
          responseMimeType: "application/json"
        }
      })
    });

    const raw = await response.text();
    const data = JSON.parse(raw);
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) return res.status(200).json({ text: "", debug: raw.slice(0, 300) });
    
    // Vérifier que c'est du JSON valide et le renvoyer directement
    try {
      JSON.parse(text);
      res.status(200).json({ text });
    } catch(e) {
      // Si pas valide, envoyer quand même pour que le client tente de parser
      res.status(200).json({ text });
    }
  } catch(e) {
    res.status(500).json({ text: "", error: e.message });
  }
}
