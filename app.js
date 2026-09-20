const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const STORE = "cnaprovado-v1";
const AVATARES = ["🎯", "🦁", "🦅", "🐺", "🐉", "⚡", "📚", "⚖️"];

const ui = {
  materia: "dadm",
  modo: "plano",
  planoIsoSel: null,
  incidenciaFiltro: "",
  afinidadeFiltro: "",
  errosMateria: "todas",
  errosTema: "todos",
  errosAberto: null,
  redacaoKey: "",
  redacaoTick: { running: false, endsAt: 0, remain: 3600, minutos: 60 },
  redacaoAvaliando: false,
  planoAjustes: false,
  navConcurso: null,
  quiz: { i: 0, respostas: [], bloqueado: false, embaralhar: false, fila: [], fonte: "materia" },
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
  if (
    data.planoVista !== "calendario" &&
    data.planoVista !== "lista" &&
    data.planoVista !== "cai" &&
    data.planoVista !== "afin"
  ) {
    data.planoVista = "lista";
  }
  if (!data.afinidadeMateria) data.afinidadeMateria = "todas";
  if (!data.planoHorasPorEmail) data.planoHorasPorEmail = {};
  if (!data.incidenciaConcurso) data.incidenciaConcurso = "sedf";
  if (!data.incidenciaMateria) data.incidenciaMateria = "pt";
  if (!data.errosArquivados) data.errosArquivados = {};
  if (!data.redacaoPorChave) data.redacaoPorChave = {};
  if (!data.planoConcursoPorEmail) data.planoConcursoPorEmail = {};
  if (!data.planoConcursosPorEmail) data.planoConcursosPorEmail = {};
  Object.keys(data.planoConcursoPorEmail).forEach((email) => {
    if (!data.planoConcursosPorEmail[email] && data.planoConcursoPorEmail[email]) {
      const v = data.planoConcursoPorEmail[email];
      data.planoConcursosPorEmail[email] = Array.isArray(v) ? v : [v];
    }
  });
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
  const lista = questoesDaMateria(ui.materia);
  const api = window.CNAPROVADO_AULAS;
  if (!api?.questoesDoConcurso) return lista;
  return api.questoesDoConcurso(lista, ui.materia, planoConcursosAtuais());
}

function cards() {
  const id = ui.materia;
  return questoes().map((q) => {
    const gab =
      q.tipo === "ce"
        ? q.alternativas[q.correta]
        : `${String.fromCharCode(65 + q.correta)}) ${q.alternativas[q.correta]}`;
    return {
      id: `${id}-q${q.id}`,
      materia: id,
      frente: q.enunciado,
      verso: `Gabarito: ${gab}\n\n${q.explicacao}`,
      tema: q.tema,
    };
  });
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
    "view-erros",
    "view-redacao",
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
  $("#concurso-bar")?.classList.toggle("hidden", !on);
  $("#chip-perfil").classList.toggle("hidden", !on);
  $("#dock")?.classList.toggle("hidden", !on);
  $("#frase-dia")?.classList.toggle("hidden", !on);
}

function renderFraseDia() {
  const el = $("#frase-dia");
  if (!el) return;
  const iso = window.CNAPROVADO_PLANOS?.hojeIso?.() || new Date().toISOString().slice(0, 10);
  const item = window.CNAPROVADO_FRASES?.doDia?.(iso);
  if (!item) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `<p class="frase-dia-kicker">Frase do dia</p><blockquote class="frase-dia-texto">${esc(item.t)}</blockquote><cite class="frase-dia-fonte">${esc(item.f)}</cite>`;
}

function materiaEhTi(m) {
  const sigla = String(m?.sigla || "").toLowerCase();
  const nome = String(m?.nome || "").toLowerCase();
  return m?.id === "ti" || sigla === "ti" || nome.includes("informática") || nome === "ti";
}

function idsMateriasDoRecorte() {
  const api = window.CNAPROVADO_PLANOS;
  const ids = new Set();
  planoConcursosAtuais().forEach((conc) => {
    (api?.gruposDoConcurso?.(conc, planoIdAtual()) || []).forEach((g) => {
      g.itens.forEach((it) => {
        if (it.nav && it.appId) ids.add(it.appId);
      });
    });
  });
  return ids;
}

