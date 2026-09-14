const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const STORE = "cnaprovado-v1";
const AVATARES = ["🎯", "🦁", "🦅", "🐺", "🐉", "⚡", "📚", "⚖️"];

const ui = {
  materia: "dadm",
  modo: "plano",
  planoIsoSel: null,
  quiz: { i: 0, respostas: [], bloqueado: false, embaralhar: false, fila: [] },
  anki: { i: 0, virado: false, fila: [] },
};

function loadDB() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || {};
  } catch {
    return {};
  }
}

function saveDB(db) {
  localStorage.setItem(STORE, JSON.stringify(db));
}

function db() {
  const data = loadDB();
  if (!data.perfil) data.perfil = { nome: "Concurseiro", avatar: "🎯" };
  if (!data.extraMaterias) data.extraMaterias = [];
  if (!data.respostas) data.respostas = [];
  if (!data.baterias) data.baterias = [];
  if (!data.anki) data.anki = {};
  if (data.perfil.mostrarRank == null) data.perfil.mostrarRank = true;
  if (!data.planoPorEmail) data.planoPorEmail = {};
  if (!data.planoFeito) data.planoFeito = {};
  if (data.planoVista !== "calendario" && data.planoVista !== "lista") {
    data.planoVista = "lista";
  }
  if (!data.planoHorasPorEmail) data.planoHorasPorEmail = {};
  return data;
}

function persist(mut) {
  const data = db();
  mut(data);
  saveDB(data);
}

function materias() {
  return [...MATERIAS_BASE, ...db().extraMaterias];
}

function materiaAtual() {
  return materias().find((m) => m.id === ui.materia) || materias()[0];
}

function questoes() {
  return questoesDaMateria(ui.materia);
}

function cards() {
  return cardsDaMateria(ui.materia);
}

function letra(i) {
  return String.fromCharCode(65 + i);
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function celebrar(tipo) {
  if (!window.confetti || prefersReduced()) return;
  const cores = ["#4f46e5", "#34d399", "#f59e0b", "#fb7185"];
  if (tipo === "ok") {
    window.confetti({
      particleCount: 36,
      spread: 55,
      origin: { y: 0.72 },
      colors: cores,
      disableForReducedMotion: true,
    });
  } else if (tipo === "win") {
    window.confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: cores,
      disableForReducedMotion: true,
    });
  }
}

function temaAtual() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function aplicarTema(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("cnaprovado-theme", theme);
  } catch {}
  const btn = document.getElementById("theme-btn");
  if (btn) btn.textContent = theme === "dark" ? "Claro" : "Escuro";
}

function mostrar(id) {
  [
    "view-login",
    "view-plano",
    "view-questoes-home",
    "view-quiz",
    "view-result",
    "view-cards",
    "view-desempenho",
    "view-rank",
    "view-perfil",
  ].forEach((v) => $(`#${v}`).classList.toggle("hidden", v !== id));
}

function cloud() {
  return window.CNAPROVADO_CLOUD;
}
function logado() {
  return Boolean(cloud()?.logado());
}

function travarApp(on) {
  $("#materias-nav").classList.toggle("hidden", !on);
  $("#modos-nav").classList.toggle("hidden", !on);
  $("#chip-perfil").classList.toggle("hidden", !on);
  $("#dock")?.classList.toggle("hidden", !on);
}

function renderMaterias() {
  const nav = $("#materias-nav");
  nav.innerHTML = "";
  materias().forEach((m) => {
    const btn = document.createElement("button");
    btn.className = `materia${m.id === ui.materia ? " ativa" : ""}`;
    btn.type = "button";
    btn.textContent = m.sigla || m.nome;
    btn.addEventListener("click", () => {
      ui.materia = m.id;
      ui.modo = "questoes";
      render();
    });
    nav.appendChild(btn);
  });
  const add = document.createElement("button");
  add.className = "add-materia";
  add.type = "button";
  add.textContent = "+ Matéria";
  add.addEventListener("click", novaMateria);
  nav.appendChild(add);
}

function novaMateria() {
  const nome = prompt("Nome da nova matéria:");
  if (!nome || !nome.trim()) return;
  const id = `m-${Date.now()}`;
  persist((d) => {
    d.extraMaterias.push({
      id,
      nome: nome.trim(),
      sigla: nome.trim().slice(0, 10),
      cor: "#8aa07a",
    });
  });
  ui.materia = id;
  ui.modo = "questoes";
  render();
}

function renderModos() {
  $$("[data-modo]").forEach((btn) => {
    btn.classList.toggle("ativo", btn.dataset.modo === ui.modo);
  });
}

function renderChip() {
  const p = db().perfil;
  $("#chip-face").textContent = p.avatar;
  $("#chip-nome").textContent = p.nome || "Concurseiro";
}

