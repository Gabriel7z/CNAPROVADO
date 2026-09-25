const AULAS = {
  dadm: {
    id: "dadm",
    professor: "Thállius Moraes",
    titulo: "Tópicos 1 a 11 — Organização, atos e licitações (14.133)",
    titulos: {
      sedf: "Tópicos 1 a 9 — Organização e atos (14.133 fora do edital SEDF)",
      pmdf: "Tópicos 1 a 11 — Organização, atos e Lei 14.133",
      tcego: "Tópicos 1 a 11 — Organização, atos e Lei 14.133",
      sesodonto: "Tópicos 1 a 9 — Organização e atos (LC 840; 14.133 fora do recorte SES 2022)",
    },
    playlist: {
      titulo: "Playlist D.Adm · Thállius",
      url: "https://www.youtube.com/playlist?list=PLl6y9CqXvcCIqKM0eBk_YcFp17Ae2k21c",
    },
    aulas: [
      {
        id: "t1",
        titulo: "Tópico 1 — Fontes, conceito e objeto",
        url: "https://www.youtube.com/watch?v=JvaumlEAPnI",
        de: 1,
        ate: 50,
      },
      {
        id: "t2",
        titulo: "Tópico 2 — Estado, governo e freios e contrapesos",
        url: "https://www.youtube.com/watch?v=qATMH3H1Oek",
        de: 51,
        ate: 100,
      },
      {
        id: "t3",
        titulo: "Tópico 3 — Administração Direta",
        url: "https://www.youtube.com/watch?v=TqLkEtVvv00",
        de: 101,
        ate: 150,
      },
      {
        id: "t4",
        titulo: "Tópico 4 — Administração Indireta",
        url: "https://www.youtube.com/watch?v=Z8YWnT4STLQ",
        de: 151,
        ate: 200,
      },
      {
        id: "t5",
        titulo: "Tópico 5 — Administração Indireta parte 2: fundações, EP e SEM",
        url: "https://www.youtube.com/watch?v=w4ni5JEEzos",
        de: 201,
        ate: 250,
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3: fundação pública, empresa pública e sociedade de economia mista. Quadrix pesa organização; FCC e Cebraspe cobram o quadro cria × autoriza, capital e forma.",
      },
      {
        id: "t6",
        titulo: "Tópico 6 — Órgãos públicos",
        url: "https://www.youtube.com/watch?v=rbFGCGr9who",
        de: 251,
        ate: 300,
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3. Pegadinha clássica: órgão não é pessoa. Ministério/Receita = órgão; INSS = autarquia.",
      },
      {
        id: "t7",
        titulo: "Tópico 7 — Técnicas: centralização, descentralização, concentração e desconcentração",
        url: "https://www.youtube.com/watch?v=s7EWBxTVpHw",
        de: 301,
        ate: 350,
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3. Quadrix ama o par desconcentração (órgão, mesma pessoa) × descentralização (outra pessoa). TCE cruza com controle.",
      },
      {
        id: "t8",
        titulo: "Tópico 8 — Atos administrativos parte 1: conceito, unilateral/bilateral, vinculado e discricionário",
        url: "https://www.youtube.com/watch?v=3eT4dV2Hn2s",
        de: 351,
        ate: 425,
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3. Quadrix e Cebraspe amam: nem todo ato da Administração é ato administrativo; mérito só no discricionário.",
      },
      {
        id: "t9",
        titulo: "Tópico 9 — Atos administrativos parte 2: classificações (geral, complexo, perfeito/válido/eficaz)",
        url: "https://www.youtube.com/watch?v=gtYJ9HriH00",
        de: 426,
        ate: 500,
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3. Pegadinha clássica: complexo (vontades no mesmo ato) × composto (ato + aprovação). Aposentadoria = complexo.",
      },
      {
        id: "t10",
        titulo: "Tópico 10 — Licitações Lei 14.133 parte 1: aplicação, transição e princípios (Herbert Almeida)",
        url: "https://www.youtube.com/watch?v=QPbq4DMOFF4&list=PL70rxKg7qWNWV9bGrCV74SS2-vv38m4sh",
        de: 501,
        ate: 650,
        concursos: ["pmdf", "tcego"],
        vale: ["pmdf", "tcego"],
        compat: "PM DF e TCE-GO. SEDF não cobra 14.133 no edital Quadrix. Parte 1: quem se submete, o que não entra (estatais/13.303), transição da 8.666 e os princípios do art. 5º.",
        professor: "Herbert Almeida",
      },
      {
        id: "t11",
        titulo: "Tópico 11 — Licitações Lei 14.133 parte 2: objetivos, definições e planejamento (Herbert Almeida)",
        url: "https://www.youtube.com/watch?v=QPbq4DMOFF4&list=PL70rxKg7qWNWV9bGrCV74SS2-vv38m4sh&index=2",
        de: 651,
        ate: 750,
        concursos: ["pmdf", "tcego"],
        vale: ["pmdf", "tcego"],
        compat: "PM DF e TCE-GO. Parte 2 (~1h44): art. 11 (objetivos), ciclo de vida, sobrepreço × superfaturamento, agente de contratação, ETP/TR/PCA. Modalidades ficam na parte 3.",
        professor: "Herbert Almeida",
      },
    ],
  },
  pt: {
    id: "pt",
    professor: "Professor Noslen",
    titulo: "Tópicos 1 a 4 — Interpretação, concordância e regência",
    playlist: {
      titulo: "Playlist de gramática do zero (complemento)",
      url: "https://www.youtube.com/playlist?list=PLqjSTsK75fSeESroXHUsu-v6ZWE2XZrA-",
    },
    aulas: [
      {
        id: "int",
        titulo: "Tópico 1 — Compreensão e interpretação de texto",
        url: "https://www.youtube.com/watch?v=XsN0e_xPyNI",
        de: 1,
        ate: 50,
      },
      {
        id: "conc1",
        titulo: "Tópico 2 — Concordância nominal aula 01",
        url: "https://www.youtube.com/watch?v=wtYgEDzjcWM",
        de: 51,
        ate: 100,
      },
      {
        id: "conc2",
        titulo: "Tópico 3 — Concordância nominal aula 02",
        url: "https://www.youtube.com/watch?v=ISPEMEtMprA",
        de: 101,
        ate: 150,
      },
      {
        id: "reg",
        titulo: "Tópico 4 — Regência verbal aula 01",
        url: "https://www.youtube.com/watch?v=B0EgJVneeGE",
        de: 151,
        ate: 200,
      },
    ],
  },
  dc: {
    id: "dc",
    professor: "JC Concursos · Leonardo Saraiva",
    titulo: "Tópicos 1 a 6 — Princípios, Poderes, Legislativo e TCs",
    titulos: {
      sedf: "Tópicos 1 a 4 — Princípios, art. 1º e dignidade",
      pmdf: "Tópicos 1 a 5 — Princípios, art. 1º, dignidade e Poderes",
      tcego: "Tópicos 1 a 6 — Princípios, Poderes, Legislativo e TCs",
    },
    playlist: {
      titulo: "Curso grátis de Direito Constitucional",
      url: "https://www.youtube.com/playlist?list=PL-4cMc9KcAt6b_i89TrsxE4-GOhjEDrvm",
    },
    extra: {
      titulo: "Playlist Decolando · Thállius (mesmo professor do D.Adm)",
      url: "https://www.youtube.com/playlist?list=PLRuhvrYicDJeumj6Msnq9FoXlhRXm9Pwb",
    },
    aulas: [
      {
        id: "princ",
        titulo: "Tópico 1 — Princípios constitucionais",
        url: "https://www.youtube.com/watch?v=vEZVP-N10lY",
        de: 1,
        ate: 50,
        compat: "Vale nos 3: princípios e LIMPE caem em qualquer banca.",
      },
      {
        id: "art1a",
        titulo: "Tópico 2 — Artigo 1º da Constituição (parte 1)",
        url: "https://www.youtube.com/watch?v=tgmj0YerDAo",
        de: 51,
        ate: 100,
        compat: "Vale nos 3: fundamentos da República (art. 1º).",
      },
      {
        id: "art1b",
        titulo: "Tópico 3 — Artigo 1º da Constituição (parte 2)",
        url: "https://www.youtube.com/watch?v=V2LVrbO7Tmc",
        de: 101,
        ate: 150,
        compat: "Vale nos 3: fundamentos I a V e democracia.",
      },
      {
        id: "dig",
        titulo: "Tópico 4 — Dignidade da pessoa humana",
        url: "https://www.youtube.com/watch?v=pM5dADX4Atk",
        de: 151,
        ate: 200,
        compat: "Vale nos 3. Na PM DF cruza com o art. 5º.",
      },
      {
        id: "poderes",
        titulo: "Tópico 5 — Três Poderes e Legislativo (JC, videoaula 15)",
        url: "https://www.youtube.com/watch?v=q0VLmhjCJas",
        de: 201,
        ate: 250,
        concursos: ["tcego", "pmdf"],
        vale: ["tcego", "pmdf"],
        compat: "TCE-GO pesa Legislativo (arts. 44 a 75). PM DF cobra organização dos Poderes. SEDF não puxa este recorte.",
      },
      {
        id: "tcs",
        titulo: "Tópico 6 — Fiscalização e TCs (arts. 70 a 75)",
        url: "https://www.youtube.com/watch?v=yXxnop01Ulc",
        de: 251,
        ate: 300,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "Arts. 70–75, TCU e TCE: só TCE-GO. Não entra na SEDF nem na PM DF.",
      },
    ],
  },
  ti: {
    id: "ti",
    professor: "Emannuelle Gouveia · Bóson Treinamentos",
    titulo: "Tópicos 1 a 8 — Informática, segurança, redes, SQL e criptografia",
    titulos: {
      sedf: "Tópicos 1, 2 e 7 — Windows, internet e CIA",
      pmdf: "Tópicos 1, 2 e 7 — Windows, internet e CIA",
      tcego: "Tópicos 2 a 8 — Segurança, OSI, TCP/IP, SQL e criptografia",
    },
    playlist: {
      titulo: "Playlist Informática · Emannuelle (SEDF / PM DF)",
      url: "https://www.youtube.com/playlist?list=PL70rxKg7qWNXFurIGfLdUQ7zTlSMi3fe1",
    },
    extra: {
      titulo: "Playlist Redes · Bóson (TCE-GO TI avançado)",
      url: "https://www.youtube.com/playlist?list=PLaygF2VSJVIh9t1eWJfOdrNIqZAjvb5Q1",
    },
    extra2: {
      titulo: "Playlist Bancos de Dados / MySQL · Bóson (SQL TCE-GO)",
      url: "https://www.youtube.com/playlist?list=PLucm8g_ezqNrWAQH2B_0AnrFY5dJcgOLR",
    },
    extra3: {
      titulo: "Criptografia · Bóson (segurança TCE-GO)",
      url: "https://www.youtube.com/watch?v=cWld3rMD7Wk",
    },
    aulas: [
      {
        id: "win",
        titulo: "Tópico 1 — Aula 1: Windows e hardware",
        url: "https://www.youtube.com/watch?v=TehKbjBoEzU",
        de: 1,
        ate: 50,
        concursos: ["sedf", "pmdf"],
        vale: ["sedf", "pmdf"],
        compat: "SEDF/Quadrix e PM DF. Não cai no TCE-GO TI (cargo de redes/SQL, não Windows).",
      },
      {
        id: "net",
        titulo: "Tópico 2 — Aula 2: internet e segurança",
        url: "https://www.youtube.com/watch?v=FwFyQUFokmY",
        de: 51,
        ate: 100,
        concursos: ["sedf", "pmdf", "tcego"],
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3: navegador, HTTPS, malware, senha, LGPD. No TCE-GO é o básico antes da segurança FCC.",
      },
      {
        id: "osi",
        titulo: "Tópico 3 — Redes vídeo 03: modelo OSI",
        url: "https://www.youtube.com/watch?v=WO1uGJRqrwI",
        de: 101,
        ate: 150,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "Só TCE-GO. SEDF e PM DF não cobram modelo OSI.",
      },
      {
        id: "tcp",
        titulo: "Tópico 4 — Redes vídeo 04: TCP/IP (+ SQL TCE-GO)",
        url: "https://www.youtube.com/watch?v=bH29oltn8Cw",
        de: 151,
        ate: 200,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "Só TCE-GO (TCP/IP, portas, IPv6). SEDF/PM DF ficam no recorte da aula 2.",
      },
      {
        id: "sqlsel",
        titulo: "Tópico 5 — SQL: SELECT (Bóson, aula 12)",
        url: "https://www.youtube.com/watch?v=5sTFJHOSDvg",
        de: 201,
        ate: 250,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "SQL do TCE-GO. SEDF e PM DF não cobram SELECT/JOIN.",
      },
      {
        id: "sqlord",
        titulo: "Tópico 6 — SQL: ORDER BY, JOIN e consultas (Bóson, aula 13)",
        url: "https://www.youtube.com/watch?v=qAtiTGjxrcA",
        de: 251,
        ate: 300,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "SQL do TCE-GO. Não entra na SEDF nem na PM DF.",
      },
      {
        id: "segcia",
        titulo: "Tópico 7 — Segurança: CIA, ameaças e política (Bóson)",
        url: "https://www.youtube.com/watch?v=cWld3rMD7Wk",
        de: 301,
        ate: 350,
        concursos: ["sedf", "pmdf", "tcego"],
        vale: ["sedf", "pmdf", "tcego", "sesodonto"],
        compat: "Vale nos 3: confidencialidade, integridade, disponibilidade e ameaças. O TCE-GO cobra mais fundo.",
      },
      {
        id: "segcry",
        titulo: "Tópico 8 — Criptografia FCC: simétrica, assimétrica e hash (Bóson, aula 02)",
        url: "https://www.youtube.com/watch?v=UJ6uSV1KREM",
        de: 351,
        ate: 400,
        concursos: ["tcego"],
        vale: ["tcego"],
        compat: "Criptografia, certificado e auditoria: peso de TI no TCE-GO. SEDF/PM DF já viram o básico (HTTPS/senha) na aula 2.",
      },
    ],
  },
};

