import { useState } from "react";

const AFFILIATE_LINKS = {
  zara: "https://www.zara.com/fr/",
  mango: "https://shop.mango.com/fr/",
  asos: "https://www.asos.com/fr/",
  laredoute: "https://www.laredoute.fr/",
  modanisa: "https://www.modanisa.com/fr/",
  shein: "https://www.shein.com/fr/",
  hm: "https://www2.hm.com/fr_fr/",
  cos: "https://www.cos.com/fr_fr/",
  stories: "https://www.stories.com/fr_fr/",
};

const OCCASIONS = [
  { id: "Shabbat", label: "Shabbat", emoji: "🕯️" },
  { id: "Fêtes (Roch Hashana, Pessah…)", label: "Fêtes religieuses", emoji: "✨" },
  { id: "Quotidien", label: "Quotidien", emoji: "☀️" },
  { id: "Travail / Bureau", label: "Travail / Bureau", emoji: "💼" },
  { id: "Soirée / Mariage", label: "Soirée / Mariage", emoji: "💫" },
  { id: "Sport / Détente", label: "Sport / Détente", emoji: "🌿" },
];

const STYLES = [
  { id: "Chic et élégant", label: "Chic & Élégant", emoji: "🖤" },
  { id: "Casual et moderne", label: "Casual & Moderne", emoji: "✌️" },
  { id: "Romantique et doux", label: "Romantique & Doux", emoji: "🌸" },
  { id: "Minimaliste épuré", label: "Minimaliste", emoji: "⬜" },
];

const NIVEAUX = [
  { id: "orthodoxe", label: "Orthodoxe", desc: "Tsniout stricte — coudes, genoux, col couverts" },
  { id: "traditionnel", label: "Traditionnel", desc: "Pudeur modérée — longueurs midi, bras couverts" },
];

const SAISONS = [
  { id: "Printemps", label: "Printemps", emoji: "🌷" },
  { id: "Été", label: "Été", emoji: "☀️" },
  { id: "Automne", label: "Automne", emoji: "🍂" },
  { id: "Hiver", label: "Hiver", emoji: "❄️" },
];

const BUDGETS = [
  { id: "petit", label: "Petit budget", desc: "Moins de 50€ la tenue complète" },
  { id: "moyen", label: "Budget moyen", desc: "Entre 50€ et 150€" },
  { id: "confortable", label: "Budget confortable", desc: "150€ et plus" },
];

function getLink(marque) {
  if (!marque) return AFFILIATE_LINKS.asos;
  const m = marque.toLowerCase().trim();
  if (m.includes("zara")) return AFFILIATE_LINKS.zara;
  if (m.includes("mango")) return AFFILIATE_LINKS.mango;
  if (m.includes("asos")) return AFFILIATE_LINKS.asos;
  if (m.includes("redoute")) return AFFILIATE_LINKS.laredoute;
  if (m.includes("modanisa")) return AFFILIATE_LINKS.modanisa;
  if (m.includes("shein")) return AFFILIATE_LINKS.shein;
  if (m.includes("h&m") || m.includes("hm")) return AFFILIATE_LINKS.hm;
  if (m.includes("cos")) return AFFILIATE_LINKS.cos;
  if (m.includes("stories")) return AFFILIATE_LINKS.stories;
  return AFFILIATE_LINKS.asos;
}

