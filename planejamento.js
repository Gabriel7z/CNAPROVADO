const PLANO_INICIO = "2026-09-14";
const PLANO_DIAS = 30;

const EMAIL_GABRIEL = "ggabriel.ferreira.099@gmail.com";

const CONCURSOS = {
  sedf: { id: "sedf", nome: "SEDF", banca: "Quadrix", cargo: "Gestor TI" },
  pmdf: { id: "pmdf", nome: "PM DF", banca: "Cebraspe", cargo: "área policial" },
  tcego: { id: "tcego", nome: "TCE-GO", banca: "FCC", cargo: "TI" },
};

const PLANOS = {
  gabriel: {
    id: "gabriel",
    dono: "Gabriel",
    email: EMAIL_GABRIEL,
    materias: "D.Adm, D.Const, Português, TI e redação",
  },
  amanda: {
    id: "amanda",
    dono: "Amanda",
    materias: "D.Adm, D.Const, Português e redação",
  },
};

function normalizarConcurso(id) {
  const k = String(id || "").toLowerCase();
  if (k === "pmdf" || k === "tcego" || k === "sedf") return k;
  return "sedf";
}

function normalizarPessoa(id) {
  return id === "amanda" ? "amanda" : "gabriel";
}

function metaPlano(pessoa, concurso) {
  const p = normalizarPessoa(pessoa);
  const c = CONCURSOS[normalizarConcurso(concurso)];
  const base = PLANOS[p];
  return {
    ...base,
    concurso: c.id,
    alvo: p === "gabriel" ? `${c.nome} · ${c.cargo} · ${c.banca}` : `${c.nome} · ${c.banca}`,
    materias: base.materias,
  };
}

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

function bloco(materia, titulo, fazer) {
  return { materia, titulo, fazer };
}

