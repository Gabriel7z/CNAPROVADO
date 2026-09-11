const AULA = {
  titulo: "Tópicos 1 a 3 — Fontes, Estado e Administração Direta",
  professor: "Thállius Moraes",
  materia: "Direito Administrativo",
  fonte:
    "https://www.youtube.com/watch?v=JvaumlEAPnI&list=PLl6y9CqXvcCIqKM0eBk_YcFp17Ae2k21c",
  fonte2: "https://youtu.be/qATMH3H1Oek",
  fonte3: "https://youtu.be/TqLkEtVvv00",
};

const QUESTOES = [
  {
    id: 1,
    tipo: "ce",
    tema: "Codificação",
    enunciado:
      "O Direito Administrativo brasileiro está reunido em um Código de Direito Administrativo, a exemplo do que ocorre com o Direito Civil e o Direito Penal.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O professor destaca que o DA não é codificado: não existe Código Administrativo. A matéria está espalhada na Constituição, em várias leis, na doutrina e na jurisprudência.",
  },
  {
    id: 2,
    tipo: "ce",
    tema: "Codificação",
    enunciado:
      "Uma característica do Direito Administrativo é estar em lugar nenhum e em todo lugar: há normas na Constituição, infinidade de leis, doutrina e jurisprudência.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Trecho central da aula: o DA não tem um código único. Está na CF (ex.: art. 37), em leis que variam conforme o edital, na doutrina e na jurisprudência.",
  },
  {
    id: 3,
    tipo: "ce",
    tema: "Conceito",
    enunciado:
      "O conceito de Direito Administrativo é único, fechado e uniforme em toda a doutrina, de modo que a banca não pode variar a formulação.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O professor ensina que o conceito é variável: um autor fala de um jeito, outro de outro. O importante é guardar o núcleo (normas de direito público que regem a atividade administrativa e o interesse da coletividade).",
  },
  {
    id: 4,
    tipo: "ce",
    tema: "Conceito",
    enunciado:
      "Em essência, o Direito Administrativo é a matéria que rege as relações da Administração Pública, isto é, a atividade administrativa do Estado.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Esse é o núcleo do conceito trabalhado na aula: o DA disciplina a atividade administrativa do Estado, e não a legislativa nem a jurisdicional típicas.",
  },
  {
    id: 5,
    tipo: "ce",
    tema: "O que é direito",
    enunciado:
      "Segundo a explicação da aula, o direito já existiria mesmo para uma única pessoa isolada em uma ilha deserta, pois as regras independem da vida em coletividade.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O exemplo da ilha serve para o contrário: com uma pessoa só não há direito; o direito surge quando há convivência e necessidade de regras entre pessoas.",
  },
  {
    id: 6,
    tipo: "ce",
    tema: "Conceito",
    enunciado:
      "O Direito Administrativo pode ser compreendido como um conjunto de normas de direito público que disciplinam a atividade administrativa do Estado.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Formulação alinhada ao conceito da aula e à questão comentada ao final: conjunto de normas de direito público que disciplinam as atividades administrativas.",
  },
  {
    id: 7,
    tipo: "ce",
    tema: "Objeto / interesse",
    enunciado:
      "A preocupação central do Direito Administrativo é o interesse do indivíduo, e não o interesse da coletividade.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O professor foi expresso: o DA não está preocupado com o indivíduo, e sim com o coletivo, com a coletividade.",
  },
  {
    id: 8,
    tipo: "ce",
    tema: "Ramos do direito",
    enunciado:
      "O direito é uno; a divisão em ramos (civil, penal, administrativo etc.) é feita para fins didáticos, a fim de facilitar o estudo.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Aula: o direito é uma coisa só (a imagem da árvore). Os ramos existem para fins didáticos e de competência, não porque o direito deixe de ser uno.",
  },
  {
    id: 9,
    tipo: "me",
    tema: "Público x privado",
    enunciado:
      "No direito privado, a relação entre as partes é marcada, em regra, por:",
    alternativas: [
      "Superioridade do Estado e relação vertical.",
      "Igualdade entre as partes, autonomia da vontade e relação horizontal.",
      "Indisponibilidade do interesse público.",
      "Força cogente das súmulas vinculantes.",
    ],
    correta: 1,
    explicacao:
      "Direito privado: João e Zé estão em pé de igualdade (relação horizontal), com autonomia da vontade. Superioridade e verticalidade são do direito público.",
  },
  {
    id: 10,
    tipo: "me",
    tema: "Público x privado",
    enunciado:
      "A relação jurídica de direito público, segundo a aula, é descrita como:",
    alternativas: [
      "Horizontal, porque Estado e particular estão em igualdade.",
      "Vertical, porque o Estado atua em superioridade em face do particular, na defesa do interesse público.",
      "Privada, porque prevalece a autonomia da vontade.",
      "Codificada, porque há um código único de direito público.",
    ],
    correta: 1,
    explicacao:
      "Direito público = relação vertical: o Estado está acima do particular para proteger o interesse da coletividade. Horizontal é o privado.",
  },
  {
    id: 11,
    tipo: "ce",
    tema: "Público x privado",
    enunciado:
      "Nas regras de direito privado há, em regra, autonomia da vontade das partes envolvidas e maior liberdade de contratar.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Exemplo da compra e venda do carro: o preço e as condições são problema das partes. Há igualdade e autonomia da vontade.",
  },
  {
    id: 12,
    tipo: "ce",
    tema: "Natureza do DA",
    enunciado:
      "O Direito Administrativo pertence ao direito privado, razão pela qual a Administração e o particular se relacionam em plano de igualdade.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O DA é matéria de direito público. Há superioridade do Estado em face dos administrados (relação vertical).",
  },
  {
    id: 13,
    tipo: "ce",
    tema: "Natureza do DA",
    enunciado:
      "Embora o Direito Administrativo pese muito mais para o lado do direito público, algumas regras de direito privado também podem incidir em tópicos oportunos.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor ressalva: nem tudo que a Administração faz é direito público; a grande maioria é, mas há regrinhas de direito privado a serem vistas depois.",
  },
  {
    id: 14,
    tipo: "me",
    tema: "Regime jurídico-administrativo",
    enunciado:
      "Quando a banca fala em regime jurídico-administrativo, a aula admite que a expressão possa significar:",
    alternativas: [
      "Apenas o conjunto de leis penais aplicáveis aos servidores.",
      "Ou o conjunto de normas que regem o Direito Administrativo, ou a base formada pelos princípios da supremacia do interesse público e da indisponibilidade.",
      "Somente o princípio da legalidade estrita do direito privado.",
      "Apenas as súmulas do STJ.",
    ],
    correta: 1,
    explicacao:
      "Dois sentidos (não necessariamente excludentes): (1) conjunto de normas que regem a atividade administrativa; (2) os dois princípios-base do DA.",
  },
  {
    id: 15,
    tipo: "ce",
    tema: "Regime jurídico-administrativo",
    enunciado:
      "Os dois princípios que, na aula, representam a base do Direito Administrativo são a supremacia do interesse público sobre o privado e a indisponibilidade do interesse público.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Tudo que o DA faz observa essa ótica: o público prevalece sobre o privado, e o interesse público não pode ser objeto de disposição.",
  },
  {
    id: 16,
    tipo: "ce",
    tema: "Supremacia",
    enunciado:
      "A desapropriação por interesse público e o poder de polícia são exemplos de atuações em que se manifesta a supremacia do interesse público.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Exemplos dados na aula para ilustrar a Administração em superioridade, como guardiã do interesse público.",
  },
  {
    id: 17,
    tipo: "ce",
    tema: "Indisponibilidade",
    enunciado:
      "O interesse público é disponível: o poder público pode abrir mão dele sempre que entender conveniente.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Indisponibilidade: o poder público não pode dispor do interesse público. Há dever de agir (poder-dever).",
  },
  {
    id: 18,
    tipo: "ce",
    tema: "Indisponibilidade",
    enunciado:
      "A indisponibilidade do interesse público implica o chamado poder-dever de agir: o Estado é obrigado a atuar para proteger o interesse público.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor liga indisponibilidade ao dever de agir. O aprofundamento fica para o tópico de princípios, mas a base já entra aqui.",
  },
  {
    id: 19,
    tipo: "me",
    tema: "Fontes",
    enunciado:
      "À luz da classificação da aula, são fontes diretas primárias do Direito Administrativo:",
    alternativas: [
      "Somente a doutrina dos autores clássicos.",
      "A lei em sentido amplo e a súmula vinculante.",
      "Apenas os costumes da localidade.",
      "Somente as decisões isoladas de juízes de primeiro grau.",
    ],
    correta: 1,
    explicacao:
      "Fonte direta primária: lei em sentido amplo. A súmula vinculante, por ter força obrigatória semelhante à da lei, também é colocada como fonte primária. Doutrina e jurisprudência (em geral) são secundárias; costumes são indiretos.",
  },
  {
    id: 20,
    tipo: "ce",
    tema: "Fontes — lei",
    enunciado:
      "Quando o professor afirma que a fonte primária é a lei, está a falar de lei em sentido estrito (somente lei ordinária e complementar).",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "É lei em sentido amplo: Constituição, lei ordinária, lei complementar, lei delegada, decretos e atos de caráter normativo — não apenas lei em sentido estrito.",
  },
  {
    id: 21,
    tipo: "ce",
    tema: "Fontes — lei",
    enunciado:
      "Integram a lei em sentido amplo, como fonte primária, a Constituição Federal, leis ordinárias e complementares, leis delegadas, decretos e atos de caráter normativo.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Rol expresso na aula ao explicar o que é lei em sentido amplo no DA.",
  },
  {
    id: 22,
    tipo: "ce",
    tema: "Fontes secundárias",
    enunciado:
      "A doutrina e a jurisprudência são fontes secundárias (diretas) do Direito Administrativo, que ajudam a preencher lacunas da lei.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "A lei não resolve tudo. As lacunas são preenchidas pelas fontes secundárias: doutrina e jurisprudência.",
  },
  {
    id: 23,
    tipo: "ce",
    tema: "Fontes secundárias",
    enunciado:
      "As fontes secundárias possuem força cogente, isto é, obrigam da mesma forma que a lei.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Ponto quente de prova na aula: fonte primária tem força cogente; fonte secundária não tem. Ressalva: súmula vinculante, que o professor trata como primária.",
  },
  {
    id: 24,
    tipo: "ce",
    tema: "Doutrina",
    enunciado:
      "Doutrina, no sentido da aula, é o conjunto de entendimentos dos pensadores do direito — o ensinamento teórico encontrado nos livros.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Definição dada pelo professor: pensadores teóricos, livros, “Fulano diz assim”.",
  },
  {
    id: 25,
    tipo: "ce",
    tema: "Jurisprudência",
    enunciado:
      "Jurisprudência são as decisões dos tribunais sobre o caso concreto, dizendo o direito no conflito submetido ao Poder Judiciário.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Quando há divergência, quem decide no caso concreto é o Judiciário. Isso é jurisprudência.",
  },
  {
    id: 26,
    tipo: "ce",
    tema: "Jurisprudência",
    enunciado:
      "Para o estudo de concurso, na linha da aula, o que realmente interessa em jurisprudência são sobretudo as decisões do STF e algumas do STJ.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor delimita: STF e algumas do STJ. As demais, em regra, não importam para o recorte da disciplina.",
  },
  {
    id: 27,
    tipo: "ce",
    tema: "Súmulas",
    enunciado:
      "A súmula é lei e, por isso, tem a mesma natureza de ato normativo primário do Congresso Nacional.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Súmula não é lei. É entendimento reiterado e consolidado do tribunal, com caráter de orientar. Não se confunde com lei.",
  },
  {
    id: 28,
    tipo: "ce",
    tema: "Súmulas",
    enunciado:
      "Decisões judiciais e súmulas (não vinculantes) obrigam a Administração Pública a agir daquela forma em todas as relações futuras, e não apenas no processo em que foram proferidas.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "No processo específico a decisão deve ser observada. Em outras relações, a Administração não fica automaticamente obrigada a agir igual — salvo súmula vinculante.",
  },
  {
    id: 29,
    tipo: "ce",
    tema: "Súmula vinculante",
    enunciado:
      "A súmula vinculante é editada apenas pelo Supremo Tribunal Federal.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Afirmação expressa da aula: súmula vinculante = só STF.",
  },
  {
    id: 30,
    tipo: "ce",
    tema: "Súmula vinculante",
    enunciado:
      "A súmula vinculante tem observância obrigatória e, na classificação da aula, é tratada como fonte primária, ao lado da lei.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Embora seja jurisprudência em sentido amplo, a SV tem força obrigatória muito parecida com a da lei. Por isso o professor a coloca como fonte primária.",
  },
  {
    id: 31,
    tipo: "ce",
    tema: "Súmula vinculante",
    enunciado:
      "Regra de ouro da aula: se a banca falar só em jurisprudência, trate como fonte secundária; se falar expressamente em súmula vinculante, trate como fonte primária.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "É o esquema que o professor manda gravar para não cair na pegadinha.",
  },
  {
    id: 32,
    tipo: "ce",
    tema: "Costumes",
    enunciado:
      "Os costumes são fontes diretas do Direito Administrativo, com a mesma posição da lei na hierarquia das fontes.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Costumes são fontes, mas indiretas: influenciam as demais fontes (legislador e juiz), não regem diretamente a matéria como a lei.",
  },
  {
    id: 33,
    tipo: "ce",
    tema: "Costumes",
    enunciado:
      "Os costumes podem ser levados em consideração pelo legislador ao fazer a lei e pelo juiz ao julgar o processo.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Por isso são fontes indiretas: influenciam a lei e a jurisprudência, sem serem eles próprios a fonte direta.",
  },
  {
    id: 34,
    tipo: "ce",
    tema: "Fontes escritas",
    enunciado:
      "As fontes diretas (lei, doutrina e jurisprudência) são fontes escritas; o costume, fonte indireta, não está escrito.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Esquema fechado na revisão da aula: diretas = escritas; costume = indireta e não escrita.",
  },
  {
    id: 35,
    tipo: "me",
    tema: "Tripartição",
    enunciado:
      "A tripartição dos poderes da República, na aula, aponta os seguintes poderes:",
    alternativas: [
      "Executivo, Ministério Público e Tribunais de Contas.",
      "Executivo, Legislativo e Judiciário.",
      "Administração direta, indireta e fundacional.",
      "União, Estados e Municípios.",
    ],
    correta: 1,
    explicacao:
      "Poderes da República / do Estado: Executivo, Legislativo e Judiciário. A divisão em entes federativos é outra coisa.",
  },
  {
    id: 36,
    tipo: "ce",
    tema: "Tripartição",
    enunciado:
      "Há hierarquia entre Executivo, Legislativo e Judiciário, de modo que um poder se sobrepõe aos demais.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "São independentes e harmônicos entre si. Não há hierarquia; cada um no seu quadrado.",
  },
  {
    id: 37,
    tipo: "ce",
    tema: "Freios e contrapesos",
    enunciado:
      "Pelo sistema de freios e contrapesos, cada poder exerce certa forma de controle sobre o outro, ainda que sejam independentes.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Independência não elimina o controle recíproco. Freios e contrapesos = cada poder fica de olho no outro.",
  },
  {
    id: 38,
    tipo: "me",
    tema: "Funções típicas",
    enunciado: "A função típica do Poder Executivo, segundo a aula, é:",
    alternativas: [
      "Julgar com definitividade e produzir coisa julgada.",
      "Administrar, isto é, gerir a coisa pública.",
      "Apenas criar leis, sem qualquer atividade administrativa.",
      "Editar súmulas vinculantes.",
    ],
    correta: 1,
    explicacao:
      "Função típica do Executivo = administrar. Julgar com definitividade é típico do Judiciário; legislar/fiscalizar, do Legislativo.",
  },
  {
    id: 39,
    tipo: "ce",
    tema: "Funções típicas",
    enunciado:
      "A função típica do Poder Legislativo abrange legislar (criar leis) e também fiscalizar.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor inclui as duas: legislar e fiscalizar como função típica do Legislativo.",
  },
  {
    id: 40,
    tipo: "ce",
    tema: "Funções típicas",
    enunciado:
      "O Poder Judiciário, em sua função típica, julga com definitividade, podendo formar coisa julgada (trânsito em julgado).",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Quem dá a palavra final no caso concreto, com trânsito em julgado, é o Judiciário.",
  },
  {
    id: 41,
    tipo: "ce",
    tema: "Funções típicas",
    enunciado:
      "Como regra, as decisões proferidas no âmbito administrativo podem ser revistas pelo Poder Judiciário.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Afirmação da aula ao contrastar a definitividade do julgamento judicial com as decisões administrativas.",
  },
  {
    id: 42,
    tipo: "ce",
    tema: "Funções atípicas",
    enunciado:
      "A tripartição de funções é absoluta: cada poder exerce com exclusividade a sua função, sem jamais desempenhar atribuição típica de outro.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Não é absoluta. Há funções típicas e atípicas. A questão comentada na aula (“tripartição absoluta”) está errada por isso.",
  },
  {
    id: 43,
    tipo: "ce",
    tema: "Função administrativa",
    enunciado:
      "A função administrativa é exercida pelos três poderes: de forma típica pelo Executivo e de forma atípica pelo Legislativo e pelo Judiciário.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Por isso concurso no Judiciário ou no Legislativo também cobra Direito Administrativo: quando administram, observam as regras do DA.",
  },
  {
    id: 44,
    tipo: "ce",
    tema: "Funções atípicas",
    enunciado:
      "A edição de medida provisória pelo Presidente da República é exemplo de o Executivo exercer, atipicamente, função de legislar.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "MP tem força de lei. O Executivo está legislando — função atípica.",
  },
  {
    id: 45,
    tipo: "ce",
    tema: "Funções atípicas",
    enunciado:
      "O julgamento do Presidente da República pelo Senado Federal, nos crimes de responsabilidade, é exemplo de função atípica do Legislativo (julgar).",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O Legislativo, no impeachment por crime de responsabilidade, age como juiz — função atípica.",
  },
  {
    id: 46,
    tipo: "ce",
    tema: "Funções atípicas",
    enunciado:
      "Os tribunais, ao editarem seus regimentos internos, exercem função atípica de legislar; também administram (concursos, gestão da casa).",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Exemplos da aula: Judiciário legisla (regimento interno) e administra. O que interessa ao DA é a função administrativa dos três poderes.",
  },
  {
    id: 47,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "Personalidade jurídica é a aptidão para contrair direitos e obrigações, isto é, para ser sujeito de direitos e obrigações.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Conceito trazido da base civilista, com o recorte relevante para o DA: quem tem personalidade pode estar em processo e ter patrimônio próprio.",
  },
  {
    id: 48,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "Os órgãos públicos, como a Polícia Federal, possuem personalidade jurídica própria e podem ser processados em nome próprio.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Órgão público não tem personalidade jurídica. Quem se processa é a pessoa jurídica que o órgão integra (ex.: União). Analogia do professor: órgão = “cachorro”; União = “dono”.",
  },
  {
    id: 49,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "União, Estados, Distrito Federal, Municípios e autarquias são pessoas jurídicas e, portanto, têm capacidade processual e patrimônio próprio.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Pessoas jurídicas existem no plano jurídico (não se “vê” a União na rua). Mesmo assim são sujeitos de direitos e obrigações.",
  },
  {
    id: 50,
    tipo: "me",
    tema: "Personalidade jurídica",
    enunciado:
      "Assinale a alternativa correta sobre personalidade jurídica, no recorte da aula:",
    alternativas: [
      "Pessoa física e pessoa jurídica não se distinguem para o Direito Administrativo.",
      "Quem é pessoa (física/natural ou jurídica) tem capacidade processual e pode ter patrimônio próprio; órgão público não é pessoa e não tem personalidade jurídica.",
      "Animais e objetos têm personalidade jurídica idêntica à das autarquias.",
      "A Prefeitura, como prédio, é a personificação do Município e pode ser ré em ação judicial.",
    ],
    correta: 1,
    explicacao:
      "Pessoa (física ou jurídica) tem as “coisas” da personalidade. Órgão, animal e objeto não. O prédio da prefeitura ou o prefeito não se confundem com o Município, que existe juridicamente.",
  },
  {
    id: 51,
    tipo: "ce",
    tema: "Conceito de Estado",
    enunciado:
      "Quando a aula fala em Estado, está se referindo aos estados-membros da Federação, como Paraná, Bahia ou Ceará.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O professor alerta: não é o Estado-Paraná. Estado, aqui, é o poder público constituído — a pessoa jurídica territorial soberana, maior do que nós.",
  },
  {
    id: 52,
    tipo: "ce",
    tema: "Conceito de Estado",
    enunciado:
      "No recorte da aula, o Estado é uma pessoa jurídica territorial soberana.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Três pedaços do conceito: pessoa jurídica (personalidade), territorial (não existe “em Nárnia”) e soberana (poder máximo e supremo).",
  },
  {
    id: 53,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "Por ser pessoa jurídica, o Estado tem personalidade jurídica: aptidão para contrair direitos e obrigações e para ter patrimônio.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Personalidade jurídica = aptidão para ser sujeito de direitos e obrigações. O Estado é ente personalizado.",
  },
  {
    id: 54,
    tipo: "ce",
    tema: "Território",
    enunciado:
      "O Estado pode existir apenas como construção mental, sem circunscrição geográfica.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "É territorial: para o Estado existir precisa de território. A analogia da aula é que não dá para ser só “na cabeça”, em Nárnia.",
  },
  {
    id: 55,
    tipo: "ce",
    tema: "Soberania",
    enunciado:
      "Soberania é o poder máximo e supremo de um país de decidir os próprios rumos políticos, independentemente de pressões internas ou externas.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Na aula: ninguém manda na gente; o Estado decide o próprio futuro. Essa vontade suprema é a soberania.",
  },
  {
    id: 56,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "A personalidade jurídica de direito público do Estado significa que ele está em igualdade com os administrados.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Direito público, aqui, aponta superioridade: o Estado não está no mesmo patamar dos particulares.",
  },
  {
    id: 57,
    tipo: "ce",
    tema: "Conceito de Estado",
    enunciado:
      "O Estado trava relações internas com o seu povo e relações externas com outros Estados.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Atua no plano interno e no externo. Questão comentada na aula: ente personalizado tanto nas relações internacionais quanto internamente.",
  },
  {
    id: 58,
    tipo: "me",
    tema: "Elementos do Estado",
    enunciado:
      "São elementos constitutivos do Estado, segundo a aula:",
    alternativas: [
      "União, Estados, Distrito Federal e Municípios.",
      "Poder Legislativo, Poder Executivo e Poder Judiciário.",
      "Povo, território e governo soberano.",
      "República, Federação e Presidencialismo.",
    ],
    correta: 2,
    explicacao:
      "Elementos = povo, território e governo soberano. Entes federados são divisões internas; L, E e J são poderes; República/Federação/Presidencialismo são classificações (forma/sistema).",
  },
  {
    id: 59,
    tipo: "ce",
    tema: "Elementos do Estado",
    enunciado:
      "Em item de certo ou errado, a formulação “povo, território e governo”, sem o adjetivo soberano, está no padrão cobrado na aula.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "O professor é explícito: o certo é governo soberano. Em C/E isso zera. Em múltipla escolha, se não houver “governo soberano”, vai na melhor resposta (governo).",
  },
  {
    id: 60,
    tipo: "ce",
    tema: "Povo",
    enunciado:
      "Povo, na aula, são as pessoas com vínculo jurídico de nacionalidade com o Estado (brasileiros natos ou naturalizados), titulares de direitos e obrigações em face dele.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Não é “quem está no Brasil”. É quem tem o vínculo: a nacionalidade. Daí direitos (concurso, saúde) e obrigações (ex.: serviço militar).",
  },
  {
    id: 61,
    tipo: "ce",
    tema: "Povo",
    enunciado:
      "O Paraguai pode exigir serviço militar obrigatório de brasileiro que complete 18 anos, porque a obrigação militar independe do vínculo de nacionalidade.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Exemplo da aula: o Brasil pode exigir o serviço militar do nacional brasileiro; o Paraguai não, porque o vínculo jurídico é com o Brasil.",
  },
  {
    id: 62,
    tipo: "ce",
    tema: "Povo",
    enunciado:
      "Qualquer pessoa que esteja fisicamente no território brasileiro integra o povo brasileiro, inclusive o estrangeiro de passagem.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Povo não é “quem está aqui”. É quem tem ligação jurídica de nacionalidade com o Estado.",
  },
  {
    id: 63,
    tipo: "ce",
    tema: "Território",
    enunciado:
      "Não existe Estado sem território: é preciso uma circunscrição geográfica.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Elemento território. Sem espaço geográfico não há Estado no sentido da aula.",
  },
  {
    id: 64,
    tipo: "ce",
    tema: "Forma de Estado",
    enunciado:
      "A forma de Estado adotada no Brasil é a republicana.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Pegadinha clássica da aula: republicana é forma de GOVERNO. Forma de Estado = federativa.",
  },
  {
    id: 65,
    tipo: "ce",
    tema: "Forma de Estado",
    enunciado:
      "A forma de Estado brasileira é a federativa (Federação).",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Forma de Estado: Federação / federativa. Também existem a unitária e a confederação (esta última o professor trata como de pouca incidência).",
  },
  {
    id: 66,
    tipo: "ce",
    tema: "Forma de Estado",
    enunciado:
      "Na Federação há pluralidade política interna: vários centros de poder, e não um único centro como no Estado unitário (comparação da aula com o Uruguai).",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Federação = vários centros de poder (entes federados). Unitário = um centro (tipo só a União).",
  },
  {
    id: 67,
    tipo: "ce",
    tema: "Entes federados",
    enunciado:
      "Os entes federados, centros de poder interno, são a União, os Estados, o Distrito Federal e os Municípios.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Quatro entes. União = nacional; Estados = regionais; Municípios = locais. O DF acumula competências de Estado e de Município (tema de Constitucional).",
  },
  {
    id: 68,
    tipo: "ce",
    tema: "Entes federados",
    enunciado:
      "A União é centro de poder nacional; os Estados, regionais; os Municípios, locais.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Esquema da aula para localizar cada ente no pacto federativo.",
  },
  {
    id: 69,
    tipo: "ce",
    tema: "Forma de Estado",
    enunciado:
      "A forma federativa de Estado é cláusula pétrea, prevista no art. 60, §4º, da Constituição, e não pode ser abolida.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Cláusula pétrea = escrita na pedra. A forma federativa não pode ser destruída por emenda.",
  },
  {
    id: 70,
    tipo: "ce",
    tema: "Forma de Estado",
    enunciado:
      "No pacto federativo brasileiro há direito de secessão: um Estado-membro pode deixar a Federação e constituir país próprio.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Não há direito de secessão. “Estamos todos no mesmo barco”: não se divide o país ao meio.",
  },
  {
    id: 71,
    tipo: "ce",
    tema: "Autonomia",
    enunciado:
      "União, Estados, DF e Municípios são dotados de independência e autonomia: não há hierarquia entre eles; cada um no seu quadrado.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "A União não “manda” no Estado que “manda” no Município. Cada ente tem o seu quinhão de competências.",
  },
  {
    id: 72,
    tipo: "ce",
    tema: "Soberania",
    enunciado:
      "Cada ente federado é dotado de soberania, isto é, do poder máximo e supremo de decidir os rumos políticos.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Pegadinha da aula: ente tem independência e autonomia, NÃO soberania. Soberania é da República Federativa do Brasil.",
  },
  {
    id: 73,
    tipo: "ce",
    tema: "Soberania",
    enunciado:
      "Na analogia da aula (Power Rangers), cada ente federado tem poderes próprios, mas o “Megazord” — a República Federativa do Brasil — é quem detém a soberania.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Ranger sozinho é poderoso; o poder máximo (Megazord) só aparece quando todos se juntam. Esse todo é a RFB.",
  },
  {
    id: 74,
    tipo: "ce",
    tema: "Conceito de Estado",
    enunciado:
      "O nome do nosso Estado é República Federativa do Brasil; “Brasil” funciona como apelido.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Analogia da aula: Antônio / Tonho. O nome jurídico do Estado é República Federativa do Brasil.",
  },
  {
    id: 75,
    tipo: "ce",
    tema: "Soberania",
    enunciado:
      "Quem nos representa internacionalmente é a União, mas a soberania continua sendo da República Federativa do Brasil.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "União = Ranger vermelho que pilota o Megazord. Representa lá fora, mas o Megazord (RFB) é que tem a soberania.",
  },
  {
    id: 76,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "A forma de governo adotada no Brasil é a federativa.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Federativa é forma de ESTADO. Forma de governo = republicana (República).",
  },
  {
    id: 77,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "República vem de res publica (coisa do povo): o que é público não é do rei, é nosso.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Contraste da aula com a monarquia, em que “tudo é do rei”.",
  },
  {
    id: 78,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "Na monarquia, na comparação da aula, o rei em regra é vitalício, a sucessão é hereditária e ele não responde como o governante republicano.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor usa a monarquia só para contrastar. O que importa gravar é a República.",
  },
  {
    id: 79,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "Na República o governante é eleito, o mandato é temporário e ele pode ser responsabilizado pela má gestão.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Três marcas da forma republicana na aula: eleição, temporalidade e responsabilização. “O brinquedo é nosso”.",
  },
  {
    id: 80,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "Segundo a aula, a forma republicana é cláusula pétrea implícita: o STF a reconhece, embora não esteja expressa no art. 60, §4º.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "A federativa está expressa no 60, §4º. A republicana, no recorte da aula, é pétrea implícita (STF).",
  },
  {
    id: 81,
    tipo: "ce",
    tema: "Forma de governo",
    enunciado:
      "O Presidente da República, no recorte da aula, tem mandato de quatro anos, admitida uma reeleição consecutiva (quatro mais quatro), e o cargo não é vitalício.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Mandato temporário. Não é rei para o resto da vida.",
  },
  {
    id: 82,
    tipo: "ce",
    tema: "Sistema de governo",
    enunciado:
      "O sistema de governo brasileiro é o democrático.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Democrático é o REGIME de governo. Sistema de governo = presidencialista (presidencialismo).",
  },
  {
    id: 83,
    tipo: "ce",
    tema: "Sistema de governo",
    enunciado:
      "No presidencialismo brasileiro o Presidente é eleito diretamente pelo povo, e não escolhido pelo Parlamento.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Diferença da aula com o parlamentarismo: lá o Parlamento escolhe o governante; aqui nós votamos no Presidente.",
  },
  {
    id: 84,
    tipo: "ce",
    tema: "Sistema de governo",
    enunciado:
      "No parlamentarismo, na comparação da aula, é o Parlamento quem escolhe o governante.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Serve só de contraste. O que cai para nós é o presidencialismo brasileiro.",
  },
  {
    id: 85,
    tipo: "ce",
    tema: "Sistema de governo",
    enunciado:
      "No presidencialismo, a mesma pessoa (Presidente da República) acumula as funções de chefe de governo (interno) e de chefe de Estado (externo), visíveis no art. 84 da CF.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Chefe de governo = funções políticas e administrativas internas. Chefe de Estado = representação internacional. As duas no mesmo cargo.",
  },
  {
    id: 86,
    tipo: "ce",
    tema: "Regime de governo",
    enunciado:
      "O regime de governo brasileiro é o democrático: todo poder emana do povo, que o exerce diretamente ou por representantes eleitos.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Democracia = governo do povo. Todo poder emana do povo.",
  },
  {
    id: 87,
    tipo: "ce",
    tema: "Regime de governo",
    enunciado:
      "Democracia, na etimologia da aula, é governo do povo.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Não é “governo do demo”. É governo do povo.",
  },
  {
    id: 88,
    tipo: "ce",
    tema: "Democracia",
    enunciado:
      "O Brasil adota democracia puramente indireta: o povo nunca decide de forma direta, só por representantes.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "É mista: democracia semi-direta ou participativa. Tem mecanismos diretos (plebiscito, referendo, iniciativa popular) e indiretos (eleição de representantes).",
  },
  {
    id: 89,
    tipo: "ce",
    tema: "Democracia",
    enunciado:
      "A democracia brasileira é semi-direta ou participativa: mistura mecanismos diretos e indiretos.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Das duas juntas. Direta = o povo decide. Indireta = elege alguém para decidir.",
  },
  {
    id: 90,
    tipo: "ce",
    tema: "Plebiscito e referendo",
    enunciado:
      "Plebiscito, na aula, é consulta prévia: o poder público pergunta antes de editar a lei ou praticar o ato.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Macete da aula: plebiscito = prévio. Consulta anterior.",
  },
  {
    id: 91,
    tipo: "ce",
    tema: "Plebiscito e referendo",
    enunciado:
      "Referendo é consulta posterior: a lei ou o ato já existe e o povo confirma ou rejeita.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Referendo = depois. Consulta para referendar o que já foi feito.",
  },
  {
    id: 92,
    tipo: "ce",
    tema: "Democracia",
    enunciado:
      "A iniciativa popular é instrumento pelo qual o povo pode apresentar projeto de lei.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Mecanismo de democracia direta citado na aula (o detalhamento fica para o Constitucional).",
  },
  {
    id: 93,
    tipo: "ce",
    tema: "Democracia",
    enunciado:
      "Eleger Presidente, Governador, Prefeito, Senador, Deputado e Vereador são exemplos de exercício indireto do poder.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O povo escolhe pessoas para tomar decisões por ele — democracia indireta, que no Brasil convive com os mecanismos diretos.",
  },
  {
    id: 94,
    tipo: "me",
    tema: "Classificações",
    enunciado:
      "Assinale a correlação correta, no padrão da aula:",
    alternativas: [
      "Forma de Estado: República; forma de governo: Federação; sistema: democracia.",
      "Forma de Estado: Federação; forma de governo: República; sistema: Presidencialismo; regime: Democracia.",
      "Forma de Estado: Presidencialismo; forma de governo: Democracia; sistema: Federação.",
      "Forma de Estado: Monarquia; forma de governo: Unitário; regime: Parlamentarismo.",
    ],
    correta: 1,
    explicacao:
      "Poeminha: o Estado fede (federativa); a República é fogo (forma de governo); o presidente é sistemático (presidencialismo); o regime é democrático.",
  },
  {
    id: 95,
    tipo: "ce",
    tema: "Classificações",
    enunciado:
      "O “poeminha” da aula (“o Estado fede; a República é fogo; o presidente é sistemático; o regime é democrático”) serve para não trocar forma de Estado, forma de governo, sistema e regime.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "A banca inverte os rótulos. O poema existe para essa pegadinha besta não levar ponto.",
  },
  {
    id: 96,
    tipo: "ce",
    tema: "Soberania",
    enunciado:
      "Os Estados-membros, os Municípios e o Distrito Federal são pessoas jurídicas de direito público que integram a estrutura do Estado e são dotados de soberania e de autonomia política, administrativa e financeira.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Questão comentada na aula: PJ de direito público, ok; autonomia, ok; soberania, não. Soberania é da República Federativa do Brasil.",
  },
  {
    id: 97,
    tipo: "ce",
    tema: "Elementos do Estado",
    enunciado:
      "Povo, território e governo soberano são elementos do Estado.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Questão “presente” da aula. São os três elementos.",
  },
  {
    id: 98,
    tipo: "ce",
    tema: "Conceito de Estado",
    enunciado:
      "O Estado é um ente personalizado, apresentando-se tanto no plano externo (relações internacionais) quanto no interno como pessoa jurídica de direito público, capaz de adquirir direitos e contrair obrigações.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Item comentado na aula e dado como correto: personalizado, interno e externo, PJ de direito público.",
  },
  {
    id: 99,
    tipo: "me",
    tema: "Elementos do Estado",
    enunciado:
      "A respeito dos elementos do Estado, assinale a opção correta:",
    alternativas: [
      "Povo, território e governo soberano são elementos indissociáveis do Estado.",
      "O Estado é um ente despersonalizado.",
      "São elementos do Estado o Poder Legislativo, o Judiciário e o Executivo.",
      "A União, os Estados, os Municípios e o DF são os elementos do Estado.",
    ],
    correta: 0,
    explicacao:
      "Questão da tela da aula. A está certa (indissociáveis = sempre presentes). B: é personalizado. C: L/E/J são poderes, não elementos. D: são entes federados, divisões internas. Presidencialismo/parlamentarismo (também errado na aula) é sistema de governo.",
  },
  {
    id: 100,
    tipo: "me",
    tema: "Freios e contrapesos",
    enunciado:
      "Sobre independência dos poderes e dos entes, no recorte das aulas 1 e 2, assinale a correta:",
    alternativas: [
      "Há hierarquia: o Executivo manda no Legislativo e no Judiciário.",
      "Os poderes são independentes e harmônicos; pelo sistema de freios e contrapesos, cada um controla o outro, sem isso gerar hierarquia entre eles.",
      "União, Estados e Municípios têm soberania própria, cada um um “Megazord”.",
      "A forma de governo federativa impede qualquer controle recíproco entre os poderes.",
    ],
    correta: 1,
    explicacao:
      "Poderes: independentes e harmônicos + freios e contrapesos (aula 1 / título do Tópico 2). Entes: autonomia, não soberania. E federativa é forma de Estado, não de governo.",
  },
  {
    id: 101,
    tipo: "ce",
    tema: "Critério formal",
    enunciado:
      "O Brasil adota o critério formal, também chamado de subjetivo ou orgânico, para definir quem é Administração Pública: o que a lei diz que é AP.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Aula 3: critério formal/subjetivo/orgânico = quem a lei aponta. O Brasil adota esse critério (CF + Decreto-Lei 200/67). A atividade em si não decide.",
  },
  {
    id: 102,
    tipo: "ce",
    tema: "Critério material",
    enunciado:
      "No critério material, objetivo ou funcional, Administração Pública é a própria atividade administrativa, independentemente de quem a exerce.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Material/objetivo/funcional olha a atividade. Um particular prestando serviço público entraria nesse conceito. O Brasil não adota esse critério, mas a banca pode cobrar o que ele significa.",
  },
  {
    id: 103,
    tipo: "ce",
    tema: "Critério formal",
    enunciado:
      "No critério formal, o que importa é a atividade desenvolvida: se for serviço público, o prestador é Administração Pública.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Isso é o critério material. No formal, a atividade não importa: o rol legal é que define quem é AP.",
  },
  {
    id: 104,
    tipo: "ce",
    tema: "Critério material",
    enunciado:
      "O ordenamento brasileiro adotou o critério material/objetivo/funcional para delimitar a Administração Pública.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Adotado é o formal/subjetivo/orgânico. O material existe na doutrina e cai em prova, mas não é o critério do Brasil.",
  },
  {
    id: 105,
    tipo: "me",
    tema: "Critério formal",
    enunciado:
      "Sobre os critérios de identificação da Administração Pública, assinale a opção correta:",
    alternativas: [
      "O Brasil adota o critério material: AP é a atividade administrativa em si.",
      "O critério formal/subjetivo/orgânico, adotado no Brasil, define a AP pelo que a lei diz que ela é.",
      "Critério formal e critério material são sinônimos e ambos foram adotados pela CF/88.",
      "O Decreto-Lei 200/67 adotou só o critério funcional, deixando de lado o orgânico.",
    ],
    correta: 1,
    explicacao:
      "Dica da aula: formal + subjetivo = o que está na lei (adotado). O outro par é material/objetivo = a atividade (não adotado).",
  },
  {
    id: 106,
    tipo: "ce",
    tema: "Entes da Administração",
    enunciado:
      "Pelo critério formal, a Administração Pública brasileira se traduz em um rol taxativo de oito pessoas jurídicas, além dos órgãos e agentes que as integram.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Oito PJs: União, Estados, DF e Municípios (direta) + autarquias, fundações públicas, empresas públicas e sociedades de economia mista (indireta).",
  },
  {
    id: 107,
    tipo: "ce",
    tema: "Entes da direta",
    enunciado:
      "Compõem a Administração Direta a União, os Estados, o Distrito Federal e os Municípios.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Os quatro entes federados são a direta. Autarquia, fundação, empresa pública e SEM ficam na indireta.",
  },
  {
    id: 108,
    tipo: "ce",
    tema: "Entes da indireta",
    enunciado:
      "Autarquias, fundações públicas, empresas públicas e sociedades de economia mista integram a Administração Indireta.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Essas quatro entidades administrativas são a indireta (administração descentralizada).",
  },
  {
    id: 109,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "Administração Direta, entes federados, entes políticos, pessoas políticas e administração centralizada são expressões usadas como sinônimas no recorte da aula.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Pegadinha clássica: se a banca fala “entes federados/políticos” e depois coloca autarquia no mesmo saco, o item cai. Autarquia é indireta.",
  },
  {
    id: 110,
    tipo: "me",
    tema: "Entes da direta",
    enunciado:
      "Integram a Administração Direta:",
    alternativas: [
      "União, Estados, DF, Municípios, autarquias e fundações públicas.",
      "Somente a União e os Estados, porque Municípios não têm personalidade jurídica.",
      "União, Estados, Distrito Federal e Municípios.",
      "Empresas públicas e sociedades de economia mista, por serem pessoas políticas.",
    ],
    correta: 2,
    explicacao:
      "Direta = os quatro entes federados. Autarquia e fundação são indireta. EP e SEM são empresas estatais da indireta, não pessoas políticas.",
  },
  {
    id: 111,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "Administração Direta corresponde à administração centralizada; Administração Indireta, à administração descentralizada.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Item no estilo da tela da aula: direta = centralizada; indireta = descentralizada.",
  },
  {
    id: 112,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "“Entidades administrativas” é expressão que, na aula, designa os entes da Administração Direta.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Entidades administrativas = indireta. Direta = entes/pessoas políticas. Banco que mistura os dois rótulos está errado.",
  },
  {
    id: 113,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "Empresa pública e sociedade de economia mista podem ser agrupadas sob o rótulo de empresas estatais.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "EP + SEM = empresas estatais. Continuam na indireta; não se confundem com os entes políticos da direta.",
  },
  {
    id: 114,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "Se o enunciado fala em entes federados ou pessoas políticas e inclui autarquia nesse conjunto, o item está de acordo com a classificação da aula.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Autarquia não é ente federado nem pessoa política. É entidade administrativa da indireta.",
  },
  {
    id: 115,
    tipo: "me",
    tema: "Sinônimos",
    enunciado:
      "Assinale a correspondência correta, segundo a aula 3:",
    alternativas: [
      "Direta = entidades administrativas = administração descentralizada.",
      "Indireta = pessoas políticas = administração centralizada.",
      "Direta = entes políticos = administração centralizada; indireta = entidades administrativas = administração descentralizada.",
      "Empresas estatais = União, Estados, DF e Municípios.",
    ],
    correta: 2,
    explicacao:
      "Memorizar os pares. Empresas estatais são só EP e SEM, não os quatro entes da direta.",
  },
  {
    id: 116,
    tipo: "ce",
    tema: "Entes da direta",
    enunciado:
      "Os quatro entes da Administração Direta são pessoas jurídicas de direito público, o que lhes confere posição de superioridade em relação aos particulares.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "PJ de direito público: não estão no mesmo patamar do administrado. Personalidade também traz capacidade processual e patrimônio próprio.",
  },
  {
    id: 117,
    tipo: "ce",
    tema: "Personalidade jurídica",
    enunciado:
      "Por terem personalidade jurídica, os entes da direta têm capacidade processual (podem ser autor ou réu) e patrimônio próprio.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Personalidade = aptidão para direitos e obrigações. Daí a capacidade de estar em juízo e o patrimônio separado.",
  },
  {
    id: 118,
    tipo: "ce",
    tema: "Hierarquia",
    enunciado:
      "Há hierarquia e subordinação entre União, Estados, Distrito Federal e Municípios: a União manda nos demais entes.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Não há hierarquia entre os entes federados. A hierarquia existe para dentro de cada um (órgãos internos), não de um ente para outro.",
  },
  {
    id: 119,
    tipo: "ce",
    tema: "Hierarquia",
    enunciado:
      "A hierarquia na Administração Direta é interna a cada ente: o Município não se subordina hierarquicamente ao Estado nem à União.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Autonomia federativa: cada ente se organiza para dentro. Não existe “União chefe” dos Municípios no sentido hierárquico.",
  },
  {
    id: 120,
    tipo: "me",
    tema: "Hierarquia",
    enunciado:
      "Sobre a relação entre os entes da Administração Direta, assinale a correta:",
    alternativas: [
      "A União é hierarquicamente superior aos Estados, e estes, aos Municípios.",
      "O DF se subordina à União porque não tem Constituição própria.",
      "Não há hierarquia nem subordinação entre União, Estados, DF e Municípios; a hierarquia é interna a cada ente.",
      "Municípios se subordinam ao Estado-membro, que cria a comarca e o fórum.",
    ],
    correta: 2,
    explicacao:
      "Sem hierarquia entre entes. Fórum da comarca é justiça estadual, mas isso não transforma o Município em órgão do Estado.",
  },
  {
    id: 121,
    tipo: "ce",
    tema: "Autonomia política",
    enunciado:
      "A autonomia política dos entes da direta é a capacidade de legislar; por isso são chamados de entes ou pessoas políticas.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Política aqui = legislar. A indireta não legisla: não é “ente político”. Também há autonomia administrativa e financeira.",
  },
  {
    id: 122,
    tipo: "ce",
    tema: "Autonomia política",
    enunciado:
      "As entidades da Administração Indireta também exercem autonomia política, podendo editar leis em sentido estrito.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Indireta não legisla. Autonomia política (capacidade legislativa) é marca da direta — daí “pessoas políticas”.",
  },
  {
    id: 123,
    tipo: "ce",
    tema: "Autonomia",
    enunciado:
      "Além da autonomia política, os entes da direta têm autonomia administrativa e financeira.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Três fatias da aula: política (legislar), administrativa (organizar a máquina) e financeira (receitas e despesas próprias).",
  },
  {
    id: 124,
    tipo: "ce",
    tema: "Poderes",
    enunciado:
      "União, Estados e Distrito Federal organizam-se com Poder Executivo, Legislativo e Judiciário.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Os três têm os três Poderes. O Município é a exceção: só Executivo e Legislativo — não há Judiciário municipal.",
  },
  {
    id: 125,
    tipo: "me",
    tema: "Judiciário municipal",
    enunciado:
      "Quanto à organização dos Poderes nos entes da direta, assinale a correta:",
    alternativas: [
      "Todo ente federado, inclusive o Município, possui Executivo, Legislativo e Judiciário próprios.",
      "Apenas a União tem Judiciário; Estados e Municípios têm só Executivo e Legislativo.",
      "União, Estados e DF têm Executivo, Legislativo e Judiciário; o Município tem Executivo e Legislativo, mas não Judiciário próprio.",
      "O fórum da comarca é órgão do Município, o que supre a falta de Judiciário municipal.",
    ],
    correta: 2,
    explicacao:
      "Município: E + L. O fórum da comarca é justiça estadual, não “Judiciário da prefeitura”.",
  },
  {
    id: 126,
    tipo: "ce",
    tema: "Judiciário municipal",
    enunciado:
      "Os Municípios têm Poder Executivo e Poder Legislativo, mas não possuem Poder Judiciário próprio.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Item no estilo da tela da aula: Municípios não têm Judiciário. Quem julga na comarca é a justiça do Estado.",
  },
  {
    id: 127,
    tipo: "ce",
    tema: "Judiciário municipal",
    enunciado:
      "O fórum da comarca instalado no Município é órgão do Judiciário municipal.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "É justiça estadual. Ter prédio de fórum na cidade não cria Poder Judiciário do Município.",
  },
  {
    id: 128,
    tipo: "ce",
    tema: "Autonomia",
    enunciado:
      "A ausência de Judiciário próprio significa que o Município não tem autonomia, ficando subordinado ao Estado-membro.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Item comentado na aula e dado como errado. Municípios têm autonomia (política, administrativa e financeira) mesmo sem Judiciário próprio.",
  },
  {
    id: 129,
    tipo: "ce",
    tema: "Criação da indireta",
    enunciado:
      "Os Municípios, a exemplo dos Estados, podem instituir Administração Indireta, em razão da autonomia reconhecida pela Constituição.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Item da tela: Município pode ter autarquia, fundação, EP, SEM. Autonomia federativa não é só da União e dos Estados.",
  },
  {
    id: 130,
    tipo: "me",
    tema: "Criação da indireta",
    enunciado:
      "A respeito da criação de entidades da Administração Indireta, assinale a correta:",
    alternativas: [
      "Só o Poder Executivo pode criar autarquia, fundação pública, empresa pública ou sociedade de economia mista.",
      "A indireta nasce por lei; o mais típico é o Executivo criar, mas não é defeso ao Legislativo e ao Judiciário instituírem entidades da indireta.",
      "É defeso ao Judiciário e ao Legislativo criar entidades da indireta.",
      "A indireta se cria por decreto do chefe do Executivo, sem lei.",
    ],
    correta: 1,
    explicacao:
      "Criação por lei. Função administrativa típica do Executivo, mas “defeso” (proibido) ao L e ao J criar indireta é afirmativa errada.",
  },
  {
    id: 131,
    tipo: "ce",
    tema: "Criação da indireta",
    enunciado:
      "A Administração Direta cria as entidades da Indireta por meio de lei.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Descentralização por outorga: a direta institui a indireta na forma da lei. Não é “no grito” nem só por decreto.",
  },
  {
    id: 132,
    tipo: "ce",
    tema: "Criação da indireta",
    enunciado:
      "Criar entidade da indireta é função administrativa típica, em regra atribuída ao Poder Executivo.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Típico do Executivo, sim. Isso não quer dizer que Legislativo e Judiciário estejam proibidos de criar a sua indireta.",
  },
  {
    id: 133,
    tipo: "ce",
    tema: "Defeso",
    enunciado:
      "É defeso ao Poder Judiciário e ao Poder Legislativo criar autarquias, fundações públicas e demais entidades da Administração Indireta.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Questão da tela: errado. Defeso = proibido/vedado. Não é proibido: L e J podem criar entidades da indireta.",
  },
  {
    id: 134,
    tipo: "ce",
    tema: "Defeso",
    enunciado:
      "Na linguagem de prova, “defeso” equivale a proibido, vedado, não permitido.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "O professor para na palavra: se você não traduz “defeso”, erra o item mesmo sabendo o conteúdo.",
  },
  {
    id: 135,
    tipo: "ce",
    tema: "Criação da indireta",
    enunciado:
      "O Poder Legislativo pode instituir entidades da Administração Indireta.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Pode. O mesmo vale para o Judiciário. O Executivo é o mais usual, não o exclusivo.",
  },
  {
    id: 136,
    tipo: "ce",
    tema: "Responsabilidade civil",
    enunciado:
      "Os entes da Administração Direta submetem-se à responsabilidade civil objetiva prevista no art. 37, § 6º, da Constituição.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Traço genérico da direta na aula: responsabilidade objetiva pelos danos que agentes, nessa qualidade, causarem a terceiros. O detalhe fica para tópico próprio.",
  },
  {
    id: 137,
    tipo: "ce",
    tema: "Regime de pessoal",
    enunciado:
      "O pessoal da Administração Direta rege-se, em regra, por estatuto próprio, e não pela CLT.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Na União, o estatuto é a Lei 8.112/90. CLT é o regime típico da iniciativa privada (e, em regra, das empresas estatais), não da direta.",
  },
  {
    id: 138,
    tipo: "ce",
    tema: "Regime de pessoal",
    enunciado:
      "Os servidores da União, na Administração Direta, têm como estatuto típico a Lei 8.112/1990.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "8.112 é o RJU federal. Estados e Municípios têm estatutos próprios, mas a lógica é a mesma: regime estatutário na direta.",
  },
  {
    id: 139,
    tipo: "ce",
    tema: "Imunidade tributária",
    enunciado:
      "Os entes da direta gozam de imunidade tributária recíproca: em regra, um não tributa o outro.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Imunidade recíproca é prerrogativa clássica dos entes políticos. A aula cita o traço; o detalhe constitucional vem em D. Constitucional / tributário.",
  },
  {
    id: 140,
    tipo: "ce",
    tema: "Bens públicos",
    enunciado:
      "Os bens da Administração Direta têm proteção especial, inclusive impenhorabilidade.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Bem público não se penhora como o do particular. Dívida judicial do ente público caminha, em regra, por precatório.",
  },
  {
    id: 141,
    tipo: "ce",
    tema: "Precatórios",
    enunciado:
      "Condenações judiciais pecuniárias contra os entes da direta são, em regra, pagas por precatório, e não por penhora de bens públicos.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Impenhorabilidade + regime de precatórios. É uma das “carinhas” da direta que a aula lista para você ir reconhecendo.",
  },
  {
    id: 142,
    tipo: "ce",
    tema: "Prerrogativas processuais",
    enunciado:
      "Entre as prerrogativas processuais dos entes da direta está, em regra, o prazo em dobro.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Fazenda Pública com prazo dilatado (dobro, no recorte da aula). Não precisa decorar o CPC agora: grave que há privilégio processual.",
  },
  {
    id: 143,
    tipo: "ce",
    tema: "Organização da AP",
    enunciado:
      "A organização da Administração Pública (quem é a AP) é a base da matéria: os princípios se aplicam tanto à direta quanto à indireta.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Abertura da aula 3: primeiro saiba quem é a Administração; LIMPE e o restante incidem sobre direta e indireta.",
  },
  {
    id: 144,
    tipo: "ce",
    tema: "Critério formal",
    enunciado:
      "Critério orgânico é outro nome do critério formal/subjetivo de identificação da Administração Pública.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Três nomes, mesma ideia: formal = subjetivo = orgânico. Do outro lado: material = objetivo = funcional.",
  },
  {
    id: 145,
    tipo: "ce",
    tema: "Critério material",
    enunciado:
      "Pelo critério material, um particular que preste serviço público seria considerado Administração Pública, porque o que vale é a atividade.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Exemplo da aula para fixar o critério que o Brasil não adotou. Aqui o prestador particular “entra” no conceito porque a atividade é administrativa.",
  },
  {
    id: 146,
    tipo: "ce",
    tema: "Critério formal",
    enunciado:
      "O critério formal brasileiro encontra respaldo na Constituição e no Decreto-Lei 200/1967.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "CF + DL 200/67 desenham o rol de quem é AP. Por isso o professor manda gravar o critério e as oito pessoas jurídicas.",
  },
  {
    id: 147,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "A Administração Direta é composta por órgãos e entidades administrativas, submetidos a regime de direito público, com competência exercida de forma centralizada.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Item da tela: errado. “Entidades administrativas” são a indireta. A direta são os entes/órgãos da administração centralizada, não as entidades da indireta.",
  },
  {
    id: 148,
    tipo: "ce",
    tema: "Entes da direta",
    enunciado:
      "A Administração Direta federal é composta pelos Ministérios e pelas autarquias federais.",
    alternativas: ["Certo", "Errado"],
    correta: 1,
    explicacao:
      "Item da tela: errado. Ministério é órgão da direta (União). Autarquia é entidade da indireta.",
  },
  {
    id: 149,
    tipo: "ce",
    tema: "Sinônimos",
    enunciado:
      "Administração Direta equivale à administração centralizada; Administração Indireta, à administração descentralizada.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Item comentado na aula e dado como certo. É o par de sinônimos que mais cai.",
  },
  {
    id: 150,
    tipo: "ce",
    tema: "Judiciário municipal",
    enunciado:
      "Os Municípios organizam-se com Poder Executivo e Poder Legislativo, inexistindo Poder Judiciário municipal.",
    alternativas: ["Certo", "Errado"],
    correta: 0,
    explicacao:
      "Último item no espírito da tela da aula 3: Município = E + L, sem Judiciário próprio. Isso não retira a autonomia municipal.",
  },

];

const MATERIAS_BASE = [
  {
    id: "dadm",
    nome: "Direito Administrativo",
    sigla: "D.Adm",
    cor: "#d4b45a",
  },
  {
    id: "pt",
    nome: "Português",
    sigla: "PT",
    cor: "#6b8fd4",
  },
  {
    id: "dc",
    nome: "Direito Constitucional",
    sigla: "D.Const",
    cor: "#c46b5a",
  },
];

function questoesDaMateria(id) {
  if (id === "dadm") return QUESTOES;
  return [];
}

function cardsDaMateria(id) {
  const qs = questoesDaMateria(id);
  return qs.map((q) => {
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
