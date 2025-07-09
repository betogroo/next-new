Perfeito! Vamos montar uma configuração **completa, moderna e funcional** para integrar ESLint + Prettier no seu projeto Next.js com TypeScript e Tailwind, utilizando o novo formato de configuração do ESLint (`eslint.config.mjs`, ou "Flat Config").

---

## ✅ Etapa 1: Instalar as dependências

Execute o seguinte comando no seu projeto:

```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

Como já possui `eslint`, `typescript` e `eslint-config-next`, isso basta.

---

## ✅ Etapa 2: Ajustar `eslint.config.mjs`

Atualize seu arquivo para:

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'coverage/'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
  ),
  {
    rules: {
      // opcional, pode ativar regras específicas do Prettier
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          bracketSameLine: false,
          endOfLine: 'lf',
        },
      ],
    },
  },
]

export default eslintConfig
```

> 📌 **Nota**: O `plugin:prettier/recommended` já ativa o plugin `eslint-plugin-prettier`, o configura como erro e desativa regras conflitantes.

---

## ✅ Etapa 3: Criar `.prettierrc` e `.prettierignore`

### `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSameLine": false,
  "endOfLine": "lf",
  "tabWidth": 2
}
```

### `.prettierignore`:

```
node_modules
.next
out
dist
coverage
```

---

## ✅ Etapa 4: Configurar o VS Code

No seu `settings.json`, mantenha:

```json
{
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "prettier.vueIndentScriptAndStyle": true,
  "prettier.tabWidth": 2,
  "prettier.bracketSameLine": false,
  "prettier.endOfLine": "lf",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

> 🔎 **Importante**: `eslint.validate` precisa ter os tipos corretos para que o VS Code saiba que quer que o ESLint atue nesses arquivos.

---

## ✅ Etapa 5: Scripts no `package.json`

Adicione os scripts abaixo:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ext js,ts,jsx,tsx",
  "lint:fix": "eslint . --ext js,ts,jsx,tsx --fix",
  "format": "prettier . --write"
}
```

---

## ✅ Etapa 6: Testar

1. Rode o script:

```bash
npm run lint
```

2. Propositalmente, escreva código com erros de formatação como:

```ts
const name = 'Beto'
```

...e veja se o ESLint marca erro e sugere:

```ts
const name = 'Beto'
```

Se aparecer o sublinhado e a sugestão do ESLint no VS Code, está tudo funcionando!

---

## 💡 Extras recomendados

- Ative o **ESLint** e o **Prettier** nas extensões do VS Code.
- Considere usar o `lint-staged` + `husky` para rodar o ESLint e Prettier antes de cada commit.

---
