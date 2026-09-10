const Cloud = {
  client: null,
  user: null,
  perfil: null,
  minRank: 10,

  config() {
    const baked = window.CNAPROVADO_SB || {};
    let local = {};
    try {
      local = JSON.parse(localStorage.getItem("cnaprovado-sb") || "{}");
    } catch {
      local = {};
    }
    return {
      url: String(local.url || baked.url || "").trim(),
      anonKey: String(local.anonKey || baked.anonKey || "").trim(),
    };
  },

  temChaveNoArquivo() {
    const baked = window.CNAPROVADO_SB || {};
    return Boolean(String(baked.url || "").trim() && String(baked.anonKey || "").trim());
  },

  pronto() {
    const c = this.config();
    return Boolean(c.url && c.anonKey && window.supabase);
  },

  salvarConfigLocal(url, anonKey) {
    localStorage.setItem(
      "cnaprovado-sb",
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
  },

  traduzErro(err) {
    const msg = String(err?.message || err || "Erro na nuvem.");
    const lower = msg.toLowerCase();
    if (lower.includes("invalid login")) return "E-mail ou senha errados.";
    if (lower.includes("already registered") || lower.includes("already been registered")) {
      return "Esse e-mail já tem conta. Tenta entrar.";
    }
    if (lower.includes("email not confirmed")) {
      return "O e-mail ainda não foi confirmado. No Supabase, desliga Confirm email.";
    }
    if (lower.includes("password")) return "A senha precisa ter pelo menos 6 caracteres.";
    if (lower.includes("email address") && lower.includes("invalid")) {
      return "Esse e-mail não foi aceito. Usa um Gmail (ou outro e-mail de verdade).";
    }
    if (lower.includes("email not confirmed")) {
      return "Esse e-mail ainda não foi confirmado. Abre a caixa de entrada e clica no link da Supabase.";
    }
    if (lower.includes("failed to fetch") || lower.includes("network")) {
      return "Não deu para falar com a nuvem. Confere a URL do projeto.";
    }
    if (lower.includes("could not find the table") || lower.includes("schema cache")) {
      return "O banco ainda não tem as tabelas. Cola o arquivo supabase.sql no SQL Editor e roda.";
    }
    return msg;
  },

  async iniciar() {
    if (!this.pronto()) return { ok: false, motivo: "config" };
    const c = this.config();
    const cfgKey = `${c.url}|${c.anonKey}`;
    if (this.client && this._cfgKey === cfgKey) {
      const { data } = await this.client.auth.getSession();
      this.user = data.session?.user || null;
      if (this.user) await this.aoSessao();
      return { ok: true };
    }
    this._cfgKey = cfgKey;
    if (this._unsub) this._unsub();
    this.client = window.supabase.createClient(c.url, c.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
    const { data } = await this.client.auth.getSession();
    this.user = data.session?.user || null;
    const { data: subData } = this.client.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED") {
        this.user = session?.user || null;
        return;
      }
      const anterior = this.user?.id;
      this.user = session?.user || null;
      if (this.user) await this.aoSessao();
      else this.perfil = null;
      if (this.user?.id !== anterior && typeof window.CNAPROVADO_ON_CLOUD === "function") {
        window.CNAPROVADO_ON_CLOUD();
      }
    });
    this._unsub = () => subData.subscription.unsubscribe();
    if (this.user) await this.aoSessao();
    return { ok: true };
  },

  logado() {
    return Boolean(this.user && this.client);
  },

  async garantirPerfil() {
    if (!this.logado()) return null;
    const id = this.user.id;
    const local = typeof db === "function" ? db().perfil : { nome: "Concurseiro", avatar: "🎯" };
    const { data, error } = await this.client
      .from("perfis")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (data) {
      this.perfil = data;
      return data;
    }
    const row = {
      id,
      apelido: local.nome || "Concurseiro",
      avatar: local.avatar || "🎯",
      mostrar_rank: true,
      migrated: false,
      anki: {},
    };
    const { data: created, error: insErr } = await this.client
      .from("perfis")
      .insert(row)
      .select("*")
      .single();
    if (insErr) {
      if (insErr.code === "23505") {
        const { data: again, error: againErr } = await this.client
          .from("perfis")
          .select("*")
          .eq("id", id)
          .single();
        if (againErr) throw againErr;
        this.perfil = again;
        return again;
      }
      throw insErr;
    }
    this.perfil = created;
    return created;
  },

  async aoSessao() {
    if (this._aoSessao) return this._aoSessao;
    this._aoSessao = this._aoSessaoRun().finally(() => {
      this._aoSessao = null;
    });
    return this._aoSessao;
  },

  async _aoSessaoRun() {
    try {
      const perfil = await this.garantirPerfil();
      if (!perfil) return;
      if (!perfil.migrated) await this.migrarLocal();
      else await this.puxarSeLocalVazio();
      this.aplicarPerfilNoLocal();
    } catch (err) {
      console.warn("CNAPROVADO nuvem:", err);
    }
  },

  aplicarPerfilNoLocal() {
    if (!this.perfil || typeof persist !== "function") return;
    persist((d) => {
      d.perfil.nome = this.perfil.apelido || d.perfil.nome;
      d.perfil.avatar = this.perfil.avatar || d.perfil.avatar;
      d.perfil.mostrarRank = this.perfil.mostrar_rank !== false;
      if (this.perfil.anki && typeof this.perfil.anki === "object") {
        d.anki = { ...d.anki, ...this.perfil.anki };
      }
    });
  },

  async migrarLocal() {
    if (!this.logado() || typeof db !== "function") return;
    const data = db();
    const respostas = (data.respostas || []).map((r) => ({
      usuario_id: this.user.id,
      materia: r.materia,
      qid: Number(r.qid),
      acertou: Boolean(r.acertou),
      ts: new Date(r.ts || Date.now()).toISOString(),
    }));
    const baterias = (data.baterias || []).map((b) => ({
      usuario_id: this.user.id,
      materia: b.materia,
      acertos: Number(b.acertos),
      total: Number(b.total),
      ts: new Date(b.ts || Date.now()).toISOString(),
    }));
    await this.inserirLote("respostas", respostas);
    await this.inserirLote("baterias", baterias);
    const { error } = await this.client
      .from("perfis")
      .update({
        apelido: data.perfil?.nome || "Concurseiro",
        avatar: data.perfil?.avatar || "🎯",
        anki: data.anki || {},
        migrated: true,
        atualizado_em: new Date().toISOString(),
      })
      .eq("id", this.user.id);
    if (error) throw error;
    this.perfil = { ...this.perfil, migrated: true };
  },

  async inserirLote(tabela, rows) {
    const chunk = 80;
    for (let i = 0; i < rows.length; i += chunk) {
      const slice = rows.slice(i, i + chunk);
      if (!slice.length) continue;
      const { error } = await this.client.from(tabela).insert(slice);
      if (error) throw error;
    }
  },

  async puxarSeLocalVazio() {
    if (!this.logado() || typeof db !== "function") return;
    const local = db();
    if ((local.respostas || []).length) return;
    const { data: respostas, error: rErr } = await this.client
      .from("respostas")
      .select("materia, qid, acertou, ts")
      .eq("usuario_id", this.user.id)
      .order("ts", { ascending: true });
    if (rErr) throw rErr;
    const { data: baterias, error: bErr } = await this.client
      .from("baterias")
      .select("materia, acertos, total, ts")
      .eq("usuario_id", this.user.id)
      .order("ts", { ascending: true });
    if (bErr) throw bErr;
    persist((d) => {
      d.respostas = (respostas || []).map((r) => ({
        materia: r.materia,
        qid: r.qid,
        acertou: r.acertou,
        ts: new Date(r.ts).getTime(),
      }));
      d.baterias = (baterias || []).map((b) => ({
        materia: b.materia,
        acertos: b.acertos,
        total: b.total,
        ts: new Date(b.ts).getTime(),
      }));
    });
  },

  async entrar(email, senha) {
    if (!this.pronto()) throw new Error("Supabase ainda não está configurado.");
    if (!this.client) await this.iniciar();
    const { data, error } = await this.client.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (error) throw error;
    this.user = data.session?.user || null;
    if (this.user) await this.aoSessao();
  },

  async criarConta(email, senha) {
    if (!this.pronto()) throw new Error("Supabase ainda não está configurado.");
    if (!this.client) await this.iniciar();
    const local = typeof db === "function" ? db().perfil : {};
    const { data, error } = await this.client.auth.signUp({
      email: email.trim(),
      password: senha,
      options: {
        emailRedirectTo: "https://gabriel7z.github.io/CNAPROVADO/",
        data: {
          apelido: local.nome || "Concurseiro",
          avatar: local.avatar || "🎯",
        },
      },
    });
    if (error) throw error;
    this.user = data.session?.user || data.user || null;
    if (data.session && this.user) await this.aoSessao();
  },

  async sair() {
    if (!this.client) return;
    await this.client.auth.signOut();
    this.user = null;
    this.perfil = null;
  },

  async atualizarPerfil(patch) {
    if (!this.logado()) return;
    const row = { atualizado_em: new Date().toISOString() };
    if (patch.nome != null) row.apelido = patch.nome;
    if (patch.avatar != null) row.avatar = patch.avatar;
    if (patch.mostrarRank != null) row.mostrar_rank = Boolean(patch.mostrarRank);
    if (patch.anki != null) row.anki = patch.anki;
    const { data, error } = await this.client
      .from("perfis")
      .update(row)
      .eq("id", this.user.id)
      .select("*")
      .single();
    if (error) throw error;
    this.perfil = data;
  },

  async salvarResposta(row) {
    if (!this.logado()) return;
    const { error } = await this.client.from("respostas").insert({
      usuario_id: this.user.id,
      materia: row.materia,
      qid: Number(row.qid),
      acertou: Boolean(row.acertou),
      ts: new Date(row.ts || Date.now()).toISOString(),
    });
    if (error) console.warn("Falha ao salvar resposta na nuvem:", error.message);
  },

  async salvarBateria(row) {
    if (!this.logado()) return;
    const { error } = await this.client.from("baterias").insert({
      usuario_id: this.user.id,
      materia: row.materia,
      acertos: Number(row.acertos),
      total: Number(row.total),
      ts: new Date(row.ts || Date.now()).toISOString(),
    });
    if (error) console.warn("Falha ao salvar bateria na nuvem:", error.message);
  },

  async salvarAnki() {
    if (!this.logado() || typeof db !== "function") return;
    try {
      await this.atualizarPerfil({ anki: db().anki || {} });
    } catch (err) {
      console.warn("Falha ao salvar cards na nuvem:", err);
    }
  },

  async ranking(materiaId) {
    if (!this.pronto()) return { ok: false, motivo: "config", rows: [] };
    if (!this.client) await this.iniciar();
    const { data, error } = await this.client.rpc("ranking_publico", {
      p_materia: materiaId,
      p_min: this.minRank,
    });
    if (error) return { ok: false, motivo: error.message, rows: [] };
    return { ok: true, rows: data || [] };
  },

  async minhaStat(materiaId) {
    if (!this.logado()) return null;
    const { data, error } = await this.client
      .from("stats")
      .select("*")
      .eq("usuario_id", this.user.id)
      .eq("materia_id", materiaId)
      .maybeSingle();
    if (error) return null;
    return data;
  },
};

window.CNAPROVADO_CLOUD = Cloud;