function materiasVisiveis() {
  const esconderTi = planoIdAtual() === "amanda";
  const recorte = idsMateriasDoRecorte();
  const vistos = new Set();
  return materias().filter((m) => {
    if (esconderTi && materiaEhTi(m)) return false;
    const extraUser = String(m.id).startsWith("m-");
    if (recorte.size && !extraUser && !recorte.has(m.id)) return false;
    const k = String(m.sigla || m.id).toLowerCase();
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

function htmlBotaoMateria(m) {
  const btn = document.createElement("button");
  const vazia = !questoesDaMateria(m.id).length;
  btn.className = `materia${m.id === ui.materia ? " ativa" : ""}${vazia ? " is-vazio" : ""}`;
  btn.type = "button";
  btn.title = vazia ? "Matéria do edital — questões ainda não entraram" : m.nome;
  btn.textContent = m.sigla || m.nome;
  btn.addEventListener("click", () => {
    ui.materia = m.id;
    ui.modo = "questoes";
    render();
  });
  return btn;
}

function botaoAddMateria() {
  const add = document.createElement("button");
  add.className = "add-materia";
  add.type = "button";
  add.textContent = "+ Matéria";
  add.addEventListener("click", novaMateria);
  return add;
}

function appendGruposMateria(nav, concurso, lista) {
  const mapa = window.CNAPROVADO_PLANOS?.blocoProvaDoConcurso?.(concurso, planoIdAtual());
  const porApp = Object.fromEntries(lista.map((m) => [m.id, m]));
  const usados = new Set();
  (mapa?.grupos || []).forEach((g) => {
    const mats = [];
    g.itens.forEach((it) => {
      if (!it.nav) return;
      const m = porApp[it.appId];
      if (!m || usados.has(m.id)) return;
      usados.add(m.id);
      mats.push(m);
    });
    if (!mats.length) return;
    const wrap = document.createElement("div");
    wrap.className = `materias-grupo bloco-${g.id}`;
    const lab = document.createElement("p");
    lab.className = "materias-grupo-lab";
    lab.textContent = g.titulo;
    wrap.appendChild(lab);
    const row = document.createElement("div");
    row.className = "materias-grupo-row";
    mats.forEach((m) => row.appendChild(htmlBotaoMateria(m)));
    wrap.appendChild(row);
    nav.appendChild(wrap);
  });
  lista
    .filter((m) => String(m.id).startsWith("m-") && !usados.has(m.id))
    .forEach((m) => {
      const wrap = document.createElement("div");
      wrap.className = "materias-grupo";
      const lab = document.createElement("p");
      lab.className = "materias-grupo-lab";
      lab.textContent = "Outras";
      wrap.appendChild(lab);
      const row = document.createElement("div");
      row.className = "materias-grupo-row";
      row.appendChild(htmlBotaoMateria(m));
      wrap.appendChild(row);
      nav.appendChild(wrap);
    });
}

function renderMaterias() {
  const nav = $("#materias-nav");
  nav.innerHTML = "";
  const esconderTi = planoIdAtual() === "amanda";
  if (esconderTi && materiaEhTi({ id: ui.materia, sigla: ui.materia, nome: ui.materia })) {
    ui.materia = "dadm";
  }
  const concursos = planoConcursosAtuais();
  if (ui.navConcurso && !concursos.includes(ui.navConcurso)) ui.navConcurso = null;
  nav.classList.add("is-grupos");
  if (!ui.navConcurso) return;
  const lista = materiasVisiveis();
  const nome = window.CNAPROVADO_PLANOS?.CONCURSOS?.[ui.navConcurso]?.nome || ui.navConcurso;
  const labConc = document.createElement("p");
  labConc.className = "materias-grupo-lab";
  labConc.textContent = `Matérias · ${nome}`;
  nav.appendChild(labConc);
  appendGruposMateria(nav, ui.navConcurso, lista);
  nav.appendChild(botaoAddMateria());
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
  const api = window.CNAPROVADO_PLANOS;
  const email = emailDaConta();
  const nome = String(db().perfil?.nome || cloud()?.perfil?.apelido || "").toLowerCase();
  const mapa = db().planoPorEmail || {};
  const gmail = api?.EMAIL_GABRIEL || "ggabriel.ferreira.099@gmail.com";
  if (email === gmail) {
    return mapa[email] === "amanda" ? "amanda" : "gabriel";
  }
  if (email && (mapa[email] === "amanda" || mapa[email] === "gabriel")) return mapa[email];
  if (nome.includes("amanda") || email.includes("amanda")) return "amanda";
  return "gabriel";
}

function planoConcursosAtuais() {
  const api = window.CNAPROVADO_PLANOS;
  const email = emailDaConta();
  const data = db();
  const mapaArr = data.planoConcursosPorEmail || {};
  const mapaStr = data.planoConcursoPorEmail || {};
  const salvo = email ? mapaArr[email] ?? mapaStr[email] : data.planoConcursos ?? data.planoConcurso;
  return api?.listaConcursos?.(salvo) || ["sedf"];
}

function planoConcursoAtual() {
  return planoConcursosAtuais()[0] || "sedf";
}

function chaveConcursosAtual() {
  return window.CNAPROVADO_PLANOS?.chaveConcursos?.(planoConcursosAtuais()) || planoConcursosAtuais().join("+");
}

function nomesConcursosAtual() {
  const api = window.CNAPROVADO_PLANOS;
  const ids = planoConcursosAtuais();
  if (api?.nomesConcursos) return api.nomesConcursos(ids);
  return ids
    .map((id) => api?.CONCURSOS?.[id]?.nome || window.CNAPROVADO_INCIDENCIA?.concursoNome?.[id] || id)
    .join(" · ");
}

function setPlanoConcursos(ids) {
  const n = window.CNAPROVADO_PLANOS?.listaConcursos?.(ids) || ["sedf"];
  const email = emailDaConta();
  persist((d) => {
    if (!d.planoConcursosPorEmail) d.planoConcursosPorEmail = {};
    if (!d.planoConcursoPorEmail) d.planoConcursoPorEmail = {};
    if (email) {
      d.planoConcursosPorEmail[email] = n;
      d.planoConcursoPorEmail[email] = n[0];
    } else {
      d.planoConcursos = n;
      d.planoConcurso = n[0];
    }
    if (!n.includes(d.incidenciaConcurso)) d.incidenciaConcurso = n[0];
  });
}

function togglePlanoConcurso(id) {
  const api = window.CNAPROVADO_PLANOS;
  const atual = planoConcursosAtuais();
  const key = String(id || "").toLowerCase();
  const tem = atual.includes(key);
  if (tem && atual.length === 1) return atual;
  const next = api?.listaConcursos?.(tem ? atual.filter((c) => c !== key) : [...atual, key]) || [];
  if (!next.length) return atual;
  setPlanoConcursos(next);
  return next;
}

function setPlanoConcurso(id) {
  togglePlanoConcurso(id);
}

function planoFeitoKey(iso) {
  return `${emailDaConta()}|${chaveConcursosAtual()}|${iso}`;
}

function diaFeito(iso) {
  const d = db().planoFeito;
  const k = planoFeitoKey(iso);
  if (d[k]) return true;
  return Boolean(d[`${emailDaConta()}|${iso}`]);
}

function setPlanoId(id) {
  const email = emailDaConta();
  if (!email) return;
  persist((d) => {
    d.planoPorEmail[email] = id;
  });
}

function toggleDiaFeito(iso) {
  persist((d) => {
    const k = planoFeitoKey(iso);
    d.planoFeito[k] = !d.planoFeito[k];
  });
}

function planoVistaAtual() {
  const v = db().planoVista;
  return v === "calendario" || v === "cai" || v === "afin" ? v : "lista";
}

function setPlanoVista(vista) {
  persist((d) => {
    d.planoVista = vista === "calendario" || vista === "cai" || vista === "afin" ? vista : "lista";
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

function htmlRevisoes(d) {
  const itens = d.revisoes || [];
  if (!itens.length) {
    if (d.i === 0) {
      return `<p class="plano-revisao-vazio">Hoje é o primeiro contato. A revisão de 24h entra amanhã.</p>`;
    }
    return "";
  }
  return `<div class="plano-revisoes">
    <p class="kicker">Revisar · curva do esquecimento</p>
    <ul>
      ${itens
        .map(
          (r) =>
            `<li><b>${esc(r.etiqueta)}</b> ${esc(r.materia)} · ${esc(r.titulo)} — ${esc(r.fazer)}</li>`
        )
        .join("")}
    </ul>
  </div>`;
}

function htmlPlanoBloco(d, opts) {
  const feito = diaFeito(d.iso);
  const temAdm =
    d.materia === "D.Adm" || (d.revisoes || []).some((r) => r.chave === "adm");
  const temRed = String(d.materia || "").startsWith("Redação");
  return `
    <p class="kicker">${esc(opts.kicker)}${d.carga ? ` · ${esc(d.carga)}` : ""}</p>
    <h2>${esc(d.materia)} · ${esc(d.titulo)}</h2>
    <p>${esc(d.fazer)}</p>
    ${htmlRevisoes(d)}
    <div class="actions">
      <button class="primary" type="button" id="${opts.feitoId}">${
        feito ? "Feito ✓" : "Marcar como feito"
      }</button>
      ${
        temRed
          ? `<button class="ghost" type="button" id="${opts.redId}">Escrever agora</button>`
          : ""
      }
      ${
        temAdm
          ? `<button class="ghost" type="button" id="${opts.admId}">Abrir questões de D.Adm</button>`
          : ""
      }
      ${
        (d.revisoes || []).some((r) => r.chave === "adm")
          ? `<button class="ghost" type="button" id="${opts.cardsId}">Abrir cards (revisão)</button>`
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

function bindAbrirRedacao(id, iso) {
  $(`#${id}`)?.addEventListener("click", () => {
    ui.modo = "redacao";
    if (iso) ui.redacaoKey = redacaoChave("plano", `${chaveConcursosAtual()}|${iso}`);
    render();
  });
}

function bindAbrirCards(id) {
  $(`#${id}`)?.addEventListener("click", () => {
    ui.materia = "dadm";
    ui.modo = "cards";
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
          const nRev = (c.item.revisoes || []).length;
          const label = `${c.day} de ${m.nome}, ${c.item.materia}: ${c.item.titulo}${
            nRev ? `, ${nRev} revisão(ões)` : ""
          }${feito ? ", feito" : ""}${eHoje ? ", hoje" : ""}`;
          return `<button type="button" class="plano-cal-cell mat-${chave}${eHoje ? " is-hoje" : ""}${
            eSel ? " is-sel" : ""
          }${feito ? " is-feito" : ""}${nRev ? " tem-revisao" : ""}" data-iso="${c.iso}" aria-label="${esc(
            label
          )}" aria-pressed="${eSel || eHoje ? "true" : "false"}">
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
    <p class="plano-cal-nota">Toque no dia para ver o que estudar. O pontinho no canto é revisão da curva do esquecimento.</p>
    <div class="plano-legenda" aria-label="Cores das matérias">${legenda}</div>`;
}

function fmtPct(n) {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ",");
  return `${s}%`;
}

function htmlMapaEdital() {
  const api = window.CNAPROVADO_PLANOS;
  const cards = api?.mapaProva?.(planoIdAtual(), planoConcursosAtuais()) || [];
  if (!cards.length) return "";
  const aviso =
    planoConcursosAtuais().length > 1
      ? `<p class="edital-aviso">A mesma matéria muda de bloco. TI na SEDF é informática de gerais; no TCE-GO do Gabriel é específico. Na Amanda o específico do TCE é Controle, sem TI.</p>`
      : "";
  const html = cards
    .map((c) => {
      const grupos = c.grupos
        .map((g) => {
          const chips = [
            ...g.itens.map(
              (it) =>
                `<span class="edital-chip is-${esc(g.id)}${it.semConteudo ? " is-vazio" : ""}">${esc(it.nome)}</span>`
            ),
            ...g.extras.map((n) => `<span class="edital-extra">${esc(n)}</span>`),
          ].join("");
          return `<div class="edital-grupo bloco-${esc(g.id)}">
            <p class="field-label">${esc(g.titulo)}</p>
            ${g.lead ? `<details class="gaveta"><summary>O que entra neste bloco</summary><p class="edital-lead">${esc(g.lead)}</p></details>` : ""}
            <div class="edital-chips">${chips}</div>
          </div>`;
        })
        .join("");
      return `<article class="edital-card">
        <p class="kicker">${esc(c.nome)} · ${esc(c.banca)}</p>
        <h3>${esc(c.cargo)}</h3>
        <p class="edital-lead">${esc(c.prova)}</p>
        ${grupos}
      </article>`;
    })
    .join("");
  return `<p class="field-label">Conhecimentos gerais e específicos</p>
    ${aviso}
    <div class="edital-grid">${html}</div>`;
}

function htmlTagsBlocoMateria(materiaId) {
  const api = window.CNAPROVADO_PLANOS;
  return planoConcursosAtuais()
    .map((id) => {
      const g = api?.blocoDaMateria?.(id, materiaId, planoIdAtual());
      const nome = api?.CONCURSOS?.[id]?.nome || id;
      if (!g) return `<span class="edital-tag">${esc(nome)}</span>`;
      return `<span class="edital-tag is-${esc(g.id)}">${esc(nome)} · ${esc(g.curto)}</span>`;
    })
    .join("");
}

function htmlMateriasIncidencia(concurso, materias, materiaAtiva) {
  const mapa = window.CNAPROVADO_PLANOS?.blocoProvaDoConcurso?.(concurso, planoIdAtual());
  const porId = Object.fromEntries((materias || []).map((m) => [m.id, m]));
  const usados = new Set();
  const btn = (m) =>
    `<button type="button" class="modo${m.id === materiaAtiva ? " ativo" : ""}" data-materia="${esc(m.id)}">${esc(m.nome)}</button>`;
  const grupos = (mapa?.grupos || [])
    .map((g) => {
      const mats = [];
      const pendentes = [];
      g.itens.forEach((it) => {
        const m = porId[it.id];
        if (m && !usados.has(m.id)) {
          usados.add(m.id);
          mats.push(m);
        } else if (!m) {
          pendentes.push(it.nome);
        }
      });
      const extrasNomes = [...pendentes, ...(g.extras || [])];
      if (!mats.length && !extrasNomes.length) return "";
      const extras = extrasNomes.length
        ? `<div class="edital-chips">${extrasNomes
            .map((n) => `<span class="edital-extra">${esc(n)}</span>`)
            .join("")}</div>`
        : "";
      const lead = g.lead
        ? `<details class="gaveta"><summary>O que entra neste bloco</summary><p class="edital-lead">${esc(g.lead)}</p></details>`
        : "";
      return `<div class="edital-grupo bloco-${esc(g.id)}">
        <p class="field-label">${esc(g.titulo)}</p>
        ${lead}
        ${mats.length ? `<div class="plano-switch">${mats.map(btn).join("")}</div>` : ""}
        ${extras}
      </div>`;
    })
    .filter(Boolean)
    .join("");
  const resto = (materias || []).filter((m) => !usados.has(m.id) && !(planoIdAtual() === "amanda" && m.id === "ti"));
  const restoHtml = resto.length
    ? `<div class="edital-grupo"><p class="field-label">Outras</p><div class="plano-switch">${resto.map(btn).join("")}</div></div>`
    : "";
  return grupos + restoHtml;
}

function incidenciaSel() {
  const api = window.CNAPROVADO_INCIDENCIA;
  if (!api) return null;
  const concursos = api.concursos();
  let concurso = db().incidenciaConcurso || planoConcursoAtual();
  if (!concursos.some((c) => c.id === concurso)) concurso = concursos[0]?.id || "sedf";
  let materias = api.materias(concurso);
  if (planoIdAtual() === "amanda") {
    materias = materias.filter((m) => m.id !== "ti");
  }
  let materia = db().incidenciaMateria;
  if (!materias.some((m) => m.id === materia)) materia = materias[0]?.id || "pt";
  return {
    concursos,
    materias,
    concurso,
    materia,
    recorte: api.recorte(concurso, materia),
  };
}

function setIncidenciaFiltro(concurso, materia) {
  persist((d) => {
    if (concurso) d.incidenciaConcurso = concurso;
    if (materia) d.incidenciaMateria = materia;
  });
}

function htmlIncidenciaLista(recorte, filtro) {
  const q = String(filtro || "")
    .trim()
    .toLowerCase();
  const rows = recorte.topicos.filter((t) => !q || t.nome.toLowerCase().includes(q));
  if (!rows.length) {
    return `<p class="vazio">Nenhum assunto com esse filtro.</p>`;
  }
  if (recorte.semContagem) {
    return rows
      .map(
        (t) => `<article class="inc-item">
        <div class="inc-head"><b>${esc(t.nome)}</b></div>
        <p>Recorte do plano — sem contagem de caderno.</p>
      </article>`
      )
      .join("");
  }
  return rows
    .map((t) => {
      const w = t.pct > 0 ? Math.max(t.pct, 1.6) : 0;
      return `<article class="inc-item${t.prio ? " is-prio" : ""}">
        <div class="inc-head">
          <b>${esc(t.nome)}</b>
          <strong>${fmtPct(t.pct)}</strong>
        </div>
        <div class="inc-bar" aria-hidden="true"><span style="width:${w}%"></span></div>
        <p>${t.q} questões · acumula ${fmtPct(t.acc)}${t.prio ? " · prioridade (~70%)" : ""}</p>
      </article>`;
    })
    .join("");
}

function optsIncidenciaLeitura() {
  return { pessoa: planoIdAtual() };
}

function htmlIncTags(lista, cls) {
  if (!lista?.length) return "";
  return `<div class="inc-tags">${lista
    .map((nome) => `<span class="inc-tag ${cls}">${esc(nome)}</span>`)
    .join("")}</div>`;
}

function htmlIncCamadaEdital(lei) {
  const ed = lei?.edital;
  const mat = ed?.materia;
  if (!ed || !mat) {
    return `<article class="inc-camada">
      <p class="kicker">Camada 1 · Edital passado</p>
      <p>Ainda não mapeamos o programa desta matéria neste concurso.</p>
    </article>`;
  }
  const nOficial =
    mat.noEdital === false
      ? ""
      : mat.nEdital != null
        ? `<p class="inc-n"><b>${mat.nEdital}</b> questões oficiais nesta disciplina · prova de ${ed.n}.</p>`
        : `<p class="inc-n">Está no programa, mas o edital <b>não deu n próprio</b> para esta matéria — só o bloco “${esc(mat.bloco)}”.</p>`;
  const fora = mat.fora?.length
    ? `<p class="inc-aviso">Não estava neste edital:</p>${htmlIncTags(mat.fora, "out")}`
    : "";
  return `<article class="inc-camada">
    <p class="kicker">Camada 1 · Edital ${ed.ano} · ${esc(ed.banca)}</p>
    <h3>${esc(ed.cargo)}</h3>
    <p>${esc(mat.bloco)}</p>
    ${nOficial}
    ${mat.nota ? `<p class="inc-aviso">${esc(mat.nota)}</p>` : ""}
    ${mat.noEdital === false ? `<p class="inc-aviso"><b>Fora da última prova deste cargo.</b></p>` : ""}
    ${htmlIncTags(mat.programa, "in")}
    ${fora}
    <p class="plano-cal-nota">Fonte: <a href="${esc(ed.fonteUrl)}" target="_blank" rel="noopener noreferrer">${esc(ed.fonte)}</a></p>
  </article>`;
}

function htmlIncLinhasDisciplina(prova, destaque) {
  const rows = [...(prova.editalOficial || prova.disciplinas || [])].sort(
    (a, b) => (b.q || 0) - (a.q || 0) || String(a.nome).localeCompare(String(b.nome), "pt-BR")
  );
  return `<ul class="inc-prova-lista">${rows
    .map((d) => {
      const on = d.materia === destaque || (prova.agrupa?.[destaque] || []).includes(d.materia);
      return `<li class="${on ? "is-on" : ""}"><b>${d.q}</b> · ${esc(d.nome)}${on ? " · esta matéria" : ""}</li>`;
    })
    .join("")}</ul>`;
}

function htmlIncCamadaProva(lei) {
  const prova = lei?.prova;
  if (!prova) {
    return `<article class="inc-camada">
      <p class="kicker">Camada 2 · Prova deste cargo</p>
      <p>Ainda não contamos uma prova deste cargo com fonte.</p>
    </article>`;
  }
  const desta = prova.ausente
    ? `<p class="inc-n"><b>0</b> nesta prova · ${esc(prova.cargo)} ${prova.ano} · n=${prova.n}.</p>`
    : `<p class="inc-n"><b>${prova.qMateria}</b> de ${prova.n} (${prova.pct != null ? fmtPct(prova.pct) : "—"}) nesta prova · ${esc(prova.cargo)} ${prova.ano}.</p>`;
  const extra = (lei.outrasProvas || [])
    .map((p) => {
      const q = (p.disciplinas || [])
        .filter((d) => d.materia === lei.materia || (p.agrupa?.[lei.materia] || []).includes(d.materia))
        .reduce((s, d) => s + d.q, 0);
      const oficial = (p.editalOficial || []).filter(
        (d) => d.materia === lei.materia || (lei.materia === "adm" && d.materia === "lic")
      );
      const nOf = oficial.reduce((s, d) => s + d.q, 0);
      const extraN = nOf ? `edital ${nOf}` : `${q} na classificação`;
      return `<p class="inc-aviso">Outro cargo, mesma banca: <b>${esc(p.cargo)}</b> — ${extraN} nesta matéria. Fonte diferente, não mistura.</p>`;
    })
    .join("");
  return `<article class="inc-camada">
    <p class="kicker">Camada 2 · Prova deste cargo · n=1</p>
    <h3>${esc(prova.cargo)} · ${prova.banca} ${prova.ano}</h3>
    ${desta}
    <p class="inc-aviso">${esc(prova.aviso || "n=1 prova. Não vira % de tópico.")}</p>
    ${htmlIncLinhasDisciplina(prova, lei.materia)}
    ${extra}
    <p class="plano-cal-nota">Fonte: <a href="${esc(prova.fonteUrl)}" target="_blank" rel="noopener noreferrer">${esc(prova.fonte)}</a> · ${esc(prova.nRotulo)}</p>
  </article>`;
}

function htmlIncCruzLinha(lei) {
  const ed = lei.edital?.materia;
  const prova = lei.prova;
  const cad = lei.recorte;
  const nEd =
    ed?.nEdital != null
      ? `${ed.nEdital} oficiais`
      : ed?.noEdital === false
        ? "fora do edital"
        : ed
          ? "no programa, sem n próprio"
          : "—";
  const nPr = !prova
    ? "—"
    : prova.ausente
      ? `0/${prova.n}`
      : `${prova.qMateria}/${prova.n}`;
  const nCad = cad?.semContagem ? "sem caderno" : cad ? `${cad.total.toLocaleString("pt-BR")} no caderno` : "—";
  return `<article class="inc-cruz-item">
    <p class="kicker">${esc(lei.nome)} · ${esc(lei.edital?.banca || lei.prova?.banca || "")}</p>
    <p><span>Edital</span> <b>${esc(nEd)}</b></p>
    <p><span>Prova do cargo</span> <b>${esc(nPr)}</b></p>
    <p><span>Caderno da banca</span> <b>${esc(nCad)}</b></p>
  </article>`;
}

function htmlIncCruz(materia, concursos) {
  const api = window.CNAPROVADO_INCIDENCIA;
  if (!api?.cruzar) return "";
  const ids = concursos?.length ? concursos : api.concursoOrdem;
  const visiveis = planoIdAtual() === "amanda" ? ids.filter((id) => id) : ids;
  const rows = api.cruzar(materia, visiveis, optsIncidenciaLeitura());
  return `<div class="inc-cruz" aria-label="Cruzamento por concurso">
    ${rows.map(htmlIncCruzLinha).join("")}
  </div>`;
}

function htmlIncidencia() {
  const sel = incidenciaSel();
  if (!sel?.recorte) {
    return `<p class="vazio">Não deu para carregar a tabela de incidência.</p>`;
  }
  const { recorte, concursos, materias, concurso, materia } = sel;
  const api = window.CNAPROVADO_INCIDENCIA;
  const lei = api?.leitura?.(concurso, materia, optsIncidenciaLeitura());
  const concBtns = concursos
    .map(
      (c) =>
        `<button type="button" class="modo${c.id === concurso ? " ativo" : ""}" data-concurso="${esc(c.id)}">${esc(c.nome)}</button>`
    )
    .join("");
  const matBlocos = htmlMateriasIncidencia(concurso, materias, materia);
  const filtro = ui.incidenciaFiltro || "";
  const prioN = recorte.semContagem ? recorte.topicos.length : recorte.topicos.filter((t) => t.prio).length;
  const bloco = window.CNAPROVADO_PLANOS?.blocoDaMateria?.(concurso, materia, planoIdAtual());
  return `
    <p class="field-label">Concurso</p>
    <div class="plano-switch" id="inc-concursos">${concBtns}</div>
    <div id="inc-materias">${matBlocos}</div>
    ${htmlIncCruz(materia, api.concursoOrdem)}
    <div class="meta inc-resumo">
      <div><b>${esc(recorte.concursoNome)}</b><span>Caderno ${esc(recorte.banca)}${bloco ? ` · ${esc(bloco.titulo)}` : ""}</span></div>
      <div><b>${recorte.semContagem ? "—" : recorte.total.toLocaleString("pt-BR")}</b><span>${recorte.semContagem ? "sem contagem" : "no caderno"}</span></div>
      <div><b>${prioN}</b><span>${recorte.semContagem ? "assuntos do plano" : "prioridade (~70%)"}</span></div>
    </div>
    <details class="gaveta">
      <summary>De onde vêm esses números</summary>
      <p class="edital-lead">
        Sem API da QConcursos ou do TEC. Edital passado (programa e n oficial quando existe),
        prova deste cargo (n=1) e caderno da banca (tendência). % de tópico só do caderno.
      </p>
      <div class="inc-camadas">
        ${htmlIncCamadaEdital(lei)}
        ${htmlIncCamadaProva(lei)}
      </div>
      <p class="plano-cal-hint">${esc(recorte.recorte)} Tendência da banca, não é o edital de 2026 e não é a prova deste cargo.</p>
      <p class="plano-cal-nota">Fonte do caderno: <a href="${esc(recorte.fonteUrl)}" target="_blank" rel="noopener noreferrer">TEC Concursos · priorização de assuntos</a></p>
    </details>
    <label class="inc-filtro-label" for="inc-filtro">Filtrar assunto</label>
    <input id="inc-filtro" class="inc-filtro" type="search" placeholder="ex.: interpretação, licitações" value="${esc(filtro)}" autocomplete="off" />
    <div class="inc-legenda" aria-label="Legenda">
      <span class="inc-leg-prio">Cai mais no caderno</span>
      <span>Cai pouco</span>
    </div>
    <div id="inc-lista" class="inc-lista">${htmlIncidenciaLista(recorte, filtro)}</div>
  `;
}

function bindIncidencia() {
  $$("#inc-concursos [data-concurso]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const concurso = btn.dataset.concurso;
      const mats = window.CNAPROVADO_INCIDENCIA?.materias(concurso) || [];
      const visiveis = planoIdAtual() === "amanda" ? mats.filter((m) => m.id !== "ti") : mats;
      const atual = db().incidenciaMateria;
      const materia = visiveis.some((m) => m.id === atual) ? atual : visiveis[0]?.id;
      setIncidenciaFiltro(concurso, materia);
      const y = window.scrollY;
      renderPlano();
      window.scrollTo(0, y);
    });
  });
  $$("#inc-materias [data-materia]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setIncidenciaFiltro(null, btn.dataset.materia);
      const y = window.scrollY;
      renderPlano();
      window.scrollTo(0, y);
    });
  });
  $("#inc-filtro")?.addEventListener("input", (e) => {
    ui.incidenciaFiltro = e.target.value;
    const sel = incidenciaSel();
    const box = $("#inc-lista");
    if (sel?.recorte && box) box.innerHTML = htmlIncidenciaLista(sel.recorte, ui.incidenciaFiltro);
  });
}

