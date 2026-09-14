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

function diasDoPlano(kind) {
  const out = [];
  for (let i = 0; i < PLANO_DIAS; i += 1) {
    const d = dataDoPlano(i);
    const semana = Math.min(Math.floor(i / 7), 3);
    const mapa = kind === "amanda" ? semanalAmanda(semana) : semanalGabriel(semana);
    const bloco = mapa[d.getDay()];
    out.push({
      i,
      iso: isoData(d),
      data: d,
      semana: semana + 1,
      ...bloco,
    });
  }
  return out;
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
  diasDoPlano,
  hojeIso,
  isoData,
  materiaChave,
  materiaCurta,
  mesesDoCalendario,
  celulasDoMes,
};
