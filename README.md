# Chalé Mirante · Cabo Frio

Protótipo de site próprio de hospedagem para o [@chalemirantecabofrio](https://www.instagram.com/chalemirantecabofrio). A ideia da apresentação: o hóspede vê o que está cheio, reserva direto e paga no site — sem Airbnb, Booking ou similar.

## Online

https://gabriel7z.github.io/desktop-tutorial/

Se a página não abrir na primeira vez: no GitHub, **Settings → Pages → Source → GitHub Actions**, e rode o workflow de novo.

## O que o protótipo mostra

- Página do lugar e dos três chalés (Horizonte, Maré e Duna)
- Calendário por chalé, com **dias ocupados** riscados
- Fluxo de reserva: datas → hóspedes → **Pix ou cartão no próprio site**
- Pagamento em modo demonstração (nenhum valor é cobrado)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

```bash
npm run build
npm run preview
```

Fotos de atmosfera vêm do Unsplash (mar, madeira, dunas). Os chalés, preços e ocupação são fictícios para o protótipo — na versão real entram as unidades, fotos e o calendário verdadeiros do Mirante.
