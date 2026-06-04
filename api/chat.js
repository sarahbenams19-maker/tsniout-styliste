export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { niveau, occasion, style, saison, budget } = req.body;
    
    const prompt = `Styliste tsniout. Genere une tenue JSON pour: niveau=${niveau}, occasion=${occasion}, style=${style}, saison=${saison}, budget=${budget}. Marques: Zara Mango Asos LaRedoute Modanisa Shein HM COS Stories. JSON uniquement: {"titre":"...","description":"...","pieces":[{"type":"...","description":"...","marque":"...","prix_estime":"...","pourquoi_tsniout":"..."},{"type":"...","description":"...","marque":"...","prix_estime":"...","pourquoi_tsniout":"..."},{"type":"...","description":"...","marque":"...","prix_estime":"...","pourquoi_tsniout":"..."}],"conseil_styliste":"...","palette":["#hex1","#hex2","#hex3"]}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.status(200).json({ text });
  } catch(e) {
    res.status(500).json({ text: "", error: e.message });
  }
}
