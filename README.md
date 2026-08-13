# Ficha de Treino

App simples (HTML + CSS + JS puro, sem build, sem dependências) para organizar e acompanhar seus treinos A, B, C e D. Funciona 100% no navegador — os dados (pesos, marcações e histórico) ficam salvos no `localStorage`, então continuam lá da próxima vez que você abrir.

## Rodar no VSCode

1. Abra a pasta `treino-app` no VSCode.
2. Instale a extensão **Live Server** (Ritwick Dey), se ainda não tiver.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. O app abre no navegador em `http://127.0.0.1:5500` (ou porta parecida).

Não precisa de Node, npm nem nada — é só abrir o `index.html`.

## Editar seus treinos

Todos os exercícios ficam em `workouts.js`. Cada um tem:

```js
{ nome: "Agachamento Livre", series: 3, reps: "12", peso: 20, obs: "" }
```

- `series`: número de séries (ou `null` se ainda não definiu).
- `reps`: texto livre (`"12"`, `"8-10"`, `"até a falha"`...).
- `peso`: valor inicial em kg (editável depois direto na tela).
- `obs`: qualquer observação extra (ex: "drop set", "3 séries (2x2)").

Alguns exercícios (Abdominal, Tríceps Francês, Remada Baixa, Levantamento Terra) ficaram marcados como **"a definir"** porque no seu texto original não vieram com séries/reps/peso — edite o arquivo com os valores certos quando quiser.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `meu-treino`).
2. No terminal, dentro da pasta `treino-app`:
   ```bash
   git init
   git add .
   git commit -m "primeira versão da ficha de treino"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/meu-treino.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, escolha a branch `main` e a pasta `/ (root)`.
4. Depois de ~1 minuto, o app fica disponível em:
   `https://SEU_USUARIO.github.io/meu-treino/`

Pronto — dá pra abrir esse link do celular na academia.

## Observação sobre os dados

Como é `localStorage`, o progresso salvo no navegador do computador **não aparece automaticamente** no celular (são "bancos" separados). Se quiser acompanhar do celular, é só abrir o link do GitHub Pages direto nele — os dados vão ficar salvos lá, no navegador do celular.