function renderPlano() {
  const api = window.CNAPROVADO_PLANOS;
  if (!api) return;
  const id = planoIdAtual();
  const concursos = planoConcursosAtuais();
  const nomes = nomesConcursosAtual();
  const meta = api.metaPlano ? api.metaPlano(id, concursos) : api.PLANOS[id];
  const carga = planoCargaAtual();
  const dias = api.diasDoPlano(id, carga, concursos);
  const hoje = api.hojeIso();
  const feitos = dias.filter((d) => diaFeito(d.iso)).length;
  const deHoje = dias.find((d) => d.iso === hoje) || dias[0];
  const vista = planoVistaAtual();
  const deSel = dias.find((d) => d.iso === ui.planoIsoSel) || (vista === "calendario" ? deHoje : null);
  const mostrarSel = Boolean(vista === "calendario" && deSel);

  $("#view-plano").classList.toggle("vista-cai", vista === "cai");
  $("#view-plano").classList.toggle("vista-afin", vista === "afin");
  if (vista === "cai") {
    $("#plano-kicker").textContent = "Edital · prova · caderno";
    $("#plano-titulo").textContent = "O que cai";
    $("#plano-lead").textContent =
      "Lista por % do caderno. Abre “De onde vêm esses números” se quiser edital, prova n=1 e fonte.";
  } else if (vista === "afin") {
    $("#plano-kicker").textContent = `Afinidade · ${meta.dono}`;
    $("#plano-titulo").textContent =
      concursos.length === 1 ? `O que cai no ${nomes}` : `Compatibilidade · ${nomes}`;
    $("#plano-lead").textContent =
      concursos.length === 1
        ? `Só ${nomes} marcado. Marca mais um em “Vou estudar” para cruzar. Como ler e o mapa das matérias ficam nas gavetas.`
        : `Marcou ${nomes}. Verde vale em todos; cinza é recorte de um só. Como ler fica na gaveta.`;
  } else {
    $("#plano-kicker").textContent = `Mês 1 · ${meta.dono}`;
    $("#plano-titulo").textContent =
      id === "amanda" ? `Plano da Amanda · ${nomes}` : `Plano do Gabriel · ${nomes}`;
    $("#plano-lead").textContent =
      concursos.length === 1
        ? `${meta.materias}. Hoje embaixo. Método, horas, Gabriel/Amanda e o mapa CG/CE ficam em Ajustar plano. 14/09 a 13/10/2026.`
        : `${meta.materias}. Cronograma dos ${concursos.length} concursos (${nomes}). Ajustar plano guarda método, horas e o mapa CG/CE. 14/09 a 13/10/2026.`;
  }
  const elMapa = $("#plano-edital");
  if (elMapa) elMapa.innerHTML = htmlMapaEdital();
  const boxAjustes = $("#plano-ajustes");
  const btnAjustes = $("#plano-ajustes-btn");
  if (boxAjustes) boxAjustes.classList.toggle("hidden", !ui.planoAjustes);
  if (btnAjustes) {
    btnAjustes.setAttribute("aria-expanded", ui.planoAjustes ? "true" : "false");
    btnAjustes.textContent = ui.planoAjustes ? "Fechar ajustes" : "Ajustar plano";
  }
  $("#plano-meta").innerHTML = `
    <div><b>${feitos}/${dias.length}</b><span>dias feitos</span></div>
    <div><b>${deHoje.horas}h</b><span>hoje</span></div>
    <div><b>${deHoje.revisoes?.length || 0}</b><span>revisões hoje</span></div>
  `;
  $("#plano-hoje").innerHTML = htmlPlanoBloco(deHoje, {
    kicker: "Hoje",
    feitoId: "plano-feito-hoje",
    admId: "plano-abrir-adm",
    cardsId: "plano-cards-hoje",
    redId: "plano-red-hoje",
  });
  $("#plano-hoje").classList.toggle("hidden", vista !== "lista");
  $("#plano-switch").innerHTML = `
    <button type="button" class="modo${id === "gabriel" ? " ativo" : ""}" data-plano="gabriel">Gabriel</button>
    <button type="button" class="modo${id === "amanda" ? " ativo" : ""}" data-plano="amanda">Amanda</button>
  `;
  $("#plano-concurso").innerHTML = htmlSwitchConcurso(concursos);
  $("#plano-horas-dia").innerHTML = htmlHorasBtns(carga.dia, "dia");
  $("#plano-horas-fim").innerHTML = htmlHorasBtns(carga.fim, "fim");
  $("#plano-horas-hint").textContent = api.dicaCarga(carga);
  $("#plano-vista").innerHTML = `
    <button type="button" class="modo${vista === "lista" ? " ativo" : ""}" data-vista="lista">Lista</button>
    <button type="button" class="modo${vista === "calendario" ? " ativo" : ""}" data-vista="calendario">Calendário</button>
    <button type="button" class="modo${vista === "cai" ? " ativo" : ""}" data-vista="cai">O que cai</button>
    <button type="button" class="modo${vista === "afin" ? " ativo" : ""}" data-vista="afin">Afinidade</button>
  `;
  $("#plano-lista").classList.toggle("hidden", vista !== "lista");
  $("#plano-calendario").classList.toggle("hidden", vista !== "calendario");
  $("#plano-incidencia").classList.toggle("hidden", vista !== "cai");
  $("#plano-incidencia").innerHTML = vista === "cai" ? htmlIncidencia() : "";
  $("#plano-afinidade").classList.toggle("hidden", vista !== "afin");
  $("#plano-afinidade").innerHTML = vista === "afin" ? htmlAfinidade() : "";
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
        ${htmlRevisoes(d)}
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
      cardsId: "plano-cards-sel",
      redId: "plano-red-sel",
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
  bindAbrirCards("plano-cards-hoje");
  bindAbrirRedacao("plano-red-hoje", deHoje.iso);
  $("#plano-feito-sel")?.addEventListener("click", () => {
    const yNow = window.scrollY;
    toggleDiaFeito(deSel.iso);
    renderPlano();
    window.scrollTo(0, yNow);
  });
  bindAbrirAdm("plano-abrir-sel");
  bindAbrirCards("plano-cards-sel");
  bindAbrirRedacao("plano-red-sel", deSel?.iso);
  $$("#plano-switch [data-plano]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoId(btn.dataset.plano);
      renderMaterias();
      renderPlano();
    });
  });
  bindMarcaConcursos("#plano-concurso");
  $$("#plano-horas-dia [data-horas], #plano-horas-fim [data-horas]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoCarga(btn.dataset.carga, Number(btn.dataset.horas));
      renderPlano();
    });
  });
  $$("#plano-vista [data-vista]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPlanoVista(btn.dataset.vista);
      if (btn.dataset.vista === "calendario") {
        if (!ui.planoIsoSel) ui.planoIsoSel = hoje;
      } else {
        ui.planoIsoSel = null;
      }
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
  if (vista === "cai") bindIncidencia();
  if (vista === "afin") bindAfinidade();
}

