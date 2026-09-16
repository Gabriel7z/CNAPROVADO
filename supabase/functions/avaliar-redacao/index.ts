const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MODELOS = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function parseParecer(raw: string) {
  const txt = String(raw || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  let data: Record<string, unknown> | null = null;
  try {
    data = JSON.parse(txt);
  } catch {
    const m = txt.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      data = JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
  const limpa = (arr: unknown) =>
    (Array.isArray(arr) ? arr : [])
      .map((x) => String(x || "").trim())
      .filter(Boolean)
      .slice(0, 8);
  const acertou = limpa(data?.acertou);
  const errou = limpa(data?.errou);
  const faltou = limpa(data?.faltou);
  if (!acertou.length && !errou.length && !faltou.length) return null;
  return { acertou, errou, faltou };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método inválido." }, 405);

  const gemini = String(Deno.env.get("GEMINI_API_KEY") || "").trim();
  if (!gemini) return json({ error: "Avaliador sem chave no servidor." }, 500);

  let body: { sistema?: string; usuario?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Pedido inválido." }, 400);
  }

  const sistema = String(body.sistema || "").slice(0, 8000);
  const usuario = String(body.usuario || "").slice(0, 16000);
  if (usuario.length < 120) return json({ error: "Texto curto demais." }, 400);

  let ultimo = "Falha na API.";
  for (const modelo of MODELOS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(gemini)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sistema }] },
        contents: [{ role: "user", parts: [{ text: usuario }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      ultimo = payload?.error?.message || `HTTP ${res.status}`;
      continue;
    }
    const texto =
      payload?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("\n") || "";
    const parecer = parseParecer(texto);
    if (parecer) {
      return json({
        ...parecer,
        modelo,
        aviso: "Parecer de treino com a rubrica do cargo. Não é correção da banca.",
      });
    }
    ultimo = "O modelo não devolveu JSON utilizável.";
  }
  return json({ error: ultimo }, 502);
});
