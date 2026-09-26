#!/usr/bin/env python3
"""Gera PDF do método de estudo rápido (teoria + questões)."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

INK = HexColor("#1a1f2e")
MUTED = HexColor("#5c6578")
ACCENT = HexColor("#0d6e6e")
SOFT = HexColor("#e8f3f3")
LINE = HexColor("#c5d4d4")
WHITE = HexColor("#ffffff")


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "TitlePT",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "subtitle": ParagraphStyle(
            "SubPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=16,
        ),
        "h1": ParagraphStyle(
            "H1PT",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=ACCENT,
            spaceBefore=14,
            spaceAfter=8,
        ),
        "body": ParagraphStyle(
            "BodyPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "BulletPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=INK,
            leftIndent=0,
        ),
        "callout": ParagraphStyle(
            "CalloutPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "small": ParagraphStyle(
            "SmallPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceBefore=18,
        ),
        "cell": ParagraphStyle(
            "CellPT",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=INK,
        ),
        "cell_bold": ParagraphStyle(
            "CellBoldPT",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=INK,
        ),
        "cell_head": ParagraphStyle(
            "CellHeadPT",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=12,
            textColor=WHITE,
        ),
    }


def bullets(items, s):
    return ListFlowable(
        [ListItem(Paragraph(i, s["bullet"]), leftIndent=8, bulletColor=ACCENT) for i in items],
        bulletType="bullet",
        start="•",
        leftIndent=12,
        bulletFontSize=10,
        spaceBefore=2,
        spaceAfter=8,
    )


def section_rule():
    return HRFlowable(width="100%", thickness=0.8, color=LINE, spaceBefore=2, spaceAfter=2)


def build(path: Path):
    s = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.6 * cm,
        title="Método de Estudo Rápido",
        author="Guia de estudos",
    )

    story = []
    story.append(Paragraph("Método de Estudo Rápido", s["title"]))
    story.append(
        Paragraph(
            "Teoria curta + muitas questões + caderno de erros<br/>"
            "Para aprender mais em menos tempo (ideal para concursos e gramática)",
            s["subtitle"],
        )
    )
    story.append(section_rule())

    story.append(Paragraph("1. A ideia central", s["h1"]))
    story.append(
        Paragraph(
            "Não escolha só PDF, só vídeo ou só questões. Quem aprende rápido "
            "<b>mistura os três</b>: entende pouco, aplica muito e revisa os erros.",
            s["body"],
        )
    )

    callout_data = [
        [
            Paragraph(
                "<b>Regra de ouro:</b> 5–10 min de teoria → 20–30 min de questões → "
                "5 min corrigindo e anotando a regra. Evite 1 hora só assistindo aula.",
                s["callout"],
            )
        ]
    ]
    callout = Table(callout_data, colWidths=[16.5 * cm])
    callout.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("BOX", (0, 0), (-1, -1), 0.8, ACCENT),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(callout)
    story.append(Spacer(1, 6))

    story.append(Paragraph("2. Para que serve cada formato", s["h1"]))
    table_data = [
        [
            Paragraph("Formato", s["cell_head"]),
            Paragraph("Quando usar", s["cell_head"]),
        ],
        [
            Paragraph("<b>Vídeo</b>", s["cell_bold"]),
            Paragraph("Quando a regra é nova ou confusa (ex.: se apassivador).", s["cell"]),
        ],
        [
            Paragraph("<b>PDF / resumo</b>", s["cell_bold"]),
            Paragraph("Para consultar rápido e revisar.", s["cell"]),
        ],
        [
            Paragraph("<b>Questões</b>", s["cell_bold"]),
            Paragraph("Para fixar e descobrir o que você ainda erra.", s["cell"]),
        ],
    ]
    t = Table(table_data, colWidths=[3.8 * cm, 12.7 * cm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
                ("BACKGROUND", (0, 1), (-1, 1), HexColor("#f7fbfb")),
                ("BACKGROUND", (0, 3), (-1, 3), HexColor("#f7fbfb")),
                ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 6))
    story.append(
        Paragraph(
            "<b>Na prática:</b> não entendeu → vídeo curto · já entendeu → PDF + questões · "
            "já erra pouco → quase só questões + revisão dos erros.",
            s["body"],
        )
    )

    story.append(Paragraph("3. Estude por “buraco”, não por capítulo", s["h1"]))
    story.append(Paragraph("Depois de cerca de 10 questões, classifique cada erro:", s["body"]))
    story.append(
        bullets(
            [
                "<b>Não sabia a regra</b> → volta na teoria (curta).",
                "<b>Distração</b> → faz mais 5 questões parecidas.",
                "<b>Acertei no chute</b> → trata como erro e anota a regra.",
            ],
            s,
        )
    )

    story.append(Paragraph("4. Ciclo diário (40–50 minutos)", s["h1"]))
    story.append(
        bullets(
            [
                "Escolha <b>1 tema</b> só (ex.: concordância verbal com <i>se</i>).",
                "Leia ou veja <b>1 resumo</b> (máximo 10 min).",
                "Faça <b>15–20 questões</b> só desse tema.",
                "Anote <b>3 frases-modelo</b> no caderno.",
                "No dia seguinte: <b>5 questões de revisão</b> do tema anterior.",
            ],
            s,
        )
    )

    story.append(Paragraph("Exemplos de frases-modelo (Português)", s["h1"]))
    exemplos = [
        [
            Paragraph("Frase", s["cell_head"]),
            Paragraph("Regra em poucas palavras", s["cell_head"]),
        ],
        [
            Paragraph("Vendem-se carros", s["cell"]),
            Paragraph("VTD + se (apassivador) → verbo no plural", s["cell"]),
        ],
        [
            Paragraph("Precisa-se de escolas", s["cell"]),
            Paragraph("VTI + se (indeterminação) → verbo no singular", s["cell"]),
        ],
        [
            Paragraph("Faz dois anos", s["cell"]),
            Paragraph("Fazer de tempo → impessoal, singular", s["cell"]),
        ],
    ]
    t2 = Table(exemplos, colWidths=[5.5 * cm, 11 * cm])
    t2.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
                ("BACKGROUND", (0, 1), (-1, 1), HexColor("#f7fbfb")),
                ("BACKGROUND", (0, 3), (-1, 3), HexColor("#f7fbfb")),
                ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(t2)

    story.append(Paragraph("5. Caderno de erros (o que mais acelera)", s["h1"]))
    story.append(
        Paragraph(
            "Toda questão errada vira <b>uma linha</b>:",
            s["body"],
        )
    )
    story.append(
        bullets(
            [
                "Frase errada",
                "Forma correta",
                "Regra em até 5 palavras",
            ],
            s,
        )
    )
    story.append(
        Paragraph(
            "Ex.: <i>Aluga-se casas → Alugam-se casas → se apassivador concorda</i><br/>"
            "Releia esse caderno <b>antes</b> de cada sessão.",
            s["body"],
        )
    )

    story.append(Paragraph("6. O que evitar", s["h1"]))
    story.append(
        bullets(
            [
                "Só vídeo (vira entretenimento).",
                "Só PDF sem questão (você reconhece, mas não aplica).",
                "Só questão sem corrigir com regra (decora gabarito).",
                "Estudar 5 assuntos no mesmo dia.",
            ],
            s,
        )
    )

    story.append(Paragraph("7. Plano semanal pronto (Português)", s["h1"]))
    plano = [
        [
            Paragraph("Dia", s["cell_head"]),
            Paragraph("Foco", s["cell_head"]),
        ],
        [Paragraph("<b>1</b>", s["cell_bold"]), Paragraph("Concordância verbal (se, haver, fazer)", s["cell"])],
        [Paragraph("<b>2</b>", s["cell_bold"]), Paragraph("Concordância nominal", s["cell"])],
        [Paragraph("<b>3</b>", s["cell_bold"]), Paragraph("Transitividade do verbo", s["cell"])],
        [Paragraph("<b>4</b>", s["cell_bold"]), Paragraph("Misturado — simulado curto", s["cell"])],
        [Paragraph("<b>5</b>", s["cell_bold"]), Paragraph("Só revisão do caderno de erros", s["cell"])],
    ]
    t3 = Table(plano, colWidths=[2.2 * cm, 14.3 * cm])
    t3.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
                ("BACKGROUND", (0, 2), (-1, 2), HexColor("#f7fbfb")),
                ("BACKGROUND", (0, 4), (-1, 4), HexColor("#f7fbfb")),
                ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(t3)
    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "<b>Meta final:</b> não é ver mais conteúdo — é errar menos nas mesmas pegadinhas.",
            s["body"],
        )
    )
    story.append(section_rule())
    story.append(
        Paragraph(
            "Guia prático · Estudo ativo · Revise o caderno de erros todo dia",
            s["small"],
        )
    )

    doc.build(story)
    return path


def main():
    targets = [
        Path("/workspace/artifacts/metodo-estudo-rapido.pdf"),
        Path("/opt/cursor/artifacts/metodo-estudo-rapido.pdf"),
        Path("/workspace/metodo-estudo-rapido.pdf"),
    ]
    for target in targets:
        target.parent.mkdir(parents=True, exist_ok=True)
        build(target)
        print(f"Gerado: {target} ({target.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
