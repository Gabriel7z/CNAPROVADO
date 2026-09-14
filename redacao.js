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
  minutosDoFazer: redacaoMinutosDoFazer,
  contagem: redacaoContagem,
  relogio: redacaoFmtRelogio,
  sabadoDe: redacaoSabadoDe,
};