function emailDaConta() {
  return String(cloud()?.user?.email || "").toLowerCase();
}

function planoIdAtual() {
  const email = emailDaConta();
  const nome = String(db().perfil?.nome || cloud()?.perfil?.apelido || "").toLowerCase();
  const mapa = db().planoPorEmail || {};
  if (email && (mapa[email] === "amanda" || mapa[email] === "gabriel")) return mapa[email];
  if (nome.includes("amanda") || email.includes("amanda")) return "amanda";
  return "gabriel";
}

function setPlanoId(id) {
  const email = emailDaConta();
  if (!email) return;
  persist((d) => {
    d.planoPorEmail[email] = id;
  });
}

function planoFeitoKey(iso) {
  return `${emailDaConta()}|${iso}`;
}

function diaFeito(iso) {
  return Boolean(db().planoFeito[planoFeitoKey(iso)]);
}

function toggleDiaFeito(iso) {
  persist((d) => {
    const k = planoFeitoKey(iso);
    d.planoFeito[k] = !d.planoFeito[k];
  });
}

function planoVistaAtual() {
  return db().planoVista === "calendario" ? "calendario" : "lista";
}

function setPlanoVista(vista) {
  persist((d) => {
    d.planoVista = vista === "calendario" ? "calendario" : "lista";
  });
}

function planoCargaAtual() {
  const api = window.CNAPROVADO_PLANOS;
  const email = emailDaConta();
  const mapa = db().planoHorasPorEmail || {};
  const salvo = email ? mapa[email] : db().planoHoras;
  return api?.normalizarCarga(salvo) || { dia: 2, fim: 2 };
}

function setPlanoCarga(parte, horas) {
  const api = window.CNAPROVADO_PLANOS;
  const n = api?.normalizarHoras(horas) || 2;
  const email = emailDaConta();
  persist((d) => {
    const atual = api?.normalizarCarga(email ? d.planoHorasPorEmail[email] : d.planoHoras);
    const prox = { ...atual, [parte]: n };
    if (email) d.planoHorasPorEmail[email] = prox;
    else d.planoHoras = prox;
  });
}

function htmlHorasBtns(atual, parte) {
  return (window.CNAPROVADO_PLANOS?.HORAS_OPCOES || [1, 2, 3, 4])
    .map(
      (h) =>
        `<button type="button" class="modo${atual === h ? " ativo" : ""}" data-carga="${parte}" data-horas="${h}">${h}h</button>`
    )
    .join("");
}

function htmlPlanoBloco(d, opts) {
  const feito = diaFeito(d.iso);
  return `
    <p class="kicker">${esc(opts.kicker)}${d.carga ? ` · ${esc(d.carga)}` : ""}</p>
    <h2>${esc(d.materia)} · ${esc(d.titulo)}</h2>
    <p>${esc(d.fazer)}</p>
    <div class="actions">
      <button class="primary" type="button" id="${opts.feitoId}">${
        feito ? "Feito ✓" : "Marcar como feito"
      }</button>
      ${
        d.materia === "D.Adm"
          ? `<button class="ghost" type="button" id="${opts.admId}">Abrir questões de D.Adm</button>`
          : ""
      }
    </div>
  `;
}

function bindAbrirAdm(id) {
  $(`#${id}`)?.addEventListener("click", () => {
    ui.materia = "dadm";
    ui.modo = "questoes";
    render();
  });
}

