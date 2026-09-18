const FRASES_DIA = [
  { t: "A alma do preguiçoso deseja e nada tem, mas a alma dos diligentes se farta.", f: "Provérbios 13:4" },
  { t: "Tudo quanto te vier à mão para fazer, faze-o conforme as tuas forças.", f: "Eclesiastes 9:10" },
  { t: "Não se aparte da tua boca o livro desta Lei; medita nele de dia e de noite.", f: "Josué 1:8" },
  { t: "O temor do Senhor é o princípio do saber, mas os loucos desprezam a sabedoria.", f: "Provérbios 1:7" },
  { t: "O Senhor dá a sabedoria, e da sua boca vem o conhecimento e o entendimento.", f: "Provérbios 2:6" },
  { t: "A sabedoria é a coisa principal; adquire pois a sabedoria, sim, com tudo o que possuis adquire o entendimento.", f: "Provérbios 4:7" },
  { t: "Entrega ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.", f: "Provérbios 16:3" },
  { t: "Viste um homem hábil na sua obra? Perante reis será posto.", f: "Provérbios 22:29" },
  { t: "Os planos do diligente tendem à abundância, mas a pressa excessiva, à pobreza.", f: "Provérbios 21:5" },
  { t: "O coração do prudente adquire o conhecimento, e o ouvido dos sábios busca a sabedoria.", f: "Provérbios 18:15" },
  { t: "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar.", f: "2 Timóteo 2:15" },
  { t: "Tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor e não aos homens.", f: "Colossenses 3:23" },
  { t: "Tudo posso naquele que me fortalece.", f: "Filipenses 4:13" },
  { t: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.", f: "Salmo 119:105" },
  { t: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.", f: "Tiago 1:5" },
  { t: "Os que esperam no Senhor renovarão as suas forças, subirão com asas como águias.", f: "Isaías 40:31" },
  { t: "Buscai primeiro o Reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", f: "Mateus 6:33" },
  { t: "Vai ter com a formiga, ó preguiçoso; olha para os seus caminhos e sê sábio.", f: "Provérbios 6:6" },
  { t: "Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que elas são difíceis.", f: "Sêneca" },
  { t: "O sábio não se senta para lamentar, mas se põe alegremente à obra de consertar o que pode.", f: "Confúcio" },
  { t: "Só sei que nada sei.", f: "Sócrates" },
  { t: "Somos o que repetidamente fazemos. A excelência, então, não é um ato, mas um hábito.", f: "Aristóteles" },
  { t: "Nada se perde, nada se cria, tudo se transforma — também o estudo de ontem vira a prova de amanhã.", f: "Antoine Lavoisier" },
  { t: "Se eu vi mais longe, foi porque estava sobre os ombros de gigantes.", f: "Isaac Newton" },
  { t: "Gênio é 1% inspiração e 99% transpiração.", f: "Thomas Edison" },
  { t: "Na vida não existe nada a temer, senão a compreender.", f: "Marie Curie" },
  { t: "A persistência é o caminho do êxito.", f: "Charles Chaplin" },
  { t: "O saber a gente aprende com os mestres e os livros. A sabedoria, se vê com os olhos.", f: "Cora Coralina" },
  { t: "Estudar é o único meio de chegar ao conhecimento; o resto é opinião.", f: "Machado de Assis" },
  { t: "A justiça atrasada não é justiça, senão injustiça qualificada e manifesta.", f: "Rui Barbosa" },
  { t: "Ter fé é também ter paciência.", f: "Clarice Lispector" },
  { t: "No meio do caminho tinha uma pedra — e mesmo assim se segue.", f: "Carlos Drummond de Andrade" },
  { t: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.", f: "Nelson Mandela" },
  { t: "Não há saber mais ou saber menos: há saberes diferentes.", f: "Paulo Freire" },
  { t: "A leitura é uma conversa com os homens mais ilustres dos séculos passados.", f: "René Descartes" },
  { t: "O importante é não parar de questionar.", f: "Albert Einstein" },
];

function fraseDoDia(iso) {
  const chave = String(iso || "").slice(0, 10);
  let n = 0;
  for (let i = 0; i < chave.length; i += 1) n = (n * 33 + chave.charCodeAt(i)) >>> 0;
  return FRASES_DIA[n % FRASES_DIA.length];
}

window.CNAPROVADO_FRASES = { lista: FRASES_DIA, doDia: fraseDoDia };
