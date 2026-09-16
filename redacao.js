const REDACAO_CHECKLIST = [
  { id: "tese", label: "Introdução com tese e recorte" },
  { id: "rep", label: "Repertório (CF, princípio ou fato concreto)" },
  { id: "d1", label: "1º parágrafo de desenvolvimento" },
  { id: "d2", label: "2º parágrafo de desenvolvimento" },
  { id: "fim", label: "Conclusão com proposta" },
  { id: "linhas", label: "Extensão perto de 20–30 linhas" },
  { id: "gram", label: "Releu e corrigiu gramática" },
];

const REDACAO_EXTRAS = [
  {
    id: "ap-cidadao",
    titulo: "Administração e o cidadão",
    proposta:
      "O papel da Administração Pública na vida do cidadão. Introdução, 2 desenvolvimentos e conclusão. 20–30 linhas.",
    banca: "SEDF",
  },
  {
    id: "tec-escola",
    titulo: "Tecnologia na escola pública",
    proposta:
      "Tema SEDF: tecnologia na escola pública. Use 1 argumento jurídico (CF art. 205 ou 37) e 1 prático. 20–30 linhas.",
    banca: "SEDF",
  },
  {
    id: "controle",
    titulo: "Controle e transparência",
    proposta:
      "Controle externo e interesse público. Evite clichê; cite um princípio da Administração. 20–30 linhas.",
    banca: "TCE-GO",
  },
  {
    id: "igualdade",
    titulo: "Igualdade e Administração",
    proposta:
      "Igualdade e Administração Pública. Introdução com recorte claro. 20–30 linhas.",
    banca: "PMDF",
  },
  {
    id: "liberdade",
    titulo: "Liberdade vs interesse público",
    proposta:
      "Liberdade individual e interesse público. Um parágrafo com CF art. 5º. 20–30 linhas.",
    banca: "PMDF",
  },
  {
    id: "educacao",
    titulo: "Direito à educação",
    proposta: "O direito à educação. Use art. 205 ou 206 da CF. 20–30 linhas.",
    banca: "SEDF",
  },
];

const REDACAO_GEMINI_KEY = "cnaprovado-gemini-key";
const REDACAO_GEMINI_MODELOS = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

const REDACAO_RUBRICAS = {
  sedf: {
    id: "sedf",
    concurso: "SEDF",
    banca: "Quadrix",
    cargo: "Gestor (discursiva de atualidades)",
    tipo: "Dissertação, cerca de 20–30 linhas. Não é estudo de caso.",
    criterios: [
      "Aderiu ao tema e trouxe atualidade ou fato concreto, não só doutrina.",
      "Introdução com tese e recorte.",
      "Dois desenvolvimentos com argumento + um fundamento cabível (CF arts. 37, 205–214, LC 840, educação).",
      "Conclusão com proposta possível para a Administração/educação.",
      "Extensão e português no recorte de prova (não precisa ser ENEM nota mil).",
    ],
    evita: [
      "Fugir para tema policial ou estudo de caso de Tribunal de Contas.",
      "Lista de leis sem ligar no tema.",
    ],
  },
  pmdf: {
    id: "pmdf",
    concurso: "PM DF",
    banca: "última prova AOCP (redação à parte)",
    cargo: "área policial",
    tipo: "Redação dissertativa no eixo segurança, direitos e Administração.",
    criterios: [
      "Ficou no eixo segurança pública / direitos / Administração, não em educação escolar.",
      "Tese clara e dois argumentos.",
      "Fundamento cabível: CF art. 5º, legalidade, proporcionalidade, dever do Estado na segurança.",
      "Conclusão com encerramento, sem proposta mirabolante.",
    ],
    evita: [
      "Transformar o texto em aula de pedagogia da SEDF.",
      "Estudo de caso de TI ou licitação de TCE.",
    ],
  },
  tcegoTi: {
    id: "tcego-ti",
    concurso: "TCE-GO",
    banca: "FCC",
    cargo: "ACE · Tecnologia da Informação",
    tipo: "Estudo de caso da especialidade — não é dissertação de vestibular.",
    criterios: [
      "Respondeu o caso (problema, análise, encaminhamento), não um tema genérico.",
      "Enxergou o ângulo de TI no controle: sistema, dado, evidência, segurança, trilha, disponibilidade.",
      "Fundamento de controle/Administração só quando ajuda o caso (CF, TCs, LAI), sem virar aula de D.Adm.",
      "Conclusão de analista: o que o TCE faria com aquela informação.",
    ],
    evita: [
      "Dissertação ENEM (“no Brasil, é notório…”).",
      "Texto só de licitação/controle sem o recorte de TI.",
    ],
  },
  tcegoControle: {
    id: "tcego-controle",
    concurso: "TCE-GO",
    banca: "FCC",
    cargo: "ACE · Controle Externo",
    tipo: "Estudo de caso da especialidade — não é dissertação de vestibular.",
    criterios: [
      "Respondeu o caso: fato, irregularidade possível, o que o controle faria.",
      "Ângulo de Controle Externo: licitação, contrato, transparência, evidência, competência do TCE.",
      "Fundamento cabível (CF arts. 70–71, 14.133, LAI) ligado ao caso.",
      "Conclusão de analista, não de colunista.",
    ],
    evita: [
      "Dissertação ENEM.",
      "Puxar SQL, rede ou arquitetura de software (isso é do cargo de TI).",
    ],
  },
};

