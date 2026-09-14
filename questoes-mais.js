function qCE(id, tema, enunciado, correta, explicacao) {
  return {
    id,
    tipo: "ce",
    tema,
    enunciado,
    alternativas: ["Certo", "Errado"],
    correta,
    explicacao,
  };
}

function qME(id, tema, enunciado, alternativas, correta, explicacao) {
  return {
    id,
    tipo: "me",
    tema,
    enunciado,
    alternativas,
    correta,
    explicacao,
  };
}
