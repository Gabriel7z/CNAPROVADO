const PLANO_INICIO = "2026-09-14";
const PLANO_DIAS = 30;

const PLANOS = {
  gabriel: {
    id: "gabriel",
    dono: "Gabriel",
    alvo: "PMDF · TCE-GO TI · SEDF Gestor TI",
    materias: "D.Adm, D.Const, Português, TI e redação no fim de semana",
  },
  amanda: {
    id: "amanda",
    dono: "Amanda",
    alvo: "base jurídica e português",
    materias: "D.Adm, D.Const, Português e redação",
  },
};

function dataDoPlano(offset) {
  const d = new Date(`${PLANO_INICIO}T12:00:00`);
  d.setDate(d.getDate() + offset);
  return d;
}

function isoData(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function semanalGabriel(semana) {
  const adm = [
    {
      materia: "D.Adm",
      titulo: "Fontes, conceito e objeto",
      fazer: "Tópico 1 da playlist (Thállius). Faz Q1–50 no app, sem embaralhar. Anota o que errar.",
    },
    {
      materia: "D.Adm",
      titulo: "Administração Direta",
      fazer: "Tópico 3. Q101–150: critério formal, entes, autonomia, Município sem Judiciário.",
    },
    {
      materia: "D.Adm",
      titulo: "Administração Indireta",
      fazer: "Tópico 4. Q151–200: reserva legal, tutela, autarquia, OAB sui generis.",
    },
    {
      materia: "D.Adm",
      titulo: "Princípios, poderes e atos + LC 840",
      fazer: "Revisa direta/indireta no Anki. Estuda princípios (LIMPE), poderes e noções de ato. Lê o índice da LC 840/2011 (agentes do DF).",
    },
  ];
  const consti = [
    {
      materia: "D.Const",
      titulo: "Princípios fundamentais",
      fazer: "CF arts. 1º a 4º. República, Federação, objetivos. 15 itens certo/errado.",
    },
    {
      materia: "D.Const",
      titulo: "Organização do Estado e do DF",
      fazer: "União, Estados, Municípios e DF. Autonomia vs soberania. 15 itens.",
    },
    {
      materia: "D.Const",
      titulo: "Administração Pública na CF",
      fazer: "Art. 37 (LIMPE), servidores, art. 37 §6º. Cruza com o D.Adm do dia anterior.",
    },
    {
      materia: "D.Const",
      titulo: "Poderes e Tribunal de Contas",
      fazer: "Arts. 70 a 75 (fiscalização). Harmonia e independência. Base PM + TCE + SEDF.",
    },
  ];
  const pt = [
    {
      materia: "Português",
      titulo: "Interpretação de texto",
      fazer: "2 textos curtos + 12 itens. Marca inferência vs o que está escrito.",
    },
    {
      materia: "Português",
      titulo: "Crase e pontuação",
      fazer: "Regra da crase + vírgula. 15 itens. Erro vai para o sábado.",
    },
    {
      materia: "Português",
      titulo: "Concordância e regência",
      fazer: "Verbal e nominal. 15 itens Cebraspe. Reescreve 3 frases.",
    },
    {
      materia: "Português",
      titulo: "Coesão e reescrita",
      fazer: "Pronomes, conectivos, equivalência. 12 itens + 1 parágrafo reescrito.",
    },
  ];
  const ti = [
    {
      materia: "TI",
      titulo: "Informática básica + redes",
      fazer: "Windows, navegador, Google Classroom/Docs (SEDF). Depois TCP/IP, IP, DNS, HTTP. 20 itens mistos.",
    },
    {
      materia: "TI",
      titulo: "Banco de dados e SQL",
      fazer: "SELECT, JOIN, PK/FK, normalização. 15 questões SQL. Um exercício no papel: modelar 3 tabelas.",
    },
    {
      materia: "TI",
      titulo: "Segurança e LGPD",
      fazer: "Confidencialidade, integridade, disponibilidade. Backup, malware. LGPD: privacy by design, minimização. 15 itens.",
    },
    {
      materia: "TI",
      titulo: "Dev, Git e governança",
      fazer: "HTML/CSS/JS, REST/JSON, Git. COBIT/ITIL só o recorte de conceito. 15 itens.",
    },
  ];
  const redacaoSab = [
    {
      materia: "Redação",
      titulo: "Estrutura da dissertação",
      fazer: "Tema: o papel da Administração Pública na vida do cidadão. 20–30 linhas. Introdução, 2 desenvolvimentos, conclusão.",
    },
    {
      materia: "Redação",
      titulo: "Educação e tecnologia",
      fazer: "Tema SEDF: tecnologia na escola pública. 20–30 linhas. Usa 1 argumento jurídico (CF art. 205 ou 37) e 1 prático.",
    },
    {
      materia: "Redação",
      titulo: "Controle e transparência",
      fazer: "Tema TCE/PM: controle externo e interesse público. 20–30 linhas. Evita clichê; cita um princípio da AP.",
    },
    {
      materia: "Redação",
      titulo: "Simulado de discursiva",
      fazer: "Sorteia um dos três temas já feitos e reescreve do zero em 40 min, sem consulta. Depois corrige gramática.",
    },
  ];
  const redacaoDom = [
    {
      materia: "Redação",
      titulo: "Reescrita + revisão da semana",
      fazer: "Reescreve o texto de sábado (corte 10%). 20 min de Anki de D.Adm. Lista 5 erros da semana.",
    },
    {
      materia: "Redação",
      titulo: "Parágrafo de intervenção",
      fazer: "Escreve só a conclusão do texto de sábado, mais concreta. Revisa Q de Const da quinta.",
    },
    {
      materia: "Redação",
      titulo: "Coesão no texto",
      fazer: "Marca conectivos do texto de sábado e troca 5. 20 min de TI (erros de sexta).",
    },
    {
      materia: "Redação",
      titulo: "Leitura em voz alta",
      fazer: "Lê o simulado em voz alta, corrige cacófato e período longo. Fecha o mês com Anki das 4 matérias.",
    },
  ];
  const s = Math.min(semana, 3);
  return {
    1: adm[s],
    2: pt[s],
    3: {
      materia: "D.Adm",
      titulo: `${adm[s].titulo} — questões`,
      fazer: "Fecha a bateria do tópico no app e refaz só os erros. 20 min de Anki no fim.",
    },
    4: consti[s],
    5: ti[s],
    6: redacaoSab[s],
    0: redacaoDom[s],
  };
}

function semanalAmanda(semana) {
  const adm = [
    {
      materia: "D.Adm",
      titulo: "Fontes, conceito e objeto",
      fazer: "Tópico 1 da playlist. Q1–50 no app, sem embaralhar. Caderno só do que errar.",
    },
    {
      materia: "D.Adm",
      titulo: "Administração Direta",
      fazer: "Tópico 3. Q101–150. Foca: quem é a AP, Município sem Judiciário, criação da indireta.",
    },
    {
      materia: "D.Adm",
      titulo: "Administração Indireta",
      fazer: "Tópico 4. Q151–200. Reserva legal (cria vs autoriza) e tutela administrativa.",
    },
    {
      materia: "D.Adm",
      titulo: "Princípios e LC 840",
      fazer: "LIMPE + Anki da direta/indireta. Abre a LC 840/2011: cargo, emprego, estabilidade (visão geral).",
    },
  ];
  const consti = [
    {
      materia: "D.Const",
      titulo: "Princípios fundamentais",
      fazer: "CF arts. 1º a 4º. 15 itens certo/errado. Escreve os fundamentos da República de memória.",
    },
    {
      materia: "D.Const",
      titulo: "Direitos e garantias",
      fazer: "Art. 5º (os mais cobrados: legalidade, devido processo, honra, igualdade). 15 itens.",
    },
    {
      materia: "D.Const",
      titulo: "Organização do Estado e art. 37",
      fazer: "Entes federados + Administração Pública na CF. Cruza com o D.Adm da segunda.",
    },
    {
      materia: "D.Const",
      titulo: "Poderes e educação na CF",
      fazer: "Indepêndencia dos Poderes. Arts. 205 a 214 (educação) — base SEDF. 12 itens.",
    },
  ];
  const ptTer = [
    {
      materia: "Português",
      titulo: "Interpretação",
      fazer: "2 textos + 12 itens. Separa o que o texto diz do que você acha.",
    },
    {
      materia: "Português",
      titulo: "Crase e pontuação",
      fazer: "15 itens. Monta um mini-quadro: a + a(o) = crase.",
    },
    {
      materia: "Português",
      titulo: "Concordância",
      fazer: "15 itens. Sujeito coletivo, % e ‘um dos que’.",
    },
    {
      materia: "Português",
      titulo: "Regência e crase juntas",
      fazer: "12 itens + reescreve 4 frases do caderno de erros.",
    },
  ];
  const ptSex = [
    {
      materia: "Português",
      titulo: "Ortografia e acentuação",
      fazer: "por que / porque / porquê. 15 itens. Copia 10 palavras que você sempre erra.",
    },
    {
      materia: "Português",
      titulo: "Pronomes e coesão",
      fazer: "Colocação pronominal no estilo banca. 12 itens.",
    },
    {
      materia: "Português",
      titulo: "Reescrita de frases",
      fazer: "Equivalência e paralelismo. 12 itens Cebraspe.",
    },
    {
      materia: "Português",
      titulo: "Simulado de língua",
      fazer: "20 itens mistos da semana. Sem consulta. Depois só revisa o erro.",
    },
  ];
  const redacaoSab = [
    {
      materia: "Redação",
      titulo: "Estrutura da dissertação",
      fazer: "Tema: igualdade e Administração Pública. 20–30 linhas. Introdução com recorte claro.",
    },
    {
      materia: "Redação",
      titulo: "Direitos fundamentais",
      fazer: "Tema: liberdade vs interesse público. 20–30 linhas. Um parágrafo com CF art. 5º.",
    },
    {
      materia: "Redação",
      titulo: "Educação pública",
      fazer: "Tema: o direito à educação. 20–30 linhas. Usa art. 205 ou 206.",
    },
    {
      materia: "Redação",
      titulo: "Simulado",
      fazer: "40 min, tema surpresa dos três anteriores. Depois corrige gramática com a lista da sexta.",
    },
  ];
  const redacaoDom = [
    {
      materia: "Redação",
      titulo: "Reescrita",
      fazer: "Corta 10% do texto de sábado. 20 min de Anki de D.Adm.",
    },
    {
      materia: "Redação",
      titulo: "Conclusão forte",
      fazer: "Reescreve só o último parágrafo, com proposta concreta. Revisa Const da quarta.",
    },
    {
      materia: "Redação",
      titulo: "Conectivos",
      fazer: "Troca 5 conectivos fracos. Lê em voz alta. Anki da semana.",
    },
    {
      materia: "Redação",
      titulo: "Fechamento do mês",
      fazer: "Lê os 4 textos e marca o melhor parágrafo. 30 min de revisão geral (Adm + Const + PT).",
    },
  ];
  const s = Math.min(semana, 3);
  return {
    1: adm[s],
    2: ptTer[s],
    3: consti[s],
    4: {
      materia: "D.Const",
      titulo: `${consti[s].titulo} — questões`,
      fazer: "20 itens certo/errado do tema da quarta, sem teoria nova. Erro vai para o domingo.",
    },
    5: ptSex[s],
    6: redacaoSab[s],
    0: redacaoDom[s],
  };
}

const HORAS_OPCOES = [1, 2, 3, 4];

function normalizarHoras(n) {
  const h = Number(n);
  if (h <= 1) return 1;
  if (h <= 2) return 2;
  if (h <= 3) return 3;
  return 4;
}

function cargaPadrao() {
  return { dia: 2, fim: 2 };
}

function normalizarCarga(carga) {
  const base = cargaPadrao();
  const c = carga && typeof carga === "object" ? carga : {};
  return {
    dia: normalizarHoras(c.dia ?? c.horas ?? base.dia),
    fim: normalizarHoras(c.fim ?? c.horas ?? base.fim),
  };
}

function fatorCarga(horas) {
  if (horas <= 1) return 0.4;
  if (horas <= 2) return 0.7;
  return 1;
}

function escalaNum(n, fator, min) {
  return Math.max(min, Math.round(Number(n) * fator));
}

function rotuloHoras(horas) {
  return {
    1: "1h · versão curta",
    2: "2h · dia típico",
    3: "3h · plano cheio",
    4: "4h · cheio + revisão",
  }[horas];
}

function dicaCarga(carga) {
  const c = normalizarCarga(carga);
  const partes = [];
  if (c.dia === 1) partes.push("Na semana o dia fica curto: menos questão e aula mais objetiva.");
  else if (c.dia === 2) partes.push("Na semana cabe teoria + um bloco de questões.");
  else if (c.dia === 3) partes.push("Na semana o plano vai cheio, no ritmo em que o mês 1 foi montado.");
  else partes.push("Na semana entra o plano cheio e ainda revisão dos erros.");
  if (c.fim === 1) partes.push("No fim de semana a redação vira rascunho curto.");
  else if (c.fim === 2) partes.push("No fim de semana dá para escrever um texto enxuto.");
  else if (c.fim === 3) partes.push("No fim de semana a dissertação fica no tamanho de prova.");
  else partes.push("No fim de semana sobra tempo para passar o texto a limpo.");
  return partes.join(" ");
}

function adaptarFazer(fazer, horas, materia) {
  const h = normalizarHoras(horas);
  const f = fatorCarga(h);
  let t = String(fazer || "");
  t = t.replace(/Q(\d+)[–-](\d+)/g, (_, a, b) => {
    const de = Number(a);
    const ate = Number(b);
    const n = Math.max(8, Math.round((ate - de + 1) * f));
    return `Q${de}–${de + n - 1}`;
  });
  t = t.replace(/(\d+)–(\d+) linhas/g, (_, a, b) => {
    return `${escalaNum(a, f, 8)}–${escalaNum(b, f, 12)} linhas`;
  });
  t = t.replace(/(\d+) itens/g, (_, n) => `${escalaNum(n, f, 6)} itens`);
  t = t.replace(/(\d+) textos?( curtos?)?/g, (_, n, curtos) => {
    const x = h <= 1 ? 1 : Number(n);
    if (x === 1) return curtos ? "1 texto curto" : "1 texto";
    return `${x} textos${curtos ? " curtos" : ""}`;
  });
  t = t.replace(/(\d+) min/g, (_, n) => `${escalaNum(n, f, 10)} min`);
  t = t.replace(/(\d+) frases/g, (_, n) => `${escalaNum(n, f, 2)} frases`);
  t = t.replace(/(\d+) palavras/g, (_, n) => `${escalaNum(n, f, 5)} palavras`);
  t = t.replace(/(\d+) conectivos/g, (_, n) => `${escalaNum(n, f, 2)} conectivos`);
  if (h === 4) {
    if (String(materia || "").startsWith("Redação")) {
      if (!/limpo/i.test(t)) t += " Com 4h: passa o texto a limpo e corrige gramática no fim.";
    } else if (/anki/i.test(t)) {
      t += " Com 4h: relê o trecho da teoria que você marcou e refaz só o que errou.";
    } else {
      t += " Com 4h: 20 min de Anki só dos erros e relê o pedaço da teoria que você marcou.";
    }
  }
  return t;
}

function horasDoTurno(data, carga) {
  const c = normalizarCarga(carga);
  const wd = data.getDay();
  return wd === 0 || wd === 6 ? c.fim : c.dia;
}

const REVISAO_PASSOS = [
  { apos: 1, etiqueta: "24h" },
  { apos: 3, etiqueta: "3 dias" },
  { apos: 7, etiqueta: "7 dias" },
  { apos: 15, etiqueta: "15 dias" },
];

function tituloBase(titulo) {
  return String(titulo || "")
    .replace(/\s+—\s+questões$/i, "")
    .trim();
}

function maxRevisoes(horas) {
  const h = normalizarHoras(horas);
  if (h <= 1) return 1;
  if (h <= 3) return 2;
  return 3;
}

function minutosRevisao(horas, qtd) {
  const h = normalizarHoras(horas);
  const total = { 1: 10, 2: 16, 3: 22, 4: 30 }[h];
  const tetoUm = { 1: 10, 2: 12, 3: 15, 4: 20 }[h];
  const n = Math.max(1, qtd);
  return Math.max(6, Math.min(tetoUm, Math.round(total / n)));
}

function textoRevisao(origem, minutos) {
  const chave = materiaChave(origem.materia);
  if (chave === "red") {
    return `${minutos} min. Relê o texto e corta uma frase fraca.`;
  }
  return `${minutos} min de Anki e erros. Sem conteúdo novo.`;
}

function anexarRevisoes(dias) {
  return dias.map((dia) => {
    const vistos = new Set();
    const candidatos = [];
    REVISAO_PASSOS.forEach((passo) => {
      const origem = dias[dia.i - passo.apos];
      if (!origem) return;
      const chave = materiaChave(origem.materia);
      const baseOrigem = tituloBase(origem.titulo);
      const baseHoje = tituloBase(dia.titulo);
      if (chave === materiaChave(dia.materia) && baseOrigem === baseHoje) return;
      if (passo.apos === 1 && chave === "red" && materiaChave(dia.materia) === "red") return;
      if (vistos.has(chave)) return;
      vistos.add(chave);
      candidatos.push({ origem, passo, chave });
    });
    const teto = maxRevisoes(dia.horas);
    const escolhidas = candidatos.slice(0, teto);
    const min = escolhidas.length ? minutosRevisao(dia.horas, escolhidas.length) : 0;
    const revisoes = escolhidas.map(({ origem, passo, chave }) => ({
      iso: origem.iso,
      materia: origem.materia,
      titulo: tituloBase(origem.titulo),
      etiqueta: passo.etiqueta,
      apos: passo.apos,
      minutos: min,
      chave,
      fazer: textoRevisao(origem, min),
    }));
    return { ...dia, revisoes };
  });
}

function diasDoPlano(kind, carga) {
  const out = [];
  for (let i = 0; i < PLANO_DIAS; i += 1) {
    const d = dataDoPlano(i);
    const semana = Math.min(Math.floor(i / 7), 3);
    const mapa = kind === "amanda" ? semanalAmanda(semana) : semanalGabriel(semana);
    const bloco = mapa[d.getDay()];
    const horas = horasDoTurno(d, carga);
    out.push({
      i,
      iso: isoData(d),
      data: d,
      semana: semana + 1,
      ...bloco,
      horas,
      carga: rotuloHoras(horas),
      fazer: adaptarFazer(bloco.fazer, horas, bloco.materia),
    });
  }
  return anexarRevisoes(out);
}

function hojeIso() {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const day = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const MESES_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function materiaChave(materia) {
  const m = String(materia || "").toLowerCase();
  if (m.startsWith("d.adm") || m.includes("administrativo")) return "adm";
  if (m.startsWith("d.const") || m.includes("constitucional")) return "const";
  if (m.startsWith("portugu")) return "pt";
  if (m === "ti" || m.startsWith("ti ")) return "ti";
  if (m.startsWith("reda")) return "red";
  return "out";
}

function materiaCurta(materia) {
  const map = { adm: "Adm", const: "Const", pt: "PT", ti: "TI", red: "Red" };
  return map[materiaChave(materia)] || String(materia || "").slice(0, 4);
}

function mesesDoCalendario(dias) {
  const seen = [];
  const keys = new Set();
  dias.forEach((d) => {
    const ano = d.data.getFullYear();
    const mes = d.data.getMonth();
    const key = `${ano}-${mes}`;
    if (keys.has(key)) return;
    keys.add(key);
    seen.push({ ano, mes, nome: `${MESES_PT[mes]} ${ano}` });
  });
  return seen;
}

function celulasDoMes(ano, mes, porIso) {
  const first = new Date(ano, mes, 1, 12);
  const lastDay = new Date(ano, mes + 1, 0).getDate();
  const pad = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < pad; i += 1) cells.push({ vazio: true });
  for (let day = 1; day <= lastDay; day += 1) {
    const dt = new Date(ano, mes, day, 12);
    const iso = isoData(dt);
    cells.push({
      vazio: false,
      day,
      iso,
      item: porIso.get(iso) || null,
    });
  }
  return cells;
}

window.CNAPROVADO_PLANOS = {
  PLANOS,
  HORAS_OPCOES,
  REVISAO_PASSOS,
  diasDoPlano,
  hojeIso,
  isoData,
  materiaChave,
  materiaCurta,
  mesesDoCalendario,
  celulasDoMes,
  normalizarHoras,
  normalizarCarga,
  cargaPadrao,
  rotuloHoras,
  dicaCarga,
  adaptarFazer,
};