function htmlAfinPct(row) {
  if (!row) return `<span class="afin-vazio">—</span>`;
  if (row.pct == null) return `<span class="afin-plano">plano</span>`;
  return `<strong>${fmtPct(row.pct)}</strong>`;
}

function htmlAfinChips(concursos, alvo) {
  const api = window.CNAPROVADO_INCIDENCIA;
  const ordem = (alvo && alvo.length ? alvo : api?.concursoOrdem) || ["sedf", "pmdf", "tcego"];
  return ordem
    .map((id) => {
      const on = concursos.includes(id);
      const nome = api?.concursoNome?.[id] || id;
      return `<span class="afin-chip${on ? " on" : ""}">${esc(nome)}</span>`;
    })
    .join("");
}

function htmlAfinAssunto(item, alvo) {
  const api = window.CNAPROVADO_INCIDENCIA;
  const ordem = (alvo && alvo.length ? alvo : api?.concursoOrdem) || ["sedf", "pmdf", "tcego"];
  const nMax = ordem.length;
  const todos = nMax > 1 && item.n === nMax;
  const pcts = ordem
    .map((id) => {
      const nome = api?.concursoNome?.[id] || id;
      return `<span><i>${esc(nome)}</i>${htmlAfinPct(item.porConcurso[id])}</span>`;
    })
    .join("");
  return `<article class="afin-item n${item.n}${todos ? " n-todos" : ""}">
    <header>
      <p class="kicker">${esc(item.materiaNome)} · ${esc(item.par)}</p>
      <div class="edital-chips">${htmlTagsBlocoMateria(item.materia)}</div>
      <h3>${esc(item.nome)}</h3>
    </header>
    <div class="afin-chips">${htmlAfinChips(item.concursos, ordem)}</div>
    <div class="afin-pcts n${ordem.length}">${pcts}</div>
  </article>`;
}

function htmlAfinGrupo(titulo, lead, itens, alvo, aberto) {
  if (!itens.length) return "";
  return `<details class="gaveta"${aberto ? " open" : ""}>
    <summary>${esc(titulo)} (${itens.length})</summary>
    <p class="afin-grupo-lead">${esc(lead)}</p>
    <div class="afin-lista">${itens.map((item) => htmlAfinAssunto(item, alvo)).join("")}</div>
  </details>`;
}

function optsAfinidade(filtro) {
  return {
    pessoa: planoIdAtual(),
    materia: db().afinidadeMateria || "todas",
    filtro: filtro ?? ui.afinidadeFiltro ?? "",
    concursos: planoConcursosAtuais(),
  };
}

function htmlAfinidade() {
  const api = window.CNAPROVADO_INCIDENCIA;
  if (!api?.afinidade) return `<p class="vazio">Não deu para carregar a afinidade.</p>`;
  const materia = db().afinidadeMateria || "todas";
  const filtro = ui.afinidadeFiltro || "";
  const dados = api.afinidade(optsAfinidade(filtro));
  const nMax = dados.nMax || dados.escolhidos?.length || 3;
  const nomes = nomesConcursosAtual();
  const mats = [
    { id: "todas", nome: "Todas" },
    ...dados.materias.filter((m) => m.n > 0).map((m) => ({ id: m.id, nome: m.nome })),
  ];
  const matBtns = mats
    .map(
      (m) =>
        `<button type="button" class="modo${m.id === materia ? " ativo" : ""}" data-afin-mat="${esc(m.id)}">${esc(m.nome)}</button>`
    )
    .join("");
  const matCards = dados.materias
    .filter((m) => m.n > 0)
    .map((m) => {
      const todos = nMax > 1 && m.n === nMax;
      return `<article class="afin-mat n${m.n}${todos ? " n-todos" : ""}">
        <p class="kicker">${esc(m.par)}</p>
        <h3>${esc(m.nome)}</h3>
        <div class="edital-chips">${htmlTagsBlocoMateria(m.id)}</div>
        <p>${esc(m.nota)}</p>
      </article>`;
    })
    .join("");
  const comoLer =
    nMax === 1
      ? `Você marcou só <b>${esc(nomes)}</b>. Marca mais um concurso em “Vou estudar” para ver o cruzamento e gerar o calendário dos dois.`
      : nMax === 2
        ? `Verde = o mesmo assunto cai nos <b>2</b> que você marcou (${esc(nomes)}): estuda uma vez, vale nos dois. Cinza = recorte de <b>um</b> só. O concurso que ficou de fora não entra nesta lista. Os % são a camada 3 (caderno TEC). Peso da matéria na prova e no edital fica em “O que cai”.`
        : `Verde = o mesmo assunto cai nos <b>3</b> concursos: estuda uma vez, vale nos três.
        Amarelo = vale em <b>2</b>. Cinza = recorte de <b>um</b> só. Os % são a camada 3
        (caderno TEC, não é o edital de 2026). “plano” é assunto do calendário
        quando a banca não publicou caderno. Peso da matéria na prova e no edital fica em “O que cai”.`;
  const nMats = dados.materias.filter((m) => m.n > 0).length;
  const marcados = planoConcursosAtuais();
  const concBtns = htmlSwitchConcurso(marcados);
  const dicaMarca =
    marcados.length === 1
      ? `Só ${esc(nomes)} marcado. Clica em mais um chip (PM DF, TCE-GO…) para cruzar.`
      : `Marcou ${esc(nomes)}. Clica de novo num chip para tirar; tem que ficar pelo menos um.`;
  return `
    <p class="field-label">Vou estudar — marca um, dois ou os três</p>
    <div class="plano-switch" id="afin-concursos">${concBtns}</div>
    <p class="concurso-hint">${dicaMarca}</p>
    <details class="gaveta">
      <summary>Como ler</summary>
      <p>${comoLer}</p>
    </details>
    <details class="gaveta">
      <summary>Matérias neste recorte (${nMats})</summary>
      <div class="afin-mats">${matCards}</div>
    </details>
    <p class="field-label">Filtrar matéria</p>
    <div class="plano-switch" id="afin-materias">${matBtns}</div>
    <label class="inc-filtro-label" for="afin-filtro">Filtrar assunto</label>
    <input id="afin-filtro" class="inc-filtro" type="search" placeholder="ex.: licitações, art. 5º, Windows" value="${esc(filtro)}" autocomplete="off" />
    <div id="afin-live">${htmlAfinBlocos(dados)}</div>
  `;
}

function htmlAfinBlocos(dados) {
  const alvo = dados.escolhidos || planoConcursosAtuais();
  const nMax = dados.nMax || alvo.length || 3;
  const nomes = window.CNAPROVADO_PLANOS?.nomesConcursos?.(alvo) || nomesConcursosAtual();
  const vazio = dados.assuntos.length
    ? ""
    : `<p class="vazio">Nenhum assunto com esse filtro.</p>`;
  const meta =
    nMax === 1
      ? `<div class="meta inc-resumo" id="afin-meta">
      <div><b>${dados.nos1.length}</b><span>neste concurso</span></div>
    </div>`
      : nMax === 2
        ? `<div class="meta inc-resumo" id="afin-meta">
      <div><b>${dados.nosTodos.length}</b><span>valem nos 2</span></div>
      <div><b>${dados.nos1.length}</b><span>só de um</span></div>
    </div>`
        : `<div class="meta inc-resumo" id="afin-meta">
      <div><b>${dados.nosTodos.length}</b><span>valem nos 3</span></div>
      <div><b>${(dados.nos2 || dados.nosParcial || []).length}</b><span>valem em 2</span></div>
      <div><b>${dados.nos1.length}</b><span>só de um</span></div>
    </div>`;
  const grupos =
    nMax === 1
      ? htmlAfinGrupo("Neste concurso", `Recorte da ${nomes}. Marca mais um em “Vou estudar” para cruzar.`, dados.nos1, alvo, true)
      : nMax === 2
        ? `${htmlAfinGrupo("Vale nos 2", `Estuda uma vez. Cai nos dois que você marcou (${nomes}).`, dados.nosTodos, alvo, true)}
    ${htmlAfinGrupo("Só de um concurso", "Não mistura. Estuda quando o plano daquele concurso pedir.", dados.nos1, alvo, false)}`
        : `${htmlAfinGrupo("Vale nos 3", "Estuda uma vez. Cai na SEDF, na PM DF e no TCE-GO.", dados.nosTodos, alvo, true)}
    ${htmlAfinGrupo("Vale em 2", "Cai em dois concursos. O terceiro não cobra esse recorte (ou cobra pouco e fora do caderno).", dados.nos2 || dados.nosParcial || [], alvo, false)}
    ${htmlAfinGrupo("Só de um concurso", "Não mistura. Estuda quando o plano daquele concurso pedir.", dados.nos1, alvo, false)}`;
  return `
    ${meta}
    ${vazio}
    <div id="afin-blocos">
    ${grupos}
    </div>`;
}

function bindAfinidade() {
  bindMarcaConcursos("#afin-concursos");
  $$("#afin-materias [data-afin-mat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      persist((d) => {
        d.afinidadeMateria = btn.dataset.afinMat;
      });
      const y = window.scrollY;
      renderPlano();
      window.scrollTo(0, y);
    });
  });
  $("#afin-filtro")?.addEventListener("input", (e) => {
    ui.afinidadeFiltro = e.target.value;
    const api = window.CNAPROVADO_INCIDENCIA;
    const dados = api?.afinidade(optsAfinidade(ui.afinidadeFiltro));
    const wrap = $("#afin-live");
    if (dados && wrap) wrap.innerHTML = htmlAfinBlocos(dados);
  });
}

function htmlLinkAula(href, texto) {
  return `<a class="aula-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(texto)}</a>`;
}

function htmlAulaCompat(aula) {
  const api = window.CNAPROVADO_INCIDENCIA;
  const ordem = api?.concursoOrdem || ["sedf", "pmdf", "tcego"];
  const questoesEm = window.CNAPROVADO_AULAS?.concursosDaAula?.(aula) || ordem;
  const vale = window.CNAPROVADO_AULAS?.valeDaAula?.(aula) || questoesEm;
  const n = vale.length;
  const par = n === 3 ? "Vale nos 3" : n === 2 ? "Vale em 2" : "Só de um concurso";
  const chips = ordem
    .map((id) => {
      const nome = api?.concursoNome?.[id] || id;
      let cls = "afin-chip";
      if (questoesEm.includes(id)) cls += " on neste";
      else if (vale.includes(id)) cls += " on parcial";
      return `<span class="${cls}">${esc(nome)}</span>`;
    })
    .join("");
  const nota = aula.compat ? `<p class="aula-compat-nota">${esc(aula.compat)}</p>` : "";
  return `<div class="aula-compat n${n}">
    <div class="afin-chips"><span class="aula-compat-par">${esc(par)}</span>${chips}</div>
    ${nota}
  </div>`;
}

