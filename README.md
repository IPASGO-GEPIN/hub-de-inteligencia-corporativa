# Hub de Inteligência Corporativa

Catálogo web estático para descoberta de dashboards, relatórios, estudos, repositórios e bases de dados da organização.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Os arquivos finais são gerados em `dist/`. A aplicação usa `HashRouter` e `base: './'`, funcionando em domínios raiz e subpastas do GitHub Pages sem configuração adicional de rotas.

## Atualizar o catálogo

Edite `src/data/catalog.ts`. O modelo tipado está em `src/types/catalog.ts` e a configuração da busca fuzzy em `src/utils/search.ts`.

## Publicação

O workflow `.github/workflows/deploy.yml` publica automaticamente a branch `main` no GitHub Pages. No repositório, selecione **Settings → Pages → Source → GitHub Actions** uma única vez.