function htmlCalendario(api, dias, hoje) {
  const porIso = new Map(dias.map((d) => [d.iso, d]));
  const sel = ui.planoIsoSel;
  const meses = api.mesesDoCalendario(dias);
  const weekdays = [
    ["Seg", "Sg"],
    ["Ter", "T"],
    ["Qua", "Q"],
    ["Qui", "Q"],
    ["Sex", "Sx"],
    ["Sáb", "Sb"],
    ["Dom", "D"],
  ];
  const cab = weekdays
    .map(
      ([full, short]) =>
        `<span title="${full}"><span class="wd-l">${full}</span><span class="wd-s">${short}</span></span>`
    )
    .join("");
  const mesesHtml = meses
    .map((m) => {
      const cells = api.celulasDoMes(m.ano, m.mes, porIso);
      const grid = cells
        .map((c) => {
          if (c.vazio) return `<div class="plano-cal-cell is-pad" aria-hidden="true"></div>`;
          if (!c.item) {
            return `<div class="plano-cal-cell is-off"><span class="plano-cal-num">${c.day}</span></div>`;
          }
          const chave = api.materiaChave(c.item.materia);
          const curta = api.materiaCurta(c.item.materia);
          const eHoje = c.iso === hoje;
          const eSel = c.iso === sel;
          const feito = diaFeito(c.iso);
          const label = `${c.day} de ${m.nome}, ${c.item.materia}: ${c.item.titulo}${
            feito ? ", feito" : ""
          }${eHoje ? ", hoje" : ""}`;
          return `<button type="button" class="plano-cal-cell mat-${chave}${eHoje ? " is-hoje" : ""}${
            eSel ? " is-sel" : ""
          }${feito ? " is-feito" : ""}" data-iso="${c.iso}" aria-label="${esc(label)}" aria-pressed="${
            eSel || eHoje ? "true" : "false"
          }">
            <span class="plano-cal-num">${c.day}</span>
            <span class="plano-cal-tag">${esc(curta)}</span>
            ${feito ? `<span class="plano-cal-ok" aria-hidden="true">✓</span>` : ""}
          </button>`;
        })
        .join("");
      return `<section class="plano-cal-mes">
        <h3>${esc(m.nome)}</h3>
        <div class="plano-cal-weekdays">${cab}</div>
        <div class="plano-cal-grid">${grid}</div>
      </section>`;
    })
    .join("");
  const legendas = [
    ["adm", "D.Adm"],
    ["const", "D.Const"],
    ["pt", "Português"],
    ["ti", "TI"],
    ["red", "Redação"],
  ].filter(([chave]) => dias.some((d) => api.materiaChave(d.materia) === chave));
  const legenda = legendas
    .map(([chave, nome]) => `<span class="mat-${chave}">${nome}</span>`)
    .join("");
  return `${mesesHtml}
    <p class="plano-cal-hint">Toque no dia para ver o que estudar.</p>
    <div class="plano-legenda" aria-label="Cores das matérias">${legenda}</div>`;
}

function renderPlano() {
  const api = window.CNAPROVADO_PLANOS;
  if (!api) return;
  const id = planoIdAtual();
  const meta = api.PLANOS[id];
  const carga = planoCargaAtual();
  const dias = api.diasDoPlano(id, carga);
  const hoje = api.hojeIso();
  const feitos = dias.filter((d) => diaFeito(d.iso)).length;
  const deHoje = dias.find((d) => d.iso === hoje) || dias[0];
  const vista = planoVistaAtual();
  const deSel = dias.find((d) => d.iso === ui.planoIsoSel) || (vista === "calendario" ? deHoje : null);
  const mostrarSel = Boolean(vista === "calendario" && deSel);

  $("#plano-kicker").textContent = `Mês 1 · ${meta.dono}`;
  $("#plano-titulo").textContent =
    id === "amanda" ? "Plano da Amanda" : "Plano do Gabriel";
  $("#plano-lead").textContent = `${meta.alvo}. ${meta.materias}. 14/09 a 13/10/2026. A matéria do dia não muda: o que muda é o tamanho da tarefa.`;
  $("#plano-meta").innerHTML = `
    <div><b>${feitos}/${dias.length}</b><span>dias feitos</span></div>
    <div><b>${deHoje.horas}h</b><span>hoje</span></div>
    <div><b>${carga.dia}h · ${carga.fim}h</b><span>semana · fim de semana</span></div>
  `;
  $("#plano-hoje").innerHTML = htmlPlanoBloco(deHoje, {
    kicker: "Hoje",
    feitoId: "plano-feito-hoje",
    admId: "plano-abrir-adm",
  });
  $("#plano-hoje").classList.toggle("hidden", vista === "calendario");
  $("#plano-switch").innerHTML = `
    <button type="button" class="modo${id === "gabriel" ? " ativo" : ""}" data-plano="gabriel">Gabriel</button>
    <button type="button" class="modo${id === "amanda" ? " ativo" : ""}" data-plano="amanda">Amanda</button>
  `;
  $("#plano-horas-dia").innerHTML = htmlHorasBtns(carga.dia, "dia");
  $("#plano-horas-fim").innerHTML = htmlHorasBtns(carga.fim, "fim");
  $("#plano-horas-hint").textContent = api.dicaCarga(carga);
  $("#plano-vista").innerHTML = `
    <button type="button" class="modo${vista === "lista" ? " ativo" : ""}" data-vista="lista">Lista</button>
    <button type="button" class="modo${vista === "calendario" ? " ativo" : ""}" data-vista="calendario">Calendário</button>
  `;
  $("#plano-lista").classList.toggle("hidden", vista !== "lista");
  $("#plano-calendario").classList.toggle("hidden", vista !== "calendario");
  $("#plano-lista").innerHTML = dias
    .map((d) => {
      const nomeDia = d.data.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });
      const eHoje = d.iso === hoje;
      const feito = diaFeito(d.iso);
      return `<article class="plano-dia${eHoje ? " hoje" : ""}${feito ? " feito" : ""}" data-iso="${d.iso}">
        <header>
          <span>${esc(nomeDia)}</span>
          <b>${esc(d.materia)} · ${d.horas}h</b>
        </header>
        <h3>${esc(d.titulo)}</h3>
        <p>${esc(d.fazer)}</p>
        <button type="button" class="ghost plano-check">${feito ? "Desmarcar" : "Feito"}</button>
      </article>`;
    })
    .join("");
  $("#plano-calendario").innerHTML = htmlCalendario(api, dias, hoje);

  const selEl = $("#plano-dia-sel");
  selEl.classList.toggle("hidden", !mostrarSel);
  if (mostrarSel) {
    const kicker =
      deSel.iso === hoje
        ? "Hoje"
        : deSel.data.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          });
    selEl.innerHTML = htmlPlanoBloco(deSel, {
      kicker,
      feitoId: "plano-feito-sel",
      admId: "plano-abrir-sel",
    });
  } else {
    selEl.innerHTML = "";
  }

  $("#plano-feito-hoje")?.addEventListener("click", () => {
    const yNow = window.scrollY;
    toggleDiaFeito(deHoje.iso);
    renderPlano();
    window.scrollTo(0, yNow);
  });
  bindAbrirAdm("plano-abrir-adm");
  $("#plano-feito-sel")?.addEventListener("click", () => {
    const yNow = window.scrollY;
    toggleDiaFeito(deSel.iso);
    renderPlano();
    window.scrollTo(0, yNow);
  });
  bindAbrirAdm("plano-abrir-sel");
  $$("#plano-switch [data-plano]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoId(btn.dataset.plano);
      renderPlano();
    });
  });
  $$("#plano-horas-dia [data-horas], #plano-horas-fim [data-horas]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoCarga(btn.dataset.carga, Number(btn.dataset.horas));
      renderPlano();
    });
  });
  $$("#plano-vista [data-vista]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoVista(btn.dataset.vista);
      if (btn.dataset.vista === "lista") ui.planoIsoSel = null;
      else if (!ui.planoIsoSel) ui.planoIsoSel = hoje;
      renderPlano();
      $("#plano-vista")?.scrollIntoView({ block: "start" });
    });
  });
  $$("#plano-lista .plano-dia").forEach((el) => {
    el.querySelector(".plano-check")?.addEventListener("click", () => {
      toggleDiaFeito(el.dataset.iso);
      renderPlano();
    });
  });
  $$("#plano-calendario [data-iso]").forEach((el) => {
    el.addEventListener("click", () => {
      ui.planoIsoSel = el.dataset.iso;
      renderPlano();
      const painel = $("#plano-dia-sel");
      if (painel && !painel.classList.contains("hidden")) {
        painel.scrollIntoView({ block: "nearest" });
      }
    });
  });
}