const CICLOS = {
  sedf: {
    adm: [
      bloco("D.Adm", "Fontes, conceito e objeto", "SEDF/Quadrix. Tópico 1 (Thállius). Q1–50 no app, sem embaralhar. Anota o que errar."),
      bloco("D.Adm", "Organização administrativa", "Quadrix cobra muito: direta, indireta, desconcentração. Tópico 3. Q101–150."),
      bloco("D.Adm", "Atos e poderes", "Atos administrativos + poderes (Quadrix). Cruza com o Anki da semana."),
      bloco("D.Adm", "Agentes, LC 840 e controle", "Agentes públicos do DF (LC 840/2011). Controle e responsabilidade civil. Revisa direta/indireta."),
    ],
    consti: [
      bloco("D.Const", "Princípios fundamentais", "CF arts. 1º a 4º. República, Federação, objetivos. 15 itens certo/errado."),
      bloco("D.Const", "Organização do Estado e do DF", "União, Estados, Municípios e DF. Autonomia vs soberania. 15 itens."),
      bloco("D.Const", "Administração Pública na CF", "Art. 37 (LIMPE), servidores, §6º. Cruza com o D.Adm."),
      bloco("D.Const", "Educação na CF", "Arts. 205 a 214 — recorte SEDF. 12 itens + 1 esquema no papel."),
    ],
    pt: [
      bloco("Português", "Interpretação de texto", "Estilo Quadrix. 2 textos curtos + 12 itens. Inferência vs o que está escrito."),
      bloco("Português", "Reescrita de frases", "Quadrix pesa reescrita (~16%). 15 itens. Troca 3 frases sem mudar o sentido."),
      bloco("Português", "Morfologia e sintaxe", "Classe gramatical + análise sintática. 15 itens Quadrix."),
      bloco("Português", "Coesão e pontuação", "Pronomes, conectivos, vírgula. 12 itens + 1 parágrafo reescrito."),
    ],
    pt2: [
      bloco("Português", "Ortografia", "Acentuação e porquê. 15 itens Quadrix. Copia 10 palavras que você erra."),
      bloco("Português", "Concordância e regência", "Verbal e nominal. 15 itens. Reescreve 3 frases."),
      bloco("Português", "Crase e pontuação", "Regra da crase + vírgula. 15 itens."),
      bloco("Português", "Simulado de língua", "20 itens mistos Quadrix da semana, sem consulta. Só revisa o erro."),
    ],
    ti: [
      bloco("TI", "Windows e arquivos", "Quadrix: Windows, pastas, atalhos. 20 itens. Mexe no próprio PC: 5 atalhos de verdade."),
      bloco("TI", "Office e editores", "Word, Excel, PowerPoint (e o equivalente livre). 15 itens Quadrix."),
      bloco("TI", "Navegador, internet e malware", "Chrome/Edge, vírus, backup, e-mail. 15 itens. Lista 5 golpes comuns."),
      bloco("TI", "Redes básicas e serviços", "HTTP, DNS, IP, nuvem, Classroom/Docs (SEDF). 15 itens mistos."),
    ],
    redSab: [
      bloco("Redação", "Estrutura da dissertação", "Tema SEDF: o papel da Administração na vida do cidadão. 20–30 linhas."),
      bloco("Redação", "Tecnologia na escola", "Tema SEDF: tecnologia na escola pública. 1 argumento CF art. 205 ou 37 + 1 prático. 20–30 linhas."),
      bloco("Redação", "Educação pública", "Direito à educação. Art. 205 ou 206. 20–30 linhas."),
      bloco("Redação", "Simulado de discursiva", "40 min, um dos temas SEDF já feitos, sem consulta. Depois gramática."),
    ],
    redDom: [
      bloco("Redação", "Reescrita + revisão", "Reescreve o texto de sábado (corte 10%). 20 min de Anki de D.Adm."),
      bloco("Redação", "Conclusão", "Reescreve só o último parágrafo, com proposta para a escola/DF."),
      bloco("Redação", "Coesão", "Marca conectivos e troca 5. Lê em voz alta."),
      bloco("Redação", "Fechamento", "Lê os 4 textos SEDF e marca o melhor parágrafo. Anki das matérias da semana."),
    ],
  },
  pmdf: {
    adm: [
      bloco("D.Adm", "Fontes, conceito e objeto", "PMDF/Cebraspe. Tópico 1. Q1–50 no app. Cuidado com o certo/errado pegadinha."),
      bloco("D.Adm", "Atos e poderes", "Cebraspe ama atos e poderes. Marca nulidade vs anulabilidade. Cruza com Q do tópico."),
      bloco("D.Adm", "Licitações (Lei 14.133)", "PMDF puxa 14.133. Princípios, fases, dispensa/inexigibilidade. 15 itens Cebraspe."),
      bloco("D.Adm", "Improbidade e responsabilidade", "Lei 8.429 (após 14.230) + responsabilidade civil do Estado. 12 itens."),
    ],
    consti: [
      bloco("D.Const", "Direitos e garantias fundamentais", "Art. 5º — o que mais cai na PMDF. 15 itens Cebraspe."),
      bloco("D.Const", "Defesa do Estado e da sociedade", "Arts. 136 a 144 (GLO, PM, segurança pública). 15 itens."),
      bloco("D.Const", "Organização do Estado", "União, Estados, DF, Municípios. 12 itens."),
      bloco("D.Const", "Organização dos Poderes", "Executivo, Legislativo, Judiciário — visão PM. 12 itens."),
    ],
    pt: [
      bloco("Português", "Interpretação Cebraspe", "2 textos + 12 itens. O erro costuma estar no detalhe do enunciado."),
      bloco("Português", "Reescrita e equivalência", "Cebraspe: reescrita (~16%). 15 itens. Não inventa sentido."),
      bloco("Português", "Coesão e pontuação", "Conectivos + vírgula. 15 itens certo/errado."),
      bloco("Português", "Morfologia e semântica", "Classe da palavra + sentido no texto. 12 itens."),
    ],
    pt2: [
      bloco("Português", "Concordância Cebraspe", "15 itens. Sujeito oculto e coletivo."),
      bloco("Português", "Regência e crase", "15 itens. Marca o verbo que pede preposição."),
      bloco("Português", "Tipologia e gênero", "Narração vs dissertação. 12 itens."),
      bloco("Português", "Simulado Cebraspe", "20 itens mistos da semana, sem consulta."),
    ],
    ti: [
      bloco("TI", "Informática Cebraspe", "Conceitos de hardware, software, sistema operacional. 15 itens certo/errado."),
      bloco("TI", "Internet e navegação segura", "Browser, cookies, phishing. 15 itens. Estilo PMDF."),
      bloco("TI", "Segurança da informação", "Senha, malware, backup, LGPD no essencial. 15 itens."),
      bloco("TI", "Pacote office e nuvem", "Editor de texto, planilha, armazenamento. 12 itens."),
    ],
    redSab: [
      bloco("Redação", "Liberdade e segurança", "Tema PMDF: liberdade vs interesse público. Um parágrafo com art. 5º. 20–30 linhas."),
      bloco("Redação", "Direitos fundamentais", "Igualdade e Administração. Introdução com recorte claro. 20–30 linhas."),
      bloco("Redação", "Segurança pública", "Papel da polícia militar e da CF arts. 136–144. 20–30 linhas."),
      bloco("Redação", "Simulado PMDF", "40 min, tema surpresa das três redações. Depois gramática."),
    ],
    redDom: [
      bloco("Redação", "Reescrita", "Corta 10% do texto de sábado. 20 min de Anki de D.Adm."),
      bloco("Redação", "Conclusão forte", "Último parágrafo com proposta concreta (sem virar slogan)."),
      bloco("Redação", "Conectivos", "Troca 5 conectivos fracos. Lê em voz alta."),
      bloco("Redação", "Fechamento", "Lê os 4 textos PMDF. 30 min de revisão Adm + Const + PT."),
    ],
  },
  tcego: {
    adm: [
      bloco("D.Adm", "Fontes, conceito e objeto", "TCE-GO/FCC. Tópico 1. Q1–50 no app. Anota o que errar."),
      bloco("D.Adm", "Licitações (Lei 14.133)", "FCC do TCE puxa licitação. Fases, princípios, 14.133 (não fica só na 8.666). 15 itens."),
      bloco("D.Adm", "Serviços e contratos", "Serviços públicos + contratos administrativos. 15 itens FCC."),
      bloco("D.Adm", "Organização e controle", "Direta/indireta + controle (TCE). Cruza com arts. 70 a 75 da CF."),
    ],
    consti: [
      bloco("D.Const", "Poder Legislativo e TCs", "Arts. 44 a 75 — o que mais cai na FCC do TCE. 15 itens. Fiscalização e TCU/TCE."),
      bloco("D.Const", "Poder Judiciário", "Órgãos, garantias, súmula. 12 itens FCC."),
      bloco("D.Const", "Art. 5º e remédios", "Direitos individuais + habeas corpus, mandado de segurança. 15 itens."),
      bloco("D.Const", "Administração Pública na CF", "Arts. 37 a 43. Cruza com o D.Adm de controle."),
    ],
    pt: [
      bloco("Português", "Interpretação FCC", "FCC: interpretação pesa ~34%. 2 textos + 12 itens."),
      bloco("Português", "Reescrita e concordância", "Equivalência + concordância. 15 itens FCC."),
      bloco("Português", "Morfologia e clareza", "Classe gramatical + correção. 15 itens."),
      bloco("Português", "Pontuação e coesão", "Vírgula, conectivos. 12 itens + 1 parágrafo reescrito."),
    ],
    pt2: [
      bloco("Português", "Regência FCC", "Verbal e nominal. 15 itens."),
      bloco("Português", "Crase e pontuação", "15 itens. Mini-quadro da crase."),
      bloco("Português", "Vozes e reescrita", "Ativa/passiva. 12 itens."),
      bloco("Português", "Simulado FCC", "20 itens mistos da semana, sem consulta."),
    ],
    ti: [
      bloco("TI", "Redes e protocolos", "TCE-GO TI: TCP/IP, OSI, IP, DNS, HTTP. 20 itens."),
      bloco("TI", "Banco de dados e SQL", "SELECT, JOIN, PK/FK, normalização. 15 questões SQL. Modela 3 tabelas no papel."),
      bloco("TI", "Segurança e LGPD", "CIA, backup, malware, minimização de dados. 15 itens."),
      bloco("TI", "Dev, Git e governança", "HTML/CSS/JS, REST/JSON, Git. COBIT/ITIL só conceito. 15 itens."),
    ],
    redSab: [
      bloco("Redação", "Controle e transparência", "Tema TCE: controle externo e interesse público. Cite um princípio da AP. 20–30 linhas."),
      bloco("Redação", "Administração e cidadão", "Papel da Administração na vida do cidadão. 20–30 linhas."),
      bloco("Redação", "Finanças e controle", "Responsabilidade na gestão de recurso público. 20–30 linhas."),
      bloco("Redação", "Simulado TCE-GO", "40 min, um dos temas de controle, sem consulta. Depois gramática."),
    ],
    redDom: [
      bloco("Redação", "Reescrita", "Corta 10% do sábado. 20 min de Anki de D.Adm."),
      bloco("Redação", "Parágrafo de intervenção", "Conclusão mais concreta. Revisa Const da quinta."),
      bloco("Redação", "Coesão", "Troca 5 conectivos. Revisa os erros da sexta."),
      bloco("Redação", "Fechamento", "Lê os 4 textos TCE. Anki das matérias da semana."),
    ],
  },
};

