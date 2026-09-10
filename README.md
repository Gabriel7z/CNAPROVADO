# CNAPROVADO

App de estudo para concursos: https://gabriel7z.github.io/CNAPROVADO/

- Abas de matéria (D.Adm, Português, Constitucional; dá para criar outras)
- Questões, cards estilo Anki, avatar, gráficos e ranking
- D.Adm: 100 questões (Tópico 1 + Tópico 2, Thállius Moraes) e 100 cards Anki
- Conta e ranking na nuvem com Supabase (as questões continuam neste site; o banco guarda pessoas e resultados)

## Ligar o Supabase (ranking e login)

1. Cria um projeto em https://supabase.com
2. Authentication → Providers → Email: desliga **Confirm email** (mais simples para começar)
3. SQL Editor: cola e roda o arquivo `supabase.sql`
4. Project Settings → API: copia a **URL** e a chave **anon** ou **publishable** (`sb_publishable_...`)
5. Cola no `supabase-config.js` e publica no `main` (senão só o seu navegador vê a nuvem)
6. Nunca cola a chave **service_role** / **secret** no site

Enquanto as chaves não estiverem no arquivo, o estudo local segue igual. Na aba Avatar dá para colar URL/chave só neste aparelho, para testar.