function redacaoLerChaveGemini() {
  try {
    return String(localStorage.getItem(REDACAO_GEMINI_KEY) || "").trim();
  } catch {
    return "";
  }
}

function redacaoSalvarChaveGemini(key) {
  try {
    const k = String(key || "").trim();
    if (k) localStorage.setItem(REDACAO_GEMINI_KEY, k);
    else localStorage.removeItem(REDACAO_GEMINI_KEY);
  } catch {
    /* ignore */
  }
}

function redacaoRubricasDe(pessoa, concursos) {
  const ids = Array.isArray(concursos) ? concursos : concursos ? [concursos] : [];
  const ordem = ["sedf", "pmdf", "tcego"];
  const escolhidos = ordem.filter((id) => ids.some((c) => String(c || "").toLowerCase() === id));
  const alvo = escolhidos.length ? escolhidos : ["sedf"];
  const amanda = pessoa === "amanda";
  return alvo
    .map((id) => {
      if (id === "sedf") return REDACAO_RUBRICAS.sedf;
      if (id === "pmdf") return REDACAO_RUBRICAS.pmdf;
      if (id === "tcego") return amanda ? REDACAO_RUBRICAS.tcegoControle : REDACAO_RUBRICAS.tcegoTi;
      return null;
    })
    .filter(Boolean);
}

function redacaoRotuloRubricas(rubricas) {
  return (rubricas || []).map((r) => `${r.concurso} · ${r.cargo}`).join(" · ");
}

function redacaoPrecheck(texto) {
  const c = redacaoContagem(texto);
  if (c.palavras < 80) {
    return {
      ok: false,
      local: true,
      parecer: {
        acertou: [],
        errou: ["Texto curto demais para parecer de cargo — parece rascunho, não redação de prova."],
        faltou: ["Escreve ou cola pelo menos umas 80 palavras (perto de 20 linhas de prova) e avalia de novo."],
        aviso: "Parecer local. O modelo só entra com texto de treino, não com parágrafo solto.",
      },
    };
  }
  return { ok: true, contagem: c };
}

function redacaoMontarPedido(opts) {
  const rubricas = redacaoRubricasDe(opts?.pessoa, opts?.concursos);
  const rotulo = redacaoRotuloRubricas(rubricas);
  const blocos = rubricas
    .map((r) => {
      const crit = (r.criterios || []).map((x) => `- ${x}`).join("\n");
      const evita = (r.evita || []).map((x) => `- ${x}`).join("\n");
      return `## ${r.concurso} · ${r.banca} · ${r.cargo}\nTipo: ${r.tipo}\nCobra:\n${crit}\nEvite:\n${evita}`;
    })
    .join("\n\n");
  const sistema = `Você avalia redação de TREINO para concurso brasileiro. Não é a banca oficial e não inventa nota 0–100.
Responda SOMENTE um JSON válido, sem markdown, neste formato:
{"acertou":["..."],"errou":["..."],"faltou":["..."]}
Cada array tem de 2 a 6 frases curtas em português do Brasil. Cite trecho curto do texto quando apontar erro.
Se o texto não for redação (lista, código, lorem), diga isso em errou e esvazie acertou.
Aplique TODAS as rubricas. Se houver mais de um concurso, o texto precisa pagar os dois formatos — aponte o que vale nos dois e o que só serve em um.`;
  const usuario = `Pessoa: ${opts?.pessoa === "amanda" ? "Amanda (sem TI)" : "Gabriel"}
Concursos marcados: ${rotulo}
Tema: ${opts?.titulo || "sem título"}
Proposta: ${opts?.proposta || "sem proposta"}

Rubricas:
${blocos}

Texto do candidato:
"""
${String(opts?.texto || "").trim()}
"""`;
  return { sistema, usuario, rubricas, rotulo };
}

