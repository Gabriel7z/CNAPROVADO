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

const QUESTOES_PT = [
  qCE(
    1,
    "Compreensão × interpretação",
    "Na compreensão de texto, a resposta pedida pela banca está, em regra, expressa no próprio texto.",
    0,
    "Compreender é achar no texto. O Noslen separa: compreensão fica no que está escrito; interpretação dá um passo a mais (inferência)."
  ),
  qCE(
    2,
    "Compreensão × interpretação",
    "Interpretar um texto é copiar um trecho sem inferir sentido, contexto ou relação entre as ideias.",
    1,
    "Interpretar exige inferência: o que o texto deixa entender, não só o que copia e cola."
  ),
  qCE(
    3,
    "Leitura de prova",
    "Em questão de compreensão, se a alternativa afirma algo que o texto não diz, o item está errado.",
    0,
    "A banca de concurso (Quadrix, Cebraspe, FCC) pune invenção. Se não está no texto, não marque como dito."
  ),
  qCE(
    4,
    "Leitura de prova",
    "O título e o último parágrafo de um texto dissertativo quase nunca ajudam a achar o tema.",
    1,
    "Tema e conclusão costumam aparecer no começo e no fim. Vale olhar os dois antes de sair chutando."
  ),
  qCE(
    5,
    "Inferência",
    "Inferir é concluir algo a partir do que o texto mostra, ainda que a frase não esteja copiada palavra por palavra.",
    0,
    "Inferência = o que se tira do texto. Não é chute solto nem informação de fora da prova."
  ),
  qCE(
    6,
    "Pegadinha",
    "Se o enunciado fala em “de acordo com o texto”, vale usar conhecimento de mundo para completar o que o autor não disse.",
    1,
    "“De acordo com o texto” prende você ao escrito. Conhecimento de mundo só entra se a banca pedir isso."
  ),
  qCE(
    7,
    "Reescrita",
    "Reescrever uma frase sem mudar o sentido é um dos tipos que mais caem em Quadrix, Cebraspe e FCC.",
    0,
    "Reescrita / equivalência pesa nas três bancas. Trocar palavra não pode torcer o sentido."
  ),
  qCE(
    8,
    "Coesão",
    "Pronomes e conectivos (mas, portanto, embora) amarram as ideias; errar o conectivo muda a relação lógica.",
    0,
    "Coesão é cola. “Mas” opõe; “portanto” conclui. A banca troca o conectivo para ver se você leu a relação."
  ),
  qCE(
    9,
    "Tipologia",
    "Texto dissertativo-argumentativo defende um ponto com argumentos; narração conta fatos em sequência.",
    0,
    "Dissertação = tese + argumentos. Narração = fatos no tempo. Saber o tipo evita marcar inferência de novela em texto de opinião."
  ),
  qCE(
    10,
    "Estratégia",
    "Em prova de certo/errado de português, um detalhe no enunciado (não, apenas, somente, sempre) costuma ser o que zera o item.",
    0,
    "Cebraspe ama o detalhe. Leia o texto e depois o item palavra por palavra."
  ),
  qCE(
    11,
    "Concordância nominal",
    "Concordância nominal é fazer o adjetivo, o artigo, o pronome e o numeral combinarem em gênero e número com o substantivo a que se referem.",
    0,
    "Aula do Noslen: o adjetivo (e os determinantes) seguem o substantivo. Os dois brinquedos preferidos — tudo no plural."
  ),
  qCE(
    12,
    "Concordância nominal",
    "A forma “menas” é aceita na norma culta como feminino de “menos”.",
    1,
    "Não existe “menas”. “Menos” é invariável na norma culta. Pegadinha clássica."
  ),
  qCE(
    13,
    "Concordância verbal",
    "O verbo concorda em número e pessoa com o sujeito, ainda que o sujeito venha depois do verbo.",
    0,
    "Sujeito no plural, verbo no plural. “Chegaram os candidatos” — o sujeito é “os candidatos”."
  ),
  qCE(
    14,
    "Concordância verbal",
    "Quando o sujeito é “a gente”, o verbo vai obrigatoriamente para a 1ª pessoa do plural (nós) na norma culta escrita de prova.",
    1,
    "“A gente” puxa 3ª pessoa do singular: a gente vai, a gente chegou. “A gente vamos” é marca de oralidade."
  ),
  qCE(
    15,
    "Concordância nominal",
    "Em “é proibido entrada”, o adjetivo fica invariável porque “entrada” está sem artigo; em “é proibida a entrada”, concorda.",
    0,
    "Regra que cai: sem determinante, “proibido/necessário/bom” fica no masculino; com artigo, concorda."
  ),
  qCE(
    16,
    "Sujeito coletivo",
    "Sujeito coletivo no singular (a multidão, o povo) leva o verbo, em regra, para o singular, salvo se se quiser destacar os indivíduos.",
    0,
    "A multidão gritou. Se a banca quiser o sentido de pessoas soltas, pode ir ao plural — mas a regra-base é singular."
  ),
  qCE(
    17,
    "Predicativo",
    "O predicativo concorda com o sujeito: “As alunas estavam atentas.”",
    0,
    "Atentas (fem. pl.) combina com alunas. Trocar para “atento” é erro de concordância."
  ),
  qCE(
    18,
    "Um e outro",
    "Com “um e outro”, o substantivo fica no singular e o verbo, em regra, no singular: um e outro candidato faltou.",
    0,
    "Construção clássica de prova. “Um e outro” + substantivo no singular."
  ),
  qCE(
    19,
    "Ou... ou",
    "Na correlação “ou o diretor ou os coordenadores assinarão”, o verbo concorda com o núcleo mais próximo.",
    0,
    "Sujeitos ligados por “ou... ou”: a banca aceita a concordância com o mais próximo."
  ),
  qCE(
    20,
    "Haver",
    "O verbo haver no sentido de existir fica impessoal: “Havia muitas vagas”, e não “Haviam muitas vagas”.",
    0,
    "Haver = existir → 3ª pessoa do singular. Cai em Quadrix, Cebraspe e FCC."
  ),
];