function renderQuestoesHome() {
  const m = materiaAtual();
  const qs = questoes();
  const cs = cards();
  $("#kicker-materia").textContent = m.nome;
  $("#titulo-materia").textContent =
    m.id === "dadm"
      ? "Tópicos 1 a 4 — Fontes, Estado, Direta e Indireta"
      : m.nome;
  $("#qtd").textContent = String(qs.length);
  $("#meta-cards").textContent = String(cs.length);
  if (!qs.length) {
    $("#lead-materia").textContent =
      "Ainda não tem questões nesta aba. Você pode estudar pelos cards quando houver, ou vamos incluindo as baterias conforme o estudo avançar.";
    $("#comecar").classList.add("hidden");
  } else {
    $("#lead-materia").textContent =
      m.id === "dadm"
        ? "Tópico 1 (Q1–50) + Tópico 2 (Q51–100) + Tópico 3 Direta (Q101–150) + Tópico 4 Indireta (Q151–200). Gabarito na hora e revisão dos erros no final."
        : "Questões no estilo concurso, gabarito na hora e revisão dos erros no final.";
    $("#comecar").classList.remove("hidden");
  }
}

function montarFila() {
  const qs = questoes();
  ui.quiz.fila = qs.map((_, idx) => idx);
  if (ui.quiz.embaralhar) {
    for (let i = ui.quiz.fila.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ui.quiz.fila[i], ui.quiz.fila[j]] = [ui.quiz.fila[j], ui.quiz.fila[i]];
    }
  }
}

function questaoAtual() {
  return questoes()[ui.quiz.fila[ui.quiz.i]];
}

function iniciar() {
  if (!logado()) {
    render();
    return;
  }
  const qs = questoes();
  if (!qs.length) return;
  ui.quiz.embaralhar = $("#embaralhar").checked;
  ui.quiz.i = 0;
  ui.quiz.respostas = [];
  ui.quiz.bloqueado = false;
  montarFila();
  mostrar("view-quiz");
  renderQuestao();
}