function redacaoParseParecer(raw) {
  const txt = String(raw || "").trim();
  const json = txt.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  let data;
  try {
    data = JSON.parse(json);
  } catch {
    const m = json.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      data = JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
  const limpa = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((x) => String(x || "").trim())
      .filter(Boolean)
      .slice(0, 8);
  const acertou = limpa(data.acertou);
  const errou = limpa(data.errou);
  const faltou = limpa(data.faltou);
  if (!acertou.length && !errou.length && !faltou.length) return null;
  return { acertou, errou, faltou };
}

async function redacaoChamarGemini(pedido, key) {
  const k = String(key || "").trim();
  if (!k) {
    const err = new Error("Sem chave Gemini.");
    err.codigo = "sem-chave";
    throw err;
  }
  let ultimo = "Falha na API.";
  for (const modelo of REDACAO_GEMINI_MODELOS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(k)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: pedido.sistema }] },
        contents: [{ role: "user", parts: [{ text: pedido.usuario }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      ultimo = body?.error?.message || `HTTP ${res.status}`;
      continue;
    }
    const texto = body?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") || "";
    const parecer = redacaoParseParecer(texto);
    if (parecer) return { ...parecer, modelo, aviso: "Parecer de treino com a rubrica do cargo. Não é correção da banca." };
    ultimo = "O modelo não devolveu JSON utilizável.";
  }
  const err = new Error(ultimo);
  err.codigo = "api";
  throw err;
}

const REDACAO_MINUTOS = [20, 40, 60];

function redacaoMinutosDoFazer(fazer, titulo) {
  const t = `${titulo || ""} ${fazer || ""}`.toLowerCase();
  if (/\b20\s*min/.test(t) && !/\b40\s*min/.test(t) && !/simulado/.test(t)) return 20;
  if (/\b40\s*min/.test(t) || /simulado/.test(t)) return 40;
  return 60;
}

function redacaoContagem(texto) {
  const t = String(texto || "");
  const trim = t.trim();
  const palavras = trim ? trim.split(/\s+/).length : 0;
  const linhas = t ? t.split(/\n/).length : 0;
  const est = trim ? Math.max(1, Math.ceil(trim.length / 70)) : 0;
  return { palavras, linhas, est, chars: t.length };
}

function redacaoFmtRelogio(seg) {
  const s = Math.max(0, Math.floor(Number(seg) || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function redacaoSabadoDe(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  const dt = new Date(y, m - 1, d, 12);
  if (dt.getDay() !== 0) return null;
  dt.setDate(dt.getDate() - 1);
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${dt.getFullYear()}-${mm}-${dd}`;
}

window.CNAPROVADO_REDACAO = {
  CHECKLIST: REDACAO_CHECKLIST,
  EXTRAS: REDACAO_EXTRAS,
  MINUTOS: REDACAO_MINUTOS,
  RUBRICAS: REDACAO_RUBRICAS,
  minutosDoFazer: redacaoMinutosDoFazer,
  contagem: redacaoContagem,
  relogio: redacaoFmtRelogio,
  sabadoDe: redacaoSabadoDe,
  lerChave: redacaoLerChaveGemini,
  salvarChave: redacaoSalvarChaveGemini,
  rubricasDe: redacaoRubricasDe,
  rotuloRubricas: redacaoRotuloRubricas,
  precheck: redacaoPrecheck,
  montarPedido: redacaoMontarPedido,
  parseParecer: redacaoParseParecer,
  chamarGemini: redacaoChamarGemini,
};
