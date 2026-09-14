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
    titulo: "Interpretação e concordância",
    playlist: {
      titulo: "Playlist de gramática do zero (complemento)",
      url: "https://www.youtube.com/playlist?list=PLqjSTsK75fSeESroXHUsu-v6ZWE2XZrA-",
    },
    aulas: [
      {
        id: "int",
        titulo: "Compreensão e interpretação de texto",
        url: "https://www.youtube.com/watch?v=XsN0e_xPyNI",
        de: 1,
        ate: 10,
      },
      {
        id: "conc",
        titulo: "Concordância nominal",
        url: "https://www.youtube.com/watch?v=wtYgEDzjcWM",
        de: 11,
        ate: 20,
      },
    ],
  },
  dc: {
    id: "dc",
    professor: "JC Concursos",
    titulo: "Princípios, art. 1º e poderes",
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
        titulo: "Princípios constitucionais",
        url: "https://www.youtube.com/watch?v=vEZVP-N10lY",
        de: 1,
        ate: 8,
      },
      {
        id: "art1",
        titulo: "Artigo 1º da Constituição",
        url: "https://www.youtube.com/watch?v=tgmj0YerDAo",
        de: 9,
        ate: 16,
      },
      {
        id: "dig",
        titulo: "Dignidade da pessoa humana",
        url: "https://www.youtube.com/watch?v=pM5dADX4Atk",
        de: 17,
        ate: 20,
      },
    ],
  },
  ti: {
    id: "ti",
    professor: "Emannuelle Gouveia",
    titulo: "Informática para concursos",
    playlist: {
      titulo: "Curso completo de Informática",
      url: "https://www.youtube.com/playlist?list=PL70rxKg7qWNXFurIGfLdUQ7zTlSMi3fe1",
    },
    aulas: [
      {
        id: "info",
        titulo: "Aula 1 do curso de Informática",
        url: "https://www.youtube.com/watch?v=TehKbjBoEzU",
        de: 1,
        ate: 20,
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

window.CNAPROVADO_AULAS = {
  lista: AULAS,
  daMateria: aulaDaMateria,
  daQuestao: aulaDaQuestao,
};