function renderQuestao() {
  const q = questaoAtual();
  const total = questoes().length;
  const n = ui.quiz.i + 1;
  $("#progresso-texto").textContent = `Questão ${n} de ${total}`;
  $("#barra").style.width = `${(n / total) * 100}%`;
  $("#tema").textContent = `${q.tipo === "ce" ? "Certo ou Errado" : "Múltipla escolha"} · ${q.tema}`;
  $("#enunciado").textContent = q.enunciado;
  $("#feedback").className = "feedback hidden";
  $("#proxima").classList.add("hidden");
  ui.quiz.bloqueado = false;
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
  if (ui.quiz.bloqueado) return;
  ui.quiz.bloqueado = true;
  const q = questaoAtual();
  const acertou = idx === q.correta;
  ui.quiz.respostas.push({ id: q.id, escolhida: idx, acertou });
  const row = {
    materia: ui.materia,
    qid: q.id,
    acertou,
    ts: Date.now(),
  };
  persist((d) => {
    d.respostas.push(row);
  });
  cloud()?.salvarResposta(row);
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
  if (acertou) celebrar("ok");
  $("#proxima").classList.remove("hidden");
  $("#proxima").textContent =
    ui.quiz.i + 1 >= questoes().length ? "Ver resultado" : "Próxima";
}

function avancar() {
  if (ui.quiz.i + 1 >= questoes().length) {
    renderResultado();
    return;
  }
  ui.quiz.i += 1;
  renderQuestao();
}

