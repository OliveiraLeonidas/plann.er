# Plann.er

![NLW journey trip](./src/assets/nlwtrip.png)

## # TODO

- [] refatorar roteamento das páginas de dados
- [] resolver bug das datas na entrada dos dados

## Frontend - React Vite

[Guia do evento](https://efficient-sloth-d85.notion.site/NLW-JOURNEY-Guia-do-evento-c16d91a2edc64f8182585d4bec6d33e9#8b3e9c84726d480eaf57b615ee16fec2)

[Notion-React](https://efficient-sloth-d85.notion.site/ReactJS-914c8f879c2a41c2b116c91d19bfad27#31ddf6673e8b48bba3c15830c6f6a383)

[Figma](https://www.figma.com/design/bFjE2EeIFJINrGjC0vi2w6/NLW-Journey-%E2%80%A2-Planejador-de-viagem-(Community)?node-id=7105-991&t=9C0jyTGHqqK1uXAZ-0)

## How to start this project

1. Install Vite

```bash
    npm install vite@latest
```

```bash
    cd journey-project
    npm install
```

[Tailwindcss](https://tailwind.com)

```bash
    npm install -D tailwindcss
    npx tailwindcss init

```

No arquivo "tailwind.config.js

```ts
/** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [],}
```

No arquivo src/input.css

```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

```bash
    npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

[Tailwind variants](https://www.tailwind-variants.org/)

```bash
    npm install tailwind-variants
```

[Lucide React icons](https://lucide.dev/guide/packages/lucide-react)

```bash
    pnpm install lucide-react
```

[React router](https://reactrouter.com/en/main)

```bash
    npm install react-router@6 react-router-dom@6
```

[React daypicker](https://daypicker.dev/)

```bash
    npm install react-day-picker date-fns
```

[Axios](https://axios-http.com/docs/intro)

```bash
    npm install axios
```

---

## Backend - Node

[API Documentação](https://nlw-journey.apidocumentation.com/reference#tag/trips/get/trips/{tripId}/confirm)

[Guia node](https://efficient-sloth-d85.notion.site/Node-js-e7ea59307a1d47c08a3272d81afb312f)

[tsconfig NodeBases](https://github.com/tsconfig/bases)

[Fastify](https://fastify.dev/)

[SQLite](https://www.prisma.io/docs/orm/overview/databases/sqlite)

[Prisma](https://www.prisma.io/)

[Postman](https://www.postman.com/)

[zod](https://zod.dev/)

```bash
    npm i zod
```

[fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)

```bash
    npm i fastify-type-provider-zod
```

Para manipulação de datas
[dayjs](https://day.js.org/en/)

```bash
    npm i dayjs
```

Para definir quais urls podem acessar sua api Node
[fastify/cors](https://github.com/fastify/fastify-cors)

```bash
    npm i @fastify/cors
```

### Nodemailer e integração auxiliar

[Nodemailer](https://nodemailer.com/)

```bash
    npm i nodemailer
    npm i --save-dev @types/nodemailer
```
