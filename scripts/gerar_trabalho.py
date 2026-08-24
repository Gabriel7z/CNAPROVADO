#!/usr/bin/env python3
"""Gera o trabalho de pesquisa 'A Questão da Caxemira' no padrão ABNT."""

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING, WD_TAB_ALIGNMENT, WD_TAB_LEADER
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

FONT = "Times New Roman"
ALUNO = "Gabriel Ferreira"
PROFESSOR = "Fábio Gomes"
CIDADE = "Brasília"
ANO = "2026"
TITULO = "A QUESTÃO DA CAXEMIRA"
SUBTITULO = "Origens históricas, desdobramentos geopolíticos e atualidade de um conflito internacional"


def set_run_font(run, size=12, bold=False, italic=False, all_caps=False):
    run.font.name = FONT
    run._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = RGBColor(0, 0, 0)
    if all_caps:
        run.font.all_caps = True


def set_paragraph_format(p, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=0,
                         line=1.5, first_line=None, left=0, right=0):
    pf = p.paragraph_format
    pf.alignment = align
    pf.space_before = Pt(space_before)
    pf.space_after = Pt(space_after)
    pf.line_spacing = line
    pf.line_spacing_rule = WD_LINE_SPACING.ONE_POINT_FIVE if line == 1.5 else WD_LINE_SPACING.SINGLE
    if line == 1.0:
        pf.line_spacing_rule = WD_LINE_SPACING.SINGLE
        pf.line_spacing = 1.0
    pf.left_indent = Cm(left)
    pf.right_indent = Cm(right)
    if first_line is None:
        pf.first_line_indent = Cm(0)
    else:
        pf.first_line_indent = Cm(first_line)


def add_text(doc, text, *, size=12, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY,
             space_before=0, space_after=0, line=1.5, first_line=1.25, left=0, right=0):
    p = doc.add_paragraph()
    set_paragraph_format(p, align, space_before, space_after, line, first_line, left, right)
    run = p.add_run(text)
    set_run_font(run, size=size, bold=bold, italic=italic)
    return p


def add_mixed(doc, parts, *, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=0,
              line=1.5, first_line=1.25, left=0, size=12):
    """parts: list of (text, bold, italic) or str."""
    p = doc.add_paragraph()
    set_paragraph_format(p, align, space_before, space_after, line, first_line, left)
    for part in parts:
        if isinstance(part, str):
            text, bold, italic = part, False, False
        else:
            text, bold, italic = part[0], part[1] if len(part) > 1 else False, part[2] if len(part) > 2 else False
        run = p.add_run(text)
        set_run_font(run, size=size, bold=bold, italic=italic)
    return p


def add_empty(doc, n=1):
    for _ in range(n):
        p = doc.add_paragraph()
        set_paragraph_format(p, line=1.5, first_line=0, space_before=0, space_after=0)
        run = p.add_run(" ")
        set_run_font(run)


def add_chapter_title(doc, text):
    p = doc.add_paragraph()
    set_paragraph_format(p, WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=18, line=1.5, first_line=0)
    run = p.add_run(text.upper())
    set_run_font(run, size=12, bold=True)


def add_section_title(doc, text):
    p = doc.add_paragraph()
    set_paragraph_format(p, WD_ALIGN_PARAGRAPH.LEFT, space_before=18, space_after=12, line=1.5, first_line=0)
    run = p.add_run(text)
    set_run_font(run, size=12, bold=True)


def add_quote(doc, text, source):
    p = doc.add_paragraph()
    set_paragraph_format(p, WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=12, space_after=6,
                         line=1.0, first_line=0, left=4)
    run = p.add_run(text)
    set_run_font(run, size=10)
    p2 = doc.add_paragraph()
    set_paragraph_format(p2, WD_ALIGN_PARAGRAPH.RIGHT, space_before=0, space_after=12,
                         line=1.0, first_line=0, left=4)
    run2 = p2.add_run(source)
    set_run_font(run2, size=10)


def shade_cell(cell, color_hex):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), color_hex)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_border(cell):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), "4")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), "000000")
        tcBorders.append(el)
    tcPr.append(tcBorders)


def add_table(doc, headers, rows, caption):
    cap = doc.add_paragraph()
    set_paragraph_format(cap, WD_ALIGN_PARAGRAPH.CENTER, space_before=12, space_after=6, line=1.0, first_line=0)
    run = cap.add_run(caption)
    set_run_font(run, size=10, bold=True)

    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True

    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ""
        p = cell.paragraphs[0]
        set_paragraph_format(p, WD_ALIGN_PARAGRAPH.CENTER, line=1.0, first_line=0, space_before=2, space_after=2)
        run = p.add_run(h)
        set_run_font(run, size=10, bold=True)
        shade_cell(cell, "D9D9D9")
        set_cell_border(cell)

    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.rows[r_idx + 1].cells[c_idx]
            cell.text = ""
            p = cell.paragraphs[0]
            align = WD_ALIGN_PARAGRAPH.LEFT if c_idx == 0 else WD_ALIGN_PARAGRAPH.CENTER
            set_paragraph_format(p, align, line=1.0, first_line=0, space_before=2, space_after=2)
            run = p.add_run(val)
            set_run_font(run, size=10)
            set_cell_border(cell)

    src = doc.add_paragraph()
    set_paragraph_format(src, WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=12, line=1.0, first_line=0)
    run = src.add_run("Fonte: elaboração do autor com base nas referências consultadas (2026).")
    set_run_font(run, size=10, italic=True)
    return table


def add_page_number(paragraph):
    run = paragraph.add_run()
    set_run_font(run, size=12)
    fld1 = OxmlElement("w:fldChar")
    fld1.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld2 = OxmlElement("w:fldChar")
    fld2.set(qn("w:fldCharType"), "end")
    run._r.append(fld1)
    run._r.append(instr)
    run._r.append(fld2)


def configure_section(section, numbered=False):
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(3.0)
    section.right_margin = Cm(2.0)
    section.top_margin = Cm(3.0)
    section.bottom_margin = Cm(2.0)
    section.header_distance = Cm(1.5)
    section.footer_distance = Cm(1.5)
    header = section.header
    header.is_linked_to_previous = False
    footer = section.footer
    footer.is_linked_to_previous = False
    for p in header.paragraphs:
        p.clear()
    for p in footer.paragraphs:
        p.clear()
    if numbered:
        hp = header.paragraphs[0]
        set_paragraph_format(hp, WD_ALIGN_PARAGRAPH.RIGHT, line=1.0, first_line=0)
        add_page_number(hp)
        sectPr = section._sectPr
        pgNumType = OxmlElement("w:pgNumType")
        pgNumType.set(qn("w:start"), "1")
        sectPr.append(pgNumType)


def add_page_break(doc):
    doc.add_page_break()