function htmlLinhaAula(a, treinar) {
  const n = a.de === a.ate ? `Q${a.de}` : `Q${a.de}–${a.ate}`;
  const btn = treinar
    ? `<button type="button" class="linkish" data-treino-de="${a.de}" data-treino-ate="${a.ate}">Treinar estas</button>`
    : `<span class="aula-fora">Fora deste filtro</span>`;
  return `<li>
    ${esc(n)} · ${htmlLinkAula(a.url, a.titulo)}
    ${btn}
    ${htmlAulaCompat(a)}
  </li>`;
}

function htmlFonteAula(materiaId) {
  const pack = window.CNAPROVADO_AULAS?.daMateria?.(materiaId);
  if (!pack) return "";
  const concursos = planoConcursosAtuais();
  const aulas =
    window.CNAPROVADO_AULAS?.aulasDoConcurso?.(materiaId, concursos) || pack.aulas || [];
  const fora = window.CNAPROVADO_AULAS?.aulasForaDoConcurso?.(materiaId, concursos) || [];
  const temTcego = concursos.includes("tcego");
  const soTcego = temTcego && concursos.length === 1;
  const play =
    materiaId === "ti" && soTcego && pack.extra ? pack.extra : pack.playlist;
  const extras = [];
  if (materiaId === "ti" && temTcego) {
    if (soTcego) {
      if (pack.playlist) extras.push(pack.playlist);
    } else if (pack.extra) {
      extras.push(pack.extra);
    }
    if (pack.extra2) extras.push(pack.extra2);
    if (pack.extra3) extras.push(pack.extra3);
  } else if (materiaId !== "ti" && pack.extra) {
    extras.push(pack.extra);
  }
  const linhas = aulas.map((a) => htmlLinhaAula(a, true)).join("");
  const linhasFora = fora.length
    ? `<p class="kicker">Não entra no recorte que você marcou — para você ver a compatibilidade</p>
       <ul class="fonte-fora">${fora.map((a) => htmlLinhaAula(a, false)).join("")}</ul>`
    : "";
  const extra = extras
    .map((p) => `<p>Também serve: ${htmlLinkAula(p.url, p.titulo)}.</p>`)
    .join("");
  const nomeConc = nomesConcursosAtual();
  const tituloPack =
    window.CNAPROVADO_AULAS?.tituloDoConcurso?.(materiaId, concursos) || pack.titulo;
  return `<div class="fonte-aula">
    <p class="kicker">De onde vêm as questões · ${esc(nomeConc)}</p>
    <p>${esc(tituloPack)} · ${esc(pack.professor)}.</p>
    <p><b>Para responder estas questões, veja a aula neste link:</b> ${htmlLinkAula(play.url, play.titulo)}.</p>
    <p>O vídeo não fica no app — o link abre no YouTube. Chip verde = questões neste filtro. Cinza = não cai nesse concurso.</p>
    ${extra}
    <ul>${linhas}</ul>
    ${linhasFora}
  </div>`;
}

function htmlQuizAula(materiaId, qid) {
  const api = window.CNAPROVADO_AULAS;
  const info = api?.daQuestao?.(materiaId, qid);
  if (!info?.aula) return "";
  return `<p class="quiz-aula">Para esta questão, veja a aula: ${htmlLinkAula(info.aula.url, info.aula.titulo)} · ${esc(info.aula.professor || info.pack.professor)}.</p>
    ${htmlAulaCompat(info.aula)}`;
}

function htmlCaiBloco(materiaId, concurso) {
  const api = window.CNAPROVADO_INCIDENCIA;
  const recorte = api?.recorteApp?.(concurso, materiaId);
  const nomeConc = api?.concursoNome?.[concurso] || concurso;
  const matInc = api?.materiaDaApp?.(materiaId) || materiaId;
  const lei = api?.leitura?.(concurso, matInc, optsIncidenciaLeitura());
  if (!recorte && !lei?.edital) {
    return `<div class="fonte-aula cai-materia">
      <p class="kicker">O que mais cai · ${esc(nomeConc)}</p>
      <p>Ainda não tem caderno de incidência para esta matéria neste concurso.</p>
    </div>`;
  }
  const ed = lei?.edital?.materia;
  const prova = lei?.prova;
  const edLinha = ed
    ? ed.noEdital === false
      ? `<li><b>Edital ${lei.edital.ano}</b> · fora do programa deste cargo (${esc(lei.edital.cargo)}).</li>`
      : ed.nEdital != null
        ? `<li><b>Edital ${lei.edital.ano}</b> · ${ed.nEdital} oficiais nesta disciplina · ${esc(ed.bloco)}.</li>`
        : `<li><b>Edital ${lei.edital.ano}</b> · no programa, sem n próprio · ${esc(ed.bloco)}.</li>`
    : "";
  const provaLinha = prova
    ? prova.ausente
      ? `<li><b>Prova ${esc(prova.cargo)} ${prova.ano}</b> · 0 de ${prova.n} nesta matéria · n=1.</li>`
      : `<li><b>Prova ${esc(prova.cargo)} ${prova.ano}</b> · ${prova.qMateria} de ${prova.n}${prova.pct != null ? ` (${fmtPct(prova.pct)})` : ""} · n=1.</li>`
    : "";
  const prio = recorte ? (recorte.semContagem ? recorte.topicos : recorte.topicos.filter((t) => t.prio)) : [];
  const resto = recorte && !recorte.semContagem ? recorte.topicos.filter((t) => !t.prio) : [];
  const destaque = prio.slice(0, 5);
  const linhaTopico = (t) => {
    if (!recorte || recorte.semContagem) return `<li>${esc(t.nome)}</li>`;
    return `<li><b>${esc(t.nome)}</b> · ${fmtPct(t.pct)} · ${t.q} no caderno</li>`;
  };
  const linhasDestaque = destaque.map(linhaTopico).join("");
  const linhasResto = [...prio.slice(5), ...resto].map(linhaTopico).join("");
  const extra = resto.length
    ? `<p>${resto.length} assunto${resto.length === 1 ? "" : "s"} menor${resto.length === 1 ? "" : "es"} ficam na lista completa do caderno.</p>`
    : "";
  const fonteCad = recorte?.fonteUrl
    ? `<p>Caderno: <a href="${esc(recorte.fonteUrl)}" target="_blank" rel="noopener noreferrer">TEC · priorização</a>${lei?.edital?.fonteUrl ? ` · Edital: <a href="${esc(lei.edital.fonteUrl)}" target="_blank" rel="noopener noreferrer">${lei.edital.ano}</a>` : ""}${prova?.fonteUrl ? ` · Prova: <a href="${esc(prova.fonteUrl)}" target="_blank" rel="noopener noreferrer">${prova.ano}</a>` : ""}.</p>`
    : "";
  const nomeMat = recorte?.materiaNome || ed?.bloco || materiaId;
  const banca = recorte?.banca || lei?.edital?.banca || "";
  const bloco = window.CNAPROVADO_PLANOS?.blocoDaMateria?.(concurso, materiaId, planoIdAtual());
  const blocoTxt = bloco ? ` · ${bloco.titulo}` : "";
  const nEd =
    ed?.nEdital != null
      ? String(ed.nEdital)
      : ed?.noEdital === false
        ? "fora"
        : ed
          ? "no programa"
          : "—";
  const nPr = !prova ? "—" : prova.ausente ? `0/${prova.n}` : `${prova.qMateria}/${prova.n}`;
  const nCad = recorte?.semContagem ? "sem caderno" : recorte ? recorte.total.toLocaleString("pt-BR") : "—";
  return `<div class="fonte-aula cai-materia">
    <p class="kicker">O que cai em ${esc(nomeMat)} · ${esc(nomeConc)}${esc(blocoTxt)} · ${esc(banca)}</p>
    <div class="meta inc-resumo">
      <div><b>${esc(nEd)}</b><span>edital</span></div>
      <div><b>${esc(nPr)}</b><span>prova n=1</span></div>
      <div><b>${esc(nCad)}</b><span>caderno</span></div>
    </div>
    ${linhasDestaque ? `<ul>${linhasDestaque}</ul>` : ""}
    <details class="gaveta">
      <summary>Edital, prova e o resto do caderno</summary>
      <ul>${edLinha}${provaLinha}${linhasResto}</ul>
      ${ed?.nota ? `<p>${esc(ed.nota)}</p>` : ""}
      ${prova?.aviso ? `<p>${esc(prova.aviso)}</p>` : ""}
      ${extra}
      ${fonteCad}
    </details>
    <p><button type="button" class="linkish abrir-o-que-cai" data-concurso="${esc(concurso)}">Ver lista completa em O que cai</button></p>
  </div>`;
}

function htmlCaiNaMateria(materiaId) {
  const ids = planoConcursosAtuais();
  return `<div class="cai-stack">${ids.map((id) => htmlCaiBloco(materiaId, id)).join("")}</div>`;
}

function htmlSwitchConcurso(ativos) {
  const api = window.CNAPROVADO_PLANOS;
  const ids = api?.listaConcursos?.(ativos) || (Array.isArray(ativos) ? ativos : [ativos || "sedf"]);
  const soUm = ids.length === 1;
  return Object.values(api?.CONCURSOS || {})
    .map((c) => {
      const on = ids.includes(c.id);
      const unico = on && soUm;
      const aberto = ui.navConcurso === c.id;
      const x =
        on && !unico
          ? `<span class="conc-off" data-conc-off="${esc(c.id)}" title="Tirar ${esc(c.nome)}">×</span>`
          : "";
      return `<button type="button" class="modo${on ? " ativo" : ""}${unico ? " is-unico" : ""}${aberto ? " is-aberto" : ""}" data-concurso="${esc(c.id)}" aria-pressed="${on}" title="${aberto ? "Clica de novo para esconder as matérias" : "Clica para ver as matérias"}">${esc(c.nome)}${x}</button>`;
    })
    .join("");
}

function nomeConcursoAtual() {
  return nomesConcursosAtual();
}

function bancaConcursoAtual() {
  const ids = planoConcursosAtuais();
  const api = window.CNAPROVADO_PLANOS;
  return ids
    .map((id) => api?.CONCURSOS?.[id]?.banca)
    .filter(Boolean)
    .join(" · ");
}

function bindMarcaConcursos(sel) {
  $$(`${sel} [data-conc-off]`).forEach((x) => {
    x.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const id = x.dataset.concOff;
      const antes = planoConcursosAtuais();
      if (antes.length === 1) return;
      togglePlanoConcurso(id);
      if (ui.navConcurso === id) ui.navConcurso = planoConcursosAtuais()[0] || null;
      ui._redacaoMontada = "";
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
    });
  });
  $$(`${sel} [data-concurso]`).forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      if (ev.target.closest("[data-conc-off]")) return;
      const id = btn.dataset.concurso;
      const atual = planoConcursosAtuais();
      if (!atual.includes(id)) {
        togglePlanoConcurso(id);
        ui.navConcurso = id;
      } else {
        ui.navConcurso = ui.navConcurso === id ? null : id;
      }
      ui._redacaoMontada = "";
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
    });
  });
}

function renderFiltroConcurso() {
  const el = $("#filtro-concurso");
  if (!el) return;
  const ids = planoConcursosAtuais();
  el.innerHTML = htmlSwitchConcurso(ids);
  el.setAttribute("aria-multiselectable", "true");
  const hint = $("#filtro-concurso-hint");
  if (hint) {
    hint.textContent = ui.navConcurso
      ? `Matérias de ${window.CNAPROVADO_PLANOS?.CONCURSOS?.[ui.navConcurso]?.nome || ui.navConcurso}. Clica de novo no mesmo para esconder. O × tira o concurso do recorte.`
      : ids.length === 1
        ? `Só ${nomesConcursosAtual()} marcado. Clica nele para ver as matérias. Marca mais um para cruzar a afinidade.`
        : `Marcou ${nomesConcursosAtual()}. Clica num concurso para ver as matérias dele.`;
  }
  bindMarcaConcursos("#filtro-concurso");
}

