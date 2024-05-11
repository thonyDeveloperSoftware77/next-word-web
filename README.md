This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [ https://next-word-backend-1.onrender.com]( https://next-word-backend-1.onrender.com) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Arquitectura de la app
![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/1a6ec43e-2ec1-4ac6-bc5a-7da659d21c0a)

## Flujo  de login y rutas protegidas
![image](https://github.com/thonyDeveloperSoftware77/next-word-web/assets/122832433/8d51e225-3625-4fa9-b194-9171a7a10cb5)

## Funcionalidades:
1. CRUD de profesores:

    Permite crear, editar y eliminar profesores.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.

2. CRUD de cursos:

    Permite crear, editar y eliminar cursos.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.

3. CRUD de cards:

    Permite crear, editar y eliminar cards.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.
    La creación de cards se puede realizar de dos maneras:
    - Objeto individual: Permite crear una card individual especificando los parámetros necesarios.
    - JSON de cards: Permite crear varias cards de forma masiva mediante un archivo JSON. Esta funcionalidad solo está disponible para cuentas de administrador y valida la información mediante tokens y variables de entorno.
    Las cards contienen los parámetros necesarios para el aprendizaje de inglés, como vocabulario, gramática y pronunciación.

4. CRUD de similar cards:

    Permite crear, editar y eliminar similar cards.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.

5. CRUD de estudiantes:

    Permite crear, editar y eliminar estudiantes.
    Las entradas de datos se validan en el backend para garantizar la integridad de la información.