const QUESTOES_DC = [
  qCE(
    1,
    "Princípios fundamentais",
    "A República Federativa do Brasil é formada pela união indissolúvel dos Estados, Municípios e do Distrito Federal, e constitui-se em Estado Democrático de Direito.",
    0,
    "Art. 1º, caput, da CF. União indissolúvel + Estado Democrático de Direito."
  ),
  qCE(
    2,
    "Princípios fundamentais",
    "O Brasil adotou a monarquia parlamentar como forma de governo na Constituição de 1988.",
    1,
    "Forma de governo é a República. Presidencialismo é o sistema. Não misture com monarquia."
  ),
  qCE(
    3,
    "Fundamentos",
    "São fundamentos da República, entre outros, a soberania, a cidadania e a dignidade da pessoa humana.",
    0,
    "Art. 1º, I a III. Completam: valores sociais do trabalho e da livre iniciativa, e pluralismo político."
  ),
  qCE(
    4,
    "Fundamentos",
    "O pluralismo político não é fundamento da República Federativa do Brasil.",
    1,
    "É sim: art. 1º, V. Macete SOCIDIVASO / SOCIDIVAPLU — o que importa é gravar os cinco incisos."
  ),
  qCE(
    5,
    "Poderes",
    "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
    0,
    "Art. 2º. Independentes e harmônicos — não é tripartição absoluta: há funções atípicas."
  ),
  qCE(
    6,
    "Poderes",
    "A tripartição de Poderes no Brasil é absoluta: nenhum Poder exerce função que não seja a sua função típica.",
    1,
    "Há funções atípicas (ex.: o Judiciário administra; o Legislativo julga o Presidente em crime de responsabilidade). A aula do JC trata dos três Poderes nesse recorte."
  ),
  qCE(
    7,
    "Objetivos",
    "Constituem objetivos fundamentais da República construir uma sociedade livre, justa e solidária e erradicar a pobreza.",
    0,
    "Art. 3º. Também: garantir o desenvolvimento nacional e promover o bem de todos, sem preconceitos."
  ),
  qCE(
    8,
    "Relações internacionais",
    "A República Federativa do Brasil se rege nas relações internacionais, entre outros, pelos princípios da independência nacional, da prevalência dos direitos humanos e da defesa da paz.",
    0,
    "Art. 4º. Cai pouco em alguns editais, mas o caput e os incisos mais famosos (direitos humanos, não-intervenção, defesa da paz) aparecem."
  ),
  qCE(
    9,
    "Art. 1º",
    "O preâmbulo da Constituição tem a mesma força cogente dos artigos do corpo permanente, segundo a jurisprudência dominante do STF.",
    1,
    "O STF não reconhece força normativa plena ao preâmbulo. A aula de nomenclatura/preâmbulo do JC destaca isso."
  ),
  qCE(
    10,
    "Art. 1º",
    "Todo o poder emana do povo, que o exerce por meio de representantes eleitos ou diretamente, nos termos da Constituição.",
    0,
    "Parágrafo único do art. 1º. Democracia semidireta: representantes + mecanismos diretos (plebiscito, referendo, iniciativa popular)."
  ),
  qCE(
    11,
    "Art. 1º",
    "A soberania, como fundamento, significa que algum ente federado (Estado ou Município) pode se separar da Federação se assim decidir em plebiscito local.",
    1,
    "A união é indissolúvel. Não há direito de secessão. Soberania é da República Federativa do Brasil, não de cada ente."
  ),
  qCE(
    12,
    "Cidadania",
    "Cidadania, no art. 1º, liga-se à participação política e aos direitos de participar da vida do Estado.",
    0,
    "Fundamento cidadania ≠ só título de eleitor, mas é o eixo da participação. Não confunda com dignidade (inciso III)."
  ),
  qCE(
    13,
    "Valores sociais",
    "Os valores sociais do trabalho e da livre iniciativa são fundamentos da República, e não meros objetivos do art. 3º.",
    0,
    "Art. 1º, IV. Objetivo é o art. 3º (construir sociedade livre, justa e solidária etc.)."
  ),
  qCE(
    14,
    "Estado Democrático de Direito",
    "Estado Democrático de Direito combina submissão à lei com legitimidade que vem do povo.",
    0,
    "Não é só “legalidade”: é legalidade + democracia. A aula de princípios do JC trabalha essa chave."
  ),
  qCE(
    15,
    "Municípios",
    "Os Municípios integram a união indissolúvel prevista no art. 1º, caput.",
    0,
    "Estados + Municípios + DF. A CF de 88 elevou o Município a ente federativo."
  ),
  qCE(
    16,
    "Distrito Federal",
    "O Distrito Federal não entra no caput do art. 1º, porque não é Estado nem Município.",
    1,
    "O caput cita expressamente o DF. Ele é ente federativo sui generis, mas está na formação da República."
  ),
  qCE(
    17,
    "Dignidade",
    "A dignidade da pessoa humana é fundamento da República (art. 1º, III) e repercute na leitura dos direitos fundamentais.",
    0,
    "Não é enfeite. A aula específica do JC sobre dignidade mostra o princípio como vetor de interpretação."
  ),
  qCE(
    18,
    "Dignidade",
    "A dignidade da pessoa humana autoriza o Estado a tratar a pessoa como mero instrumento da Administração, desde que o ato seja legal.",
    1,
    "Dignidade veda objetificar a pessoa. Legalidade não lava ato que aniquila a dignidade."
  ),
  qCE(
    19,
    "Aplicação",
    "O princípio da dignidade da pessoa humana pode ser usado para invalidar ato administrativo que humilhe ou degrade o administrado.",
    0,
    "Cruza com D.Adm: a Administração também se submete aos fundamentos da República."
  ),
  qCE(
    20,
    "Art. 5º (abertura)",
    "Todos são iguais perante a lei, sem distinção de qualquer natureza — cláusula de abertura do art. 5º, caput.",
    0,
    "Igualdade formal no caput. A PM DF puxa muito o art. 5º; o TCE-GO também cobra. Aprofundamento vem nas próximas aulas da playlist."
  ),
];