function extraRedacaoDoConcurso(banca, concs) {
  const ids = window.CNAPROVADO_PLANOS?.listaConcursos?.(concs) || (Array.isArray(concs) ? concs : [concs]);
  const n = String(banca || "")
    .toLowerCase()
    .replace(/\s+/g, "");
  return ids.some((conc) => {
    if (conc === "sedf") return n.includes("sedf") || n.includes("quadrix");
    if (conc === "pmdf") return n.includes("pmdf") || n.includes("cebraspe");
    if (conc === "tcego") return n.includes("tce") || n.includes("fcc");
    return true;
  });
}

function bindQuestoesHome() {
  $$("#fonte-aula [data-treino-de]").forEach((btn) => {
    btn.addEventListener("click", () => {
      iniciarFaixa(Number(btn.dataset.treinoDe), Number(btn.dataset.treinoAte));
    });
  });
  $$(".abrir-o-que-cai").forEach((btn) => {
    btn.addEventListener("click", () => {
      const api = window.CNAPROVADO_INCIDENCIA;
      persist((d) => {
        d.planoVista = "cai";
        d.incidenciaConcurso = btn.dataset.concurso || planoConcursoAtual();
        d.incidenciaMateria = api?.materiaDaApp?.(ui.materia) || ui.materia;
      });
      ui.modo = "plano";
      render();
    });
  });
}

function iniciarFaixa(de, ate) {
  if (!logado()) {
    render();
    return;
  }
  const qs = questoes().filter((q) => q.id >= de && q.id <= ate);
  if (!qs.length) return;
  ui.quiz.fonte = "materia";
  ui.quiz.embaralhar = Boolean($("#embaralhar")?.checked);
  ui.quiz.i = 0;
  ui.quiz.respostas = [];
  ui.quiz.bloqueado = false;
  montarFila(qs.map((q) => ({ materia: ui.materia, qid: q.id })));
  mostrar("view-quiz");
  renderQuestao();
}

function renderQuestoesHome() {
  const m = materiaAtual();
  const qs = questoes();
  const cs = cards();
  const pack = window.CNAPROVADO_AULAS?.daMateria?.(m.id);
  const concursos = planoConcursosAtuais();
  const aulas =
    window.CNAPROVADO_AULAS?.aulasDoConcurso?.(m.id, concursos) || pack?.aulas || [];
  const nomeConc = nomesConcursosAtual();
  $("#kicker-materia").textContent = `${m.nome} · ${nomeConc}`;
  $("#titulo-materia").textContent =
    window.CNAPROVADO_AULAS?.tituloDoConcurso?.(m.id, concursos) || pack?.titulo || m.nome;
  $("#qtd").textContent = String(qs.length);
  $("#meta-cards").textContent = String(cs.length);
  const caiEl = $("#cai-materia");
  if (caiEl) caiEl.innerHTML = htmlCaiNaMateria(m.id);
  const box = $("#fonte-aula");
  if (box) box.innerHTML = htmlFonteAula(m.id);
  if (!qs.length) {
    $("#lead-materia").textContent =
      "Ainda não tem questões nesta aba para estes concursos. Marca outro em “Vou estudar” ou espera a próxima bateria.";
    $("#comecar").classList.add("hidden");
  } else {
    const nErros = cadernoFiltrado().filter((it) => it.materia === m.id).length;
    const extra =
      nErros > 0
        ? ` Você tem ${nErros} erro${nErros === 1 ? "" : "s"} em aberto nesta matéria — revisa no Caderno de erros.`
        : "";
    const aulaTxt = pack
      ? ` As questões saem da aula/playlist do YouTube (${pack.professor}). Não tem vídeo aqui: o link abre a aula.`
      : "";
    const faixas = aulas
      .map((a) => `${a.titulo.split("—")[0].trim()} (Q${a.de}–${a.ate})`)
      .join(" + ");
    $("#lead-materia").textContent =
      (faixas
        ? `${nomeConc}: ${faixas}. Gabarito na hora e revisão dos erros no final.`
        : "Questões no estilo concurso, gabarito na hora e revisão dos erros no final.") +
      aulaTxt +
      extra;
    $("#comecar").classList.remove("hidden");
  }
  bindQuestoesHome();
}

function chaveErro(materia, qid) {
  return `${materia}|${qid}`;
}

function cadernoItens() {
  const arquivados = db().errosArquivados || {};
  const mapa = new Map();
  (db().respostas || []).forEach((r) => {
    const k = chaveErro(r.materia, r.qid);
    const prev = mapa.get(k) || {
      materia: r.materia,
      qid: r.qid,
      vezes: 0,
      last: r,
    };
    if (!r.acertou) prev.vezes += 1;
    prev.last = r;
    mapa.set(k, prev);
  });
  return [...mapa.values()]
    .filter((it) => !it.last.acertou && !arquivados[chaveErro(it.materia, it.qid)])
    .map((it) => {
      const q = questoesDaMateria(it.materia).find((item) => item.id === it.qid);
      const mat = materias().find((m) => m.id === it.materia);
      return {
        ...it,
        q,
        tema: q?.tema || "Sem tema",
        materiaNome: mat?.sigla || mat?.nome || it.materia,
      };
    })
    .filter((it) => it.q)
    .sort((a, b) => (b.last.ts || 0) - (a.last.ts || 0));
}

function cadernoFiltrado() {
  const concs = planoConcursosAtuais();
  const api = window.CNAPROVADO_AULAS;
  return cadernoItens().filter((it) => {
    if (ui.errosMateria !== "todas" && it.materia !== ui.errosMateria) return false;
    if (ui.errosTema !== "todos" && it.tema !== ui.errosTema) return false;
    if (api?.questaoDoConcurso && !api.questaoDoConcurso(it.materia, it.qid, concs)) return false;
    return true;
  });
}

function arquivarErro(materia, qid) {
  persist((d) => {
    d.errosArquivados[chaveErro(materia, qid)] = Date.now();
  });
}

function textoAlt(q, idx) {
  if (idx == null || idx < 0 || !q?.alternativas?.[idx]) return "não gravada";
  return q.tipo === "ce" ? q.alternativas[idx] : `${letra(idx)}) ${q.alternativas[idx]}`;
}

function embaralharArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function montarFila(itens) {
  const base =
    itens ||
    questoes().map((q) => ({ materia: ui.materia, qid: q.id }));
  ui.quiz.fila = ui.quiz.embaralhar ? embaralharArr(base) : base;
}

function questaoAtual() {
  const item = ui.quiz.fila[ui.quiz.i];
  if (!item) return null;
  return questoesDaMateria(item.materia).find((q) => q.id === item.qid) || null;
}

function quizLen() {
  return ui.quiz.fila.length;
}

function iniciar() {
  if (!logado()) {
    render();
    return;
  }
  const qs = questoes();
  if (!qs.length) return;
  ui.quiz.fonte = "materia";
  ui.quiz.embaralhar = Boolean($("#embaralhar")?.checked);
  ui.quiz.i = 0;
  ui.quiz.respostas = [];
  ui.quiz.bloqueado = false;
  montarFila();
  mostrar("view-quiz");
  renderQuestao();
}

function iniciarCaderno() {
  const itens = cadernoFiltrado().map((it) => ({ materia: it.materia, qid: it.qid }));
  if (!itens.length) return;
  ui.quiz.fonte = "erros";
  ui.quiz.embaralhar = true;
  ui.quiz.i = 0;
  ui.quiz.respostas = [];
  ui.quiz.bloqueado = false;
  montarFila(itens);
  mostrar("view-quiz");
  renderQuestao();
}