def build():
    doc = Document()
    style = doc.styles["Normal"]
    style.font.name = FONT
    style.font.size = Pt(12)
    style._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    style.paragraph_format.line_spacing = 1.5

    configure_section(doc.sections[0], numbered=False)

    # ===================== CAPA =====================
    add_text(doc, "TRABALHO DE PESQUISA", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER,
             first_line=0, space_after=0)
    add_text(doc, "Professor Fábio Gomes", size=12, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_empty(doc, 4)
    add_text(doc, ALUNO.upper(), size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_empty(doc, 6)
    add_text(doc, TITULO, size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_text(doc, SUBTITULO, size=12, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0, space_before=6)
    add_empty(doc, 8)
    add_text(doc, f"{CIDADE}", size=12, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_text(doc, ANO, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)

    # ===================== CONTRA-CAPA =====================
    add_page_break(doc)
    add_empty(doc, 3)
    add_text(doc, ALUNO.upper(), size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_empty(doc, 6)
    add_text(doc, TITULO, size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_text(doc, SUBTITULO, size=12, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0, space_before=6)
    add_empty(doc, 4)
    natureza = (
        "Trabalho de pesquisa apresentado como requisito parcial para avaliação, "
        "sob orientação do Professor Fábio Gomes. Valor: 3,0 pontos. "
        "Data de entrega: 28 de agosto de 2026. "
        "E-mail para envio: fabio.gomesdf78@gmail.com."
    )
    add_text(doc, natureza, size=12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, first_line=0, left=8, line=1.5)
    add_empty(doc, 6)
    add_text(doc, f"{CIDADE}", size=12, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)
    add_text(doc, ANO, size=12, align=WD_ALIGN_PARAGRAPH.CENTER, first_line=0)

    # ===================== SUMÁRIO =====================
    add_page_break(doc)
    add_chapter_title(doc, "SUMÁRIO")
    toc = [
        ("1  INTRODUÇÃO", "1"),
        ("2  DESENVOLVIMENTO", "3"),
        ("2.1  Localização geográfica, povo e importância estratégica", "3"),
        ("2.2  A partição de 1947 e a origem do conflito", "4"),
        ("2.3  As guerras indo-paquistanesas", "5"),
        ("2.4  A Linha de Controle, a ONU e o plebiscito não realizado", "7"),
        ("2.5  A China, Aksai Chin e a dimensão triangular da disputa", "8"),
        ("2.6  Insurgência, terrorismo e direitos humanos", "9"),
        ("2.7  A dimensão nuclear e o risco de escalada", "10"),
        ("2.8  A água do Indo e a geopolítica dos recursos", "11"),
        ("2.9  O Artigo 370 e as mudanças constitucionais de 2019", "12"),
        ("2.10  A crise de 2025 e o cenário contemporâneo", "13"),
        ("2.11  Perspectivas de paz e o papel da comunidade internacional", "14"),
        ("3  CONCLUSÃO", "16"),
        ("4  BIBLIOGRAFIA", "18"),
    ]
    for item, page in toc:
        p = doc.add_paragraph()
        set_paragraph_format(p, WD_ALIGN_PARAGRAPH.LEFT, line=1.5, first_line=0, space_before=0, space_after=0)
        tab_stops = p.paragraph_format.tab_stops
        tab_stops.add_tab_stop(Cm(16.0), WD_TAB_ALIGNMENT.RIGHT, WD_TAB_LEADER.DOTS)
        run = p.add_run(f"{item}\t{page}")
        set_run_font(run, size=12)

    # ===================== INTRODUÇÃO =====================
    add_page_break(doc)
    new_section = doc.add_section()
    configure_section(new_section, numbered=True)

    add_chapter_title(doc, "1  INTRODUÇÃO")

    add_text(doc, (
        "A questão da Caxemira é um dos conflitos territoriais mais duradouros do mundo contemporâneo. "
        "Localizada no extremo noroeste do subcontinente indiano, no encontro dos Himalaias com o Caracórum, "
        "a região é disputada pela Índia, pelo Paquistão e, em menor medida, pela China desde 1947, ano da "
        "partição da Índia britânica. Mais de sete décadas depois, o antigo Estado principesco de Jammu e "
        "Caxemira permanece dividido por linhas militares, cercado de tropas, marcado por insurgência e "
        "reivindicações nacionais incompatíveis. O presente trabalho analisa as origens históricas, os "
        "desdobramentos políticos e militares e a atualidade desse conflito, com ênfase na sua relevância "
        "para a paz internacional."
    ))
    add_text(doc, (
        "A importância do tema não se restringe à Ásia do Sul. A Caxemira situa-se na fronteira de duas "
        "potências nucleares rivais e de uma terceira potência, a China, que controla trechos estratégicos "
        "do planalto. Qualquer escalada local pode, em tese, converter-se em crise internacional. Além disso, "
        "a região é nascente de rios que irrigam dezenas de milhões de pessoas no Paquistão e no norte da Índia. "
        "Por isso, a disputa mistura território, identidade religiosa, nacionalismo, recursos hídricos e "
        "segurança militar. Compreender a Caxemira é compreender um dos nós mais perigosos da política mundial."
    ))
    add_text(doc, (
        "Do ponto de vista histórico, o conflito nasceu da descolonização. Em agosto de 1947, o Império "
        "Britânico dividiu o subcontinente em dois Estados: a União Indiana, de maioria hindu, e o Paquistão, "
        "de maioria muçulmana. Os mais de quinhentos Estados principescos deveriam aderir a um dos dois. "
        "Jammu e Caxemira era o maior deles, tinha população predominantemente muçulmana e era governado por "
        "um marajá hindu, Hari Singh. A indecisão do governante, seguida de uma invasão tribal apoiada pelo "
        "Paquistão e da adesão formal à Índia, desencadeou a primeira guerra indo-paquistanesa. Desde então, "
        "a região nunca voltou a ter um estatuto pacífico e consensual."
    ))
    add_text(doc, (
        "O objetivo geral deste trabalho é explicar, de forma clara e fundamentada, o que é a questão da "
        "Caxemira, por que ela surgiu e por que permanece sem solução. Os objetivos específicos são: "
        "(a) situar a região no espaço geográfico e estratégico; (b) reconstruir a origem do conflito na "
        "partição de 1947; (c) analisar as guerras de 1947-1948, 1965, 1971 e 1999; (d) examinar o papel da "
        "Organização das Nações Unidas (ONU) e o plebiscito nunca realizado; (e) discutir a participação da "
        "China; (f) tratar da insurgência, do terrorismo e das denúncias de violação de direitos humanos; "
        "(g) avaliar a dimensão nuclear e a disputa pela água; (h) estudar a revogação do Artigo 370 em 2019; "
        "e (i) apresentar o cenário contemporâneo, inclusive a crise militar de 2025, bem como os caminhos "
        "possíveis para a paz."
    ))
    add_text(doc, (
        "A justificativa do estudo reside tanto no valor acadêmico quanto no valor cívico do tema. Em um "
        "mundo em que conflitos antigos voltam a ocupar as manchetes, conhecer a Caxemira ajuda a evitar "
        "simplificações. Não se trata apenas de uma briga religiosa entre hindus e muçulmanos, nem apenas "
        "de um problema interno da Índia, como Nova Déli costuma afirmar, nem apenas de uma causa de "
        "autodeterminação inacabada, como Islamabade insiste. É um conflito híbrido, com camadas coloniais, "
        "nacionais, militares e humanitárias. Estudá-lo exige equilíbrio: apresentar as teses da Índia, do "
        "Paquistão, da China e, sobretudo, da população caxemire, que vive as consequências da disputa."
    ))
    add_text(doc, (
        "A metodologia adotada é a pesquisa bibliográfica e documental, de caráter qualitativo. Foram "
        "consultados livros clássicos sobre o tema, como os de Victoria Schofield e Sumantra Bose, resoluções "
        "do Conselho de Segurança da ONU, o Acordo de Simla de 1972, reportagens e análises de instituições "
        "de pesquisa, além de cobertura jornalística recente sobre os acontecimentos de 2019, 2025 e 2026. "
        "O trabalho não pretende esgotar o assunto, tampouco tomar partido de um dos Estados envolvidos. "
        "Pretende organizar o conhecimento disponível em linguagem acessível, adequada a um trabalho escolar "
        "de pesquisa, sem abrir mão do rigor factual."
    ))
    add_text(doc, (
        "O texto está dividido em introdução, desenvolvimento e conclusão. O desenvolvimento organiza-se em "
        "onze seções, que acompanham a lógica do problema: do território à história, das guerras à diplomacia, "
        "da vida da população às crises mais recentes. Ao final, a bibliografia reúne as fontes segundo as "
        "normas da Associação Brasileira de Normas Técnicas (ABNT). Espera-se que o leitor, ao concluir a "
        "leitura, compreenda por que a Caxemira continua sendo chamada, com razão, de uma das questões "
        "internacionais mais sensíveis do século XXI."
    ))

    # ===================== DESENVOLVIMENTO =====================
    add_page_break(doc)
    add_chapter_title(doc, "2  DESENVOLVIMENTO")

    add_section_title(doc, "2.1  Localização geográfica, povo e importância estratégica")
    add_text(doc, (
        "A Caxemira histórica corresponde, grosso modo, ao antigo Estado principesco de Jammu e Caxemira, "
        "situado entre o Paquistão a oeste, a Índia ao sul, a China a leste e o Afeganistão em um estreito "
        "corredor ao norte, o corredor de Wakhan. O relevo é marcado por montanhas elevadas, vales férteis "
        "e planaltos frios. O Vale da Caxemira, cuja capital tradicional é Srinagar, é a área mais povoada "
        "e simbolicamente mais disputada. Ao sul fica Jammu, de maioria hindu. A leste, Ladakh é uma região "
        "de altitude extrema, com forte presença budista e, hoje, status de território da União indiana. "
        "Ao norte e a oeste, sob administração paquistanesa, estão a chamada Caxemira Livre (Azad Kashmir) "
        "e Gilgit-Baltistão."
    ))
    add_text(doc, (
        "Estimativas contemporâneas indicam que a região disputada abriga cerca de treze milhões de pessoas: "
        "aproximadamente sete milhões no lado administrado pela Índia e cerca de seis milhões no lado "
        "administrado pelo Paquistão. A composição religiosa e cultural não é homogênea. O Vale da Caxemira "
        "é majoritariamente muçulmano; Jammu concentra população hindu; Ladakh reúne budistas e muçulmanos; "
        "Gilgit-Baltistão é muçulmano, com diversidade interna xiita e sunita. Essa heterogeneidade importa, "
        "porque qualquer solução que trate a Caxemira como um bloco único ignora as diferenças internas e "
        "pode gerar novos conflitos (SCHOFIELD, 2003)."
    ))
    add_text(doc, (
        "Do ponto de vista estratégico, a região funciona como um balcão geopolítico. Controlar a Caxemira "
        "significa controlar passagens montanhosas, rotas para a Ásia Central e as nascentes do sistema "
        "hídrico do Indo. Para a Índia, perder o Vale seria um golpe político e militar, além de contradizer "
        "o discurso de país secular que abriga uma grande minoria muçulmana. Para o Paquistão, a Caxemira é "
        "apresentada como a peça incompleta da partição: um território de maioria muçulmana que, segundo a "
        "teoria das duas nações, deveria ter integrado o novo Estado islâmico. Para a China, Aksai Chin é "
        "uma faixa útil à ligação entre Xinjiang e o Tibete. Nenhum dos três atores trata o tema como "
        "questão menor."
    ))
    add_text(doc, (
        "A divisão atual do território é de fato, não de direito internacional consolidado. De modo "
        "aproximado, a Índia administra cerca de 55% da área, incluindo o Vale, grande parte de Jammu e "
        "Ladakh, além do glaciar de Siachen. O Paquistão administra cerca de 30%, sobretudo Azad Kashmir "
        "e Gilgit-Baltistão. A China controla cerca de 15%, principalmente Aksai Chin e o trecho do "
        "Trans-Caracórum (vale de Shaksgam), cedido pelo Paquistão em 1963 em acordo que a Índia não "
        "reconhece. Cada governo publica mapas que incluem a totalidade da região como sua, o que gera "
        "controvérsias até em produtos comerciais e livros didáticos."
    ))

    add_table(
        doc,
        ["Área / administração", "Controle aproximado", "Principais regiões"],
        [
            ["Índia", "cerca de 55%", "Vale da Caxemira, Jammu, Ladakh, Siachen"],
            ["Paquistão", "cerca de 30%", "Azad Kashmir, Gilgit-Baltistão"],
            ["China", "cerca de 15%", "Aksai Chin e vale de Shaksgam"],
        ],
        "Quadro 1 – Divisão aproximada da Caxemira segundo o controle de fato",
    )

    add_text(doc, (
        "A Linha de Controle (Line of Control, LoC) separa as zonas indiana e paquistanesa. Não é uma "
        "fronteira internacional reconhecida, mas uma linha militar nascida do cessar-fogo de 1949 e "
        "rebatizada no Acordo de Simla, em 1972. Mais a leste, a Linha de Controle Real (Line of Actual "
        "Control, LAC) separa a Índia da China em Aksai Chin e Ladakh. As duas linhas são zonas de tensão "
        "permanente, com postos, cercas, minas e, em vários trechos, populações civis vivendo a poucos "
        "quilômetros da artilharia. Essa geografia fragmentada é o palco sobre o qual se desenrola toda "
        "a história política analisada a seguir."
    ))

    add_section_title(doc, "2.2  A partição de 1947 e a origem do conflito")
    add_text(doc, (
        "A origem imediata da questão da Caxemira está na partição da Índia britânica. O plano de "
        "independência, conduzido pelo último vice-rei, Lord Mountbatten, criou dois domínios em 15 de "
        "agosto de 1947. A lógica da divisão combinava demografia religiosa e barganha política. Províncias "
        "de maioria muçulmana no noroeste e no nordeste formaram o Paquistão (então dividido em Paquistão "
        "Ocidental e Paquistão Oriental, atual Bangladesh). O restante constituiu a Índia. Os Estados "
        "principescos, formalmente autônomos sob suserania britânica, deveriam escolher a adesão. Na "
        "prática, a geografia e a composição da população pesavam tanto quanto a vontade do príncipe "
        "(BOSE, 2003)."
    ))
    add_text(doc, (
        "Hari Singh tentou permanecer independente. Assinou com o Paquistão um acordo de standstill, "
        "destinado a manter serviços e o status quo enquanto decidia. A Índia não firmou instrumento "
        "equivalente. A situação interna era instável: havia protestos muçulmanos contra o domínio dogra, "
        "tensões em Poonch e o temor de que o marajá entregasse o Estado à Índia. Em outubro de 1947, "
        "milícias tribais pashtuns, com apoio logístico paquistanês, invadiram o oeste da Caxemira e "
        "avançaram em direção a Srinagar. As forças do Estado não conseguiram conter o ataque. Diante do "
        "risco de queda da capital, Hari Singh pediu ajuda militar à Índia."
    ))
    add_text(doc, (
        "Nova Déli condicionou o envio de tropas à adesão formal. Em 26 de outubro de 1947, o marajá "
        "assinou o Instrumento de Adesão (Instrument of Accession), aceito pelo governador-geral Mountbatten "
        "no dia seguinte. Tropas indianas foram transportadas por via aérea a Srinagar e impediram a queda "
        "da cidade. Começava a primeira guerra da Caxemira. Para a Índia, o documento é o fundamento jurídico "
        "da soberania: o governante legal transferiu defesa, relações exteriores e comunicações à União "
        "Indiana. Para o Paquistão, o ato é ilegítimo. Islamabade alega que o marajá era impopular, que "
        "assinou sob coação, que tropas indianas já estavam em movimento e que a população muçulmana não "
        "foi consultada."
    ))
    add_quote(
        doc,
        "A Caxemira não é apenas um território; é um símbolo. Para a Índia, prova de que um Estado secular "
        "pode incluir uma maioria muçulmana. Para o Paquistão, prova de que a partição ficou incompleta. "
        "Para muitos caxemires, prova de que sua voz foi substituída pela de outros.",
        "Adaptação didática com base em Bose (2003) e Schofield (2003).",
    )
    add_text(doc, (
        "A analogia com outros Estados principescos alimenta a controvérsia. A Índia recusou a adesão de "
        "Junagadh ao Paquistão e interveio em Hiderabade, ambos com governantes muçulmanos e população "
        "majoritariamente hindu. O Paquistão usa esses casos para acusar Nova Déli de aplicar dois pesos "
        "e duas medidas: quando a maioria era hindu, a Índia priorizou a demografia; quando a maioria era "
        "muçulmana, priorizou a assinatura do príncipe. A Índia responde que a Caxemira aderiu legalmente, "
        "que a Assembleia Constituinte local ratificou a união e que a teoria das duas nações não pode "
        "ditar o destino de um país constitucionalmente secular."
    ))
    add_text(doc, (
        "Desde o primeiro inverno da independência, portanto, estavam lançados os eixos do conflito: "
        "um título jurídico (o Instrumento de Adesão), uma reivindicação identitária (maioria muçulmana), "
        "uma ocupação militar de fato e uma população que, em grande medida, não foi chamada a decidir. "
        "A guerra de 1947-1948 congelou essa contradição em uma linha de cessar-fogo. O que deveria ter "
        "sido provisório tornou-se, com o tempo, a estrutura permanente da questão da Caxemira."
    ))

    add_section_title(doc, "2.3  As guerras indo-paquistanesas")
    add_text(doc, (
        "A primeira guerra (1947-1948) durou pouco mais de um ano. Combates ocorreram no Vale, em Jammu, "
        "em Poonch e nas regiões setentrionais. Em 1º de janeiro de 1948, a Índia levou o caso ao Conselho "
        "de Segurança da ONU, acusando o Paquistão de agressão. A Resolução 47, de 21 de abril de 1948, "
        "previa cessar-fogo, retirada de irregulares paquistaneses, redução da presença militar indiana e "
        "um plebiscito sob supervisão internacional para que o povo decidisse a adesão final. O cessar-fogo "
        "entrou em vigor em 1º de janeiro de 1949. Naquele momento, a Índia controlava o Vale, Jammu e "
        "Ladakh; o Paquistão, o oeste e o norte. O plebiscito nunca ocorreu."
    ))
    add_text(doc, (
        "A segunda guerra estourou em 1965. O Paquistão lançou a Operação Gibraltar, infiltrando combatentes "
        "na Caxemira indiana na expectativa de provocar uma revolta popular. A revolta não se materializou "
        "como previsto, e o conflito se generalizou, inclusive no Punjab. Após milhares de mortos, um "
        "cessar-fogo mediado pela ONU foi seguido da Declaração de Tashkent, em janeiro de 1966, com "
        "mediação soviética. As tropas voltaram às posições anteriores. O episódio mostrou dois traços que "
        "se repetiriam: a tentação paquistanesa de internacionalizar ou militarizar a causa caxemire e a "
        "capacidade indiana de responder em larga escala sem, contudo, resolver o problema político."
    ))
    add_text(doc, (
        "A guerra de 1971 não nasceu na Caxemira, mas a redesenhou. O centro do conflito foi o Paquistão "
        "Oriental, onde a repressão ao movimento bengali e a intervenção indiana resultaram na independência "
        "de Bangladesh. A derrota paquistanesa foi militar e política. No ano seguinte, Indira Gandhi e "
        "Zulfikar Ali Bhutto assinaram o Acordo de Simla. O texto transformou a antiga linha de cessar-fogo "
        "em Linha de Controle e estabeleceu que as diferenças seriam resolvidas por meios pacíficos e "
        "bilaterais. Desde então, a Índia recusa mediação de terceiros, argumentando que Simla internacionalizou "
        "o problema para dentro da mesa bilateral. O Paquistão, embora signatário, continua a levar a Caxemira "
        "a fóruns da ONU e da Organização para a Cooperação Islâmica."
    ))
    add_text(doc, (
        "Em 1999, ocorreu a guerra de Kargil, já no contexto nuclear. Durante o inverno, postos indianos "
        "em altitudes extremas são parcialmente abandonados. Combatentes e soldados paquistaneses ocuparam "
        "picos que dominam a estrada Srinagar-Leh, via vital para Ladakh. A Índia reagiu com infantaria, "
        "artilharia e aviação. Os Estados Unidos, sob o presidente Bill Clinton, pressionaram Islamabade a "
        "recuar. O Paquistão retirou-se. Kargil teve um efeito duradouro: mostrou que mesmo após os testes "
        "nucleares de 1998 uma guerra convencional limitada ainda era possível, e que o risco de cálculo "
        "errado em montanha podia arrastar duas potências atômicas a um abismo (GANGULY, 2001)."
    ))

    add_table(
        doc,
        ["Conflito", "Ano", "Desfecho principal"],
        [
            ["1ª Guerra da Caxemira", "1947-1948", "Cessar-fogo da ONU; divisão de fato do território"],
            ["Guerra sino-indiana", "1962", "China consolida o controle de Aksai Chin"],
            ["2ª Guerra Indo-Paquistanesa", "1965", "Empate militar; Declaração de Tashkent (1966)"],
            ["3ª Guerra / Bangladesh", "1971", "Derrota do Paquistão; Acordo de Simla (1972)"],
            ["Guerra de Kargil", "1999", "Retirada paquistanesa sob pressão internacional"],
            ["Crise pós-Pahalgam", "2025", "Operação Sindoor e cessar-fogo em 10 de maio"],
        ],
        "Quadro 2 – Principais confrontos associados à questão da Caxemira",
    )

    add_text(doc, (
        "Além das guerras declaradas, houve crises que quase chegaram ao mesmo ponto: o ataque ao Parlamento "
        "indiano em 2001, os atentados de Mumbai em 2008, o atentado de Pulwama e os ataques aéreos de "
        "Balakot em 2019, e a crise de 2025, tratada adiante. O padrão é reconhecível. Um incidente violento "
        "na Caxemira ou contra alvos indianos provoca mobilização militar, troca de acusações sobre terrorismo "
        "e, em alguns casos, mediação informal de grandes potências. A paz que se segue é um armistício, "
        "não um acordo de fundo. As guerras, portanto, não resolveram a questão: apenas redistribuíram o "
        "congelamento."
    ))

    add_section_title(doc, "2.4  A Linha de Controle, a ONU e o plebiscito não realizado")
    add_text(doc, (
        "A ONU ocupou o centro da disputa nos primeiros anos e foi sendo empurrada para a margem depois "
        "de 1972. A Comissão das Nações Unidas para a Índia e o Paquistão (UNCIP) e, em seguida, o Grupo "
        "de Observadores Militares das Nações Unidas para a Índia e o Paquistão (UNMOGIP) foram criados "
        "para supervisionar o cessar-fogo. O UNMOGIP existe até hoje. Após Simla, a Índia passou a considerar "
        "que o mandato dos observadores caducara, porque a linha de 1949 fora substituída pela Linha de "
        "Controle. O Paquistão discorda. O secretário-geral da ONU sustenta que só o Conselho de Segurança "
        "pode encerrar a missão. Na prática, os observadores têm acesso desigual: Islamabade registra "
        "queixas; Nova Déli, desde 1972, quase não o faz e limita as atividades no próprio lado "
        "(UNITED NATIONS, 2024)."
    ))
    add_text(doc, (
        "O plebiscito previsto na Resolução 47 tornou-se o grande símbolo da promessa não cumprida. O "
        "Paquistão afirma que a Índia jamais permitiu a consulta popular. A Índia replica que o plebiscito "
        "exigia, primeiro, a retirada das forças paquistanesas, o que não ocorreu, e que, depois, a "
        "Assembleia Constituinte de Jammu e Caxemira confirmou a adesão à União Indiana. Há ainda um "
        "argumento jurídico adicional: as resoluções da Caxemira foram adotadas no âmbito do Capítulo VI "
        "da Carta da ONU, relativo à solução pacífica de controvérsias, e não do Capítulo VII, que autoriza "
        "medidas coercitivas. São recomendações políticas de grande peso moral, não ordens autoexecutáveis."
    ))
    add_text(doc, (
        "Com o Acordo de Simla, a Índia consolidou a tese de que a Caxemira é assunto bilateral, sem espaço "
        "para mediação estrangeira. Essa posição choca-se com a diplomacia paquistanesa, que busca "
        "internacionalizar o tema sempre que possível. Em 2025-2026, o Paquistão ocupou assento eletivo no "
        "Conselho de Segurança e voltou a mencionar Jammu e Caxemira em reuniões, inclusive em encontro "
        "informal no formato Arria organizado com a China. A Índia respondeu que o território da União é "
        "matéria estritamente interna e permanecerá assim (THE HINDU, 2026). O impasse institucional, "
        "portanto, replica o impasse territorial: cada lado usa o direito internacional que melhor serve "
        "à sua narrativa."
    ))
    add_text(doc, (
        "Para a população que vive junto à Linha de Controle, o debate jurídico tem efeitos concretos. "
        "Há deslocamentos, toques de recolher, interrupção de comércio transfronteiriço, famílias separadas "
        "e períodos de bombardeio. O cessar-fogo de 2021 reduziu violações da LoC por alguns anos, até a "
        "nova escalada de 2025. A linha que deveria ser provisória tornou-se uma cicatriz de quase oitenta "
        "anos. Enquanto não houver acordo político, a ONU continuará presente de forma residual, mais como "
        "testemunha do impasse do que como juíza capaz de encerrá-lo."
    ))

    add_section_title(doc, "2.5  A China, Aksai Chin e a dimensão triangular da disputa")
    add_text(doc, (
        "É comum descrever a Caxemira como conflito bilateral. Isso é incompleto. A China é o terceiro "
        "ator territorial. Na guerra sino-indiana de 1962, Pequim derrotou as forças indianas e consolidou "
        "o controle de Aksai Chin, um planalto quase desabitado, mas crucial para a estrada que liga "
        "Xinjiang ao Tibete. A Índia continua a reivindicar a área como parte de Ladakh. Em 1963, o "
        "Paquistão cedeu à China o vale de Shaksgam (Trans-Caracórum), em um acordo de fronteira que Nova "
        "Déli considera nulo, porque versa sobre território que a Índia reputa seu. Desde então, a disputa "
        "é triangular (EASEN, 2002)."
    ))
    add_text(doc, (
        "A aproximação sino-paquistanesa tem consequências estratégicas. O corredor econômico China-Paquistão "
        "(CPEC), peça da Iniciativa Cinturão e Rota, atravessa Gilgit-Baltistão e chega ao porto de Gwadar. "
        "A Índia objeta que o corredor passa por terra disputada. Para Pequim e Islamabade, o projeto é de "
        "desenvolvimento e conectividade. Na prática, amarra interesses chineses à manutenção do controle "
        "paquistanês no norte. Ao mesmo tempo, a rivalidade sino-indiana em Ladakh agravou-se. O choque de "
        "Galwan, em 2020, deixou mortos dos dois lados e mostrou que a Linha de Controle Real também pode "
        "esquentar, mesmo sem armas de fogo no primeiro momento."
    ))
    add_text(doc, (
        "A posição chinesa na Caxemira não é idêntica à paquistanesa. Pequim não reivindica o Vale nem Jammu. "
        "Concentra-se em suas próprias linhas de fronteira e em evitar que a Índia consolide vantagens em "
        "Ladakh. Politicamente, costuma apoiar Islamabade em foros internacionais quando o tema é a revogação "
        "do Artigo 370 ou a situação de direitos humanos, o que irrita Nova Déli. A Índia, por sua vez, vê "
        "na parceria China-Paquistão um cerco. O resultado é uma geometria instável: dois aliados de um lado, "
        "uma potência em rápido crescimento militar do outro, e uma população local sem assento permanente "
        "nessa mesa de três."
    ))
    add_text(doc, (
        "Ignorar a China torna qualquer proposta de paz irrealista. Uma solução que satisfaça apenas Índia "
        "e Paquistão, se algum dia existir, ainda precisará lidar com Aksai Chin e com o estatuto de trechos "
        "cedidos em 1963. Por isso, analistas descrevem a Caxemira como um conflito de “duas linhas e três "
        "bandeiras”: LoC, LAC, e as cores da Índia, do Paquistão e da China sobrepostas a um mesmo mapa."
    ))

    add_section_title(doc, "2.6  Insurgência, terrorismo e direitos humanos")
    add_text(doc, (
        "A partir de 1989, a disputa deixou de ser só uma questão de fronteira entre Estados e passou a ser "
        "também uma guerra interna no Vale. A insurgência teve causas múltiplas: fraude e descontentamento "
        "nas eleições de 1987, desemprego, sentimento de erosão da autonomia, circulação de armas e de "
        "combatentes após a guerra do Afeganistão, e apoio, denunciado pela Índia, de agências paquistanesas "
        "a grupos armados. Organizações como a Frente de Libertação de Jammu e Caxemira defenderam "
        "independência; outras, como Hizbul Mujahideen, Lashkar-e-Taiba e Jaish-e-Mohammed, defenderam a "
        "adesão ao Paquistão ou o jihad contra o Estado indiano (GANGULY, 1997)."
    ))
    add_text(doc, (
        "A Índia classifica a violência como terrorismo transfronteiriço. Aponta atentados contra civis, "
        "forças de segurança e, em alguns períodos, contra a minoria hindu dos pandits, muitos dos quais "
        "fugiram do Vale no início dos anos 1990. O Paquistão responde que se trata de um movimento de "
        "liberdade e que oferece apenas apoio moral e diplomático. Evidências reunidas por serviços de "
        "inteligência ocidentais, ao longo de décadas, indicam que pelo menos alguns grupos receberam "
        "treino e financiamento em solo paquistanês. Essa “guerra por procuração” permite pressionar a Índia "
        "sem uma declaração formal de guerra, mas alimenta ciclos de atentado e represália."
    ))
    add_text(doc, (
        "Do outro lado, organizações de direitos humanos documentam abusos cometidos por forças indianas: "
        "prisões arbitrárias, tortura, desaparecimentos, execuções extrajudiciais e restrições à liberdade "
        "de imprensa e de reunião. A Lei das Forças Armadas (Poderes Especiais), aplicada por longos períodos "
        "na região, concedeu ampla impunidade operacional. Relatos de violência sexual contra mulheres "
        "caxemires, inclusive em estudos de Médicos Sem Fronteiras, tornaram o tema incontornável. Nenhuma "
        "análise honesta pode falar só de terrorismo sem falar de repressão, nem só de repressão sem falar "
        "de atentados contra civis. As duas violências se alimentam e recaem sobre a mesma sociedade."
    ))
    add_text(doc, (
        "A vida cotidiana no Vale, por décadas, foi marcada por toques de recolher, bloqueios de internet, "
        "revistas militares e interrupção de aulas. Ao mesmo tempo, houve eleições, turismo, universidades "
        "e uma classe média urbana que deseja normalidade. Essa duplicidade explica por que números de "
        "participação eleitoral e números de mortes violentas podem coexistir. Após 2019, dados oficiais "
        "indianos apontam queda de fatalidades ligadas ao terrorismo no Vale, mas analistas observam o "
        "deslocamento de ataques para distritos de Jammu e a persistência de milícias capazes de atingir "
        "civis, como se viu em Reasi (2024) e Pahalgam (2025) (THE WIRE, 2026)."
    ))
    add_text(doc, (
        "É preciso lembrar, ainda, que há caxemires no lado paquistanês com queixas próprias: autonomia "
        "limitada, desenvolvimento desigual e pouca voz sobre Gilgit-Baltistão. A retórica da "
        "autodeterminação, quando usada por Islamabade, nem sempre se aplica com o mesmo vigor às áreas "
        "que o Paquistão administra. Uma visão crítica da questão da Caxemira deve, portanto, recusar a "
        "propaganda dos dois Estados e colocar no centro o direito da população à segurança, à dignidade "
        "e à participação política."
    ))

    add_section_title(doc, "2.7  A dimensão nuclear e o risco de escalada")
    add_text(doc, (
        "Em 1998, Índia e Paquistão realizaram testes nucleares e passaram a ser reconhecidos, de fato, "
        "como potências atômicas. A Caxemira, que já era perigosa, tornou-se o único conflito territorial "
        "ativo em que dois vizinhos nucleares se encaram à queima-roupa. O presidente Bill Clinton chegou "
        "a descrever a Linha de Controle como um dos lugares mais perigosos do mundo. A doutrina indiana "
        "oficial é a de não usar armas nucleares em primeiro lugar. A doutrina paquistanesa é mais opaca "
        "e inclui a possibilidade de uso tático caso uma derrota convencional ameace a sobrevivência do "
        "Estado. Esse descompasso aumenta o risco de mal-entendido em uma crise."
    ))
    add_text(doc, (
        "A teoria da “estabilidade-instabilidade” ajuda a entender o paradoxo. A posse de armas nucleares "
        "desestimula uma guerra total, porque o custo seria inaceitável. Ao mesmo tempo, pode encorajar "
        "conflitos limitados, atentados e infiltrações, na aposta de que o outro lado não escalará até o "
        "extremo. Kargil, Pulwama-Balakot e a crise de 2025 encaixam-se nesse padrão: violência intensa, "
        "porém contida abaixo do limiar nuclear, com sinais, ameaças e mediação de terceiros. O problema é "
        "que limiares existem no papel, não necessariamente na fumaça de um campo de batalha. Um míssil "
        "mal interpretado, a queda de uma aeronave ou a morte de muitos civis podem acelerar decisões."
    ))
    add_text(doc, (
        "Há, ainda, o risco de atores não estatais. Grupos armados não controlam ogivas, mas podem provocar "
        "o incidente que põe os Estados em rota de colisão. Quando um atentado ocorre na Caxemira, o governo "
        "indiano sofre pressão interna para retaliar. O governo paquistanês sofre pressão para não aparecer "
        "fraco. A lógica da audiência doméstica empurra para a escalada; a lógica da sobrevivência nuclear "
        "empurra para o recuo. Essa corda bamba é uma constante da diplomacia sul-asiática e explica por que "
        "a comunidade internacional, mesmo quando a Caxemira sai das manchetes, continua a monitorá-la."
    ))

    add_section_title(doc, "2.8  A água do Indo e a geopolítica dos recursos")
    add_text(doc, (
        "Sob as bandeiras e os canhões corre outra disputa: a água. O rio Indo e seus afluentes — Jhelum, "
        "Chenab, Ravi, Beas e Sutlej — nascem ou atravessam o espaço himalaio ligado à Caxemira e ao norte "
        "indiano. O Paquistão depende desses rios para irrigação e energia. A Índia, situado a montante em "
        "vários trechos, tem capacidade técnica de construir barragens e desviar fluxos. O medo paquistanês "
        "de um “stranglehold” hídrico é antigo. Em 1960, com mediação do Banco Mundial, os dois países "
        "assinaram o Tratado das Águas do Indo, que reservou os três rios do oeste (Indo, Jhelum, Chenab) "
        "principalmente ao Paquistão e os três do leste (Ravi, Beas, Sutlej) principalmente à Índia, "
        "permitindo usos limitados a montante."
    ))
    add_text(doc, (
        "O tratado sobreviveu a guerras, o que o tornou um raro exemplo de cooperação. Controvérsias sobre "
        "barragens indianas, no entanto, foram frequentes. Em 2025, após o atentado de Pahalgam, a Índia "
        "anunciou a suspensão do Tratado das Águas do Indo até que o Paquistão cessasse o apoio ao "
        "terrorismo transfronteiriço. Islamabade tratou a medida como gravíssima, porque toca na segurança "
        "alimentar de um país já sob estresse climático. A água, que por décadas foi um canal técnico de "
        "entendimento, voltou a ser arma política. Em um cenário de degelo himalaio e população crescente, "
        "a dimensão ambiental da Caxemira tende a ganhar peso, não a perder."
    ))
    add_text(doc, (
        "Essa camada hídrica reforça a tese de que o conflito não é só identitário. Mesmo que as paixões "
        "nacionais se acalmassem, restaria a gestão de rios transfronteiriços em região de mudança climática. "
        "Qualquer arquitetura de paz futura precisará incluir mecanismos transparentes de medição de vazão, "
        "previsão de cheias e secas, e garantias de que a população rural dos dois lados não será refém da "
        "retórica belicista. Sem água, não há acordo estável; sem acordo político, a água vira refém."
    ))

    add_section_title(doc, "2.9  O Artigo 370 e as mudanças constitucionais de 2019")
    add_text(doc, (
        "O Artigo 370 da Constituição indiana concedeu a Jammu e Caxemira um estatuto especial: constituição "
        "própria, bandeira própria e autonomia sobre assuntos internos, com exceção de defesa, diplomacia e "
        "comunicações. O Artigo 35A, derivado desse arranjo, restringia a compra de terras e certos direitos "
        "a “residentes permanentes”. Para muitos caxemires, esses dispositivos eram a contrapartida da adesão "
        "de 1947: a região entrava na União, mas não se dissolvia nela. Para o Partido Bharatiya Janata (BJP) "
        "e para setores nacionalistas indianos, o estatuto especial era uma anomalia que alimentava "
        "separatismo e impedia o desenvolvimento."
    ))
    add_text(doc, (
        "Em 5 de agosto de 2019, o governo do primeiro-ministro Narendra Modi revogou, na prática, o Artigo "
        "370 por ordem presidencial e resolução do Parlamento. No dia seguinte, o Estado foi reorganizado em "
        "dois territórios da União: Jammu e Caxemira, e Ladakh, ambos sob maior controle de Nova Déli. A "
        "medida veio acompanhada de detenção de líderes políticos locais, bloqueio de comunicações e forte "
        "presença de segurança. O governo indiano apresentou a decisão como integração nacional, fim de "
        "privilégios e combate ao terrorismo, sob o lema de “uma nação, uma constituição”. Partidos regionais, "
        "como a Conferência Nacional e o Partido Democrático do Povo, chamaram o dia de ferida aberta e "
        "seguiram pedindo a restauração da autonomia (ASIA SENTINEL, 2026)."
    ))
    add_text(doc, (
        "O Paquistão condenou a revogação como violação do direito internacional e das resoluções da ONU, "
        "pois alteraria unilateralmente o status de um território disputado. A China criticou especialmente "
        "a criação do território de Ladakh, que inclui áreas reivindicadas por Pequim. No plano interno, a "
        "Suprema Corte da Índia, em 2023, validou em linhas gerais a constitucionalidade da revogação, o que "
        "encerrou a batalha jurídica doméstica, mas não a batalha política. Em 2024, realizaram-se eleições "
        "legislativas no território de Jammu e Caxemira, e Omar Abdullah voltou ao cargo de primeiro-ministro "
        "local, agora com poderes reduzidos diante do tenente-governador indicado pelo centro."
    ))
    add_text(doc, (
        "Sete anos depois, o balanço é misto. Indicadores oficiais de violência no Vale melhoraram em "
        "relação ao período pré-2019, e o governo aponta investimentos e turismo. Críticos afirmam que a "
        "calmaria é enganosa, que a alienação política permanece e que a militância se deslocou para Jammu. "
        "O próprio Omar Abdullah declarou, em 2026, que as feridas não haviam cicatrizado. A revogação do "
        "Artigo 370, portanto, mudou o mapa administrativo e a gramática constitucional da Índia sobre a "
        "Caxemira, mas não dissolveu a questão internacional nem reconquistou, por si só, o consentimento "
        "pleno da população do Vale (SPRINGER, 2026)."
    ))

    add_section_title(doc, "2.10  A crise de 2025 e o cenário contemporâneo")
    add_text(doc, (
        "Em 22 de abril de 2025, homens armados atacaram turistas em Baisaran, perto de Pahalgam, no sul "
        "do Vale da Caxemira. O massacre deixou 26 mortos, na maioria civis. O grupo The Resistance Front, "
        "descrito como ramificação de Lashkar-e-Taiba, reivindicou a ação. Foi o pior ataque contra civis "
        "na região em mais de duas décadas e um golpe no discurso de normalidade turística promovido após "
        "2019. A Índia acusou o Paquistão de patrocinar o terrorismo transfronteiriço. Islamabade negou."
    ))
    add_text(doc, (
        "A resposta indiana foi diplomática e, em seguida, militar. Nova Déli suspendeu o Tratado das Águas "
        "do Indo, rebaixou o diálogo, fechou a principal passagem de fronteira, cancelou vistos e expulsou "
        "assessores militares paquistaneses. O Paquistão retaliou com restrições comerciais, fechamento de "
        "espaço aéreo e a suspensão do Acordo de Simla. Tiros isolados na Linha de Controle, a partir de "
        "24 de abril, antecederam o salto qualitativo: em 7 de maio de 2025, a Índia lançou a Operação "
        "Sindoor, com mísseis contra o que descreveu como infraestrutura terrorista em território "
        "paquistanês e na Caxemira administrada por Islamabade. O Paquistão falou em alvos civis e respondeu "
        "com mísseis, drones e bombardeio, inclusive na região de Poonch (INDIAN EXPRESS, 2025)."
    ))
    add_text(doc, (
        "Durante quatro dias, os dois países travaram o confronto mais intenso em muitos anos, com mortes "
        "de civis e militares. Em 10 de maio, após contatos entre comandos militares e gestões diplomáticas "
        "que incluíram os Estados Unidos, entrou em vigor um cessar-fogo. O presidente norte-americano "
        "Donald Trump reivindicou ter ajudado a deter a guerra, afirmação que desagrada a Índia, oposta a "
        "qualquer mediação formal sobre a Caxemira. O cessar-fogo seguia em vigor em 2026, mas o fundo da "
        "crise — terrorismo, estatuto territorial, desconfiança mútua — permanecia intocado (HOUSE OF "
        "COMMONS LIBRARY, 2025)."
    ))
    add_text(doc, (
        "O quadro de 2026 combina, assim, elementos velhos e novos. Velhos: a LoC, as narrativas opostas, "
        "o UNMOGIP, a rejeição indiana de terceiros. Novos: o território da União no lugar do Estado "
        "autônomo, a militarização da água, o uso de drones e mísseis de precisão, e uma diplomacia "
        "estadunidense oscilante. Em agosto de 2026, o embaixador dos EUA na Índia, Sergio Gor, referiu-se "
        "a Jammu e Caxemira como parte importante da Índia, o que provocou protesto formal do Paquistão "
        "(THE DIPLOMAT, 2026). A frase, em si, não resolve o conflito, mas mostra como até o vocabulário "
        "diplomático continua minado."
    ))
    add_text(doc, (
        "No chão, a segurança melhorou em alguns indicadores e piorou em outros. Relatos de 2025-2026 "
        "apontam menos mortes civis em certos intervalos, porém ataques em Jammu e a memória fresca de "
        "Pahalgam. Politicamente, as eleições locais devolveram alguma representação, sem restaurar o "
        "Artigo 370. Internacionalmente, a Caxemira voltou ao Conselho de Segurança pela voz paquistanesa "
        "e foi devolvida ao domínio interno pela voz indiana. O conflito completou quase oitenta anos "
        "sem mapa de saída consensual."
    ))

    add_section_title(doc, "2.11  Perspectivas de paz e o papel da comunidade internacional")
    add_text(doc, (
        "Que saídas existem? A literatura e a diplomacia já ensaiaram várias. A primeira é o plebiscito "
        "clássico, nos termos de 1948: a população escolheria Índia ou Paquistão. Hoje, essa fórmula esbarra "
        "em obstáculos práticos e éticos. Quem votaria? Só o Vale? Também Jammu, Ladakh, Azad Kashmir e "
        "Gilgit-Baltistão? Os refugiados pandits? Além disso, uma escolha binária ignora a corrente "
        "independista, historicamente relevante no Vale. Sem desmilitarização prévia, qualquer consulta "
        "seria acusada de fraude por um dos lados."
    ))
    add_text(doc, (
        "A segunda saída é a consolidação da Linha de Controle como fronteira internacional, com trocas "
        "comerciais, trânsito de pessoas e autonomia substancial dos dois lados. Seria, em essência, "
        "transformar o de fato em de direito, reduzindo a ferida sem reabrir a guerra. A Índia se "
        "aproximaria dessa tese se o Paquistão abandonasse a internacionalização e o apoio a milícias. "
        "O Paquistão resiste porque equivaleria a abrir mão da reivindicação histórica. Setores caxemires "
        "rejeitam porque sentem que sua autodeterminação seria outra vez adiada."
    ))
    add_text(doc, (
        "A terceira família de propostas envolve partilha mais sofisticada: o Vale com autonomia máxima ou "
        "condomínio, Jammu e Ladakh alinhados à Índia, Azad Kashmir e Gilgit ao Paquistão, e mecanismos "
        "conjuntos para água e turismo. Variações disso apareceram na chamada “solução Chenab” e em "
        "diálogos da década de 2000 entre Manmohan Singh e Pervez Musharraf, quando se falou em fronteiras "
        "porosas e autogoverno. Esses avanços recuaram com atentados, mudanças de governo e endurecimento "
        "nacionalista. A lição é amarga: quando o diálogo amadurece, um choque de violência costuma "
        "derrubá-lo."
    ))
    add_text(doc, (
        "A comunidade internacional tem papel limitado, mas não nulo. Pode pressionar contra o terrorismo "
        "e contra violações de direitos humanos, oferecer bons ofícios em crises agudas, financiar "
        "confiança militar (hotlines, avisos de exercícios, observadores) e apoiar a sociedade civil "
        "caxemire. Não pode impor um mapa. A Índia, hoje uma economia de peso e parceira de diversos "
        "ocidentais, rejeita internacionalização. O Paquistão busca exatamente o contrário. Sem mudança "
        "nessa assimetria de estratégia, o máximo que terceiros conseguem é evitar a guerra, não fabricar "
        "a paz."
    ))
    add_text(doc, (
        "Para um trabalho escolar, importa reter uma conclusão intermediária, antes da conclusão geral: "
        "não há solução militar estável para a Caxemira. Setenta e oito anos de armas não produziram um "
        "vencedor reconhecido. Há, no máximo, equilíbrios precários. A paz, se vier, será política, "
        "gradual e provavelmente insatisfatória para os maximalistas dos três países. Mas será, ainda "
        "assim, superior à eterna véspera de uma guerra nuclear."
    ))

    # ===================== CONCLUSÃO =====================
    add_page_break(doc)
    add_chapter_title(doc, "3  CONCLUSÃO")
    add_text(doc, (
        "A questão da Caxemira nasceu da partição de 1947 e da incapacidade de integrar, de forma pacífica "
        "e democrática, um Estado principesco de maioria muçulmana e governante hindu ao novo mapa da Ásia "
        "do Sul. O Instrumento de Adesão, a invasão tribal, a primeira guerra e o cessar-fogo da ONU criaram "
        "uma divisão de fato que o tempo endureceu. O que era provisório virou estrutura. A Linha de Controle "
        "é, ao mesmo tempo, cicatriz e fronteira imaginária: existe nos postos militares, não existe como "
        "limite internacional aceito por todos."
    ))
    add_text(doc, (
        "Ao longo do desenvolvimento, viu-se que o conflito tem várias camadas. Há a camada jurídica, "
        "ancorada no Instrumento de Adesão e nas resoluções da ONU. Há a camada identitária, em que a Índia "
        "defende o secularismo e o Paquistão a teoria das duas nações. Há a camada militar, com quatro "
        "guerras de grande envergadura, crises nucleares e uma insurgência iniciada em 1989. Há a camada "
        "humanitária, feita de deslocamentos, abusos e luto. Há a camada hídrica, reativada em 2025 com a "
        "suspensão do Tratado do Indo. E há a camada chinesa, que impede reduzir o problema a um duelo "
        "indo-paquistanês."
    ))
    add_text(doc, (
        "A revogação do Artigo 370, em 2019, foi o maior rearranjo interno indiano desde a adesão. Integração "
        "constitucional, porém, não é o mesmo que reconciliação. Sete anos depois, indicadores de violência "
        "no Vale melhoraram em alguns aspectos, mas a militância não desapareceu, a política local segue "
        "marcada pela memória da autonomia perdida, e o atentado de Pahalgam mostrou a fragilidade da "
        "“normalidade” anunciada. A crise de maio de 2025 lembrou ao mundo que duas potências nucleares "
        "ainda podem ir às vias de fato por causa da Caxemira, e que cessar-fogo não é tratado de paz."
    ))
    add_text(doc, (
        "Este trabalho sustentou uma posição analítica, não ufanista. A Índia tem argumentos jurídicos "
        "sérios e o direito de combater o terrorismo; não tem carta branca para violar direitos fundamentais. "
        "O Paquistão tem razão ao lembrar a promessa de plebiscito e o sofrimento de parte da população; "
        "não tem o direito de tratar milícias como instrumento de política externa. A China é parte "
        "interessada, não árbitro neutro. E os caxemires — muçulmanos do Vale, hindus de Jammu, budistas "
        "de Ladakh, habitantes de Azad Kashmir e de Gilgit-Baltistão — não podem continuar sendo apenas "
        "cenário da disputa alheia."
    ))
    add_text(doc, (
        "Olhando para a frente, a via mais realista não é a vitória total de um mapa sobre os outros, e "
        "sim a redução do dano: cessar-fogo sólido, fim do terrorismo e da repressão indiscriminada, "
        "reabertura de diálogos sobre autonomia e água, trânsito de civis, e paciência histórica. Pode "
        "parecer pouco diante de oitenta anos de reivindicação absoluta. É, contudo, o terreno em que a "
        "diplomacia costuma avançar quando a guerra se prova estéril. A Caxemira não pediu para ser o "
        "símbolo de duas nações. Pediu, e ainda pede, o direito de viver."
    ))
    add_text(doc, (
        "Conclui-se, portanto, que a questão da Caxemira permanece aberta porque combina território, "
        "identidade e segurança nuclear em um espaço em que nenhuma potência aceita perder. Compreendê-la "
        "é um exercício de geografia política e de empatia. Para o estudante brasileiro, o tema também é "
        "um convite a ler o mundo além das fronteiras imediatas: conflitos distantes moldam o preço da "
        "paz global, o equilíbrio asiático e o risco de uma guerra que, se sair do controle, não ficará "
        "confinada aos Himalaias. Estudar a Caxemira, nesse sentido, é estudar a responsabilidade "
        "internacional no século XXI."
    ))

    # ===================== BIBLIOGRAFIA =====================
    add_page_break(doc)
    add_chapter_title(doc, "4  BIBLIOGRAFIA")

    refs = [
        "ASIA SENTINEL. Jammu & Kashmir far from normal after revocation of special status. 2026. Disponível em: https://www.asiasentinel.com/p/jammu-kashmir-after-revocation-special-status. Acesso em: 24 ago. 2026.",
        "BALLESTEROS PEIRÓ, Ana. Índia e Paquistão estão à beira de outra guerra: chaves para compreender um profundo conflito pós-colonial. Instituto Humanitas Unisinos, 2025. Disponível em: https://www.ihu.unisinos.br/. Acesso em: 24 ago. 2026.",
        "BOSE, Sumantra. Kashmir: roots of conflict, paths to peace. Cambridge: Harvard University Press, 2003.",
        "DEFESANET. Caxemira: as tensões entre Paquistão e Índia e suas implicações globais. 2025. Disponível em: https://www.defesanet.com.br/. Acesso em: 24 ago. 2026.",
        "EASEN, Nick. Aksai Chin: China's disputed slice of Kashmir. CNN, 24 maio 2002. Disponível em: https://edition.cnn.com/2002/WORLD/asiapcf/east/05/24/aksai.chin/. Acesso em: 24 ago. 2026.",
        "GANGULY, Sumit. The crisis in Kashmir: portents of war, hopes of peace. Cambridge: Cambridge University Press, 1997.",
        "GANGULY, Sumit. Conflict unending: India-Pakistan tensions since 1947. New York: Columbia University Press, 2001.",
        "HOUSE OF COMMONS LIBRARY. Kashmir: renewed India-Pakistan tensions. Briefing Paper CBP-10264. Londres, 2025. Disponível em: https://commonslibrary.parliament.uk/research-briefings/cbp-10264/. Acesso em: 24 ago. 2026.",
        "ÍNDIA; PAQUISTÃO. Agreement on bilateral relations between the Government of India and the Government of Pakistan (Simla Agreement). Simla, 2 jul. 1972.",
        "INDIAN EXPRESS. From terror attack to ceasefire: 18 days of tension between India and Pakistan. 2025. Disponível em: https://indianexpress.com/. Acesso em: 24 ago. 2026.",
        "ORGANIZAÇÃO DAS NAÇÕES UNIDAS. Conselho de Segurança. Resolução 47 (1948). Nova York, 21 abr. 1948.",
        "ORGANIZAÇÃO DAS NAÇÕES UNIDAS. UNMOGIP: background. United Nations Military Observer Group in India and Pakistan. Disponível em: https://unmogip.unmissions.org/. Acesso em: 24 ago. 2026.",
        "SCHOFIELD, Victoria. Kashmir in conflict: India, Pakistan and the unending war. Londres: I. B. Tauris, 2003.",
        "SIC NOTÍCIAS. Caxemira: o conflito com 78 anos entre Índia e Paquistão. 24 abr. 2025. Disponível em: https://sicnoticias.pt/. Acesso em: 24 ago. 2026.",
        "SPRINGER NATURE. From autonomy to abrogation of Article 370 and the remaking of governance and politics in Kashmir. Discover Global Society, 2026. Disponível em: https://link.springer.com/. Acesso em: 24 ago. 2026.",
        "THE DIPLOMAT. Did Ambassador Gor signal a change in U.S. stance on Kashmir? ago. 2026. Disponível em: https://thediplomat.com/. Acesso em: 24 ago. 2026.",
        "THE HINDU. India slams Pakistan for 'unwarranted' remarks on J&K at UNSC's Arria-formula meeting. 2026. Disponível em: https://www.thehindu.com/. Acesso em: 24 ago. 2026.",
        "THE WIRE. In seven years, terror claimed fewer lives in Kashmir, but militancy far from over. 2026. Disponível em: https://thewire.in/. Acesso em: 24 ago. 2026.",
        "UNITED NATIONS. The India-Pakistan question. Repertory of Practice of United Nations Organs. Nova York, [s. d.].",
        "WIKIPEDIA. 2025 India–Pakistan crisis. Disponível em: https://en.wikipedia.org/wiki/2025_India–Pakistan_crisis. Acesso em: 24 ago. 2026.",
        "WIKIPEDIA. 2025 Pahalgam attack. Disponível em: https://en.wikipedia.org/wiki/2025_Pahalgam_attack. Acesso em: 24 ago. 2026.",
        "WIKIPEDIA. Conflito na Caxemira. Disponível em: https://pt.wikipedia.org/wiki/Conflito_na_Caxemira. Acesso em: 24 ago. 2026.",
    ]

    for ref in refs:
        p = doc.add_paragraph()
        set_paragraph_format(p, WD_ALIGN_PARAGRAPH.JUSTIFY, line=1.0, first_line=0, left=0,
                             space_before=0, space_after=8)
        p.paragraph_format.left_indent = Cm(1.25)
        p.paragraph_format.first_line_indent = Cm(-1.25)
        run = p.add_run(ref)
        set_run_font(run, size=12)

    out = "/workspace/trabalho/A_Questao_da_Caxemira.docx"
    doc.save(out)
    print(f"Salvo em {out}")


if __name__ == "__main__":
    build()
