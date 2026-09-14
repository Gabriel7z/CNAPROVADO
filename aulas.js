const AULAS = {
  dadm: {
    id: "dadm",
    professor: "Thállius Moraes",
    titulo: "Tópicos 1 a 4 — Fontes, Estado, Direta e Indireta",
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
    professor: "JC Concursos",
    titulo: "Tópicos 1 a 4 — Princípios, art. 1º e dignidade",
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
      },
      {
        id: "art1a",
        titulo: "Tópico 2 — Artigo 1º da Constituição (parte 1)",
        url: "https://www.youtube.com/watch?v=tgmj0YerDAo",
        de: 51,
        ate: 100,
      },
      {
        id: "art1b",
        titulo: "Tópico 3 — Artigo 1º da Constituição (parte 2)",
        url: "https://www.youtube.com/watch?v=V2LVrbO7Tmc",
        de: 101,
        ate: 150,
      },
      {
        id: "dig",
        titulo: "Tópico 4 — Dignidade da pessoa humana",
        url: "https://www.youtube.com/watch?v=pM5dADX4Atk",
        de: 151,
        ate: 200,
      },
    ],
  },
  ti: {
    id: "ti",
    professor: "Emannuelle Gouveia · Bóson Treinamentos",
    titulo: "Tópicos 1 a 4 — Informática, segurança, OSI e TCP/IP",
    playlist: {
      titulo: "Playlist Informática · Emannuelle (SEDF / PM DF)",
      url: "https://www.youtube.com/playlist?list=PL70rxKg7qWNXFurIGfLdUQ7zTlSMi3fe1",
    },
    extra: {
      titulo: "Playlist Redes · Bóson (TCE-GO TI avançado)",
      url: "https://www.youtube.com/playlist?list=PLaygF2VSJVIh9t1eWJfOdrNIqZAjvb5Q1",
    },
    aulas: [
      {
        id: "win",
        titulo: "Tópico 1 — Aula 1: Windows e hardware",
        url: "https://www.youtube.com/watch?v=TehKbjBoEzU",
        de: 1,
        ate: 50,
        concursos: ["sedf", "pmdf"],
      },
      {
        id: "net",
        titulo: "Tópico 2 — Aula 2: internet e segurança",
        url: "https://www.youtube.com/watch?v=FwFyQUFokmY",
        de: 51,
        ate: 100,
        concursos: ["sedf", "pmdf", "tcego"],
      },
      {
        id: "osi",
        titulo: "Tópico 3 — Redes vídeo 03: modelo OSI",
        url: "https://www.youtube.com/watch?v=WO1uGJRqrwI",
        de: 101,
        ate: 150,
        concursos: ["tcego"],
      },
      {
        id: "tcp",
        titulo: "Tópico 4 — Redes vídeo 04: TCP/IP (+ SQL TCE-GO)",
        url: "https://www.youtube.com/watch?v=bH29oltn8Cw",
        de: 151,
        ate: 200,
        concursos: ["tcego"],
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

function aulasDoConcurso(materiaId, concurso) {
  const pack = aulaDaMateria(materiaId);
  if (!pack) return [];
  return (pack.aulas || []).filter((a) => !a.concursos || a.concursos.includes(concurso));
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

window.CNAPROVADO_AULAS = {
  lista: AULAS,
  daMateria: aulaDaMateria,
  daQuestao: aulaDaQuestao,
  aulasDoConcurso,
  questoesDoConcurso,
  questaoDoConcurso,
};