function renderQuestao() {
  const q = questaoAtual();
  if (!q) return;
  const total = quizLen();
  const n = ui.quiz.i + 1;
  const prefixo = ui.quiz.fonte === "erros" ? "Erro" : "Questão";
  $("#progresso-texto").textContent = `${prefixo} ${n} de ${total}`;
  $("#barra").style.width = `${(n / total) * 100}%`;
  $("#tema").textContent = `${q.tipo === "ce" ? "Certo ou Errado" : "Múltipla escolha"} · ${q.tema}`;
  const aulaEl = $("#quiz-aula");
  if (aulaEl) {
    const mat = ui.quiz.fila[ui.quiz.i]?.materia || ui.materia;
    aulaEl.innerHTML = htmlQuizAula(mat, q.id);
    aulaEl.classList.toggle("hidden", !aulaEl.innerHTML);
  }
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
  const item = ui.quiz.fila[ui.quiz.i];
  const materia = item?.materia || ui.materia;
  const acertou = idx === q.correta;
  ui.quiz.respostas.push({ id: q.id, materia, escolhida: idx, acertou });
  const row = {
    materia,
    qid: q.id,
    acertou,
    escolhida: idx,
    ts: Date.now(),
  };
  persist((d) => {
    d.respostas.push(row);
    if (!acertou) delete d.errosArquivados[chaveErro(materia, q.id)];
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
  fb.innerHTML = `<b>${acertou ? "Acertou." : "Errou."} Gabarito: ${textoAlt(q, q.correta)}</b>${q.explicacao}`;
  if (acertou) celebrar("ok");
  $("#proxima").classList.remove("hidden");
  $("#proxima").textContent = ui.quiz.i + 1 >= quizLen() ? "Ver resultado" : "Próxima";
}

function avancar() {
  if (ui.quiz.i + 1 >= quizLen()) {
    renderResultado();
    return;
  }
  ui.quiz.i += 1;
  renderQuestao();
}

function renderResultado() {
  const total = quizLen();
  const acertos = ui.quiz.respostas.filter((r) => r.acertou).length;
  const pct = total ? Math.round((acertos / total) * 100) : 0;
  let selo = "Siga na revisão.";
  if (pct >= 90) selo = "Nível aprovação.";
  else if (pct >= 70) selo = "Bom desempenho.";
  else if (pct >= 50) selo = "Base ok, aperte nos erros.";
  const mats = new Set(ui.quiz.fila.map((f) => f.materia));
  const bateria = {
    materia: mats.size === 1 ? [...mats][0] : ui.quiz.fonte === "erros" ? "erros" : ui.materia,
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
  erros.forEach((r) => {
    const q = questoesDaMateria(r.materia || ui.materia).find((item) => item.id === r.id);
    if (!q) return;
    const art = document.createElement("article");
    art.innerHTML = `<h3>Q${q.id} · ${esc(q.tema)}</h3><p>${esc(q.enunciado)}</p><p><b>Sua resposta:</b> ${esc(textoAlt(q, r.escolhida))}<br><b>Gabarito:</b> ${esc(textoAlt(q, q.correta))}</p><p>${esc(q.explicacao)}</p>`;
    review.appendChild(art);
  });
}

function renderErros() {
  const concs = planoConcursosAtuais();
  const apiAulas = window.CNAPROVADO_AULAS;
  const todos = cadernoItens().filter((it) =>
    apiAulas?.questaoDoConcurso ? apiAulas.questaoDoConcurso(it.materia, it.qid, concs) : true
  );
  const lista = cadernoFiltrado();
  const matsComErro = [...new Set(todos.map((it) => it.materia))];
  if (ui.errosMateria !== "todas" && !matsComErro.includes(ui.errosMateria) && matsComErro.length) {
    ui.errosMateria = "todas";
  }
  const temas = [...new Set(
    todos
      .filter((it) => ui.errosMateria === "todas" || it.materia === ui.errosMateria)
      .map((it) => it.tema)
  )].sort((a, b) => a.localeCompare(b, "pt-BR"));
  if (ui.errosTema !== "todos" && !temas.includes(ui.errosTema)) ui.errosTema = "todos";

  $("#erros-lead").textContent = todos.length
    ? `Só entra o que a última tentativa ainda errou neste recorte (${nomeConcursoAtual()}). Se você acertar de novo, sai da lista.`
    : `Ainda não tem erro gravado no ${nomeConcursoAtual()}. Faz uma bateria em Questões: o que você errar aparece aqui.`;
  const caiErros = $("#cai-erros");
  if (caiErros) caiErros.innerHTML = htmlCaiNaMateria(ui.errosMateria === "todas" ? ui.materia : ui.errosMateria);
  $("#erros-meta").innerHTML = `
    <div><b>${todos.length}</b><span>em aberto</span></div>
    <div><b>${lista.length}</b><span>neste filtro</span></div>
    <div><b>${temas.length}</b><span>temas</span></div>
  `;
  const matBtns = [`<button type="button" class="modo${ui.errosMateria === "todas" ? " ativo" : ""}" data-erros-mat="todas">Todas</button>`]
    .concat(
      materias()
        .filter((m) => matsComErro.includes(m.id) || m.id === ui.errosMateria)
        .map(
          (m) =>
            `<button type="button" class="modo${ui.errosMateria === m.id ? " ativo" : ""}" data-erros-mat="${esc(m.id)}">${esc(m.sigla || m.nome)}</button>`
        )
    )
    .join("");
  $("#erros-materias").innerHTML = matBtns;
  $("#erros-tema").innerHTML =
    `<option value="todos">Todos os temas</option>` +
    temas.map((t) => `<option value="${esc(t)}"${t === ui.errosTema ? " selected" : ""}>${esc(t)}</option>`).join("");
  $("#erros-acoes").innerHTML = lista.length
    ? `<button type="button" class="primary" id="erros-treinar">Treinar ${lista.length} erro${lista.length === 1 ? "" : "s"}</button>`
    : "";
  $("#erros-lista").innerHTML = lista.length
    ? lista
        .map((it) => {
          const k = chaveErro(it.materia, it.qid);
          const aberto = ui.errosAberto === k;
          const quando = it.last.ts
            ? new Date(it.last.ts).toLocaleDateString("pt-BR")
            : "";
          const detalhe = `<div class="erros-detalhe">
            <p>${esc(it.q.enunciado)}</p>
            <p><b>Sua resposta:</b> ${esc(textoAlt(it.q, it.last.escolhida))}<br>
            <b>Gabarito:</b> ${esc(textoAlt(it.q, it.q.correta))}</p>
            <p>${esc(it.q.explicacao)}</p>
          </div>`;
          return `<article class="erros-item${aberto ? " is-open" : ""}" data-key="${esc(k)}" data-mat="${esc(it.materia)}" data-qid="${it.qid}">
            <header>
              <span>${esc(it.materiaNome)} · Q${it.qid} · ${esc(it.tema)}</span>
              <b>${it.vezes}x</b>
            </header>
            <h3>${esc(it.q.enunciado)}</h3>
            ${aberto ? detalhe : ""}
            <p class="hint">${quando ? `Último erro em ${quando}. ` : ""}Toque para ${aberto ? "fechar" : "ver gabarito"}.</p>
            <button type="button" class="ghost erros-arquivo">Já revisei</button>
          </article>`;
        })
        .join("")
    : `<div class="vazio">${todos.length ? "Nada neste filtro." : "Sem erros em aberto."}</div>`;

  $$("#erros-materias [data-erros-mat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ui.errosMateria = btn.dataset.errosMat;
      ui.errosTema = "todos";
      ui.errosAberto = null;
      renderErros();
    });
  });
  $("#erros-tema").onchange = (e) => {
    ui.errosTema = e.target.value || "todos";
    ui.errosAberto = null;
    renderErros();
  };
  $("#erros-treinar")?.addEventListener("click", iniciarCaderno);
  $$("#erros-lista .erros-item").forEach((el) => {
    el.addEventListener("click", (ev) => {
      if (ev.target.closest(".erros-arquivo")) return;
      ui.errosAberto = ui.errosAberto === el.dataset.key ? null : el.dataset.key;
      renderErros();
    });
    el.querySelector(".erros-arquivo")?.addEventListener("click", (ev) => {
      ev.stopPropagation();
      arquivarErro(el.dataset.mat, Number(el.dataset.qid));
      if (ui.errosAberto === el.dataset.key) ui.errosAberto = null;
      renderErros();
    });
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
  const nomeConc = nomeConcursoAtual();
  $("#cards-lead").textContent =
    `Cards do ${nomeConc} nesta matéria. Frente e verso; marque de novo, difícil, bom ou fácil para o próximo intervalo.`;
  const caiCards = $("#cai-cards");
  if (caiCards) caiCards.innerHTML = htmlCaiNaMateria(ui.materia);
  $("#cards-stats").textContent = fila.length
    ? `${due} para revisar agora · ${novos} novos neste recorte`
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

function isoDiaLocal(ts) {
  const n = ts ? new Date(ts) : new Date();
  if (Number.isNaN(n.getTime())) return "";
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fmtDiaPonto(iso) {
  const p = String(iso || "").split("-");
  if (p.length !== 3) return iso || "";
  return `${p[2]}.${p[1]}.${p[0]}`;
}

function serieQuestoesPorDia() {
  const mapa = new Map();
  (db().respostas || []).forEach((r) => {
    const dia = isoDiaLocal(r.ts);
    if (!dia) return;
    mapa.set(dia, (mapa.get(dia) || 0) + 1);
  });
  return [...mapa.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([iso, n]) => ({ iso, n, rotulo: fmtDiaPonto(iso) }));
}

function htmlChartDias() {
  const serie = serieQuestoesPorDia();
  if (!serie.length) {
    return '<div class="vazio">Responde questões que o gráfico monta o dia: 12.03.2039 · 50 questões.</div>';
  }
  const max = Math.max(...serie.map((d) => d.n), 1);
  const hoje = isoDiaLocal(Date.now());
  const colunas = serie
    .map((d) => {
      const h = Math.max(8, Math.round((d.n / max) * 120));
      const hojeCls = d.iso === hoje ? " is-hoje" : "";
      const [dd, mm, aa] = d.rotulo.split(".");
      return `<div class="dia-col${hojeCls}" title="${esc(d.rotulo)} · ${d.n} questão${d.n === 1 ? "" : "s"}">
        <span class="dia-n">${d.n}</span>
        <span class="dia-bar" style="height:${h}px"></span>
        <span class="dia-label">${esc(dd)}.${esc(mm)}<br>${esc(aa)}</span>
      </div>`;
    })
    .join("");
  return `<div class="chart-dias-scroll" role="img" aria-label="Questões respondidas por dia">${colunas}</div>`;
}

function renderDesempenho() {
  const { geral, por } = totais();
  const total = geral.ok + geral.bad;
  const pct = total ? Math.round((geral.ok / total) * 100) : 0;
  const nAberto = cadernoItens().length;
  const serie = serieQuestoesPorDia();
  const hojeN = serie.find((d) => d.iso === isoDiaLocal(Date.now()))?.n || 0;
  $("#desempenho-lead").textContent = nAberto
    ? `Acertos, erros e quantas você fez em cada dia. ${nAberto} questão${nAberto === 1 ? "" : "s"} ainda em aberto no caderno de erros.`
    : "Acertos, erros e quantas você fez em cada dia. Fica neste aparelho; se você entrar na conta, também sobe para a nuvem.";
  $("#stats-kpis").innerHTML = `
    <div><b>${pct}%</b><span>aproveitamento geral</span></div>
    <div><b>${geral.ok}</b><span>acertos</span></div>
    <div><b>${geral.bad}</b><span>erros</span></div>
    <div><b>${hojeN}</b><span>hoje</span></div>
  `;
  const boxDias = $("#chart-dias");
  if (boxDias) boxDias.innerHTML = htmlChartDias();
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
          const nome =
            materias().find((m) => m.id === b.materia)?.sigla ||
            (b.materia === "erros" ? "Caderno de erros" : b.materia);
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
  const input = $("#gemini-key");
  const hint = $("#gemini-key-hint");
  const k = window.CNAPROVADO_REDACAO?.lerChave?.() || "";
  if (input && input !== document.activeElement) input.value = k;
  if (hint) {
    hint.textContent = k
      ? "Chave extra neste aparelho (opcional). Sem ela, o Avaliar usa a chave do CNAPROVADO no servidor."
      : "Padrão: chave do CNAPROVADO no servidor. Este campo só se você quiser usar outra conta Gemini.";
  }
}

function salvarGeminiKey() {
  window.CNAPROVADO_REDACAO?.salvarChave?.($("#gemini-key")?.value || "");
  const hint = $("#gemini-key-hint");
  const k = window.CNAPROVADO_REDACAO?.lerChave?.() || "";
  if (hint) {
    hint.textContent = k
      ? "Chave extra neste aparelho (opcional)."
      : "Chave extra apagada. O Avaliar volta a usar a do servidor.";
  }
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

function redacaoChave(tipo, id) {
  return `${emailDaConta() || "local"}|${tipo}|${id}`;
}

function parseRedacaoKey(chave) {
  const p = String(chave || "").split("|");
  return { tipo: p[1] || "livre", id: p.slice(2).join("|") };
}

function listaTemasRedacao() {
  const api = window.CNAPROVADO_PLANOS;
  const red = window.CNAPROVADO_REDACAO;
  const dias = api?.diasDoPlano(planoIdAtual(), planoCargaAtual(), planoConcursosAtuais()) || [];
  const hoje = api?.hojeIso?.() || "";
  const conc = chaveConcursosAtual();
  const concs = planoConcursosAtuais();
  const plano = dias
    .filter((d) => String(d.materia).startsWith("Redação"))
    .map((d) => ({
      key: redacaoChave("plano", `${conc}|${d.iso}`),
      label: `${d.data.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      })} · ${d.titulo}`,
      titulo: d.titulo,
      proposta: d.fazer,
      iso: d.iso,
      minutos: red.minutosDoFazer(d.fazer, d.titulo),
      eHoje: d.iso === hoje,
    }));
  const extras = (red?.EXTRAS || [])
    .filter((t) => extraRedacaoDoConcurso(t.banca, concs))
    .map((t) => ({
    key: redacaoChave("livre", t.id),
    label: `${t.banca} · ${t.titulo}`,
    titulo: t.titulo,
    proposta: t.proposta,
    iso: null,
    minutos: 60,
    eHoje: false,
  }));
  return {
    hoje,
    diaHoje: dias.find((d) => d.iso === hoje) || null,
    itens: [...plano, ...extras],
  };
}

function rascunhoRedacao(chave) {
  return (
    (db().redacaoPorChave || {})[chave] || {
      texto: "",
      checks: {},
      minutos: 60,
    }
  );
}

function patchRascunhoRedacao(patch) {
  const chave = ui.redacaoKey;
  if (!chave) return;
  persist((d) => {
    const cur = d.redacaoPorChave[chave] || { texto: "", checks: {}, minutos: 60 };
    d.redacaoPorChave[chave] = {
      ...cur,
      ...patch,
      checks: patch.checks ? patch.checks : cur.checks,
    };
  });
}

function remainRedacao() {
  const t = ui.redacaoTick;
  if (t.running && t.endsAt) return Math.max(0, Math.ceil((t.endsAt - Date.now()) / 1000));
  return Math.max(0, t.remain || 0);
}

function pintarTimerRedacao() {
  const red = window.CNAPROVADO_REDACAO;
  const left = remainRedacao();
  const el = $("#redacao-relogio");
  const box = $("#redacao-timer-box");
  if (el) el.textContent = red.relogio(left);
  box?.classList.toggle("is-fim", left === 0);
  box?.classList.toggle("is-aperta", left > 0 && left <= 5 * 60);
  const start = $("#redacao-start");
  const pause = $("#redacao-pause");
  if (start) start.textContent = ui.redacaoTick.running ? "Rodando…" : left === 0 ? "Recomeçar" : "Começar";
  if (pause) pause.disabled = !ui.redacaoTick.running;
}

function aplicarMinutosRedacao(min, resetClock) {
  const m = window.CNAPROVADO_REDACAO.MINUTOS.includes(min) ? min : 60;
  ui.redacaoTick.minutos = m;
  if (resetClock && !ui.redacaoTick.running) {
    ui.redacaoTick.remain = m * 60;
    ui.redacaoTick.endsAt = 0;
  }
  patchRascunhoRedacao({ minutos: m });
  $$("#redacao-minutos [data-min]").forEach((btn) => {
    btn.classList.toggle("ativo", Number(btn.dataset.min) === m);
  });
  pintarTimerRedacao();
}

function startTimerRedacao() {
  const t = ui.redacaoTick;
  if (t.running) return;
  if (remainRedacao() <= 0) t.remain = (t.minutos || 60) * 60;
  t.endsAt = Date.now() + remainRedacao() * 1000;
  t.running = true;
  pintarTimerRedacao();
}

function pauseTimerRedacao() {
  const t = ui.redacaoTick;
  if (!t.running) return;
  t.remain = remainRedacao();
  t.running = false;
  t.endsAt = 0;
  pintarTimerRedacao();
}

function resetTimerRedacao() {
  const t = ui.redacaoTick;
  t.running = false;
  t.endsAt = 0;
  t.remain = (t.minutos || 60) * 60;
  pintarTimerRedacao();
}

function garantirClockRedacao() {
  if (window.__redacaoClock) return;
  window.__redacaoClock = setInterval(() => {
    if (!ui.redacaoTick.running) return;
    if (remainRedacao() <= 0) {
      ui.redacaoTick.running = false;
      ui.redacaoTick.remain = 0;
      ui.redacaoTick.endsAt = 0;
    }
    if (ui.modo === "redacao") pintarTimerRedacao();
  }, 250);
}

function pintarContagemRedacao() {
  const c = window.CNAPROVADO_REDACAO.contagem($("#redacao-texto")?.value || "");
  const el = $("#redacao-contagem");
  if (el) {
    el.textContent = `${c.palavras} palavras · ${c.linhas} linhas no bloco · ≈ ${c.est} linhas de prova (70 caracteres)`;
  }
}

function htmlParecerRedacao(parecer) {
  if (!parecer) {
    return `<p class="hint">Cola o texto e aperta Avaliar. O parecer usa a rubrica do cargo. Não é correção da banca.</p>`;
  }
  const bloco = (titulo, itens, cls) => {
    if (!itens?.length) return "";
    return `<section class="redacao-parecer-bloco ${cls}"><h3>${esc(titulo)}</h3><ul>${itens
      .map((i) => `<li>${esc(i)}</li>`)
      .join("")}</ul></section>`;
  };
  return `<article class="redacao-parecer">
    <p class="kicker">Parecer${parecer.rotulo ? ` · ${esc(parecer.rotulo)}` : ""}</p>
    ${parecer.aviso ? `<p class="inc-aviso">${esc(parecer.aviso)}</p>` : ""}
    ${bloco("Acertou", parecer.acertou, "ok")}
    ${bloco("Errou", parecer.errou, "bad")}
    ${bloco("Faltou para este cargo", parecer.faltou, "falta")}
    ${parecer.em ? `<p class="hint">${esc(parecer.em)}${parecer.modelo ? ` · ${esc(parecer.modelo)}` : ""}</p>` : ""}
  </article>`;
}

function pintarParecerRedacao(parecer) {
  const box = $("#redacao-parecer");
  if (box) box.innerHTML = htmlParecerRedacao(parecer);
}

async function avaliarRedacaoAtual() {
  const red = window.CNAPROVADO_REDACAO;
  if (!red?.montarPedido) return;
  const texto = $("#redacao-texto")?.value || "";
  patchRascunhoRedacao({ texto });
  const item = listaTemasRedacao().itens.find((t) => t.key === ui.redacaoKey);
  const pre = red.precheck(texto);
  const agora = () => new Date().toLocaleString("pt-BR");
  const guardar = (parecer) => {
    patchRascunhoRedacao({ parecer, texto });
    pintarParecerRedacao(parecer);
  };
  if (!pre.ok) {
    guardar({ ...pre.parecer, rotulo: "texto curto", em: agora() });
    return;
  }
  const pedido = red.montarPedido({
    pessoa: planoIdAtual(),
    concursos: planoConcursosAtuais(),
    titulo: item?.titulo,
    proposta: item?.proposta,
    texto,
  });
  ui.redacaoAvaliando = true;
  const btn = $("#redacao-avaliar");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Avaliando…";
  }
  try {
    const parecer = await red.avaliar(pedido);
    guardar({
      ...parecer,
      rotulo: pedido.rotulo,
      em: agora(),
    });
  } catch (e) {
    const codigo = e.codigo || "";
    const faltou =
      codigo === "nao-logado"
        ? ["Entra na conta. O avaliador padrão usa a chave do CNAPROVADO no servidor."]
        : codigo === "sem-funcao"
          ? ["O avaliador do servidor ainda não está ligado. Enquanto isso, cola uma chave Gemini em Conta (opcional)."]
          : ["Se persistir, cola uma chave Gemini em Conta ou tenta de novo em alguns minutos."];
    guardar({
      acertou: [],
      errou: [`Não deu para avaliar: ${e.message || e}`],
      faltou,
      aviso: "O texto não foi corrigido.",
      rotulo: pedido.rotulo,
      em: agora(),
    });
  } finally {
    ui.redacaoAvaliando = false;
    const b = $("#redacao-avaliar");
    if (b) {
      b.disabled = false;
      b.textContent = "Avaliar";
    }
  }
}

function htmlCheckRedacao(checks) {
  return (window.CNAPROVADO_REDACAO.CHECKLIST || [])
    .map((c) => {
      const on = Boolean(checks?.[c.id]);
      return `<label class="check redacao-check-item">
        <input type="checkbox" data-check="${esc(c.id)}" ${on ? "checked" : ""} />
        ${esc(c.label)}
      </label>`;
    })
    .join("");
}

function carregarRascunhoNaTela(item) {
  let r = rascunhoRedacao(item.key);
  if (!r.texto && item.iso) {
    const sab = window.CNAPROVADO_REDACAO.sabadoDe(item.iso);
    if (sab) {
      const prev = rascunhoRedacao(redacaoChave("plano", `${chaveConcursosAtual()}|${sab}`));
      if (prev.texto) r = { ...r, texto: prev.texto };
    }
  }
  const ta = $("#redacao-texto");
  if (ta) ta.value = r.texto || "";
  $("#redacao-check").innerHTML = htmlCheckRedacao(r.checks);
  const min = r.minutos || item.minutos || 60;
  if (!ui.redacaoTick.running) {
    ui.redacaoTick.minutos = min;
    ui.redacaoTick.remain = min * 60;
    ui.redacaoTick.endsAt = 0;
  }
  pintarContagemRedacao();
}

function renderRedacao() {
  const red = window.CNAPROVADO_REDACAO;
  if (!red) return;
  garantirClockRedacao();
  const pack = listaTemasRedacao();
  const sel = $("#redacao-tema");
  sel.innerHTML = pack.itens
    .map((t) => `<option value="${esc(t.key)}">${esc(t.label)}</option>`)
    .join("");
  let chave = ui.redacaoKey;
  if (!pack.itens.some((t) => t.key === chave)) {
    chave = pack.itens.find((t) => t.eHoje)?.key || pack.itens[0]?.key || "";
    ui.redacaoKey = chave;
  }
  sel.value = chave;
  const item = pack.itens.find((t) => t.key === chave) || pack.itens[0];
  const hojeRed = String(pack.diaHoje?.materia || "").startsWith("Redação");
  $("#redacao-kicker").textContent = hojeRed
    ? `Hoje · ${nomeConcursoAtual()}`
    : `Treino de redação · ${nomeConcursoAtual()}`;
  $("#redacao-lead").textContent = hojeRed
    ? `Hoje o plano do ${nomeConcursoAtual()} é escrever. Liga o cronômetro, cola o texto e avalia com a rubrica deste cargo.`
    : `Temas do ${nomeConcursoAtual()} (${bancaConcursoAtual()}). Escreve ou cola e aperta Avaliar — o parecer segue a rubrica do cargo, não a banca oficial.`;
  const rubs = window.CNAPROVADO_REDACAO.rubricasDe?.(planoIdAtual(), planoConcursosAtuais()) || [];
  const rubHtml = rubs.length
    ? `<p class="kicker">${esc(item?.titulo || "")}</p><p>${esc(item?.proposta || "")}</p><p class="redacao-rubrica">Rubrica: ${esc(window.CNAPROVADO_REDACAO.rotuloRubricas(rubs))}</p>`
    : item
      ? `<p class="kicker">${esc(item.titulo)}</p><p>${esc(item.proposta)}</p>`
      : "";
  $("#redacao-proposta").innerHTML = rubHtml;
  const trocou = ui._redacaoMontada !== chave;
  ui.redacaoKey = chave;
  if (trocou) carregarRascunhoNaTela(item);
  ui._redacaoMontada = chave;
  $("#redacao-minutos").innerHTML = (red.MINUTOS || [20, 40, 60])
    .map(
      (m) =>
        `<button type="button" class="modo${ui.redacaoTick.minutos === m ? " ativo" : ""}" data-min="${m}">${m} min</button>`
    )
    .join("");
  $$("#redacao-minutos [data-min]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (ui.redacaoTick.running) return;
      aplicarMinutosRedacao(Number(btn.dataset.min), true);
    });
  });
  const podeFeito = item?.iso && item.iso === pack.hoje;
  $("#redacao-feito").textContent = podeFeito
    ? diaFeito(item.iso)
      ? "Dia marcado ✓"
      : "Marcar o dia como feito"
    : "Tema livre — o rascunho já salva sozinho";
  $("#redacao-feito").disabled = !podeFeito;
  const av = $("#redacao-avaliar");
  if (av) {
    av.disabled = Boolean(ui.redacaoAvaliando);
    av.textContent = ui.redacaoAvaliando ? "Avaliando…" : "Avaliar";
  }
  const rasc = rascunhoRedacao(chave);
  const box = $("#redacao-parecer");
  if (box) box.innerHTML = htmlParecerRedacao(rasc.parecer);
  pintarTimerRedacao();
  pintarContagemRedacao();
}

function bindRedacaoOnce() {
  $("#redacao-tema")?.addEventListener("change", (e) => {
    patchRascunhoRedacao({ texto: $("#redacao-texto")?.value || "" });
    ui.redacaoKey = e.target.value;
    ui._redacaoMontada = "";
    pauseTimerRedacao();
    renderRedacao();
  });
  $("#redacao-texto")?.addEventListener("input", () => {
    pintarContagemRedacao();
    const txt = $("#redacao-texto").value;
    clearTimeout(window.__redacaoSave);
    window.__redacaoSave = setTimeout(() => patchRascunhoRedacao({ texto: txt }), 350);
  });
  $("#redacao-check")?.addEventListener("change", (e) => {
    const id = e.target?.dataset?.check;
    if (!id) return;
    const checks = { ...(rascunhoRedacao(ui.redacaoKey).checks || {}) };
    checks[id] = Boolean(e.target.checked);
    patchRascunhoRedacao({ checks });
  });
  $("#redacao-start")?.addEventListener("click", startTimerRedacao);
  $("#redacao-pause")?.addEventListener("click", pauseTimerRedacao);
  $("#redacao-reset")?.addEventListener("click", resetTimerRedacao);
  $("#redacao-feito")?.addEventListener("click", () => {
    const item = listaTemasRedacao().itens.find((t) => t.key === ui.redacaoKey);
    if (!item?.iso) return;
    if (!diaFeito(item.iso)) toggleDiaFeito(item.iso);
    patchRascunhoRedacao({ texto: $("#redacao-texto")?.value || "" });
    renderRedacao();
  });
  $("#redacao-avaliar")?.addEventListener("click", () => {
    avaliarRedacaoAtual();
  });
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
  renderFraseDia();
  renderChip();
  renderMaterias();
  renderModos();
  renderFiltroConcurso();
  if (ui.modo === "plano") {
    mostrar("view-plano");
    renderPlano();
  } else if (ui.modo === "questoes") {
    mostrar("view-questoes-home");
    renderQuestoesHome();
  } else if (ui.modo === "erros") {
    mostrar("view-erros");
    renderErros();
  } else if (ui.modo === "cards") {
    mostrar("view-cards");
    renderCards();
  } else if (ui.modo === "redacao") {
    mostrar("view-redacao");
    renderRedacao();
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
  $("#plano-ajustes-btn")?.addEventListener("click", () => {
    ui.planoAjustes = !ui.planoAjustes;
    const y = window.scrollY;
    renderPlano();
    window.scrollTo(0, y);
  });
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
  $("#refazer").addEventListener("click", () => {
    if (ui.quiz.fonte === "erros") {
      if (cadernoFiltrado().length) iniciarCaderno();
      else {
        ui.modo = "erros";
        render();
      }
    } else {
      iniciar();
    }
  });
  $("#ir-erros").addEventListener("click", () => {
    ui.modo = "erros";
    render();
  });
  $("#inicio").addEventListener("click", () => {
    ui.modo = "questoes";
    render();
  });
  $("#salvar-perfil").addEventListener("click", salvarPerfil);
  $("#salvar-gemini")?.addEventListener("click", salvarGeminiKey);
  bindRedacaoOnce();
  garantirClockRedacao();
  try {
    await cloud()?.iniciar();
    render();
  } catch (err) {
    console.warn("Nuvem:", err);
  }
});