const QUESTOES_TI = [
  qCE(
    1,
    "Hardware e software",
    "Hardware é a parte física do computador (placa, memória, teclado); software é o conjunto de programas e sistemas.",
    0,
    "Distinção básica de informática para concurso. SEDF/Quadrix e PM DF/Cebraspe cobram isso no começo."
  ),
  qCE(
    2,
    "Sistema operacional",
    "O sistema operacional gerencia o hardware e oferece a interface para o usuário rodar programas; o Windows é um exemplo.",
    0,
    "SO = gerente da máquina. Windows, Linux, macOS. A aula da Emannuelle no curso de Informática parte daí."
  ),
  qCE(
    3,
    "Windows",
    "No Windows, a Área de trabalho (Desktop) é o primeiro ambiente visual após o login, onde ficam ícones, barra de tarefas e atalhos.",
    0,
    "Quadrix (SEDF) puxa Windows, pastas e atalhos. Grave: Desktop, Explorer, lixeira, barra de tarefas."
  ),
  qCE(
    4,
    "Atalhos",
    "Ctrl+C copia; Ctrl+X recorta; Ctrl+V cola; Ctrl+Z desfaz a última ação.",
    0,
    "Atalhos que caem em prova e que você usa de verdade. Ctrl+Y refaz (redo) em vários programas."
  ),
  qCE(
    5,
    "Atalhos",
    "Alt+F4, no Windows, em regra fecha a janela ou o programa em primeiro plano.",
    0,
    "Alt+F4 fecha. Alt+Tab troca de janela. Windows+D mostra a área de trabalho."
  ),
  qCE(
    6,
    "Arquivos",
    "Uma pasta (diretório) pode conter arquivos e outras pastas; o Explorador de Arquivos (Explorer) serve para navegar nessa árvore.",
    0,
    "Arquivo ≠ pasta. Extensão (.docx, .xlsx, .pdf) indica o tipo. Explorer é o gerenciador padrão."
  ),
  qCE(
    7,
    "Lixeira",
    "Ao enviar um arquivo para a Lixeira do Windows, ele é apagado de forma definitiva e irreversível no mesmo instante.",
    1,
    "Lixeira é estágio intermediário. Dá para restaurar. Exclusão definitiva é Shift+Delete ou esvaziar a Lixeira."
  ),
  qCE(
    8,
    "Memória",
    "A memória RAM é volátil: desligou o computador, o conteúdo dela se perde; o armazenamento em HD/SSD permanece.",
    0,
    "RAM = trabalho rápido e volátil. HD/SSD = persistente. Pegadinha clássica Cebraspe."
  ),
  qCE(
    9,
    "Navegador",
    "Chrome, Edge e Firefox são navegadores: programas para acessar páginas na World Wide Web.",
    0,
    "Navegador ≠ motor de busca. Google é busca; Chrome é navegador. Quadrix mistura os dois de propósito."
  ),
  qCE(
    10,
    "URL e HTTP",
    "HTTP e HTTPS são protocolos de comunicação na web; o S do HTTPS indica conexão criptografada (mais segura).",
    0,
    "Cadeado / HTTPS. HTTP puro trafega em claro. TCE-GO TI puxa protocolo; SEDF puxa o uso seguro no navegador."
  ),
  qCE(
    11,
    "Phishing",
    "Phishing é golpe em que o atacante se passa por instituição conhecida para roubar senha, dados ou dinheiro, em geral por e-mail ou site falso.",
    0,
    "PM DF e SEDF cobram golpe e navegação segura. Desconfie de link urgente pedindo senha."
  ),
  qCE(
    12,
    "Malware",
    "Vírus, worm e ransomware são tipos de malware; ransomware cifra os arquivos e pede resgate.",
    0,
    "Malware = software malicioso. Ransomware = sequestro de dados. Antivírus + backup são a defesa básica."
  ),
  qCE(
    13,
    "Backup",
    "Backup é cópia de segurança dos dados; guarda em outro lugar (disco externo, nuvem) para recuperar se o original se perder.",
    0,
    "Backup na mesma pasta do arquivo original quase não protege. A regra é cópia em outro suporte."
  ),
  qCE(
    14,
    "Senha",
    "Uma boa senha de prova mistura tamanho, variedade de caracteres e não reaproveita a mesma senha em todo serviço.",
    0,
    "Não use 123456. Autenticação em dois fatores (2FA) reforça. LGPD no essencial: menos dado, mais cuidado."
  ),
  qCE(
    15,
    "Office",
    "No Word, Ctrl+S salva; no Excel, a interseção de coluna e linha é a célula (ex.: B2).",
    0,
    "SEDF puxa Office. Célula, planilha, arquivo .xlsx. Não precisa ser expert: os atalhos e conceitos caem."
  ),
  qCE(
    16,
    "Extensão",
    "Arquivo .exe é, em regra, programa executável; abrir anexo .exe de e-mail desconhecido é risco alto de malware.",
    0,
    "Extensões perigosas: .exe, .bat, .scr, .js. A banca ama o anexo suspeito."
  ),
  qCE(
    17,
    "Cloud",
    "Computação em nuvem (cloud) é usar armazenamento ou programas pela internet, sem depender só do disco local.",
    0,
    "Drive, OneDrive, Classroom. SEDF (escola/DF) puxa nuvem no recorte Quadrix."
  ),
  qCE(
    18,
    "IP e DNS",
    "O DNS traduz nome de site (www.exemplo.gov.br) para endereço IP que o computador usa na rede.",
    0,
    "TCE-GO TI pesa redes: IP, DNS, HTTP. SEDF cobra a ideia, sem aprofundar OSI."
  ),
  qCE(
    19,
    "Intranet",
    "Intranet é rede interna de uma organização, de acesso restrito; internet é a rede pública mundial.",
    0,
    "Intranet ≠ internet. Extranet abre um pedaço para parceiros. Cai em Quadrix."
  ),
  qCE(
    20,
    "Painel de controle",
    "No Windows, configurações de conta, rede e desinstalar programas podem ser feitas pelo Painel de Controle ou pelas Configurações.",
    0,
    "Painel de Controle ainda cai, mesmo com o app Configurações. Saber onde desinstalar e ver rede resolve muita questão."
  ),
];