function aulaDaMateria(id) {
  return AULAS[id] || null;
}

function aulaDaQuestao(materiaId, qid) {
  const pack = aulaDaMateria(materiaId);
  if (!pack) return null;
  const n = Number(qid);
  const aula = (pack.aulas || []).find((a) => n >= a.de && n <= a.ate) || pack.aulas?.[0] || null;
  return { pack, aula };
}

function listaIdsConcurso(concursos) {
  const ordem = ["sedf", "pmdf", "tcego", "sesodonto"];
  const raw = Array.isArray(concursos) ? concursos : concursos == null || concursos === "" ? [] : [concursos];
  const ids = ordem.filter((id) => raw.some((c) => String(c || "").toLowerCase() === id));
  return ids.length ? ids : ["sedf"];
}

function aulasDoConcurso(materiaId, concurso) {
  const pack = aulaDaMateria(materiaId);
  if (!pack) return [];
  const ids = listaIdsConcurso(concurso);
  return (pack.aulas || []).filter((a) => !a.concursos || a.concursos.some((c) => ids.includes(c)));
}

function questoesDoConcurso(lista, materiaId, concurso) {
  const aulas = aulasDoConcurso(materiaId, concurso);
  if (!aulas.length) return lista || [];
  const todas = aulaDaMateria(materiaId)?.aulas || [];
  if (aulas.length === todas.length) return lista || [];
  return (lista || []).filter((q) => aulas.some((a) => q.id >= a.de && q.id <= a.ate));
}