function renderResultado() {
  const total = questoes().length;
  const acertos = ui.quiz.respostas.filter((r) => r.acertou).length;
  const pct = Math.round((acertos / total) * 100);
  let selo = "Siga na revisão.";
  if (pct >= 90) selo = "Nível aprovação.";
  else if (pct >= 70) selo = "Bom desempenho.";
  else if (pct >= 50) selo = "Base ok, aperte nos erros.";
  const bateria = {
    materia: ui.materia,
    acertos,
    total,
    ts: Date.now(),
  };
  persist((d) => {
    d.baterias.push(bateria);
  });
  cloud()?.salvarBateria(bateria);
  mostrar("view-result");
  $("#score").innerHTML = `${acertos}<span>/${total}</span>`;
  $("#pct").textContent = `${pct}% · ${selo}`;
  if (pct >= 70) celebrar("win");
  const erros = ui.quiz.respostas.filter((r) => !r.acertou);
  const review = $("#review");
  review.innerHTML = "";
  if (!erros.length) {
    review.innerHTML = "<p>Você não errou nenhuma nesta bateria.</p>";
    return;
  }
  const qs = questoes();
  erros.forEach((r) => {
    const q = qs.find((item) => item.id === r.id);
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

function ankiState(cardId) {
  return (
    db().anki[cardId] || {
      due: 0,
      interval: 0,
      reps: 0,
    }
  );
}

function filaAnki() {
  const now = Date.now();
  const all = cards();
  const due = [];
  const novos = [];
  all.forEach((c) => {
    const s = ankiState(c.id);
    if (!s.reps) novos.push(c);
    else if (s.due <= now) due.push(c);
  });
  return [...due, ...novos];
}

function renderCards() {
  const fila = filaAnki();
  ui.anki.fila = fila;
  ui.anki.i = 0;
  ui.anki.virado = false;
  const due = fila.filter((c) => ankiState(c.id).reps).length;
  const novos = fila.length - due;
  $("#cards-stats").textContent = fila.length
    ? `${due} para revisar agora · ${novos} novos nesta matéria`
    : "";
  if (!cards().length) {
    $("#anki-stage").innerHTML =
      '<div class="vazio">Ainda não há cards nesta matéria. Quando as questões forem incluídas, os cards nascem delas.</div>';
    return;
  }
  if (!fila.length) {
    $("#anki-stage").innerHTML =
      '<div class="vazio">Nenhum card vencido agora. Volte depois ou estude outra matéria.</div>';
    return;
  }
  pintarCard();
}

function pintarCard() {
  const c = ui.anki.fila[ui.anki.i];
  if (!c) {
    $("#anki-stage").innerHTML =
      '<div class="vazio">Sessão de cards concluída nesta matéria.</div>';
    return;
  }
  const stage = $("#anki-stage");
  stage.innerHTML = `
    <p class="tema">${c.tema || "Card"} · ${ui.anki.i + 1}/${ui.anki.fila.length}</p>
    <div class="anki-card" id="anki-face">${ui.anki.virado ? c.verso : c.frente}<br><small style="color:#5c6b80">${ui.anki.virado ? "verso" : "toque para virar"}</small></div>
    <div class="anki-actions ${ui.anki.virado ? "" : "hidden"}" id="anki-btns">
      <button class="again" type="button" data-q="1">De novo</button>
      <button class="hard" type="button" data-q="2">Difícil</button>
      <button class="good" type="button" data-q="3">Bom</button>
      <button class="easy" type="button" data-q="4">Fácil</button>
    </div>
  `;
  $("#anki-face").addEventListener("click", () => {
    ui.anki.virado = !ui.anki.virado;
    pintarCard();
  });
  $$("#anki-btns button").forEach((btn) => {
    btn.addEventListener("click", () => responderAnki(Number(btn.dataset.q)));
  });
}

function responderAnki(quality) {
  const c = ui.anki.fila[ui.anki.i];
  const now = Date.now();
  persist((d) => {
    const s = d.anki[c.id] || { due: 0, interval: 0, reps: 0 };
    s.reps += 1;
    if (quality === 1) s.interval = 0;
    else if (quality === 2) s.interval = 1;
    else if (quality === 3) s.interval = Math.max(3, s.interval * 2 || 3);
    else s.interval = Math.max(7, s.interval * 3 || 7);
    s.due = now + s.interval * 86400000;
    d.anki[c.id] = s;
  });
  cloud()?.salvarAnki();
  ui.anki.i += 1;
  ui.anki.virado = false;
  pintarCard();
}

function totais() {
  const rows = db().respostas;
  const geral = { ok: 0, bad: 0 };
  const por = {};
  materias().forEach((m) => {
    por[m.id] = { nome: m.sigla || m.nome, ok: 0, bad: 0 };
  });
  rows.forEach((r) => {
    if (!por[r.materia]) por[r.materia] = { nome: r.materia, ok: 0, bad: 0 };
    if (r.acertou) {
      geral.ok += 1;
      por[r.materia].ok += 1;
    } else {
      geral.bad += 1;
      por[r.materia].bad += 1;
    }
  });
  return { geral, por };
}

function renderDesempenho() {
  const { geral, por } = totais();
  const total = geral.ok + geral.bad;
  const pct = total ? Math.round((geral.ok / total) * 100) : 0;
  $("#stats-kpis").innerHTML = `
    <div><b>${pct}%</b><span>aproveitamento geral</span></div>
    <div><b>${geral.ok}</b><span>acertos</span></div>
    <div><b>${geral.bad}</b><span>erros</span></div>
  `;
  if (!total) {
    $("#chart-geral").innerHTML = '<div class="vazio">Faça uma bateria para ver os gráficos.</div>';
    $("#chart-materias").innerHTML = "";
    $("#historico").innerHTML = "";
    return;
  }
  const r = 42;
  const c = 2 * Math.PI * r;
  const okLen = (geral.ok / total) * c;
  $("#chart-geral").innerHTML = `
    <div class="donut-wrap">
      <svg width="120" height="120" viewBox="0 0 120 120" aria-label="Acertos e erros">
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="#eadfca" stroke-width="14"/>
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="#1f8a4c" stroke-width="14"
          stroke-dasharray="${okLen} ${c}" stroke-dashoffset="${c / 4}" transform="rotate(-90 60 60)"/>
      </svg>
      <div>
        <p><b style="color:#1f8a4c">Acertos</b> ${geral.ok}</p>
        <p><b style="color:#b42318">Erros</b> ${geral.bad}</p>
      </div>
    </div>
  `;
  $("#chart-materias").innerHTML = Object.values(por)
    .filter((m) => m.ok + m.bad > 0)
    .map((m) => {
      const t = m.ok + m.bad;
      const okW = (m.ok / t) * 100;
      const badW = (m.bad / t) * 100;
      return `<div class="bar-row"><span>${m.nome}</span><div class="bar-track"><span class="bar-ok" style="width:${okW}%"></span><span class="bar-bad" style="width:${badW}%"></span></div><span>${Math.round((m.ok / t) * 100)}%</span></div>`;
    })
    .join("");
  const hist = db().baterias.slice(-8).reverse();
  $("#historico").innerHTML = hist.length
    ? hist
        .map((b) => {
          const nome = materias().find((m) => m.id === b.materia)?.sigla || b.materia;
          const when = new Date(b.ts).toLocaleString("pt-BR");
          return `<article><h3>${nome} · ${b.acertos}/${b.total}</h3><p>${when}</p></article>`;
        })
        .join("")
    : "<p>Nenhuma bateria completa ainda.</p>";
}

function renderPerfil() {
  const p = db().perfil;
  $("#perfil-nome").value = p.nome;
  const grid = $("#avatar-grid");
  grid.innerHTML = "";
  AVATARES.forEach((face) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `avatar-opt${face === p.avatar ? " ativo" : ""}`;
    btn.textContent = face;
    btn.addEventListener("click", () => {
      persist((d) => {
        d.perfil.avatar = face;
      });
      cloud()?.atualizarPerfil({ avatar: face });
      renderPerfil();
      renderChip();
    });
    grid.appendChild(btn);
  });
  renderConta($("#conta-box"));
}

function salvarPerfil() {
  const nome = $("#perfil-nome").value.trim() || "Concurseiro";
  persist((d) => {
    d.perfil.nome = nome;
  });
  cloud()?.atualizarPerfil({ nome });
  renderChip();
}

function setContaMsg(box, text, tipo) {
  const el = box?.querySelector(".conta-msg");
  if (!el) return;
  el.textContent = text || "";
  el.className = `conta-msg${tipo ? ` ${tipo}` : ""}`;
}

function renderConta(box, opts = {}) {
  if (!box) return;
  const sb = cloud();
  const titulo = opts.titulo || "";
  const lead = opts.lead || "";
  const cabeca = titulo
    ? `<h2>${esc(titulo)}</h2><p class="lead">${esc(lead)}</p>`
    : "";

  if (!sb || !window.supabase) {
    box.innerHTML = `${cabeca}<div class="vazio">Não deu para carregar a biblioteca da nuvem. Recarrega a página.</div>`;
    return;
  }

  if (!sb.pronto()) {
    box.innerHTML = `${cabeca}
      <div class="vazio">
        Ainda falta ligar o projeto Supabase.
      </div>`;
    return;
  }

  if (sb.logado()) {
    const email = sb.user.email || "";
    const mostrarRank = db().perfil.mostrarRank !== false;
    box.innerHTML = `${cabeca}
      <p class="conta-ok">Você está dentro: <b>${esc(email)}</b></p>
      <label class="check">
        <input class="mostrar-rank" type="checkbox" ${mostrarRank ? "checked" : ""} />
        Aparecer no ranking
      </label>
      <div class="actions">
        <button class="sb-sair ghost" type="button">Sair</button>
      </div>
      <p class="conta-msg"></p>
    `;
    box.querySelector(".mostrar-rank")?.addEventListener("change", async (ev) => {
      const on = ev.target.checked;
      persist((d) => {
        d.perfil.mostrarRank = on;
      });
      try {
        await sb.atualizarPerfil({ mostrarRank: on });
        setContaMsg(box, on ? "Você aparece no rank." : "Você ficou fora do rank.", "ok");
      } catch (err) {
        setContaMsg(box, sb.traduzErro(err), "bad");
      }
    });
    box.querySelector(".sb-sair")?.addEventListener("click", async () => {
      await sb.sair();
      render();
    });
    return;
  }

  box.innerHTML = `${cabeca}
    <label class="field">E-mail
      <input class="sb-email" type="email" autocomplete="email" placeholder="seu Gmail" />
    </label>
    <label class="field">Senha
      <input class="sb-senha" type="password" autocomplete="current-password" placeholder="mínimo 6 caracteres" />
    </label>
    <div class="actions">
      <button class="sb-entrar primary" type="button">Entrar</button>
      <button class="sb-criar ghost" type="button">Criar conta</button>
    </div>
    <p class="conta-msg"></p>
  `;
  const emailSenha = () => ({
    email: box.querySelector(".sb-email").value.trim(),
    senha: box.querySelector(".sb-senha").value,
  });
  box.querySelector(".sb-entrar").addEventListener("click", async () => {
    const { email, senha } = emailSenha();
    if (!email || !senha) {
      setContaMsg(box, "Preenche e-mail e senha.", "bad");
      return;
    }
    try {
      setContaMsg(box, "Entrando…");
      await sb.entrar(email, senha);
      render();
    } catch (err) {
      setContaMsg(box, sb.traduzErro(err), "bad");
    }
  });
  box.querySelector(".sb-criar").addEventListener("click", async () => {
    const { email, senha } = emailSenha();
    if (!email || !senha) {
      setContaMsg(box, "Preenche e-mail e senha.", "bad");
      return;
    }
    try {
      setContaMsg(box, "Criando conta…");
      await sb.criarConta(email, senha);
      if (sb.logado()) {
        render();
        return;
      }
      setContaMsg(
        box,
        "Conta criada. Abre o GMAIL agora e clica no link da Supabase. Sem esse clique o login não entra, porque a confirmação de e-mail ainda está ligada no painel.",
        "ok"
      );
    } catch (err) {
      setContaMsg(box, sb.traduzErro(err), "bad");
    }
  });
}

async function renderRank() {
  const tok = (ui.rankTok = (ui.rankTok || 0) + 1);
  const sb = cloud();
  const m = materiaAtual();
  const status = $("#rank-status");
  const tabela = $("#rank-tabela");
  $("#rank-lead").textContent =
    `Quem mais acerta em ${m.nome}. Só entra quem tem pelo menos ${sb?.minRank || 10} respostas e deixou o nome visível.`;

  if (!sb?.pronto()) {
    status.textContent = "O ranking fica na nuvem. Entra na conta no topo da página inicial.";
    tabela.innerHTML = `
      <div class="vazio">
        Sem projeto configurado ainda. O estudo local continua normal; rank e conta
        entram quando a URL e a chave anon estiverem no app.
      </div>`;
    return;
  }

  status.textContent = "Carregando ranking…";
  tabela.innerHTML = "";
  const [rank, minha] = await Promise.all([sb.ranking(m.id), sb.minhaStat(m.id)]);
  if (tok !== ui.rankTok || ui.modo !== "rank") return;
  if (!rank.ok) {
    status.textContent = "";
    tabela.innerHTML = `<div class="vazio">Não deu para ler o ranking. Roda o arquivo supabase.sql no SQL Editor e tenta de novo.<br><small>${esc(rank.motivo || "")}</small></div>`;
    return;
  }

  const rows = rank.rows;
  const local = totais().por[m.id] || { ok: 0, bad: 0 };
  const tentativas = minha
    ? minha.tentativas
    : local.ok + local.bad;
  const falta = Math.max(0, (sb.minRank || 10) - tentativas);
  if (sb.logado() && falta > 0) {
    status.textContent = `Você já tem ${tentativas} respostas nesta matéria. Faltam ${falta} para entrar no rank.`;
  } else if (sb.logado()) {
    const eu = rows.find((r) => r.sou_eu);
    status.textContent = eu
      ? `Você está em ${eu.posicao}º nesta matéria (${eu.percentual}%).`
      : "Você já tem respostas suficientes, mas está oculto no rank ou ainda não sincronizou.";
  } else {
    status.textContent = "Entra na conta (caixa de login no início da página) para subir suas estatísticas e aparecer aqui.";
  }

  if (!rows.length) {
    tabela.innerHTML =
      '<div class="vazio">Ainda não tem ninguém no ranking desta matéria. Precisa de pelo menos 10 respostas.</div>';
    return;
  }

  tabela.innerHTML = `
    <div class="rank-table">
      ${rows
        .map(
          (r) => `
        <div class="rank-row${r.sou_eu ? " eu" : ""}">
          <span class="rank-pos">${esc(r.posicao)}º</span>
          <span class="rank-face">${esc(r.avatar || "🎯")}</span>
          <span class="rank-nome">${esc(r.apelido || "Concurseiro")}</span>
          <span class="rank-pct">${r.percentual}%</span>
          <span class="rank-det">${r.acertos} acertos · ${r.tentativas} respostas</span>
        </div>`
        )
        .join("")}
    </div>`;
}

function render() {
  if (!logado()) {
    travarApp(false);
    mostrar("view-login");
    renderConta($("#login-gate"), {
      titulo: "",
      lead: "Usa um e-mail de verdade (Gmail). Se pedir confirmação, abre a caixa e clica no link.",
    });
    return;
  }
  travarApp(true);
  renderChip();
  renderMaterias();
  renderModos();
  if (ui.modo === "plano") {
    mostrar("view-plano");
    renderPlano();
  } else if (ui.modo === "questoes") {
    mostrar("view-questoes-home");
    renderQuestoesHome();
  } else if (ui.modo === "cards") {
    mostrar("view-cards");
    renderCards();
  } else if (ui.modo === "desempenho") {
    mostrar("view-desempenho");
    renderDesempenho();
  } else if (ui.modo === "rank") {
    mostrar("view-rank");
    renderRank();
  } else {
    mostrar("view-perfil");
    renderPerfil();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  window.CNAPROVADO_ON_CLOUD = () => render();
  render();
  $$("#modos-nav .modo, #dock [data-modo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ui.modo = btn.dataset.modo;
      render();
    });
  });
  $("#chip-perfil").addEventListener("click", () => {
    ui.modo = "perfil";
    render();
  });
  aplicarTema(temaAtual());
  $("#comecar").addEventListener("click", iniciar);
  $("#proxima").addEventListener("click", avancar);
  $("#refazer").addEventListener("click", iniciar);
  $("#inicio").addEventListener("click", () => {
    ui.modo = "questoes";
    render();
  });
  $("#salvar-perfil").addEventListener("click", salvarPerfil);
  try {
    await cloud()?.iniciar();
    render();
  } catch (err) {
    console.warn("Nuvem:", err);
  }
});
