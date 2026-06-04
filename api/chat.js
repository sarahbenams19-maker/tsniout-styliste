export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { query } = req.body;
    const response = await fetch(
      `https://asos10.p.rapidapi.com/api/v1/getProductListBySearchTerm?searchTerm=${encodeURIComponent(query)}&currency=EUR&country=FR&store=FR&languageShort=fr&sizeSchema=FR&limit=20&offset=0&sort=recommended`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "asos10.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY
        }
      }
    );
    const data = await response.json();
    res.status(200).json({ debug: JSON.stringify(data).slice(0,300), data });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