function semanalPessoa(pessoa, concurso, semana) {
  const c = CICLOS[normalizarConcurso(concurso)] || CICLOS.sedf;
  const s = Math.min(semana, 3);
  const admQ = {
    materia: "D.Adm",
    titulo: `${c.adm[s].titulo} — questões`,
    fazer: "Fecha a bateria do tópico no app e refaz só os erros. 20 min de Anki no fim.",
  };
  const constQ = {
    materia: "D.Const",
    titulo: `${c.consti[s].titulo} — questões`,
    fazer: "20 itens certo/errado do tema, sem teoria nova. Erro vai para o caderno.",
  };
  if (pessoa === "amanda") {
    return {
      1: c.adm[s],
      2: c.pt[s],
      3: c.consti[s],
      4: constQ,
      5: c.pt2[s],
      6: c.redSab[s],
      0: c.redDom[s],
    };
  }
  return {
    1: c.adm[s],
    2: c.pt[s],
    3: admQ,
    4: c.consti[s],
    5: c.ti[s],
    6: c.redSab[s],
    0: c.redDom[s],
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

function diasDoPlano(kind, carga, concurso) {
  const pessoa = normalizarPessoa(kind);
  concurso = normalizarConcurso(concurso);
  const out = [];
  for (let i = 0; i < PLANO_DIAS; i += 1) {
    const d = dataDoPlano(i);
    const semana = Math.min(Math.floor(i / 7), 3);
    const mapa = semanalPessoa(pessoa, concurso, semana);
    const bloco = mapa[d.getDay()];
    const horas = horasDoTurno(d, carga);
    out.push({
      i,
      iso: isoData(d),
      data: d,
      semana: semana + 1,
      concurso,
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
  CONCURSOS,
  EMAIL_GABRIEL,
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
  normalizarConcurso,
  normalizarPessoa,
  metaPlano,
  cargaPadrao,
  rotuloHoras,
  dicaCarga,
  adaptarFazer,
};