const S = {
  wrap: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0a0a 0%, #2d1515 40%, #1a0a1a 100%)",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#f5e6d3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px 60px",
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,149,106,0.2)",
    borderRadius: 20,
    padding: "28px 24px",
    width: "100%",
    maxWidth: 540,
    boxSizing: "border-box",
  },
  cardTitle: { fontSize: "1.2rem", fontWeight: 400, color: "#f5e6d3", margin: "0 0 6px", letterSpacing: "0.03em" },
  cardSub: { color: "#7a6050", fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 },
  optionCard: (sel) => ({
    padding: "16px 18px",
    border: `1px solid ${sel ? "#c9956a" : "rgba(201,149,106,0.2)"}`,
    borderRadius: 14,
    cursor: "pointer",
    background: sel ? "rgba(201,149,106,0.12)" : "transparent",
    transition: "all 0.2s ease",
    marginBottom: 10,
  }),
  gridOption: (sel) => ({
    padding: "16px 12px",
    border: `1px solid ${sel ? "#c9956a" : "rgba(201,149,106,0.2)"}`,
    borderRadius: 14,
    cursor: "pointer",
    background: sel ? "rgba(201,149,106,0.12)" : "transparent",
    textAlign: "center",
    transition: "all 0.2s ease",
  }),
  btnPrimary: {
    flex: 1,
    padding: "13px",
    background: "linear-gradient(135deg, #c9956a, #a07040)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
    letterSpacing: "0.06em",
  },
  btnDisabled: {
    flex: 1,
    padding: "13px",
    background: "rgba(201,149,106,0.1)",
    border: "none",
    borderRadius: 12,
    color: "#5a4030",
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "not-allowed",
  },
  btnBack: {
    padding: "13px 18px",
    background: "transparent",
    border: "1px solid rgba(201,149,106,0.3)",
    borderRadius: 12,
    color: "#7a6050",
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
  },
  btnOutline: {
    width: "100%",
    padding: "14px",
    background: "transparent",
    border: "1px solid rgba(201,149,106,0.4)",
    borderRadius: 12,
    color: "#c9956a",
    fontSize: 14,
    fontFamily: "Georgia, serif",
    cursor: "pointer",
    letterSpacing: "0.08em",
  },
  tag: {
    fontSize: 11,
    color: "#c9956a",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: 6,
  },
};

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ niveau: "", occasion: "", style: "", saison: "", budget: "moyen" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pick = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const buildPrompt = () => {
    const niveauLabel = form.niveau === "orthodoxe"
      ? "Orthodoxe : coudes, genoux et cou couverts en permanence, pas de transparence"
      : "Traditionnel : longueurs midi, bras couverts, pudeur modérée";
    const budgetLabel = form.budget === "petit" ? "moins de 50€" : form.budget === "moyen" ? "50 à 150€" : "150€ et plus";

    return `Tu es une styliste experte en mode tsniout pour femmes juives pratiquantes.

Profil de la cliente :
- Niveau de pratique : ${niveauLabel}
- Occasion : ${form.occasion}
- Style souhaité : ${form.style}
- Saison : ${form.saison}
- Budget total : ${budgetLabel}

Marques autorisées UNIQUEMENT : Zara, Mango, Asos, La Redoute, Modanisa, Shein, H&M, COS, & Other Stories

Génère une tenue complète et tendance. Réponds UNIQUEMENT en JSON valide, sans backticks, sans markdown, sans texte avant ou après. Format exact :
{
  "titre": "Nom poétique de la tenue en 4 mots max",
  "description": "2 phrases décrivant le look et l'ambiance",
  "pieces": [
    {
      "type": "Haut",
      "description": "Description précise et tendance de la pièce (couleur, matière, coupe)",
< truncated lines 192-286 >
          <h2 style={S.cardTitle}>Mon niveau de pratique</h2>
          <p style={S.cardSub}>Pour des suggestions parfaitement adaptées</p>
          {NIVEAUX.map(n => (
            <div key={n.id} style={S.optionCard(form.niveau === n.id)} onClick={() => pick("niveau", n.id)}>
              <div style={{ color: form.niveau === n.id ? "#f5e6d3" : "#c9956a", fontWeight: 500, fontSize: 15, marginBottom: 3 }}>{n.label}</div>
              <div style={{ color: "#7a6050", fontSize: 13 }}>{n.desc}</div>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <button style={form.niveau ? S.btnPrimary : S.btnDisabled} disabled={!form.niveau} onClick={() => setStep(1)}>
              Suivant →
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 — Occasion */}
      {step === 1 && (
        <div style={S.card}>
          <h2 style={S.cardTitle}>L'occasion</h2>
          <p style={S.cardSub}>Pour quand créons-nous cette tenue ?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {OCCASIONS.map(o => (
              <div key={o.id} style={S.gridOption(form.occasion === o.id)} onClick={() => pick("occasion", o.id)}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{o.emoji}</div>
                <div style={{ color: form.occasion === o.id ? "#f5e6d3" : "#a07860", fontSize: 12, lineHeight: 1.4 }}>{o.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={S.btnBack} onClick={() => setStep(0)}>←</button>
            <button style={form.occasion ? S.btnPrimary : S.btnDisabled} disabled={!form.occasion} onClick={() => setStep(2)}>Suivant →</button>
          </div>
        </div>
      )}

      {/* STEP 2 — Style */}
      {step === 2 && (
        <div style={S.card}>
          <h2 style={S.cardTitle}>Mon style</h2>
          <p style={S.cardSub}>Quelle est ton esthétique ?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {STYLES.map(s => (
              <div key={s.id} style={S.gridOption(form.style === s.id)} onClick={() => pick("style", s.id)}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ color: form.style === s.id ? "#f5e6d3" : "#a07860", fontSize: 12, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={S.btnBack} onClick={() => setStep(1)}>←</button>
            <button style={form.style ? S.btnPrimary : S.btnDisabled} disabled={!form.style} onClick={() => setStep(3)}>Suivant →</button>
          </div>
        </div>
      )}

      {/* STEP 3 — Saison */}
      {step === 3 && (
        <div style={S.card}>
          <h2 style={S.cardTitle}>La saison</h2>
          <p style={S.cardSub}>Pour des matières et couleurs adaptées</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SAISONS.map(s => (
              <div key={s.id} style={S.gridOption(form.saison === s.id)} onClick={() => pick("saison", s.id)}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ color: form.saison === s.id ? "#f5e6d3" : "#a07860", fontSize: 12, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={S.btnBack} onClick={() => setStep(2)}>←</button>
            <button style={form.saison ? S.btnPrimary : S.btnDisabled} disabled={!form.saison} onClick={() => setStep(4)}>Suivant →</button>
          </div>
        </div>
      )}

      {/* STEP 4 — Budget */}
      {step === 4 && (
        <div style={S.card}>
          <h2 style={S.cardTitle}>Mon budget</h2>
          <p style={S.cardSub}>Pour des pièces vraiment accessibles</p>
          {BUDGETS.map(b => (
            <div key={b.id} style={S.optionCard(form.budget === b.id)} onClick={() => pick("budget", b.id)}>
              <div style={{ color: form.budget === b.id ? "#f5e6d3" : "#c9956a", fontWeight: 500, fontSize: 15, marginBottom: 3 }}>{b.label}</div>
              <div style={{ color: "#7a6050", fontSize: 13 }}>{b.desc}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button style={S.btnBack} onClick={() => setStep(3)}>←</button>
            <button style={S.btnPrimary} onClick={generate}>✨ Créer ma tenue</button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ ...S.card, textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 36, marginBottom: 16, display: "inline-block", animation: "spin 2s linear infinite" }}>✦</div>
          <p style={{ color: "#c9956a", letterSpacing: "0.1em", fontSize: 14, margin: 0 }}>
            Ta styliste personnelle compose ta tenue…
          </p>
          <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div style={{ ...S.card, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <p style={{ color: "#c9956a", marginBottom: 20, fontSize: 14 }}>{error}</p>
          <button style={S.btnPrimary} onClick={generate}>🔄 Réessayer</button>
          <div style={{ marginTop: 10 }}>
            <button style={S.btnOutline} onClick={() => setStep(4)}>← Modifier mes choix</button>
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === 6 && result && !loading && (
        <div style={{ width: "100%", maxWidth: 540 }}>
          {/* Palette + Titre */}
          <div style={{
            background: "rgba(201,149,106,0.08)", border: "1px solid rgba(201,149,106,0.3)",
            borderRadius: 20, padding: "28px 24px", marginBottom: 14, textAlign: "center",
          }}>
            {result.palette?.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
                {result.palette.map((c, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, boxShadow: `0 0 14px ${c}80` }} />
                ))}
              </div>
            )}
            <h2 style={{ fontSize: "1.4rem", fontWeight: 400, color: "#f5e6d3", margin: "0 0 10px" }}>
              {result.titre}
            </h2>
            <p style={{ color: "#a07860", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{result.description}</p>
          </div>

          {/* Pièces */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
            {result.pieces?.map((piece, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,149,106,0.2)",
                borderRadius: 16, padding: "18px 20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={S.tag}>{piece.type}</div>
                    <p style={{ margin: 0, color: "#f5e6d3", fontSize: 14, lineHeight: 1.5 }}>{piece.description}</p>
                  </div>
                  <span style={{ color: "#c9956a", fontWeight: 600, fontSize: 15, marginLeft: 12, whiteSpace: "nowrap" }}>
                    {piece.prix_estime}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#7a6050", marginBottom: 12, fontStyle: "italic" }}>
                  ✓ {piece.pourquoi_tsniout}
                </div>
                <a href={getLink(piece.marque)} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-block", padding: "7px 16px",
                  background: "rgba(201,149,106,0.15)", border: "1px solid rgba(201,149,106,0.4)",
                  borderRadius: 8, color: "#c9956a", fontSize: 12, textDecoration: "none", letterSpacing: "0.05em",
                }}>
                  Voir sur {piece.marque} →
                </a>
              </div>
            ))}
          </div>

          {/* Conseil styliste */}
          {result.conseil_styliste && (
            <div style={{
              background: "rgba(201,149,106,0.06)", border: "1px solid rgba(201,149,106,0.2)",
              borderRadius: 16, padding: "18px 20px", marginBottom: 16,
            }}>
              <div style={S.tag}>✦ Conseil de ta styliste</div>
              <p style={{ color: "#d4b896", fontSize: 14, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "{result.conseil_styliste}"
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={S.btnPrimary} onClick={generate}>🔄 Générer une autre tenue</button>
            <button style={S.btnOutline} onClick={reset}>↺ Recommencer depuis le début</button>
          </div>
        </div>
      )}
    </div>
  );
}