function questaoDoConcurso(materiaId, qid, concurso) {
  const aulas = aulasDoConcurso(materiaId, concurso);
  if (!aulas.length) return true;
  const todas = aulaDaMateria(materiaId)?.aulas || [];
  if (aulas.length === todas.length) return true;
  const n = Number(qid);
  return aulas.some((a) => n >= a.de && n <= a.ate);
}

function tituloDoConcurso(materiaId, concurso) {
  const pack = aulaDaMateria(materiaId);
  if (!pack) return "";
  const ids = listaIdsConcurso(concurso);
  if (ids.length === 1) return (pack.titulos && pack.titulos[ids[0]]) || pack.titulo;
  const unicos = [...new Set(ids.map((id) => (pack.titulos && pack.titulos[id]) || pack.titulo))];
  return unicos.length === 1 ? unicos[0] : pack.titulo;
}

function valeDaAula(aula) {
  if (aula?.vale?.length) return aula.vale;
  if (aula?.concursos?.length) return aula.concursos;
  return ["sedf", "pmdf", "tcego", "sesodonto"];
}

function concursosDaAula(aula) {
  if (aula?.concursos?.length) return aula.concursos;
  return ["sedf", "pmdf", "tcego", "sesodonto"];
}

function aulasForaDoConcurso(materiaId, concurso) {
  const pack = aulaDaMateria(materiaId);
  if (!pack) return [];
  const ids = new Set(aulasDoConcurso(materiaId, concurso).map((a) => a.id));
  return (pack.aulas || []).filter((a) => !ids.has(a.id));
}

window.CNAPROVADO_AULAS = {
  lista: AULAS,
  daMateria: aulaDaMateria,
  daQuestao: aulaDaQuestao,
  aulasDoConcurso,
  aulasForaDoConcurso,
  questoesDoConcurso,
  questaoDoConcurso,
  tituloDoConcurso,
  valeDaAula,
  concursosDaAula,
};
