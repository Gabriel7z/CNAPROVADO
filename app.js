const $ = (sel) => document.querySelector(sel);

const state = {
  i: 0,
  respostas: [],
  bloqueado: false,
  embaralhar: false,
  fila: [],
};

function letra(i) {
  return String.fromCharCode(65 + i);
}

function montarFila() {
  state.fila = QUESTOES.map((_, idx) => idx);
  if (state.embaralhar) {
    for (let i = state.fila.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.fila[i], state.fila[j]] = [state.fila[j], state.fila[i]];
    }
  }
}

function questaoAtual() {
  return QUESTOES[state.fila[state.i]];
}

function renderInicio() {
  $("#qtd").textContent = String(QUESTOES.length);
  $("#hero").classList.remove("hidden");
  $("#quiz").classList.add("hidden");
  $("#result").classList.add("hidden");
}

function iniciar() {
  state.embaralhar = $("#embaralhar").checked;
  state.i = 0;
  state.respostas = [];
  state.bloqueado = false;
  montarFila();
  $("#hero").classList.add("hidden");
  $("#result").classList.add("hidden");
  $("#quiz").classList.remove("hidden");
  renderQuestao();
}

function renderQuestao() {
  const q = questaoAtual();
  const total = QUESTOES.length;
  const n = state.i + 1;
  $("#progresso-texto").textContent = `Questão ${n} de ${total}`;
  $("#barra").style.width = `${(n / total) * 100}%`;
  $("#tema").textContent = `${q.tipo === "ce" ? "Certo ou Errado" : "Múltipla escolha"} · ${q.tema}`;
  $("#enunciado").textContent = q.enunciado;
  $("#feedback").className = "feedback hidden";
  $("#proxima").classList.add("hidden");
  state.bloqueado = false;

  const box = $("#opcoes");
  box.innerHTML = "";
  q.alternativas.forEach((alt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = q.tipo === "me" ? `${letra(idx)}) ${alt}` : alt;
    btn.addEventListener("click", () => responder(idx, btn));
    box.appendChild(btn);
  });
}

function responder(idx, btn) {
  if (state.bloqueado) return;
  state.bloqueado = true;
  const q = questaoAtual();
  const acertou = idx === q.correta;
  state.respostas.push({ id: q.id, escolhida: idx, acertou });

  [...$("#opcoes").children].forEach((el, i) => {
    el.disabled = true;
    if (i === q.correta) el.classList.add("right");
    if (i === idx && !acertou) el.classList.add("wrong");
  });
  btn.classList.add("selected");

  const fb = $("#feedback");
  fb.className = `feedback ${acertou ? "ok" : "bad"}`;
  const gabarito =
    q.tipo === "ce"
      ? q.alternativas[q.correta]
      : `${letra(q.correta)}) ${q.alternativas[q.correta]}`;
  fb.innerHTML = `<b>${acertou ? "Acertou." : "Errou."} Gabarito: ${gabarito}</b>${q.explicacao}`;
  $("#proxima").classList.remove("hidden");
  $("#proxima").textContent = state.i + 1 >= QUESTOES.length ? "Ver resultado" : "Próxima";
}

function avancar() {
  if (state.i + 1 >= QUESTOES.length) {
    renderResultado();
    return;
  }
  state.i += 1;
  renderQuestao();
}

function renderResultado() {
  const total = QUESTOES.length;
  const acertos = state.respostas.filter((r) => r.acertou).length;
  const pct = Math.round((acertos / total) * 100);
  let selo = "Siga na revisão.";
  if (pct >= 90) selo = "Nível aprovação.";
  else if (pct >= 70) selo = "Bom desempenho.";
  else if (pct >= 50) selo = "Base ok, aperte nos erros.";

  $("#quiz").classList.add("hidden");
  $("#result").classList.remove("hidden");
  $("#score").innerHTML = `${acertos}<span>/${total}</span>`;
  $("#pct").textContent = `${pct}% · ${selo}`;

  const erros = state.respostas.filter((r) => !r.acertou);
  const review = $("#review");
  review.innerHTML = "";
  if (!erros.length) {
    review.innerHTML = "<p>Você não errou nenhuma nesta bateria.</p>";
    return;
  }
  erros.forEach((r) => {
    const q = QUESTOES.find((item) => item.id === r.id);
    const art = document.createElement("article");
    const sua =
      q.tipo === "ce"
        ? q.alternativas[r.escolhida]
        : `${letra(r.escolhida)}) ${q.alternativas[r.escolhida]}`;
    const gab =
      q.tipo === "ce"
        ? q.alternativas[q.correta]
        : `${letra(q.correta)}) ${q.alternativas[q.correta]}`;
    art.innerHTML = `<h3>Q${q.id} · ${q.tema}</h3><p>${q.enunciado}</p><p><b>Sua resposta:</b> ${sua}<br><b>Gabarito:</b> ${gab}</p><p>${q.explicacao}</p>`;
    review.appendChild(art);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderInicio();
  $("#comecar").addEventListener("click", iniciar);
  $("#proxima").addEventListener("click", avancar);
  $("#refazer").addEventListener("click", iniciar);
  $("#inicio").addEventListener("click", renderInicio);
});
